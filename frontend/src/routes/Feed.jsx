import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
  Mail,
} from "lucide-react";
import axios from "axios";

function Feed() {
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
            area_atuacao: "Tecnologia"
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
            area_atuacao: "Tecnologia"
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
            area_atuacao: "Tecnologia"
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
          area_atuacao: "Tecnologia"
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
          area_atuacao: "Tecnologia"
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

  const vagas = [
    { id: 1, titulo: "Estágio Frontend", empresa: "TechWave", local: "Remoto", salario: "R$ 2.500", tipo: "Estágio", urgente: false },
    { id: 2, titulo: "Analista Júnior", empresa: "InovaCorp", local: "São Paulo", salario: "R$ 4.200", tipo: "CLT", urgente: false },
    { id: 3, titulo: "Dev React", empresa: "FutureCode", local: "Híbrido - RJ", salario: "R$ 6.800", tipo: "PJ", urgente: true },
  ];

  const eventos = [
    { id: 1, titulo: "Futuro do Trabalho", data: "20/11/2025", hora: "19:00", descricao: "Tendências e profissões.", participantes: 124 },
    { id: 2, titulo: "Hackathon IoT", data: "05/12/2025", hora: "09:00", descricao: "Desafios IoT.", participantes: 89 },
  ];

  const projetos = [
    { id: 1, nome: "Startup Verde", autor: "Alice", descricao: "Energia sustentável.", membros: 12, tags: ["Sustentabilidade", "Energia"] },
    { id: 2, nome: "Plataforma de Mentoria", autor: "Bruno", descricao: "Mentorias para TI.", membros: 8, tags: ["Educação", "TI"] },
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
          <section>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <Users className="w-7 h-7 text-indigo-500" />
                Profissionais da Sua Área
                
              </h2>
              <Link to="/profissionais" className="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-2">
                Ver todos <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {loadingProfissionais ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500 mx-auto mb-3"></div>
                <p className="text-gray-500 dark:text-gray-400">Carregando profissionais...</p>
              </div>
            ) : profissionais.length === 0 ? (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-8 border border-gray-100 dark:border-gray-700 text-center">
                <div className="bg-gray-50 dark:bg-gray-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  Nenhum profissional encontrado na área {usuario.area_atuacao || "Tecnologia"}.
                </p>
                <Link 
                  to="/profissionais" 
                  className="inline-flex items-center gap-2 text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300 font-medium"
                >
                  Explorar todos os profissionais
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {profissionais.map((profissional) => (
                  <Card key={profissional.id} className="group hover:border-indigo-500 dark:hover:border-indigo-600 transition-all duration-300 text-center">
                    <div className="flex flex-col items-center">
                      <img
                        src={buildFotoURL(profissional.foto)}
                        alt={`Foto de ${profissional.nome}`}
                        className="w-14 h-14 rounded-full border-2 border-white shadow-md object-cover mb-3"
                        onError={(e) => {
                          e.currentTarget.src = "https://placehold.co/56x56/10b981/ffffff?text=P";
                        }}
                      />
                      <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-indigo-500 transition-colors text-sm leading-tight">
                        {profissional.nome}
                      </h3>
                      <p className="text-xs text-gray-600 dark:text-gray-300 mt-1 line-clamp-2 leading-tight">
                        {profissional.cargo}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-1">
                        <MapPin className="w-3 h-3" />
                        {profissional.localizacao?.split(',')[0] || "Remoto"}
                      </p>
                    </div>

                    <div className="flex justify-center items-center my-3">
                      <span className=" dark:bg-indigo-500 text-white px-2 py-1 rounded-full text-xs">
                        {profissional.experiencia_anos || 0}+ anos
                      </span>
                    </div>

                    <div className="mb-3">
                      <div className="flex flex-wrap gap-1 justify-center">
                        {profissional.skills?.slice(0, 2).map((skill, index) => (
                          <span 
                            key={index}
                            className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded text-xs"
                          >
                            {skill}
                          </span>
                        ))}
                        {profissional.skills?.length > 2 && (
                          <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded text-xs">
                            +{profissional.skills.length - 2}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-2 rounded-lg transition-all duration-300 font-medium text-xs flex items-center justify-center gap-1">
                        <Mail className="w-3 h-3" />
                        Conectar
                      </button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </section>

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

            <div className="grid md:grid-cols-2 gap-6">
              {projetos.map((projeto) => (
                <Card key={projeto.id} className="group">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-purple-600 transition">{projeto.nome}</h3>
                    <span className="flex items-center gap-1 bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400 px-2 py-1 rounded-full text-sm">
                      <Users className="w-4 h-4" />
                      {projeto.membros}
                    </span>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">Por: {projeto.autor}</p>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{projeto.descricao}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {projeto.tags.map((tag, index) => (
                      <span key={index} className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-3 py-1 rounded-full text-sm">#{tag}</span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex -space-x-2">
                      {[1,2,3].map((i) => (
                        <img
                          key={i}
                          src={`https://placehold.co/32x32/00${i}84/ffffff?text=${i}`}
                          alt={`Participante ${i}`}
                          className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800"
                        />
                      ))}
                      <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center text-xs font-medium">
                        +{projeto.membros - 3}
                      </div>
                    </div>
                    <button className="bg-purple-600 text-white px-5 py-2 rounded-lg hover:bg-purple-700 transition font-medium">Participar</button>
                  </div>
                </Card>
              ))}
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}

export default Feed;