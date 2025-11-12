import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import fs from "fs";
import path from "path";
import { v4 as uuid } from "uuid";
import { fileURLToPath } from "url";

// Corrigir __dirname no modo ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(bodyParser.json());

// Caminho do arquivo JSON
const perfisPath = path.join(__dirname, "data", "perfil.json");

// ======= Funções auxiliares =======
const lerPerfis = () => {
  try {
    if (!fs.existsSync(perfisPath)) fs.writeFileSync(perfisPath, "[]", "utf-8");
    return JSON.parse(fs.readFileSync(perfisPath, "utf-8"));
  } catch (err) {
    console.error("Erro ao ler perfil.json:", err);
    return [];
  }
};

const salvarPerfis = (data) => {
  try {
    fs.writeFileSync(perfisPath, JSON.stringify(data, null, 2), "utf-8");
    console.log("✅ Perfis salvos em:", perfisPath);
  } catch (err) {
    console.error("Erro ao salvar perfil.json:", err);
  }
};

// ======= ROTA DE CADASTRO =======
app.post("/cadastro", (req, res) => {
  const { nome, email, senha, dataNascimento } = req.body;

  if (!nome || !email || !senha)
    return res.status(400).json({ message: "Preencha todos os campos obrigatórios." });

  const perfis = lerPerfis();

  // Verifica se o e-mail já existe
  if (perfis.find((p) => p.email === email)) {
    return res.status(400).json({ message: "E-mail já cadastrado." });
  }

  // Cria um novo perfil com a estrutura completa
  const novoPerfil = {
    id: uuid(),
    nome,
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
    email,
    senha,
    dataNascimento,
    criadoEm: new Date().toISOString(),
  };

  perfis.push(novoPerfil);
  salvarPerfis(perfis);

  console.log("🟢 Novo perfil cadastrado:", novoPerfil.nome);
  res.status(201).json({ message: "Cadastro realizado com sucesso!", perfil: novoPerfil });
});

// ======= ROTA PARA LISTAR PERFIS =======
app.get("/perfis", (req, res) => {
  res.json(lerPerfis());
});

// ======= INICIAR SERVIDOR =======
app.listen(PORT, () => {
  console.log(`📁 Caminho do arquivo de perfis: ${perfisPath}`);
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
