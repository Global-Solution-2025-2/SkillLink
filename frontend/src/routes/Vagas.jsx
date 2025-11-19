import React from "react";
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

export default function Vagas() {
  const usuario = JSON.parse(localStorage.getItem("usuarioLogado")) || {};

  const buildFotoURL = (foto) =>
    foto || "https://placehold.co/150x150/0891b2/ffffff?text=U";

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar fixa à esquerda, centralizada */}
      <aside className="lg:col-span-3 lg:sticky lg:top-[80px] self-start z-10 px-2 lg:px-0">
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-5 border border-gray-200 dark:border-gray-700 space-y-5 text-center">
            
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
                    item.path === "/vagas"
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

      {/* Conteúdo principal */}
      <main className="flex-1 p-6 lg:ml-0">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Vagas
        </h1>

        {/* Lista de vagas */}
        <div className="grid gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
            <h2 className="text-lg font-semibold">Vaga Exemplo 1</h2>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Descrição da vaga, requisitos e informações importantes.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
            <h2 className="text-lg font-semibold">Vaga Exemplo 2</h2>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Descrição da vaga, requisitos e informações importantes.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
