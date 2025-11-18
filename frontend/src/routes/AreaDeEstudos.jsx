import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  BookOpen,
  Briefcase,
  Users,
  CalendarDays,
  Rocket,
  PlayCircle,
  CheckCircle,
  Clock,
  BarChart3,
} from "lucide-react";
import axios from "axios";

// Função para construir URL da foto do usuário
function buildFotoURL(url) {
  if (!url) return "https://placehold.co/150x150/0891b2/ffffff?text=U";
  if (url.startsWith("http")) return url;
  return url;
}

// Cursos extraídos de carreiras
const carreiras = [
  {
    id: 1,
    title: "Curador de Inteligência Artificial",
    icon: "🤖",
    cursos: [
      { name: "Fundamentos de IA", level: "Iniciante", duration: "40h" },
      { name: "Machine Learning Aplicado", level: "Intermediário", duration: "60h" },
      { name: "Ética em IA", level: "Avançado", duration: "45h" },
    ],
  },
  {
    id: 2,
    title: "Desenhista de Personalidades de IA",
    icon: "🎭",
    cursos: [
      { name: "Design Conversacional", level: "Iniciante", duration: "35h" },
      { name: "IA para Chatbots", level: "Intermediário", duration: "50h" },
      { name: "Estratégias Avançadas de Personalidade", level: "Avançado", duration: "45h" },
    ],
  },
  {
    id: 3,
    title: "Especialista em Interfaces Cérebro-Computador",
    icon: "🧠",
    cursos: [
      { name: "Introdução a Neurotecnologia", level: "Iniciante", duration: "30h" },
      { name: "Processamento de Sinais Neurais", level: "Intermediário", duration: "55h" },
      { name: "Interfaces Cérebro-Computador Avançadas", level: "Avançado", duration: "65h" },
    ],
  },
];

// Juntar todos os cursos em um array único
const cursosDisponiveis = carreiras.flatMap((c) =>
  c.cursos.map((curso, index) => ({
    id: `${c.id}-${index}`,
    nome: curso.name,
    level: curso.level,
    horas: curso.duration,
    carreiraId: c.id,
    carreira: c.title,
    icon: c.icon,
  }))
);

export default function AreaEstudos() {
  const navigate = useNavigate();

  const usuario = JSON.parse(localStorage.getItem("usuarioLogado")) || {
    id: "",
    nome: "Usuário Futurista",
    cargo: "Estudante de Tecnologia",
    foto: "https://i.pravatar.cc/300",
    cursos: [],
  };

  const [meusCursos, setMeusCursos] = useState(usuario.cursos || []);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterLevel, setFilterLevel] = useState("all");
  const [loadingCursos, setLoadingCursos] = useState({});

  // Carregar cursos do backend
  const carregarCursos = async () => {
    if (!usuario.id) return;
    try {
      const res = await axios.get(`http://localhost:5000/perfil/${usuario.id}`);
      const cursos = res.data.cursos || [];
      setMeusCursos(cursos);
      localStorage.setItem("usuarioLogado", JSON.stringify({ ...usuario, cursos }));
    } catch (err) {
      console.error("Erro ao carregar cursos do usuário", err);
    }
  };

  useEffect(() => {
    carregarCursos();
  }, [usuario.id]);

  // Matricular usuário em curso
  const matricularCurso = async (curso) => {
    if (!usuario.id || meusCursos.find((c) => c.id === curso.id)) return;
    setLoadingCursos((prev) => ({ ...prev, [curso.id]: true }));

    const novoCurso = { ...curso, progresso: 0 };
    const atualizado = [...meusCursos, novoCurso];

    try {
      await axios.put(`http://localhost:5000/perfil/${usuario.id}`, { cursos: atualizado });
      setMeusCursos(atualizado);
      localStorage.setItem("usuarioLogado", JSON.stringify({ ...usuario, cursos: atualizado }));
    } catch (err) {
      console.error("Erro ao matricular curso", err);
    } finally {
      setLoadingCursos((prev) => ({ ...prev, [curso.id]: false }));
    }
  };

  // Avançar progresso do curso
  const avancarCurso = async (cursoId) => {
    setLoadingCursos((prev) => ({ ...prev, [cursoId]: true }));
    const atualizado = meusCursos.map((c) =>
      c.id === cursoId ? { ...c, progresso: Math.min((c.progresso || 0) + 10, 100) } : c
    );

    try {
      await axios.put(`http://localhost:5000/perfil/${usuario.id}`, { cursos: atualizado });
      setMeusCursos(atualizado);
      localStorage.setItem("usuarioLogado", JSON.stringify({ ...usuario, cursos: atualizado }));
    } catch (err) {
      console.error("Erro ao atualizar progresso", err);
    } finally {
      setLoadingCursos((prev) => ({ ...prev, [cursoId]: false }));
    }
  };

  // Separar cursos
  const emAndamento = meusCursos.filter((c) => (c.progresso || 0) < 100);
  const concluidos = meusCursos.filter((c) => (c.progresso || 0) >= 100);

  // Filtrar cursos disponíveis
  const disponiveis = cursosDisponiveis
    .filter((c) => !meusCursos.find((m) => m.id === c.id))
    .filter((curso) => {
      const matchesSearch =
        curso.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        curso.carreira.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLevel = filterLevel === "all" || curso.level === filterLevel;
      return matchesSearch && matchesLevel;
    });

  // Estatísticas
  const totalCursos = meusCursos.length;
  const totalHoras = meusCursos.reduce((acc, curso) => acc + (parseInt(curso.horas) || 0), 0);
  const progressoGeral =
    totalCursos > 0
      ? Math.round(meusCursos.reduce((acc, curso) => acc + (curso.progresso || 0), 0) / totalCursos)
      : 0;

  // Redireciona para página do curso
  const abrirCurso = (curso) => {
    navigate(`/curso/${curso.id}`, { state: { curso, usuario } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* ===================== ASIDE ===================== */}
        <aside className="lg:col-span-3 lg:sticky lg:top-6 self-start z-10">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="p-6 text-center bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
              <div className="flex justify-center mb-4">
                <img
                  src={buildFotoURL(usuario?.foto)}
                  alt={`Foto de ${usuario?.nome || "Usuário"}`}
                  className="w-20 h-20 rounded-full border-4 border-white/80 shadow-lg object-cover"
                />
              </div>
              <h2 className="text-xl font-bold truncate">{usuario?.nome}</h2>
              <p className="text-cyan-100 text-sm mt-1 truncate">{usuario?.cargo}</p>
            </div>

            <div className="p-4">
              <div className="grid grid-cols-3 gap-2 mb-6 text-center">
                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
                  <div className="font-bold text-lg text-cyan-600 dark:text-cyan-400">{totalCursos}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-300">Cursos</div>
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
                  <div className="font-bold text-lg text-cyan-600 dark:text-cyan-400">{totalHoras}h</div>
                  <div className="text-xs text-gray-600 dark:text-gray-300">Horas</div>
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
                  <div className="font-bold text-lg text-cyan-600 dark:text-cyan-400">{progressoGeral}%</div>
                  <div className="text-xs text-gray-600 dark:text-gray-300">Progresso</div>
                </div>
              </div>

              <nav className="space-y-1">
                {[
                  { icon: <Briefcase className="w-5 h-5" />, label: "Meu Perfil", path: "/perfil" },
                  { icon: <BookOpen className="w-5 h-5" />, label: "Meus Cursos", path: "/area-de-estudos" },
                  { icon: <Users className="w-5 h-5" />, label: "Minha Rede", path: "/rede" },
                  { icon: <Briefcase className="w-5 h-5" />, label: "Vagas", path: "/vagas" },
                  { icon: <CalendarDays className="w-5 h-5" />, label: "Eventos", path: "/eventos" },
                  { icon: <Rocket className="w-5 h-5" />, label: "Projetos", path: "/projetos" },
                ].map((item, index) => (
                  <Link
                    key={index}
                    to={item.path}
                    className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
                      item.path === "/area-de-estudos"
                        ? "bg-cyan-50 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 font-semibold"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </aside>

        {/* ===================== ÁREA PRINCIPAL ===================== */}
        <main className="lg:col-span-9 flex flex-col gap-8">
          {/* RESUMO DE PROGRESSO */}
          <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="w-5 h-5 text-cyan-600" />
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Seu Progresso</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl p-4 shadow-md">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm opacity-90">Cursos em Andamento</p>
                    <p className="text-2xl font-bold mt-1">{emAndamento.length}</p>
                  </div>
                  <Clock className="w-8 h-8 opacity-80" />
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl p-4 shadow-md">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm opacity-90">Cursos Concluídos</p>
                    <p className="text-2xl font-bold mt-1">{concluidos.length}</p>
                  </div>
                  <CheckCircle className="w-8 h-8 opacity-80" />
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl p-4 shadow-md">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm opacity-90">Progresso Geral</p>
                    <p className="text-2xl font-bold mt-1">{progressoGeral}%</p>
                  </div>
                  <BookOpen className="w-8 h-8 opacity-80" />
                </div>
              </div>
            </div>
          </section>

          {/* EM ANDAMENTO */}
          <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <span className="bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 p-2 rounded-lg">📘</span>
                Em andamento
              </h2>
              <span className="bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 text-sm font-medium px-3 py-1 rounded-full">
                {emAndamento.length} cursos
              </span>
            </div>

            {emAndamento.length === 0 ? (
              <div className="text-center py-8">
                <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500 dark:text-gray-400">Você não tem cursos em andamento.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {emAndamento.map((curso) => (
                  <div
                    key={curso.id}
                    onClick={() => abrirCurso(curso)}
                    className="cursor-pointer bg-gradient-to-br from-white to-cyan-50 dark:from-gray-700 dark:to-gray-800 p-5 rounded-xl border border-cyan-100 dark:border-cyan-900/30 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <span className="text-lg mr-2">{curso.icon}</span>
                        <h3 className="font-semibold text-gray-900 dark:text-white inline">{curso.nome}</h3>
                      </div>
                      <span className="text-xs font-medium bg-cyan-100 dark:bg-cyan-900/40 text-cyan-600 dark:text-cyan-400 px-2 py-1 rounded-full">
                        {curso.level}
                      </span>
                    </div>

                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-4">
                      <span>{curso.horas}</span>
                      <span>{curso.carreira}</span>
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-500 dark:text-gray-400">Progresso</span>
                        <span className="font-medium text-cyan-600 dark:text-cyan-400">{curso.progresso}%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-500"
                          style={{ width: `${curso.progresso}%` }}
                        />
                      </div>
                    </div>

                    <div className="text-sm text-gray-400">Clique para abrir o curso</div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* CONCLUÍDOS */}
          <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <span className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 p-2 rounded-lg">✅</span>
                Concluídos
              </h2>
              <span className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-sm font-medium px-3 py-1 rounded-full">
                {concluidos.length} cursos
              </span>
            </div>

            {concluidos.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400 text-center">Você ainda não concluiu nenhum curso.</p>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {concluidos.map((curso) => (
                  <div key={curso.id} className="bg-white dark:bg-gray-700 p-5 rounded-xl border border-green-100 dark:border-green-900/30 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <span>{curso.icon}</span>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{curso.nome}</h3>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{curso.level} • {curso.carreira}</p>
                    <div className="text-green-600 dark:text-green-400 mt-2 font-medium">Concluído</div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* CURSOS DISPONÍVEIS */}
          <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 p-2 rounded-lg">📚</span>
                Cursos Disponíveis
              </h2>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Pesquisar..."
                  className="px-3 py-2 border rounded-lg text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select
                  className="px-3 py-2 border rounded-lg text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  value={filterLevel}
                  onChange={(e) => setFilterLevel(e.target.value)}
                >
                  <option value="all">Todos os níveis</option>
                  <option value="Iniciante">Iniciante</option>
                  <option value="Intermediário">Intermediário</option>
                  <option value="Avançado">Avançado</option>
                </select>
              </div>
            </div>

            {disponiveis.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400 text-center">Nenhum curso disponível com os filtros aplicados.</p>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {disponiveis.map((curso) => (
                  <div key={curso.id} className="bg-white dark:bg-gray-700 p-5 rounded-xl border border-blue-100 dark:border-blue-900/30 shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span>{curso.icon}</span>
                        <h3 className="font-semibold text-gray-900 dark:text-white">{curso.nome}</h3>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{curso.level} • {curso.carreira}</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">{curso.horas}</p>
                    </div>
                    <button
                      onClick={() => matricularCurso(curso)}
                      disabled={loadingCursos[curso.id]}
                      className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <BookOpen className="w-4 h-4" />
                      {loadingCursos[curso.id] ? "Matriculando..." : "Matricular"}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}
