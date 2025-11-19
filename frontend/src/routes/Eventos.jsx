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

export default function Eventos() {
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

  const eventos = [
    { id: 1, titulo: "Futuro do Trabalho", data: "20/11/2025", hora: "19:00", descricao: "Tendências e profissões.", participantes: 124 },
    { id: 2, titulo: "Hackathon IoT", data: "05/12/2025", hora: "09:00", descricao: "Desafios IoT.", participantes: 89 },
    { id: 3, titulo: "Workshop React", data: "10/12/2025", hora: "14:00", descricao: "Aprendizado prático de React.", participantes: 58 },
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
            item.path === "/eventos"
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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Eventos</h1>

          <div className="space-y-4">
            {eventos.map((evento) => (
              <Card key={evento.id} className="transition-all group">
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400 px-3 py-1 rounded-full text-sm font-medium">
                    {evento.data}
                  </span>
                  <span className="flex items-center gap-1 text-sm text-gray-500">
                    <Users className="w-4 h-4" />
                    {evento.participantes} participantes
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-purple-600 transition">
                  {evento.titulo}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{evento.descricao}</p>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    {evento.hora}
                  </span>
                  <button className="bg-purple-600 text-white px-5 py-2 rounded-lg hover:bg-purple-700 transition font-medium">
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
