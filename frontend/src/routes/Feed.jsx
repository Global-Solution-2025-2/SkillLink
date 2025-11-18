import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Briefcase,
  Users,
  CalendarDays,
  Rocket,
  ArrowRight,
  Clock,
  MapPin,
  Star,
} from "lucide-react";

function Feed() {
  // Lê usuario do localStorage de forma segura e atualizável
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

  // Atualiza quando localStorage for alterado (upload em outro componente/tab)
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "usuarioLogado") {
        try {
          const novo = JSON.parse(e.newValue);
          if (novo) setUsuario(novo);
        } catch {
          // ignore
        }
      }
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  // Função para montar URL final da foto (mesma abordagem do Perfil.jsx)
  const buildFotoURL = (f) => {
    const placeholder = "https://placehold.co/150x150/0891b2/ffffff?text=U";
    if (!f) return placeholder;
    if (typeof f !== "string") return placeholder;
    if (f.startsWith("http")) return f;
    if (f.startsWith("/")) return `http://localhost:5000${f}`;
    return `http://localhost:5000/${f}`;
  };

  const cursos = [
    { id: 1, nome: "IA Básica", descricao: "Fundamentos de IA", carga: "12h", progresso: 75, rating: 4.8 },
    { id: 2, nome: "React Avançado", descricao: "Hooks e APIs", carga: "18h", progresso: 45, rating: 4.9 },
  ];

  const vagas = [
    { id: 1, titulo: "Estágio Frontend", empresa: "TechWave", local: "Remoto", salario: "R$ 2.500", tipo: "Estágio", urgente: true },
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
                { icon: <Users className="w-5 h-5" />, label: "Minha Rede", path: "/profissionais" },
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

        {/* FEED CENTRAL */}
        <main className="lg:col-span-9 space-y-8">

          {/* CURSOS */}
          <section>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <BookOpen className="w-7 h-7 text-cyan-600" />
                Meus Cursos
              </h2>
              <Link to="/area-de-estudos" className="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-2">
                Continuar estudando <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {cursos.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400">Você ainda não está matriculado em nenhum curso.</p>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {cursos.map((curso) => (
                  <Card key={curso.id} className="group">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold group-hover:text-cyan-600 transition">{curso.nome}</h3>
                      <span className="flex items-center gap-1 text-yellow-500">
                        <Star className="w-4 h-4 fill-current" />
                        {curso.rating || 0}
                      </span>
                    </div>
                    <p className="mb-4">{curso.descricao}</p>
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-500">Progresso</span>
                        <span className="font-medium text-gray-700 dark:text-gray-300">{curso.progresso || 0}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                        <div
                          className="bg-cyan-600 h-3 rounded-full transition-all duration-500"
                          style={{ width: `${curso.progresso || 0}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-600">
                      <span className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock className="w-4 h-4" />
                        {curso.carga || "–"}
                      </span>
                      <Link to="/curso" state={{ curso, usuario }}>
                        <button className="bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-700 transition font-medium">
                          Continuar
                        </button>
                      </Link>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </section>

          {/* VAGAS */}
          <section>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <Briefcase className="w-7 h-7 text-green-600" />
                Vagas
              </h2>
              <Link to="/vagas" className="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-2">
                Ver todas as vagas <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
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
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-3 py-1 rounded-full text-sm">React</span>
                      <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-3 py-1 rounded-full text-sm">JavaScript</span>
                    </div>
                    <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition font-medium">Candidatar-se</button>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* EVENTOS */}
          <section>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <CalendarDays className="w-7 h-7 text-purple-600" />
                Eventos
              </h2>
              <Link to="/eventos" className="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-2">
                Ver todos os eventos <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {eventos.map((evento) => (
                <Card key={evento.id} className="group">
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

                    <button className="bg-purple-600 text-white px-5 py-2 rounded-lg hover:bg-purple-700 transition font-medium">Participar</button>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* PROJETOS */}
          <section>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <Users className="w-7 h-7 text-orange-600" />
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
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-orange-600 transition">{projeto.nome}</h3>
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

                    <button className="bg-orange-600 text-white px-5 py-2 rounded-lg hover:bg-orange-700 transition font-medium">Participar</button>
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
