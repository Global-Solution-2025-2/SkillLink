import express from "express";
import cors from "cors";
import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

// 🧭 Corrige o __dirname no ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Caminho do arquivo perfil.json
const perfilPath = path.resolve(__dirname, "data", "perfil.json");

// Garante que a pasta e o arquivo existam
if (!fs.existsSync(path.dirname(perfilPath))) {
  fs.mkdirSync(path.dirname(perfilPath), { recursive: true });
}
if (!fs.existsSync(perfilPath)) {
  fs.writeFileSync(perfilPath, "[]", "utf-8");
}

// Função para ler perfis
const lerPerfis = () => {
  try {
    const data = fs.readFileSync(perfilPath, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
};

// Função para salvar perfis
const salvarPerfis = (perfis) => {
  fs.writeFileSync(perfilPath, JSON.stringify(perfis, null, 2), "utf-8");
};

// 🟢 Rota de cadastro
app.post("/cadastro", async (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ message: "Todos os campos são obrigatórios!" });
  }

  const perfis = lerPerfis();
  const existeUsuario = perfis.find((p) => p.email === email);

  if (existeUsuario) {
    return res.status(400).json({ message: "Email já cadastrado!" });
  }

  const hashSenha = await bcrypt.hash(senha, 10);

  const novoPerfil = {
    id: uuidv4(),
    nome,
    email,
    senha: hashSenha,
    foto: "./images/default.jpg",
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
  };

  perfis.push(novoPerfil);
  salvarPerfis(perfis);

  res.status(201).json({ message: "Usuário cadastrado com sucesso!", perfil: novoPerfil });
});

// 🟢 Rota de login
app.post("/login", async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ message: "Email e senha são obrigatórios!" });
  }

  const perfis = lerPerfis();
  const usuario = perfis.find((p) => p.email === email);

  if (!usuario) {
    return res.status(401).json({ message: "Email ou senha incorretos!" });
  }

  const senhaValida = await bcrypt.compare(senha, usuario.senha);
  if (!senhaValida) {
    return res.status(401).json({ message: "Email ou senha incorretos!" });
  }

  const { senha: _, ...perfilSemSenha } = usuario;

  res.json({ message: "Login realizado com sucesso!", perfil: perfilSemSenha });
});

// 🟣 Listar profissionais (sem senha)
app.get("/profissionais", (req, res) => {
  const perfis = lerPerfis();
  const semSenhas = perfis.map(({ senha, ...resto }) => resto);
  res.json(semSenhas);
});

// 🟢 NOVO — Atualizar perfil existente
app.put("/perfil/:id", (req, res) => {
  const { id } = req.params;
  const novosDados = req.body;

  const perfis = lerPerfis();
  const index = perfis.findIndex((p) => p.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Usuário não encontrado!" });
  }

  // Mantém a senha original
  const senhaAntiga = perfis[index].senha;

  // Atualiza os dados
  perfis[index] = { ...perfis[index], ...novosDados, senha: senhaAntiga };

  salvarPerfis(perfis);

  const { senha, ...perfilAtualizado } = perfis[index];
  res.json({ message: "Perfil atualizado com sucesso!", perfil: perfilAtualizado });
});

// 🟣 Servir arquivos estáticos da pasta "data"
app.use("/data", express.static(path.join(__dirname, "data")));

app.listen(PORT, () =>
  console.log(`✅ Servidor rodando em http://localhost:${PORT}`)
);
