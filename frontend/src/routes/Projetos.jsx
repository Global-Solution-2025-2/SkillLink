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

  const projetos = [
    {
      id: 1,
      nome: "Startup Verde",
      autor: "Alice",
      descricao: "Projeto de energia sustentável e soluções ecológicas.",
      membros: 12,
      tags: ["Sustentabilidade", "Energia"],
    },
    {
      id: 2,
      nome: "Plataforma de Mentoria",
      autor: "Bruno",
      descricao: "Mentorias online para estudantes de TI.",
      membros: 8,
      tags: ["Educação", "TI"],
    },
    {
      id: 3,
      nome: "App de Voluntariado",
      autor: "Carla",
      descricao: "Conecta voluntários a causas locais.",
      membros: 15,
      tags: ["Voluntariado", "Social"],
    },
  ];

  const Card = ({ children, className = "" }) => (
    <div className={`bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-lg hover:shadow-2xl transition-all ${className}`}>
      {children}
    </div>
  );

  return (
    <div className="min-h-screen font-sans text-gray-800 dark:text-gray-100">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 py-8">

        {/* SIDEBAR */}
        <aside className="lg:col-span-3 lg:sticky lg:top-[80px] self-start z-10 px-2 lg:px-0">
          <Card className="space-y-5 text-center p-5">
            
            {/* Usuário - Um Tiquinho Maior */}
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
        
            {/* Navegação - Um Tiquinho Maior */}
            <nav className="space-y-2.5 mt-3">
              {[
                { icon: <User className="w-4 h-4" />, label: "Meu Perfil", path: "/perfil" },
                { icon: <Home className="w-4 h-4" />, label: "Feed", path: "/feed" },
                { icon: <BookOpen className="w-4 h-4" />, label: "Meus Cursos", path: "/area-de-estudos" },
                { icon: <Users className="w-4 h-4" />, label: "Minha Rede", path: "/profissionais" },
                { icon: <Briefcase className="w-4 h-4" />, label: "Vagas", path: "/vagas" },
                { icon: <Calendar className="w-4 h-4" />, label: "Eventos", path: "/eventos" },
                { icon: <FolderKanban className="w-4 h-4" />, label: "Projetos", path: "/projetos" },
              ].map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
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
        <main className="lg:col-span-9 space-y-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Projetos Colaborativos</h1>

          <div className="space-y-4">
            {projetos.map((projeto) => (
              <Card key={projeto.id} className="transition-all group">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-orange-600 transition">
                    {projeto.nome}
                  </h3>
                  <span className="flex items-center gap-1 bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-400 px-2 py-1 rounded-full text-sm">
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
                <div className="flex justify-end">
                  <button className="bg-orange-600 text-white px-5 py-2 rounded-lg hover:bg-orange-700 transition font-medium">
                    Participar
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
