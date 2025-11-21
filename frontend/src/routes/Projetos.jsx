import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
  Plus,
  Search,
  Filter,
  Eye
} from "lucide-react";

export default function Projetos() {
  const [usuario, setUsuario] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("usuarioLogado")) || {
        nome: "Usuário Futurista",
        cargo: "Estudante de Eng. Software",
        foto: null,
      };
    } catch {
      return {
        nome: "Usuário Futurista",
        cargo: "Estudante de Eng. Software",
        foto: null,
      };
    }
  });

  const [busca, setBusca] = useState("");
  const [categoria, setCategoria] = useState("");

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "usuarioLogado") {
        try {
          const novo = JSON.parse(e.newValue);
          if (novo) setUsuario(novo);
        } catch {}
      }
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  const buildFotoURL = (f) => {
    const placeholder = "https://placehold.co/150x150/0891b2/ffffff?text=U";
    if (!f) return placeholder;
    if (typeof f !== "string") return placeholder;
    if (f.startsWith("http")) return f;
    if (f.startsWith("/")) return `http://localhost:5000${f}`;
    return `http://localhost:5000/${f}`;
  };

  const categorias = [
    "Todos",
    "Desenvolvimento Web",
    "Mobile",
    "IA & Machine Learning",
    "Design",
    "IoT",
    "Blockchain"
  ];

  const projetos = [
    {
      id: 1,
      nome: "EcoTrack - Monitoramento Ambiental",
      autor: "Ana Silva",
      descricao: "Sistema para monitorar qualidade do ar e água usando IoT e data science.",
      membros: 8,
      vagas: 3,
      tags: ["IoT", "Python", "Data Science", "Sustentabilidade"],
      categoria: "IoT",
      status: "Recrutando"
    },
    {
      id: 2,
      nome: "LearnTogether - Plataforma Educacional",
      autor: "Carlos Santos",
      descricao: "Plataforma colaborativa de ensino com gamificação e mentorias.",
      membros: 12,
      vagas: 5,
      tags: ["React", "Node.js", "MongoDB", "Educação"],
      categoria: "Desenvolvimento Web",
      status: "Ativo"
    },
    {
      id: 3,
      nome: "HealthConnect - Telemedicina",
      autor: "Marina Oliveira",
      descricao: "App para consultas médicas online com agendamento inteligente.",
      membros: 6,
      vagas: 2,
      tags: ["Flutter", "Firebase", "API", "Saúde"],
      categoria: "Mobile",
      status: "Recrutando"
    },
    {
      id: 4,
      nome: "ArtVision - Geração de Arte com IA",
      autor: "Ricardo Lima",
      descricao: "Gerador de arte digital usando redes neurais generativas.",
      membros: 4,
      vagas: 4,
      tags: ["Python", "TensorFlow", "IA", "Arte"],
      categoria: "IA & Machine Learning",
      status: "Iniciando"
    },
    {
      id: 5,
      nome: "SmartHome Hub",
      autor: "Fernanda Costa",
      descricao: "Central de controle para dispositivos IoT residenciais.",
      membros: 10,
      vagas: 0,
      tags: ["IoT", "JavaScript", "Arduino", "Automação"],
      categoria: "IoT",
      status: "Em Progresso"
    },
    {
      id: 6,
      nome: "CryptoWallet Segura",
      autor: "Pedro Almeida",
      descricao: "Carteira digital para criptomoedas com segurança avançada.",
      membros: 7,
      vagas: 1,
      tags: ["Blockchain", "React Native", "Segurança", "Web3"],
      categoria: "Blockchain",
      status: "Recrutando"
    }
  ];

  const projetosFiltrados = projetos.filter(projeto => {
    const buscaMatch = projeto.nome.toLowerCase().includes(busca.toLowerCase()) ||
                      projeto.descricao.toLowerCase().includes(busca.toLowerCase()) ||
                      projeto.tags.some(tag => tag.toLowerCase().includes(busca.toLowerCase()));
    
    const categoriaMatch = categoria === "" || categoria === "Todos" || projeto.categoria === categoria;
    
    return buscaMatch && categoriaMatch;
  });

  const Card = ({ children, className = "" }) => (
    <div className={`bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm hover:shadow-md transition-all ${className}`}>
      {children}
    </div>
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "Recrutando": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "Ativo": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "Em Progresso": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "Iniciando": return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-6 py-6">

        {/* SIDEBAR */}
        <aside className="lg:col-span-3 lg:sticky lg:top-4 self-start">
          <Card className="space-y-6 text-center">
            
            {/* Usuário */}
            <div className="flex flex-col items-center">
              <img
                src={buildFotoURL(usuario?.foto)}
                alt={`Foto de ${usuario?.nome || "Usuário"}`}
                className="w-16 h-16 rounded-full border-2 border-white shadow-md object-cover"
                onError={(e) => {
                  e.currentTarget.src = "https://placehold.co/150x150/0891b2/ffffff?text=U";
                }}
              />
        
              <div className="mt-3">
                <h2 className="font-semibold text-gray-900 dark:text-white line-clamp-1">
                  {usuario?.nome}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-sm mt-1 line-clamp-2">
                  {usuario?.cargo}
                </p>
              </div>
            </div>
        
            <div className="border-b border-gray-200 dark:border-gray-600"></div>
        
            {/* Navegação */}
            <nav className="space-y-2">
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
                  className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                    item.path === "/projetos"
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

        {/* CONTEÚDO PRINCIPAL */}
        <main className="lg:col-span-9 space-y-6">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Future Lab</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Encontre projetos colaborativos e construa o futuro</p>
            </div>
            <button className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
              <Plus className="w-4 h-4" />
              Novo Projeto
            </button>
          </div>

          {/* Filtros */}
          <Card className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar projetos..."
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                />
              </div>
              
              <div className="flex gap-2">
                <select
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                >
                  {categorias.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                
                <button className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Filtros
                </button>
              </div>
            </div>
          </Card>

          {/* Lista de Projetos */}
          <div className="grid gap-4">
            {projetosFiltrados.map((projeto) => (
              <Card key={projeto.id} className="hover:shadow-lg transition-all duration-300">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {projeto.nome}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(projeto.status)}`}>
                        {projeto.status}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                      Por: <span className="font-medium">{projeto.autor}</span> • {projeto.categoria}
                    </p>
                    
                    <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm leading-relaxed">
                      {projeto.descricao}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {projeto.tags.map((tag, index) => (
                        <span 
                          key={index} 
                          className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-md text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-3 lg:w-48">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Membros:</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {projeto.membros} / {projeto.membros + projeto.vagas}
                      </span>
                    </div>
                    
                    <div className="flex gap-2">
                      <button className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1">
                        <Eye className="w-4 h-4" />
                        Ver
                      </button>
                      <button 
                        className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1 ${
                          projeto.vagas > 0 
                            ? "bg-orange-600 hover:bg-orange-700 text-white" 
                            : "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                        }`}
                        disabled={projeto.vagas === 0}
                      >
                        <Users className="w-4 h-4" />
                        {projeto.vagas > 0 ? `Participar (${projeto.vagas})` : 'Lotado'}
                      </button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {projetosFiltrados.length === 0 && (
            <Card className="text-center py-12">
              <FolderKanban className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Nenhum projeto encontrado
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Tente ajustar os filtros de busca ou criar um novo projeto.
              </p>
            </Card>
          )}
        </main>
      </div>
    </div>
  );
}