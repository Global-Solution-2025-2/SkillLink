import express from "express";
import cors from "cors";
import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import multer from "multer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const uploadsPath = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsPath);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `foto_${uuidv4()}${ext}`);
  }
});

const upload = multer({ storage });
app.use("/uploads", express.static(uploadsPath));

// 🗂️ Caminho do arquivo perfil.json
const perfilPath = path.resolve(__dirname, "data", "perfil.json");

// Garantir que o arquivo exista
if (!fs.existsSync(path.dirname(perfilPath))) {
  fs.mkdirSync(path.dirname(perfilPath), { recursive: true });
}
if (!fs.existsSync(perfilPath)) {
  fs.writeFileSync(perfilPath, "[]", "utf-8");
}

// Funções utilitárias
const lerPerfis = () => {
  try {
    return JSON.parse(fs.readFileSync(perfilPath, "utf-8"));
  } catch {
    return [];
  }
};

const salvarPerfis = (perfis) => {
  fs.writeFileSync(perfilPath, JSON.stringify(perfis, null, 2), "utf-8");
};

// --------------------- CADASTRO ---------------------
app.post("/cadastro", async (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ message: "Todos os campos são obrigatórios" });
  }

  const perfis = lerPerfis();
  const existe = perfis.find((p) => p.email === email);

  if (existe) {
    return res.status(400).json({ message: "Email já cadastrado" });
  }

  const senhaHash = await bcrypt.hash(senha, 10);

  const novoPerfil = {
    id: uuidv4(),
    nome,
    email,
    senha: senhaHash,
    foto: "/uploads/default.jpg",
    cargo: "",
    resumo: "",
    localizacao: "",
    area: "",
    habilidadesTecnicas: [],
    softSkills: [],
    experiencias: [],
    formacao: [],
    projetos: [],
    certificacoes: [],
    idiomas: [],
    areaInteresses: [],
    dataNascimento: "",
    criadoEm: new Date().toISOString(),
    cursos: [] // ✅ Array de cursos do usuário
  };

  perfis.push(novoPerfil);
  salvarPerfis(perfis);

  res.status(201).json({ message: "Usuário cadastrado", perfil: novoPerfil });
});

// --------------------- LOGIN ---------------------
app.post("/login", async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ message: "Email e senha obrigatórios" });
  }

  const perfis = lerPerfis();
  const usuario = perfis.find((p) => p.email === email);

  if (!usuario) {
    return res.status(401).json({ message: "Email ou senha incorretos" });
  }

  const senhaOk = await bcrypt.compare(senha, usuario.senha);
  if (!senhaOk) {
    return res.status(401).json({ message: "Email ou senha incorretos" });
  }

  const { senha: _, ...userSemSenha } = usuario;

  res.json({ message: "Login realizado", perfil: userSemSenha });
});

// --------------------- LISTAR PROFISSIONAIS ---------------------
app.get("/profissionais", (req, res) => {
  const perfis = lerPerfis();
  const semSenha = perfis.map(({ senha, ...resto }) => resto);
  res.json(semSenha);
});

// --------------------- ATUALIZAR PERFIL ---------------------
app.put("/perfil/:id", (req, res) => {
  const { id } = req.params;
  const novos = req.body;

  const perfis = lerPerfis();
  const index = perfis.findIndex((p) => p.id === id);

  if (index === -1)
    return res.status(404).json({ message: "Usuário não encontrado" });

  const senhaAntiga = perfis[index].senha;

  perfis[index] = { ...perfis[index], ...novos, senha: senhaAntiga };

  salvarPerfis(perfis);

  const { senha, ...perfilAtualizado } = perfis[index];

  res.json({ message: "Perfil atualizado", perfil: perfilAtualizado });
});

// --------------------- UPLOAD DE FOTO ---------------------
app.post("/upload/:id", upload.single("foto"), (req, res) => {
  const { id } = req.params;

  if (!req.file) {
    return res.status(400).json({ message: "Nenhuma foto enviada" });
  }

  const perfis = lerPerfis();
  const index = perfis.findIndex((p) => p.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Usuário não encontrado" });
  }

  const caminhoFoto = `/uploads/${req.file.filename}`;
  perfis[index].foto = caminhoFoto;
  salvarPerfis(perfis);

  res.json({ message: "Foto enviada com sucesso", foto: caminhoFoto });
});

// --------------------- CURSOS ---------------------



// --------------------- CURSOS ---------------------
const cursosPath = path.resolve(__dirname, "data", "cursos.json");

// Garante que o arquivo exista
if (!fs.existsSync(cursosPath)) {
  // Se não existir, cria com dados padrão
  const cursosPadrao = {
    cursos: [
      {
        id: 1,
        nome: "Curso Padrão",
        descricao: "Descrição padrão",
        level: "Iniciante",
        duracao: "3 semanas",
        horas: 15,
        carreira: "Carreira Padrão",
        profissoesPossiveis: ["Profissão 1"]
      }
    ]
  };
  fs.writeFileSync(cursosPath, JSON.stringify(cursosPadrao, null, 2), "utf-8");
}

// Rota para retornar todos os cursos disponíveis no sistema
app.get("/cursos", (req, res) => {
  try {
    console.log("📖 Lendo arquivo de cursos...");
    
    const data = fs.readFileSync(cursosPath, "utf8");
    
    // Verifica se o arquivo está vazio
    if (!data.trim()) {
      console.error("❌ Arquivo de cursos está vazio");
      return res.status(500).json({ error: "Arquivo de cursos vazio" });
    }
    
    const cursosData = JSON.parse(data);
    console.log("✅ JSON parseado com sucesso");
    
    // Seu JSON já tem a estrutura { cursos: [...] }
    // Então retornamos diretamente
    res.json(cursosData);
    
  } catch (error) {
    console.error("❌ Erro ao ler cursos:", error);
    
    // Retorna erro detalhado
    res.status(500).json({ 
      error: "Erro ao carregar cursos",
      details: error.message 
    });
  }
});

// Rota de teste para verificar se o backend está funcionando
app.get("/test", (req, res) => {
  res.json({ 
    message: "Backend funcionando!",
    timestamp: new Date().toISOString()
  });
});

// --------------------- SERVIR DATA ---------------------
app.use("/data", express.static(path.join(__dirname, "data")));

app.listen(PORT, () =>
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`)
);
