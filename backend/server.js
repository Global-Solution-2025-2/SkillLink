import express from "express";
import cors from "cors";
import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
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

  // SALVANDO SENHA EM TEXTO PURO (SEM HASH)
  const novoPerfil = {
    id: uuidv4(),
    nome,
    email,
    senha, // <-- senha em texto claro
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

  // COMPARAÇÃO DIRETA (TEXTO PURO)
  if (usuario.senha !== senha) {
    return res.status(401).json({ message: "Email ou senha incorretos" });
  }

  // 🔧 Garantir que retorna TODOS os campos que o Feed precisa
  const { senha: _, ...userSemSenha } = usuario;
  
  // Adicionar campos padrão se não existirem
  const usuarioCompleto = {
    cursos: [],
    cargo: "",
    area: "",
    localizacao: "",
    foto: "/uploads/default.jpg",
    ...userSemSenha
  };

  res.json({ 
    message: "Login realizado", 
    perfil: usuarioCompleto 
  });
});

// --------------------- LISTAR PROFISSIONAIS ---------------------
app.get("/profissionais", (req, res) => {
  const perfis = lerPerfis();
  const semSenha = perfis.map(({ senha, ...resto }) => resto);
  res.json(semSenha);
});

// --------------------- RECOMENDAR PROFISSIONAL ---------------------
app.post("/recomendar/:profId/:userId", (req, res) => {
  const { profId, userId } = req.params;

  let perfis = lerPerfis();
  const index = perfis.findIndex((p) => p.id == profId);

  if (index === -1) {
    return res.status(404).json({ error: "Profissional não encontrado" });
  }

  const prof = perfis[index];

  // cria campo caso não exista
  if (!prof.recomendacoes) {
    prof.recomendacoes = {
      count: 0,
      recomendadores: []
    };
  }

  // já recomendou?
  if (prof.recomendacoes.recomendadores.includes(userId)) {
    return res.status(400).json({ error: "Você já recomendou este profissional" });
  }

  prof.recomendacoes.count += 1;
  prof.recomendacoes.recomendadores.push(userId);

  perfis[index] = prof;
  salvarPerfis(perfis);

  res.json({
    success: true,
    profissional: { ...prof, senha: undefined }
  });
});

// --------------------- REMOVER RECOMENDAÇÃO ---------------------
app.delete("/recomendar/:profId/:userId", (req, res) => {
  const { profId, userId } = req.params;

  let perfis = lerPerfis();
  const index = perfis.findIndex((p) => p.id == profId);

  if (index === -1) {
    return res.status(404).json({ error: "Profissional não encontrado" });
  }

  const prof = perfis[index];

  if (!prof.recomendacoes) {
    return res.status(400).json({ error: "Nenhuma recomendação para remover" });
  }

  if (!prof.recomendacoes.recomendadores.includes(userId)) {
    return res.status(400).json({ error: "Você não recomendou este profissional" });
  }

  // remover recomendação
  prof.recomendacoes.count = Math.max(0, prof.recomendacoes.count - 1);
  prof.recomendacoes.recomendadores =
    prof.recomendacoes.recomendadores.filter((id) => id !== userId);

  if (prof.recomendacoes.count === 0) {
    delete prof.recomendacoes;
  }

  perfis[index] = prof;
  salvarPerfis(perfis);

  res.json({
    success: true,
    profissional: { ...prof, senha: undefined }
  });
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

// ----------------------
//  CONVERSAS 
// ----------------------

const CONVERSAS_PATH = path.join(__dirname, "data/conversas.json");

// Carregar conversas do arquivo JSON (ou criar vazio)
let conversas = [];
if (fs.existsSync(CONVERSAS_PATH)) {
  try {
    conversas = JSON.parse(fs.readFileSync(CONVERSAS_PATH, "utf-8") || "[]");
  } catch (err) {
    console.error("Erro ao parsear conversas.json — iniciando vazio:", err);
    conversas = [];
  }
} else {
  fs.writeFileSync(CONVERSAS_PATH, "[]", "utf-8");
}

// Salvar no arquivo
function salvarConversas() {
  try {
    fs.writeFileSync(CONVERSAS_PATH, JSON.stringify(conversas, null, 2), "utf-8");
  } catch (err) {
    console.error("Erro ao salvar conversas:", err);
  }
}

// Helper: encontra conversa que contenha exatamente esses dois emails (independente da ordem)
function encontrarConversaEntre(emailA, emailB) {
  return conversas.find(
    (c) =>
      Array.isArray(c.usuarios) &&
      c.usuarios.includes(emailA) &&
      c.usuarios.includes(emailB)
  );
}

// Criar nova conversa entre dois usuários (se quiser criar manualmente)
app.post("/conversas", (req, res) => {
  const { usuario1, usuario2 } = req.body;
  if (!usuario1 || !usuario2) return res.status(400).json({ error: "Usuários são obrigatórios." });

  // evita duplicar
  const existe = encontrarConversaEntre(usuario1, usuario2);
  if (existe) return res.status(200).json(existe);

  const nova = {
    id: Date.now().toString(),
    usuarios: [usuario1, usuario2], // emails
    mensagens: [],
    criadoEm: new Date().toISOString(),
  };

  conversas.push(nova);
  salvarConversas();
  res.status(201).json(nova);
});

// Enviar mensagem (rota principal: cria conversa se não existir)
app.post("/mensagens", (req, res) => {
  const { remetente, destinatario, texto } = req.body;
  if (!remetente || !destinatario || !texto) {
    return res.status(400).json({ success: false, message: "remetente, destinatario e texto são obrigatórios." });
  }

  // encontra conversa existente ou cria nova
  let conversa = encontrarConversaEntre(remetente, destinatario);
  if (!conversa) {
    conversa = {
      id: Date.now().toString(),
      usuarios: [remetente, destinatario],
      mensagens: [],
      criadoEm: new Date().toISOString(),
    };
    conversas.push(conversa);
  }

  const novaMensagem = {
    id: Date.now().toString(),
    remetente,        // email do autor
    texto,
    dataEnvio: new Date().toISOString(),
    lida: false
  };

  conversa.mensagens.push(novaMensagem);
  salvarConversas();

  return res.json({ success: true, mensagem: novaMensagem, conversaId: conversa.id });
});

// Alias compatível com o seu código antigo
app.post("/mensagens/simple", (req, res) => {
  // apenas chama /mensagens
  const { remetente, destinatario, texto } = req.body;
  req.body = { remetente, destinatario, texto };
  // Reuse the handler above by directly performing same logic (don't attempt redirect)
  if (!remetente || !destinatario || !texto) {
    return res.status(400).json({ success: false, message: "remetente, destinatario e texto são obrigatórios." });
  }
  let conversa = encontrarConversaEntre(remetente, destinatario);
  if (!conversa) {
    conversa = {
      id: Date.now().toString(),
      usuarios: [remetente, destinatario],
      mensagens: [],
      criadoEm: new Date().toISOString(),
    };
    conversas.push(conversa);
  }
  const novaMensagem = {
    id: Date.now().toString(),
    remetente,
    texto,
    dataEnvio: new Date().toISOString(),
    lida: false
  };
  conversa.mensagens.push(novaMensagem);
  salvarConversas();
  return res.json({ success: true, message: "Mensagem salva!", mensagem: novaMensagem, conversaId: conversa.id });
});

// Listar todas as conversas de um usuário (retorna o array de conversas)
app.get("/conversas/usuario/:usuarioEmail", (req, res) => {
  const { usuarioEmail } = req.params;
  if (!usuarioEmail) return res.status(400).json({ error: "usuarioEmail é obrigatório." });

  const lista = conversas
    .filter((c) => Array.isArray(c.usuarios) && c.usuarios.includes(usuarioEmail))
    .map((c) => {
      // determina o contato (o outro email)
      const contato = c.usuarios.find((u) => u !== usuarioEmail) || null;
      const ultima = c.mensagens && c.mensagens.length ? c.mensagens[c.mensagens.length - 1] : null;
      const naoLidas = c.mensagens
        ? c.mensagens.reduce((acc, m) => acc + (m.lida === false && m.remetente !== usuarioEmail ? 1 : 0), 0)
        : 0;
      return {
        conversaId: c.id,
        contato,
        ultimaMensagem: ultima ? ultima.texto : null,
        horario: ultima ? ultima.dataEnvio : c.criadoEm,
        naoLidas
      };
    })
    // ordena mais recente primeiro
    .sort((a, b) => new Date(b.horario) - new Date(a.horario));

  res.json(lista);
});

// Rota compatível com seu front: retorna a lista de contatos para o inbox
app.get("/mensagens/inbox/:email", (req, res) => {
  const { email } = req.params;
  if (!email) return res.status(400).json([]);

  const lista = conversas
    .filter((c) => Array.isArray(c.usuarios) && c.usuarios.includes(email))
    .map((c) => {
      const contato = c.usuarios.find((u) => u !== email) || null;
      const ultima = c.mensagens && c.mensagens.length ? c.mensagens[c.mensagens.length - 1] : null;
      const naoLidas = c.mensagens
        ? c.mensagens.reduce((acc, m) => acc + (m.lida === false && m.remetente !== email ? 1 : 0), 0)
        : 0;
      return {
        contato,
        ultimaMensagem: ultima ? ultima.texto : null,
        horario: ultima ? ultima.dataEnvio : c.criadoEm,
        naoLidas
      };
    })
    .sort((a, b) => new Date(b.horario) - new Date(a.horario));

  res.json(lista);
});

// Listar somente mensagens entre 2 usuários (privado) via query params (compatível com Chat.jsx)
app.get("/mensagens/conversa", (req, res) => {
  const { user1, user2 } = req.query;
  if (!user1 || !user2) return res.status(400).json([]);

  const conversa = encontrarConversaEntre(user1, user2);
  if (!conversa) return res.json([]);

  res.json(conversa.mensagens);
});

// Também exponho rota antiga por params por compatibilidade
app.get("/mensagens/:u1/:u2", (req, res) => {
  const { u1, u2 } = req.params;
  if (!u1 || !u2) return res.status(400).json([]);

  const conversa = encontrarConversaEntre(u1, u2);
  if (!conversa) return res.json([]);
  res.json(conversa.mensagens);
});

// Marcar mensagens como lidas (mantive sua rota original)
app.put("/conversas/:id/mensagens/lidas", (req, res) => {
  const { id } = req.params;
  const { usuario } = req.body;

  const conversa = conversas.find((c) => c.id == id);
  if (!conversa) return res.status(404).json({ error: "Conversa não encontrada." });

  conversa.mensagens.forEach((m) => {
    if (m.remetente !== usuario) {
      m.lida = true;
    }
  });

  salvarConversas();
  res.json({ ok: true });
});

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
