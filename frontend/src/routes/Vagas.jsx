import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Briefcase, BookOpen, Users, CalendarDays, Rocket, MapPin } from "lucide-react";

export default function Vagas() {
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

  const vagas = [
    { id: 1, titulo: "Estágio Frontend", empresa: "TechWave", local: "Remoto", salario: "R$ 2.500", tipo: "Estágio", urgente: true },
    { id: 2, titulo: "Analista Júnior", empresa: "InovaCorp", local: "São Paulo", salario: "R$ 4.200", tipo: "CLT", urgente: false },
    { id: 3, titulo: "Dev React", empresa: "FutureCode", local: "Híbrido - RJ", salario: "R$ 6.800", tipo: "PJ", urgente: true },
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
          <Card className="space-y-6 text-center">
            {/* Usuário */}
            <div className="flex flex-col items-center py-4">
              <img
                src={buildFotoURL(usuario?.foto)}
                alt={`Foto de ${usuario?.nome || "Usuário"}`}
                className="w-24 h-24 rounded-full border-4 border-white shadow-xl object-cover"
                onError={(e) => {
                  e.currentTarget.src = "https://placehold.co/150x150/0891b2/ffffff?text=U";
                }}
              />
              <h2 className="text-xl font-extrabold mt-4 text-gray-900 dark:text-white">
                {usuario?.nome}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                {usuario?.cargo}
              </p>
            </div>

            <div className="w-full flex justify-center">
              <div className="w-3/4 border-b border-gray-300 dark:border-gray-700"></div>
            </div>

            {/* Navegação */}
            <nav className="space-y-2 mt-4">
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
                  className="flex items-center justify-between p-3 rounded-xl transition-colors duration-200 hover:bg-cyan-50 dark:hover:bg-gray-700 group"
                >
                  <div className="flex items-center gap-3 group-hover:text-cyan-600">
                    {item.icon}
                    <span className="text-gray-700 dark:text-gray-300 group-hover:text-cyan-600 font-medium transition-colors">
                      {item.label}
                    </span>
                  </div>
                </Link>
              ))}
            </nav>
          </Card>
        </aside>

        {/* CONTEÚDO PRINCIPAL */}
        <main className="lg:col-span-9 space-y-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Vagas</h1>

          <div className="space-y-4">
            {vagas.map((vaga) => (
              <Card key={vaga.id} className="transition-all group">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-green-600 transition">
                        {vaga.titulo}
                      </h3>
                      {vaga.urgente && (
                        <span className="bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 px-2 py-1 rounded-full text-xs font-medium">
                          🔥 Urgente
                        </span>
                      )}
                    </div>
                    <p className="text-lg text-gray-600 dark:text-gray-300">{vaga.empresa}</p>
                  </div>
                  <span className="bg-cyan-100 dark:bg-cyan-900 text-cyan-600 dark:text-cyan-400 px-3 py-1 rounded-full text-sm font-medium">{vaga.tipo}</span>
                </div>
                <div className="flex items-center gap-6 text-gray-500 mb-4">
                  <span className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {vaga.local}
                  </span>
                  <span className="text-green-600 dark:text-green-400 font-semibold">{vaga.salario}</span>
                  <span className="text-sm">⏱️ Há 2 dias</span>
                </div>
                <div className="flex justify-end">
                  <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition font-medium">
                    Candidatar-se
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
