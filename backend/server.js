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

// 🟢 Cadastro
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
    criadoEm: new Date().toISOString()
  };

  perfis.push(novoPerfil);
  salvarPerfis(perfis);

  res.status(201).json({ message: "Usuário cadastrado", perfil: novoPerfil });
});

// 🟢 Login
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

// 🟣 Listar profissionais (sem senha)
app.get("/profissionais", (req, res) => {
  const perfis = lerPerfis();
  const semSenha = perfis.map(({ senha, ...resto }) => resto);
  res.json(semSenha);
});

// 🟣 Atualizar perfil
app.put("/perfil/:id", (req, res) => {
  const { id } = req.params;
  const novos = req.body;

  const perfis = lerPerfis();
  const index = perfis.findIndex((p) => p.id === id);

  if (index === -1)
    return res.status(404).json({ message: "Usuário não encontrado" });

  // Mantém senha antiga
  const senhaAntiga = perfis[index].senha;

  perfis[index] = { ...perfis[index], ...novos, senha: senhaAntiga };

  salvarPerfis(perfis);

  const { senha, ...perfilAtualizado } = perfis[index];

  res.json({ message: "Perfil atualizado", perfil: perfilAtualizado });
});

// 🟣 UPLOAD DE FOTO — Atualiza perfil automaticamente
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

  // Caminho acessível via frontend
  const caminhoFoto = `/uploads/${req.file.filename}`;

  perfis[index].foto = caminhoFoto;
  salvarPerfis(perfis);

  res.json({
    message: "Foto enviada com sucesso",
    foto: caminhoFoto
  });
});

// Servir arquivos do /data
app.use("/data", express.static(path.join(__dirname, "data")));

app.listen(PORT, () =>
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`)
);
