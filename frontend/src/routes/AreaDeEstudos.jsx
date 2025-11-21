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
  User,
  Home,
  Calendar,
  FolderKanban,
  MessageCircle,
} from "lucide-react";
import axios from "axios";

// Constantes
const API_BASE = "http://localhost:5000";

// Função para construir URL da foto do usuário
function buildFotoURL(url) {
  if (!url) return "https://placehold.co/150x150/0891b2/ffffff?text=U";
  if (url.startsWith("http")) return url;
  return `${API_BASE}${url}`;
}

// Função para extrair horas da string de duração
function extrairHoras(duracao) {
  if (!duracao) return 0;
  const horasString = String(duracao).replace("h", "").trim();
  const horas = parseInt(horasString, 10);
  return isNaN(horas) ? 0 : horas;
}

// Função para calcular horas estudadas baseadas no progresso
function calcularHorasEstudadas(curso) {
  const horasTotais = typeof curso.horas === "number" ? curso.horas : extrairHoras(curso.duracao || curso.horas);
  const progresso = curso.progresso || 0;
  return Math.round((horasTotais * progresso) / 100);
}

export default function AreaEstudos() {
  const navigate = useNavigate();

  // Carrega usuário APENAS do usuarioLogado
  const getLocalUser = () => {
    try {
      const usuarioLogado = localStorage.getItem("usuarioLogado");
      if (!usuarioLogado) {
        navigate("/login");
        return null;
      }
      
      const usuario = JSON.parse(usuarioLogado);
      console.log("👤 Usuário carregado do localStorage:", usuario.nome, usuario.id);
      return usuario;
    } catch (error) {
      console.error("Erro ao carregar usuário:", error);
      navigate("/login");
      return null;
    }
  };

  const [usuario, setUsuario] = useState(() => getLocalUser());
  const [meusCursos, setMeusCursos] = useState(usuario?.cursos || []);
  const [cursosDisponiveis, setCursosDisponiveis] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterLevel, setFilterLevel] = useState("all");
  const [loading, setLoading] = useState(true);
  const [loadingCursosMap, setLoadingCursosMap] = useState({});
  const [erro, setErro] = useState(null);

  // Carrega cursos disponíveis
  const carregarCursosDisponiveis = async () => {
    try {
      const res = await axios.get(`${API_BASE}/cursos`);
      
      let cursosArray = [];
      
      if (Array.isArray(res.data)) {
        cursosArray = res.data;
      } else if (res.data && Array.isArray(res.data.cursos)) {
        cursosArray = res.data.cursos;
      } else {
        cursosArray = Object.values(res.data || {});
      }
      
      cursosArray = cursosArray.filter(item => item && typeof item === 'object');
      
      const formatados = cursosArray.map((curso, index) => ({
        id: curso.id?.toString() || curso._id?.toString() || `curso-${index + 1}`,
        nome: curso.nome || curso.titulo || `Curso ${index + 1}`,
        level: curso.nivel || curso.level || "Iniciante",
        horas: curso.horas || extrairHoras(curso.duracao) || 40,
        duracao: curso.duracao || `${curso.horas || 40}h`,
        descricao: curso.descricao || "Descrição do curso",
        icon: curso.icone || curso.icon || "📚",
        carreira: curso.area || curso.carreira || "Tecnologia",
        profissoesPossiveis: curso.profissoes || curso.profissoesPossiveis || ["Profissional"],
      }));
      
      setCursosDisponiveis(formatados);
      
    } catch (err) {
      console.error("Erro ao carregar cursos:", err);
      setCursosDisponiveis([
        {
          id: "1",
          nome: "Fundamentos de IA",
          level: "Iniciante",
          horas: 40,
          duracao: "40h",
          descricao: "Curso de exemplo - Backend offline",
          icon: "🤖",
          carreira: "Tecnologia",
          profissoesPossiveis: ["Cientista de Dados"]
        }
      ]);
      setErro("Usando cursos de exemplo. Backend pode estar offline.");
    }
  };

  // Carrega cursos do usuário
  const carregarCursosUsuario = async () => {
    if (!usuario?.id) {
      console.log("⚠️ Usuário sem ID, usando cursos locais");
      return;
    }

    try {
      console.log("🔄 Buscando dados atualizados do usuário:", usuario.id);
      
      const resProfissionais = await axios.get(`${API_BASE}/profissionais`);
      const perfilAtualizado = resProfissionais.data.find(p => p.id === usuario.id);
      
      if (perfilAtualizado) {
        console.log("✅ Usuário encontrado no servidor:", perfilAtualizado.nome);
        
        const cursosFormatados = (perfilAtualizado.cursos || []).map((curso) => ({
          id: curso.id?.toString() || curso._id?.toString(),
          nome: curso.nome || curso.titulo || "Curso sem nome",
          level: curso.nivel || curso.level || "Iniciante",
          horas: typeof curso.horas === "number" ? curso.horas : extrairHoras(curso.duracao || curso.horas),
          duracao: curso.duracao || `${curso.horas || 0}h`,
          progresso: curso.progresso || 0,
          icon: curso.icone || "📚",
          carreira: curso.area || curso.carreira || "Tecnologia",
          profissoesPossiveis: curso.profissoes || curso.profissoesPossiveis || [],
          ultimoAcesso: curso.ultimoAcesso || Date.now()
        }));

        const usuarioAtualizado = { 
          ...perfilAtualizado,
          cursos: cursosFormatados
        };

        setUsuario(usuarioAtualizado);
        setMeusCursos(cursosFormatados);
        localStorage.setItem("usuarioLogado", JSON.stringify(usuarioAtualizado));
        console.log("💾 Usuário atualizado no localStorage");
        
      } else {
        console.log("⚠️ Usuário não encontrado no servidor, mantendo dados locais");
      }

    } catch (err) {
      console.error("Erro ao carregar perfil do usuário:", err);
    }
  };

  // Carrega dados
  useEffect(() => {
    let mounted = true;
    
    if (!usuario) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setErro(null);

    const carregarDados = async () => {
      try {
        await Promise.all([
          carregarCursosDisponiveis(), 
          carregarCursosUsuario()
        ]);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
        setErro("Erro ao carregar dados. Tente recarregar a página.");
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    carregarDados();

    return () => {
      mounted = false;
    };
  }, [usuario?.id]);

  // Matricular usuário em curso
  const matricularCurso = async (curso) => {
    if (!usuario?.id) {
      alert("Você precisa estar logado para se matricular.");
      navigate("/login");
      return;
    }

    if (meusCursos.find((c) => c.id === curso.id)) {
      return;
    }

    setLoadingCursosMap((prev) => ({ ...prev, [curso.id]: true }));

    try {
      const cursoParaMatricular = {
        id: curso.id,
        nome: curso.nome,
        level: curso.level,
        horas: curso.horas,
        duracao: curso.duracao,
        progresso: 0,
        icon: curso.icon,
        carreira: curso.carreira,
        profissoesPossiveis: curso.profissoesPossiveis,
        ultimoAcesso: Date.now()
      };

      await axios.put(`${API_BASE}/perfil/${usuario.id}`, {
        cursos: [...meusCursos, cursoParaMatricular]
      });

      const atualizado = [...meusCursos, cursoParaMatricular];
      setMeusCursos(atualizado);

      const userToStore = { ...usuario, cursos: atualizado };
      setUsuario(userToStore);
      localStorage.setItem("usuarioLogado", JSON.stringify(userToStore));

      console.log("✅ Curso matriculado:", curso.nome);

    } catch (err) {
      console.error("Erro ao matricular:", err);
      alert("Erro ao realizar matrícula. Tente novamente.");
    } finally {
      setLoadingCursosMap((prev) => ({ ...prev, [curso.id]: false }));
    }
  };

  // Atualizar progresso do curso
  const avancarCurso = async (cursoId) => {
    if (!usuario?.id) {
      alert("Usuário não logado.");
      navigate("/login");
      return;
    }

    setLoadingCursosMap((prev) => ({ ...prev, [cursoId]: true }));

    try {
      const atualizadoLocal = meusCursos.map((curso) =>
        curso.id === cursoId 
          ? { 
              ...curso, 
              progresso: Math.min((curso.progresso || 0) + 10, 100),
              ultimoAcesso: Date.now()
            } 
          : curso
      );

      await axios.put(`${API_BASE}/perfil/${usuario.id}`, {
        cursos: atualizadoLocal
      });

      setMeusCursos(atualizadoLocal);
      const userToStore = { ...usuario, cursos: atualizadoLocal };
      localStorage.setItem("usuarioLogado", JSON.stringify(userToStore));

    } catch (err) {
      console.error("Erro ao atualizar progresso:", err);
      alert("Erro ao atualizar progresso.");
    } finally {
      setLoadingCursosMap((prev) => ({ ...prev, [cursoId]: false }));
    }
  };

  // Abrir página do curso
  const abrirCurso = (curso) => {
    navigate(`/curso/${curso.id}`, { state: { curso, usuario } });
  };

  // 🔧 **VARIÁVEIS DEFINIDAS ANTES DO RETURN:**
  
  // Filtrar cursos disponíveis
  const disponiveis = cursosDisponiveis
    .filter((c) => !meusCursos.find((m) => m.id === c.id))
    .filter((curso) => {
      const text = (searchTerm || "").toLowerCase();
      const matchesText =
        curso.nome?.toLowerCase().includes(text) ||
        curso.carreira?.toLowerCase().includes(text) ||
        (curso.profissoesPossiveis || []).join(" ").toLowerCase().includes(text) ||
        curso.descricao?.toLowerCase().includes(text);
      const matchesLevel = filterLevel === "all" || curso.level === filterLevel;
      return matchesText && matchesLevel;
    });

  // Estatísticas
  const emAndamento = meusCursos.filter((c) => (c.progresso || 0) < 100);
  const concluidos = meusCursos.filter((c) => (c.progresso || 0) >= 100);

  const totalCursos = meusCursos.length;
  const horasTotaisCursos = meusCursos.reduce((acc, curso) => acc + (curso.horas || 0), 0);
  const horasEstudadas = meusCursos.reduce((acc, curso) => {
    return acc + calcularHorasEstudadas(curso);
  }, 0);

  const progressoGeral = totalCursos > 0
    ? Math.round(meusCursos.reduce((acc, curso) => acc + (curso.progresso || 0), 0) / totalCursos)
    : 0;

  // Loading states
  if (!usuario) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600 mx-auto"></div>
          <p className="text-gray-600 dark:text-gray-300 mt-4">Redirecionando para login...</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600 mx-auto"></div>
          <p className="text-gray-600 dark:text-gray-300 mt-4">Carregando área de estudos...</p>
        </div>
      </div>
    );
  }

  // Card componente
  const Card = ({ children, className = "" }) => (
    <div className={`bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-lg hover:shadow-2xl transition-all ${className}`}>
      {children}
    </div>
  );

  // 🔧 **RETURN PRINCIPAL:**
  return (
    <div className="min-h-screen from-gray-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* ASIDE */}
        <aside className="lg:col-span-3 lg:sticky lg:top-[80px] self-start z-10 px-2 lg:px-0">
          <div className=" dark:bg-slate-800  rounded-2xl p-5 border border-gray-200 dark:border-gray-700 space-y-5 text-center">
            <div className="flex flex-col items-center py-3">
              <img
                src={buildFotoURL(usuario?.foto)}
                alt={`Foto de ${usuario?.nome || "Usuário"}`}
                className="w-20 h-20 rounded-full border-3 border-white shadow-lg object-cover"
                onError={(e) => {
                  e.currentTarget.src = "https://placehold.co/150x150/0891b2/ffffff?text=U";
                }}
              />

              <div className="mt-3">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-1">
                  {usuario?.nome}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-sm mt-1 line-clamp-2">
                  {usuario?.cargo}
                </p>
              </div>
            </div>

            <div className="w-full flex justify-center">
              <div className="w-4/5 border-b border-gray-200 dark:border-gray-600"></div>
            </div>

            <nav className="space-y-2.5 mt-3">
              {[
                { icon: <Home className="w-4 h-4" />, label: "Feed", path: "/feed" },
                { icon: <BookOpen className="w-4 h-4" />, label: "Meus Cursos", path: "/area-de-estudos" },
                { icon: <FolderKanban className="w-4 h-4" />, label: "Future Lab", path: "/projetos" },
                { icon: <Users className="w-4 h-4" />, label: "Connect Hub", path: "/profissionais" },
                { icon: <MessageCircle className="w-4 h-4" />, label: "SkillTalks", path: "/skilltalks" },
                { icon: <User className="w-4 h-4" />, label: "Meu Perfil", path: "/perfil" },
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
                  <span className="text-sm">{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        </aside>

        {/* ÁREA PRINCIPAL */}
        <main className="lg:col-span-9 flex flex-col gap-8">
          
          {/* RESUMO DE PROGRESSO */}
          <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-cyan-50 dark:bg-cyan-900/20 p-2 rounded-lg">
                <BarChart3 className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Seu Progresso</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-cyan-50 dark:bg-cyan-900/20 rounded-xl p-4 border border-cyan-100 dark:border-cyan-800">
                <div className="flex items-center gap-3">
                  <div className="bg-white dark:bg-cyan-800 p-2 rounded-lg">
                    <Clock className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-sm text-cyan-600 dark:text-cyan-400 font-medium">Horas Estudadas</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{horasEstudadas}h</p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 border border-green-100 dark:border-green-800">
                <div className="flex items-center gap-3">
                  <div className="bg-white dark:bg-green-800 p-2 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm text-green-600 dark:text-green-400 font-medium">Cursos Concluídos</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{concluidos.length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 border border-purple-100 dark:border-purple-800">
                <div className="flex items-center gap-3">
                  <div className="bg-white dark:bg-purple-800 p-2 rounded-lg">
                    <BookOpen className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm text-purple-600 dark:text-purple-400 font-medium">Progresso Geral</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{progressoGeral}%</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

{/* EM ANDAMENTO */}
<section className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
  <div className="flex items-center gap-3 mb-6">
    <div className="bg-cyan-50 dark:bg-cyan-900/20 p-2 rounded-lg">
      <BookOpen className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
    </div>
    <div className="flex items-center justify-between flex-1">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Em Andamento</h2>
      <span className="bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400 text-sm font-medium px-3 py-1 rounded-full border border-cyan-200 dark:border-cyan-800">
        {emAndamento.length} cursos
      </span>
    </div>
  </div>

  {emAndamento.length === 0 ? (
    <div className="text-center py-8">
      <div className="bg-gray-50 dark:bg-gray-700 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
        <BookOpen className="w-6 h-6 text-gray-400" />
      </div>
      <p className="text-gray-500 dark:text-gray-400">Você não tem cursos em andamento.</p>
      <Link 
        to="/area-de-estudos" 
        className="inline-block mt-3 text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300 font-medium"
      >
        Explorar cursos disponíveis
      </Link>
    </div>
  ) : (
    <div className="grid md:grid-cols-2 gap-4">
      {emAndamento.map((curso) => (
        <div
          key={curso.id}
          onClick={() => abrirCurso(curso)}
          className="group cursor-pointer bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/10 dark:to-blue-900/10 rounded-xl p-4 border border-cyan-100 dark:border-cyan-800 hover:border-cyan-300 dark:hover:border-cyan-600 transition-all duration-300 hover:shadow-md"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-white dark:bg-cyan-800 p-2 rounded-lg group-hover:scale-105 transition-transform">
                <span className="text-lg">{curso.icon}</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">{curso.nome}</h3>
                <p className="text-xs text-cyan-600 dark:text-cyan-400 font-medium mt-1">
                  {curso.carreira}
                </p>
              </div>
            </div>
            <span className="text-xs font-medium bg-cyan-100 dark:bg-cyan-800 text-cyan-700 dark:text-cyan-300 px-2 py-1 rounded-full">
              {curso.level}
            </span>
          </div>

          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-4">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {curso.duracao || curso.horas + 'h'}
            </span>
            <span className="font-medium text-cyan-600 dark:text-cyan-400">
              {curso.progresso || 0}% completo
            </span>
          </div>

          <div className="mb-4">
            <div className="w-full h-2 bg-cyan-100 dark:bg-cyan-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-500"
                style={{ width: `${curso.progresso || 0}%` }}
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-cyan-600 dark:text-cyan-400 font-medium flex items-center gap-1">
              <PlayCircle className="w-4 h-4" />
              Continuar estudando
            </span>
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  )}
</section>

          {/* CONCLUÍDOS */}
<section className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
  <div className="flex items-center gap-3 mb-6">
    <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded-lg">
      <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
    </div>
    <div className="flex items-center justify-between flex-1">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Cursos Concluídos</h2>
      <span className="bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-sm font-medium px-3 py-1 rounded-full border border-green-200 dark:border-green-800">
        {concluidos.length} cursos
      </span>
    </div>
  </div>

  {concluidos.length === 0 ? (
    <div className="text-center py-8">
      <div className="bg-gray-50 dark:bg-gray-700 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
        <CheckCircle className="w-6 h-6 text-gray-400" />
      </div>
      <p className="text-gray-500 dark:text-gray-400">Você ainda não concluiu nenhum curso.</p>
      <Link 
        to="/area-de-estudos" 
        className="inline-block mt-3 text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 font-medium"
      >
        Explorar cursos disponíveis
      </Link>
    </div>
  ) : (
    <div className="grid md:grid-cols-2 gap-4">
      {concluidos.map((curso) => (
        <div
          key={curso.id}
          className="group cursor-pointer bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10 rounded-xl p-4 border border-green-100 dark:border-green-800 hover:border-green-300 dark:hover:border-green-600 transition-all duration-300 hover:shadow-md"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-white dark:bg-green-800 p-2 rounded-lg group-hover:scale-105 transition-transform">
                <span className="text-lg">{curso.icon}</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">{curso.nome}</h3>
                <p className="text-xs text-green-600 dark:text-green-400 font-medium mt-1">
                  {curso.carreira}
                </p>
              </div>
            </div>
            <span className="text-xs font-medium bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-300 px-2 py-1 rounded-full">
              {curso.level}
            </span>
          </div>

          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-4">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {curso.duracao || curso.horas + 'h'}
            </span>
            <span className="font-medium text-green-600 dark:text-green-400 flex items-center gap-1">
              <CheckCircle className="w-4 h-4" />
              100% completo
            </span>
          </div>

          <div className="mb-4">
            <div className="w-full h-2 bg-green-100 dark:bg-green-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
                style={{ width: '100%' }}
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-green-600 dark:text-green-400 font-medium flex items-center gap-1">
              <CheckCircle className="w-4 h-4" />
              Curso concluído
            </span>
            <div className="w-2 h-2 bg-green-400 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  )}
</section>

{/* CURSOS DISPONÍVEIS */}
<section className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
  <div className="flex items-center gap-3 mb-6">
    <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded-lg">
      <Rocket className="w-5 h-5 text-blue-600 dark:text-blue-400" />
    </div>
    <div className="flex items-center justify-between flex-1">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Cursos Disponíveis</h2>
      
      <div className="flex items-center gap-3">
        <input
          type="text"
          placeholder="Pesquisar cursos..."
          className="px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg text-sm dark:bg-gray-700 dark:text-white w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg text-sm dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
  </div>

  {erro && (
    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 text-yellow-700 dark:text-yellow-400 px-4 py-3 rounded-xl mb-4 flex items-center gap-2">
      <span>⚠️</span>
      <span>{erro}</span>
    </div>
  )}

  {disponiveis.length === 0 ? (
    <div className="text-center py-8">
      <div className="bg-gray-50 dark:bg-gray-700 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
        <BookOpen className="w-6 h-6 text-gray-400" />
      </div>
      <p className="text-gray-500 dark:text-gray-400">
        {searchTerm || filterLevel !== "all" 
          ? "Nenhum curso encontrado com os filtros aplicados." 
          : "Nenhum curso disponível no momento."}
      </p>
      {(searchTerm || filterLevel !== "all") && (
        <button
          onClick={() => {
            setSearchTerm("");
            setFilterLevel("all");
          }}
          className="inline-block mt-3 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
        >
          Limpar filtros
        </button>
      )}
    </div>
  ) : (
    <div className="grid md:grid-cols-2 gap-4">
      {disponiveis.map((curso) => (
        <div 
          key={curso.id} 
          className="group bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 rounded-xl p-4 border border-blue-100 dark:border-blue-800 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 hover:shadow-md"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-white dark:bg-blue-800 p-2 rounded-lg group-hover:scale-105 transition-transform">
                <span className="text-lg">{curso.icon}</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">{curso.nome}</h3>
                <p className="text-xs text-blue-600 dark:text-blue-400 font-medium mt-1">
                  {curso.carreira}
                </p>
              </div>
            </div>
            <span className="text-xs font-medium bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full">
              {curso.level}
            </span>
          </div>

          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-4">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {curso.duracao || curso.horas + 'h'}
            </span>
            <span className="font-medium text-blue-600 dark:text-blue-400">
              Disponível
            </span>
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
            {curso.descricao}
          </p>

          {curso.profissoesPossiveis && curso.profissoesPossiveis.length > 0 && (
            <div className="mb-4">
              <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-1">
                <Briefcase className="w-3 h-3" />
                Profissões relacionadas:
              </p>
              <div className="flex flex-wrap gap-1">
                {curso.profissoesPossiveis.slice(0, 3).map((profissao, index) => (
                  <span 
                    key={index}
                    className="bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-full text-xs"
                  >
                    {profissao}
                  </span>
                ))}
                {curso.profissoesPossiveis.length > 3 && (
                  <span className="text-gray-500 text-xs">+{curso.profissoesPossiveis.length - 3}</span>
                )}
              </div>
            </div>
          )}

          <button
            onClick={() => matricularCurso(curso)}
            disabled={!!loadingCursosMap[curso.id]}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group-hover:shadow-lg"
          >
            {loadingCursosMap[curso.id] ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Matriculando...
              </>
            ) : (
              <>
                <BookOpen className="w-4 h-4" />
                Iniciar o curso
              </>
            )}
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