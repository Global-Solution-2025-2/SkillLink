import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Adicione useNavigate aqui
import {
  User,
  Home,
  BookOpen,
  Users,
  Briefcase,
  Calendar,
  FolderKanban,
  CalendarDays,
  Rocket,
  ArrowRight,
  Clock,
  MapPin,
  Star,
  CheckCircle,
  BarChart3,
  PlayCircle,
  MessageCircle,
  Heart,
  GraduationCap,
  X,
  Mail,
} from "lucide-react";
import axios from "axios";

function Feed() {
  const navigate = useNavigate(); // Adicione esta linha

  // Lê usuario do localStorage de forma segura e atualizável
  const [usuario, setUsuario] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("usuarioLogado")) || 
             JSON.parse(localStorage.getItem("usuario")) || {
        nome: "Usuário Futurista",
        cargo: "Estudante de Eng. Software",
        foto: null,
        id: "",
        cursos: [],
        area_atuacao: "Tecnologia"
      };
    } catch {
      return {
        nome: "Usuário Futurista",
        cargo: "Estudante de Eng. Software",
        foto: null,
        id: "",
        cursos: [],
        area_atuacao: "Tecnologia"
      };
    }
  });

  const [meusCursos, setMeusCursos] = useState([]);
  const [profissionais, setProfissionais] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingProfissionais, setLoadingProfissionais] = useState(true);
  const [erro, setErro] = useState(null);

  // Estados para os modais
  const [modalProfissional, setModalProfissional] = useState(false);
  const [profissionalSelecionado, setProfissionalSelecionado] = useState(null);
  const [modalProjetoAberto, setModalProjetoAberto] = useState(false); // Adicione esta linha
  const [projetoSelecionado, setProjetoSelecionado] = useState(null); // Adicione esta linha

  // Função para extrair horas da string de duração
  const extrairHoras = (duracao) => {
    if (!duracao) return 0;
    const horasString = String(duracao).replace('h', '').trim();
    const horas = parseInt(horasString, 10);
    return isNaN(horas) ? 0 : horas;
  };

  // Carregar cursos do usuário
  const carregarCursosUsuario = async () => {
    setLoading(true);
    setErro(null);
    
    // Primeiro tenta usar os cursos já carregados no localStorage
    const usuarioLocal = JSON.parse(localStorage.getItem("usuarioLogado")) || 
                        JSON.parse(localStorage.getItem("usuario")) || {};
    
    if (usuarioLocal.cursos && usuarioLocal.cursos.length > 0) {
      setMeusCursos(usuarioLocal.cursos);
      setUsuario(usuarioLocal);
      setLoading(false);
      return;
    }

    // Se não tem ID, usa dados locais
    if (!usuarioLocal.id) {
      setMeusCursos(usuarioLocal.cursos || []);
      setLoading(false);
      return;
    }

    // Tenta carregar do backend
    try {
      const res = await axios.get(`http://localhost:5000/profissionais`);
      const perfil = res.data.find(p => p.id === usuarioLocal.id);
      
      if (perfil && perfil.cursos) {
        const cursosFormatados = perfil.cursos.map(curso => ({
          ...curso,
          id: curso.id?.toString() || curso._id?.toString(),
          horas: typeof curso.horas === 'number' ? curso.horas : extrairHoras(curso.horas || curso.duracao),
          progresso: curso.progresso || 0,
          level: curso.level || curso.nivel || "Iniciante",
          carreira: curso.carreira || curso.area || "Tecnologia",
          icon: curso.icon || curso.icone || "📚"
        }));
        
        setMeusCursos(cursosFormatados);
        
        // Atualiza usuário com dados mais recentes
        const usuarioAtualizado = {
          ...usuarioLocal,
          ...perfil,
          cursos: cursosFormatados
        };
        
        setUsuario(usuarioAtualizado);
        localStorage.setItem("usuarioLogado", JSON.stringify(usuarioAtualizado));
      } else {
        setMeusCursos(usuarioLocal.cursos || []);
      }
    } catch (err) {
      console.error("Erro ao carregar cursos do usuário:", err);
      setErro("Erro ao carregar cursos. Usando dados locais.");
      setMeusCursos(usuarioLocal.cursos || []);
    } finally {
      setLoading(false);
    }
  };

  // Carregar profissionais da mesma área
  const carregarProfissionaisMesmaArea = async () => {
    setLoadingProfissionais(true);
    try {
      const res = await axios.get("http://localhost:5000/profissionais");
      
      // Obtém a área do usuário atual
      const areaUsuario = usuario.area_atuacao || 
                         usuario.cargo?.split(' ').pop() || 
                         "Tecnologia";
      
      console.log("Área do usuário:", areaUsuario);

      // Filtra profissionais da mesma área (excluindo o usuário atual)
      const profissionaisMesmaArea = res.data.filter(prof => {
        // Verifica se não é o usuário atual
        if (prof.id === usuario.id) return false;
        
        // Obtém a área do profissional
        const areaProfissional = prof.area_atuacao || 
                               prof.cargo?.split(' ').pop() || 
                               "";
        
        console.log(`Profissional: ${prof.nome}, Área: ${areaProfissional}`);
        
        // Compara as áreas (case insensitive e busca parcial)
        const areaUserLower = areaUsuario.toLowerCase();
        const areaProfLower = areaProfissional.toLowerCase();
        
        return areaProfLower.includes(areaUserLower) || 
               areaUserLower.includes(areaProfLower) ||
               // Fallback para termos relacionados
               (areaUserLower.includes("tech") && areaProfLower.includes("tech")) ||
               (areaUserLower.includes("eng") && areaProfLower.includes("eng")) ||
               (areaUserLower.includes("dev") && areaProfLower.includes("dev"));
      });

      console.log("Profissionais filtrados:", profissionaisMesmaArea);

      // Ordena por experiência e limita a 4 profissionais
      const profissionaisDestaque = profissionaisMesmaArea
        .sort((a, b) => {
          const expA = a.experiencia_anos || 0;
          const expB = b.experiencia_anos || 0;
          return expB - expA;
        })
        .slice(0, 4);

      setProfissionais(profissionaisDestaque);
 
      // Se não encontrou profissionais da mesma área, usa dados mockados
      if (profissionaisDestaque.length === 0) {
        console.log("Nenhum profissional da mesma área encontrado, usando dados mockados");
        setProfissionais([
          {
            id: 2,
            nome: "Ana Silva",
            cargo: "Senior Frontend Developer",
            empresa: "TechCorp",
            localizacao: "São Paulo, SP",
            experiencia_anos: 8,
            skills: ["React", "TypeScript", "Node.js"],
            foto: null,
            disponivel_mentoria: true,
            area_atuacao: "Tecnologia",
            email: "ana.silva@techcorp.com"
          },
          {
            id: 3,
            nome: "Carlos Santos",
            cargo: "Full Stack Developer",
            empresa: "InovaTech",
            localizacao: "Remoto",
            experiencia_anos: 6,
            skills: ["JavaScript", "Python", "AWS"],
            foto: null,
            disponivel_mentoria: false,
            area_atuacao: "Tecnologia",
            email: "carlos.santos@inovatech.com"
          },
          {
            id: 4,
            nome: "Marina Oliveira",
            cargo: "Tech Lead",
            empresa: "DataLabs",
            localizacao: "Rio de Janeiro, RJ",
            experiencia_anos: 5,
            skills: ["Java", "Spring Boot", "Microservices"],
            foto: null,
            disponivel_mentoria: true,
            area_atuacao: "Tecnologia",
            email: "marina.oliveira@datalabs.com"
          }
        ]);
      }
    } catch (err) {
      console.error("Erro ao carregar profissionais:", err);
      // Dados mockados em caso de erro
      setProfissionais([
        {
          id: 2,
          nome: "Ana Silva",
          cargo: "Senior Frontend Developer",
          empresa: "TechCorp",
          localizacao: "São Paulo, SP",
          experiencia_anos: 8,
          skills: ["React", "TypeScript", "Node.js"],
          foto: null,
          disponivel_mentoria: true,
          area_atuacao: "Tecnologia",
          email: "ana.silva@techcorp.com"
        },
        {
          id: 3,
          nome: "Carlos Santos",
          cargo: "Full Stack Developer",
          empresa: "InovaTech",
          localizacao: "Remoto",
          experiencia_anos: 6,
          skills: ["JavaScript", "Python", "AWS"],
          foto: null,
          disponivel_mentoria: false,
          area_atuacao: "Tecnologia",
          email: "carlos.santos@inovatech.com"
        }
      ]);
    } finally {
      setLoadingProfissionais(false);
    }
  };

  // Atualiza quando localStorage for alterado ou componente montar
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "usuarioLogado" || e.key === "usuario") {
        try {
          const novo = JSON.parse(e.newValue);
          if (novo) {
            setUsuario(novo);
            setMeusCursos(novo.cursos || []);
          }
        } catch {
          // ignore
        }
      }
    };
    
    window.addEventListener("storage", handler);
    carregarCursosUsuario();
    
    return () => window.removeEventListener("storage", handler);
  }, []);

  // Carrega profissionais quando o usuário é definido
  useEffect(() => {
    if (usuario.id) {
      carregarProfissionaisMesmaArea();
    }
  }, [usuario]);

  // Função para montar URL final da foto
  const buildFotoURL = (f) => {
    const placeholder = "https://placehold.co/150x150/0891b2/ffffff?text=U";
    if (!f) return placeholder;
    if (typeof f !== "string") return placeholder;
    if (f.startsWith("http")) return f;
    if (f.startsWith("/")) return `http://localhost:5000${f}`;
    return `http://localhost:5000/${f}`;
  };

  // Separar cursos em andamento e concluídos
  const emAndamento = meusCursos.filter((c) => (c.progresso || 0) < 100);
  const concluidos = meusCursos.filter((c) => (c.progresso || 0) >= 100);

  // Calcular horas estudadas baseadas no progresso
  const calcularHorasEstudadas = (curso) => {
    const horasTotais = typeof curso.horas === 'number' ? curso.horas : extrairHoras(curso.duracao || curso.horas);
    const progresso = curso.progresso || 0;
    return Math.round((horasTotais * progresso) / 100);
  };

  // Estatísticas
  const horasEstudadas = meusCursos.reduce((acc, curso) => acc + calcularHorasEstudadas(curso), 0);
  const progressoGeral = meusCursos.length > 0
    ? Math.round(meusCursos.reduce((acc, curso) => acc + (curso.progresso || 0), 0) / meusCursos.length)
    : 0;

  // Funções para o modal de profissional
  function abrirModalProfissional(prof) {
    setProfissionalSelecionado(prof);
    setModalProfissional(true);
  }

  function fecharModalProfissional() {
    setModalProfissional(false);
    setProfissionalSelecionado(null);
  }

  // Funções para o modal de projetos
  const abrirModalProjeto = (projeto) => {
    setProjetoSelecionado(projeto);
    setModalProjetoAberto(true);
  };

  const fecharModalProjeto = () => {
    setModalProjetoAberto(false);
    setProjetoSelecionado(null);
  };

  // Dados dos projetos atualizados
  const projetos = [
  {
    id: 1,
    nome: "EcoTrack - Monitoramento Ambiental",
    autor: "Ana Silva",
    descricao: "Sistema para monitorar qualidade do ar e água usando IoT.",
    membros: 8,
    categoria: "IoT",
    status: "Recrutando",
    tecnologias: ["Python", "IoT", "Data Science", "Arduino"]
  },
  {
    id: 2,
    nome: "LearnTogether - Plataforma Educacional",
    autor: "Carlos Santos",
    descricao: "Plataforma colaborativa de ensino de IA com gamificação.",
    membros: 12,
    categoria: "Desenvolvimento Web",
    status: "Ativo",
    tecnologias: ["React", "Node.js", "MongoDB", "JavaScript"]
  }
];

  // Card componente
  const Card = ({ children, className = "" }) => (
    <div className={`bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-lg hover:shadow-2xl transition-all ${className}`}>
      {children}
    </div>
  );


  return (
    <div className="min-h-screen  font-sans ">
      <div className="relative max-w-7xl mx-auto  px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 py-8">

        {/* SIDEBAR */}
        <aside className="lg:col-span-3 lg:sticky lg:top-[80px] self-start z-10 px-2 lg:px-0">
          <Card className="space-y-5 dark:bg-slate-800 text-center p-5">
            
            {/* Usuário */}
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

            {/* Navegação */}
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
                    item.path === "/feed"
                      ? "bg-cyan-50 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 font-semibold"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  {item.icon}
                  <span className="text-sm">{item.label}</span>
                </Link>
              ))}
            </nav>
          </Card>
        </aside>

        {/* FEED CENTRAL */}
        <main className="lg:col-span-9 space-y-8">

          {/* CURSOS EM ANDAMENTO */}
          <section>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <BookOpen className="w-7 h-7 text-cyan-600" />
                Cursos em Andamento
              </h2>
              <Link to="/area-de-estudos" className="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-2">
                Ver todos os cursos <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-600 mx-auto mb-3"></div>
                <p className="text-gray-500 dark:text-gray-400">Carregando seus cursos...</p>
              </div>
            ) : emAndamento.length === 0 ? (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-8 border border-gray-100 dark:border-gray-700 text-center">
                <div className="bg-gray-50 dark:bg-gray-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-500 dark:text-gray-400 mb-4">Você não tem cursos em andamento.</p>
                <Link 
                  to="/area-de-estudos" 
                  className="inline-flex items-center gap-2 text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300 font-medium"
                >
                  Explorar cursos disponíveis
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {emAndamento.slice(0, 4).map((curso) => (
                  <div 
                    key={curso.id} 
                    className="group cursor-pointer bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 border border-gray-100 dark:border-gray-700 hover:border-cyan-300 dark:hover:border-cyan-700 transition-all duration-300 hover:shadow-md"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-cyan-50 dark:bg-cyan-900/20 p-2 rounded-lg group-hover:scale-105 transition-transform">
                          <span className="text-lg">{curso.icon || '📚'}</span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                            {curso.nome || 'Curso sem nome'}
                          </h3>
                          <p className="text-xs text-cyan-600 dark:text-cyan-400 font-medium mt-1">
                            {curso.carreira || 'Tecnologia'}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs font-medium bg-cyan-100 dark:bg-cyan-900/40 text-cyan-600 dark:text-cyan-400 px-2 py-1 rounded-full">
                        {curso.level || 'Iniciante'}
                      </span>
                    </div>

                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-4">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {curso.duracao || (curso.horas ? curso.horas + 'h' : '0h')}
                      </span>
                      <span className="font-medium text-cyan-600 dark:text-cyan-400">
                        {curso.progresso || 0}% completo
                      </span>
                    </div>

                    <div className="mb-6">
                      <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-500"
                          style={{ width: `${curso.progresso || 0}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-600">
                      <Link 
                        to={`/curso/${curso.id}`} 
                        state={{ curso, usuario }}
                        className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg transition-all duration-300 font-medium flex items-center gap-2 hover:shadow-lg"
                      >
                        Continuar
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* PROFISSIONAIS DA SUA ÁREA */}
          <section className="mb-12">
  <div className="flex justify-between items-center mb-8">
    <div>
      
      <h2 className="text-2xl font-bold flex items-center gap-3">
                <Users className="w-7 h-7 text-cyan-600" />
                Profissionais da sua Area
              </h2>
    </div>
    <Link to="/profissionais" className="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-2">
                Ver todos os perfis <ArrowRight className="w-4 h-4" />
              </Link>
  </div>

  {loadingProfissionais ? (
    <div className="flex justify-center items-center py-16">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-gray-500 dark:text-gray-400 text-lg">Carregando profissionais...</p>
      </div>
    </div>
  ) : profissionais.length === 0 ? (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-12 text-center border border-gray-200 dark:border-gray-700">
      <div className="bg-white dark:bg-gray-700 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
        <Users className="w-10 h-10 text-gray-400" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
        Nenhum profissional encontrado
      </h3>
      <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
        Não encontramos profissionais na área de {usuario?.area_atuacao || "Tecnologia"} no momento.
      </p>
      <Link 
        to="/profissionais" 
        className="inline-flex items-center gap-3 px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
      >
        <Users className="w-5 h-5" />
        Explorar todos os profissionais
      </Link>
    </div>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {profissionais.map((prof) => (
        <div
          key={prof.id}
          className="group bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm hover:shadow-2xl border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-500 flex flex-col h-full "
        >
          {/* HEADER COM FOTO E INFOS */}
          <div className="flex items-start gap-4 mb-4">
            <div className="relative">
              <img
                src={buildFotoURL(prof.foto)}
                alt={prof.nome}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-white dark:border-gray-800 shadow-lg group-hover:scale-110 transition-transform duration-300"
              />
          
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-gray-900 dark:text-white text-lg leading-tight group-hover:text-blue-500 transition-colors line-clamp-2">
                {prof.nome}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-1 line-clamp-2">
                {prof.cargo}
              </p>
            </div>
          </div>

          {/* LOCALIZAÇÃO */}
          {prof.localizacao && (
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm mb-4">
              <MapPin className="w-4 h-4" />
              <span className="truncate">{prof.localizacao}</span>
            </div>
          )}

          {/* SKILLS */}
          <div className="flex flex-wrap gap-2 mb-6 flex-1">
            {prof.habilidadesTecnicas?.slice(0, 3).map((skill, i) => (
              <span
                key={i}
                className="px-3 py-2 text-xs font-medium bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 text-blue-700 dark:text-blue-300 rounded-lg border border-blue-200 dark:border-blue-800 shadow-sm"
              >
                {skill}
              </span>
            ))}
            {prof.habilidadesTecnicas?.length > 3 && (
              <span className="px-3 py-2 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-lg border border-gray-200 dark:border-gray-600">
                +{prof.habilidadesTecnicas.length - 3}
              </span>
            )}
          </div>

          {/* BOTÃO VER PERFIL */}
          <button
            onClick={() => abrirModalProfissional(prof)}
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2 group/btn"
          >
            <span>Ver Perfil</span>
            <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      ))}
    </div>
  )}

  {/* MODAL DE PROFISSIONAL */}
  {modalProfissional && profissionalSelecionado && (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 max-w-4xl w-full overflow-hidden max-h-[90vh] overflow-y-auto">
        
        {/* HEADER DO MODAL */}
        <div className="flex items-center justify-between p-8 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900/20">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              {profissionalSelecionado.nome}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              {profissionalSelecionado.cargo}
            </p>
          </div>
          <button
            onClick={fecharModalProfissional}
            className="p-3 hover:bg-white dark:hover:bg-gray-800 rounded-2xl transition-colors shadow-sm"
          >
            <X className="w-6 h-6 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* CONTEÚDO DO MODAL */}
        <div className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* COLUNA 1 - PERFIL */}
            <div className="lg:col-span-1">
              <div className="text-center lg:text-left">
                <img
                  src={buildFotoURL(profissionalSelecionado.foto)}
                  alt={profissionalSelecionado.nome}
                  className="w-32 h-32 rounded-3xl object-cover border-4 border-white dark:border-gray-800 shadow-2xl mx-auto lg:mx-0 mb-6"
                />
                
                <div className="space-y-4">
                  {profissionalSelecionado.localizacao && (
                    <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                      <MapPin className="w-5 h-5 text-blue-500" />
                      <span>{profissionalSelecionado.localizacao}</span>
                    </div>
                  )}
                  
                  {profissionalSelecionado.experiencia_anos && (
                    <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                      <Award className="w-5 h-5 text-blue-500" />
                      <span>{profissionalSelecionado.experiencia_anos} anos de experiência</span>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => {
                    navegarParaSkillTalks(profissionalSelecionado);
                    fecharModalProfissional();
                  }}
                  className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white rounded-2xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
                >
                  <MessageCircle className="w-5 h-5" />
                  Enviar Mensagem
                </button>
              </div>
            </div>

            {/* COLUNA 2 - DETALHES */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* HABILIDADES TÉCNICAS */}
              {profissionalSelecionado.habilidadesTecnicas?.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Habilidades Técnicas</h3>
                  <div className="flex flex-wrap gap-3">
                    {profissionalSelecionado.habilidadesTecnicas.map((skill, i) => (
                      <span
                        key={i}
                        className="px-4 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 text-blue-700 dark:text-blue-300 rounded-xl font-medium border border-blue-200 dark:border-blue-800 shadow-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* SOFT SKILLS */}
              {profissionalSelecionado.softSkills?.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Soft Skills</h3>
                  <div className="flex flex-wrap gap-3">
                    {profissionalSelecionado.softSkills.map((skill, i) => (
                      <span
                        key={i}
                        className="px-4 py-3 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 text-green-700 dark:text-green-300 rounded-xl font-medium border border-green-200 dark:border-green-800 shadow-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* EXPERIÊNCIAS */}
              {profissionalSelecionado.experiencias?.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Experiências</h3>
                  <ul className="space-y-3">
                    {profissionalSelecionado.experiencias.map((exp, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-600 dark:text-gray-400">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>{exp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )}
  {/* MODAL DE PROFISSIONAL */}
{modalProfissional && profissionalSelecionado && (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 max-w-4xl w-full overflow-hidden animate-fadeIn">
      
      {/* HEADER DO MODAL */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Perfil de {profissionalSelecionado.nome}
        </h2>
        <button
          onClick={() => setModalProfissional(false)}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
        >
          <X className="w-6 h-6 text-gray-500 dark:text-gray-400" />
        </button>
      </div>

      {/* CONTEÚDO DO MODAL */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* COLUNA 1 - FOTO E INFORMAÇÕES BÁSICAS */}
        <div className="flex flex-col items-center md:items-start gap-4">
          <img
            src={buildFotoURL(profissionalSelecionado.foto)}
            alt={`Foto de ${profissionalSelecionado.nome}`}
            className="w-32 h-32 rounded-2xl object-cover border-2 border-cyan-600/40 dark:border-cyan-400/30"
          />
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{profissionalSelecionado.nome}</h3>
            <p className="text-gray-600 dark:text-gray-300">{profissionalSelecionado.cargo}</p>
            <p className="text-gray-500 dark:text-gray-400">{profissionalSelecionado.localizacao}</p>
          </div>

          {/* EXPERIÊNCIA */}
          {profissionalSelecionado.experiencia_anos && (
            <span className="mt-2 px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-200 rounded-full text-sm font-medium">
              {profissionalSelecionado.experiencia_anos} anos de experiência
            </span>
          )}
        </div>

        {/* COLUNA 2 - SKILLS E EXPERIÊNCIAS */}
        <div className="flex flex-col gap-4">
          {/* HABILIDADES TÉCNICAS */}
          {profissionalSelecionado.habilidadesTecnicas?.length > 0 && (
            <>
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white">Habilidades Técnicas</h4>
              <div className="flex flex-wrap gap-2">
                {profissionalSelecionado.habilidadesTecnicas.map((skill, i) => (
                  <span key={i} className="px-3 py-2 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-800 dark:text-cyan-200 rounded-lg text-sm font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </>
          )}

          {/* SOFT SKILLS */}
          {profissionalSelecionado.softSkills?.length > 0 && (
            <>
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mt-4">Soft Skills</h4>
              <div className="flex flex-wrap gap-2">
                {profissionalSelecionado.softSkills.map((skill, i) => (
                  <span key={i} className="px-3 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 rounded-lg text-sm font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </>
          )}

          {/* EXPERIÊNCIAS */}
{profissionalSelecionado.experiencias?.length > 0 && (
  <>
    <h4 className="text-xl font-semibold text-gray-900 dark:text-white mt-4">Experiências</h4>
    <div className="flex flex-col gap-2 mt-2">
      {profissionalSelecionado.experiencias.map((exp, i) => (
        <span
          key={i}
          className="px-3 py-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-200 rounded-lg text-sm font-medium"
        >
          {exp}
        </span>
      ))}
    </div>
  </>
)}

        </div>

      </div>
    </div>
  </div>
)}


</section>



          {/* PROJETOS */}
          {/* PROJETOS */}
<section>
  <div className="flex justify-between items-center mb-6">
    <h2 className="text-2xl font-bold flex items-center gap-3">
      <FolderKanban className="w-7 h-7 text-purple-600" />
      Projetos
    </h2>
    <Link to="/projetos" className="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-2">
      Ver todos os projetos <ArrowRight className="w-4 h-4" />
    </Link>
  </div>

  {/* ADICIONE ESTA VERIFICAÇÃO */}
  {!projetos || projetos.length === 0 ? (
    <div className="text-center py-8">
      <p className="text-gray-500 dark:text-gray-400">Nenhum projeto disponível no momento.</p>
    </div>
  ) : (
    <div className="grid md:grid-cols-2 gap-6">
      {projetos.map((projeto) => (
        <div key={projeto.id} className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
          {/* CABEÇALHO */}
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{projeto.nome}</h3>
            <span className="flex items-center gap-1 bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400 px-2 py-1 rounded-full text-sm">
              <Users className="w-4 h-4" />
              {projeto.membros}
            </span>
          </div>

          {/* INFORMAÇÕES BÁSICAS */}
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">Por: {projeto.autor}</p>
          <p className="text-gray-600 dark:text-gray-300 mb-4">{projeto.descricao}</p>

          {/* STATUS E CATEGORIA */}
          <div className="flex gap-2 mb-4">
            <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-400 px-2 py-1 rounded-full text-xs">
              {projeto.status}
            </span>
            <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-400 px-2 py-1 rounded-full text-xs">
              {projeto.categoria}
            </span>
          </div>

          {/* TECNOLOGIAS */}
          <div className="flex flex-wrap gap-2 mb-6">
            {projeto.tecnologias?.slice(0, 3).map((tag, index) => (
              <span key={index} className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-3 py-1 rounded-full text-sm">
                {tag}
              </span>
            ))}
            {projeto.tecnologias?.length > 3 && (
              <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-3 py-1 rounded-full text-sm">
                +{projeto.tecnologias.length - 3}
              </span>
            )}
          </div>

          {/* RODAPÉ */}
          <div className="flex justify-between items-center">
            <div className="flex -space-x-2">
              {[1,2,3].map((i) => (
                <img
                  key={i}
                  src={`https://placehold.co/32x32/8B5CF6/ffffff?text=${i}`}
                  alt={`Participante ${i}`}
                  className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800"
                />
              ))}
              <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center text-xs font-medium">
                +{projeto.membros - 3}
              </div>
            </div>
            <button 
              onClick={() => abrirModalProjeto(projeto)}
              className="bg-purple-600 text-white px-5 py-2 rounded-lg hover:bg-purple-700 transition font-medium"
            >
              Ver Detalhes
            </button>
          </div>
        </div>
      ))}
    </div>
  )}
</section>
{/* MODAL DO PROJETO */}
{modalProjetoAberto && projetoSelecionado && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            {projetoSelecionado.nome}
          </h3>
          <button 
            onClick={fecharModalProjeto}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Descrição</h4>
            <p className="text-gray-600 dark:text-gray-300">
              {projetoSelecionado.descricao}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Área</h4>
              <span className="bg-cyan-100 dark:bg-cyan-900 text-cyan-800 dark:text-cyan-200 px-3 py-1 rounded-full text-sm flex items-center gap-1 w-fit">
                <FolderKanban className="w-4 h-4" />
                {projetoSelecionado.categoria}
              </span>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Vagas</h4>
              <p className="text-gray-600 dark:text-gray-300">
                {projetoSelecionado.vagas || (projetoSelecionado.membros > 8 ? 0 : 2)} disponíveis
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Líder</h4>
              <p className="text-gray-600 dark:text-gray-300">
                {projetoSelecionado.autor}
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Status</h4>
              <p className="text-gray-600 dark:text-gray-300">
                {projetoSelecionado.status}
              </p>
            </div>
          </div>

          {projetoSelecionado.tecnologias && (
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Tecnologias</h4>
              <div className="flex flex-wrap gap-2">
                {projetoSelecionado.tecnologias.map((tech, index) => (
                  <span key={index} className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-sm">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            
            <button 
              onClick={() => {
                alert(`Interesse registrado no projeto ${projetoSelecionado.nome}!`);
                fecharModalProjeto();
              }}
              className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                projetoSelecionado.status === 'Recrutando' 
                  ? "bg-cyan-600 hover:bg-cyan-700 text-white" 
                  : "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
              }`}
              disabled={projetoSelecionado.status !== 'Recrutando'}
            >
              {projetoSelecionado.status === 'Recrutando' ? 'Participar do Projeto' : 'Projeto em Andamento'}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
)}

        </main>
      </div>
    </div>
  );
}

export default Feed;