import React from "react";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Briefcase,
  Users,
  CalendarDays,
  Rocket,
  ArrowRight,
  Search,
  Bell,
  MessageCircle,
  TrendingUp,
  Star,
  Clock,
  MapPin,
} from "lucide-react";

export default function Feed() {
  // Dados do usuário (simulação)
  const usuario =
    JSON.parse(localStorage.getItem("usuarioLogado")) || {
      nome: "Usuário Futurista",
      cargo: "Estudante de Eng. Software",
      cursos: 5,
      aplicacoes: 3,
      foto: null,
    };

  const fotoURL = "https://placehold.co/150x150/0891b2/ffffff?text=U";

  // Dados Mockados
  const cursos = [
    { id: 1, nome: "IA Básica", descricao: "Fundamentos de Inteligência Artificial", carga: "12h", progresso: 75, rating: 4.8 },
    { id: 2, nome: "React Avançado", descricao: "Componentes, Hooks e APIs", carga: "18h", progresso: 45, rating: 4.9 },
    { id: 3, nome: "Cloud & DevOps", descricao: "Infraestrutura moderna", carga: "20h", progresso: 20, rating: 4.7 },
  ];

  const vagas = [
    { id: 1, titulo: "Estágio Frontend", empresa: "TechWave", local: "Remoto", salario: "R$ 2.500", tipo: "Estágio", urgente: true },
    { id: 2, titulo: "Analista Júnior de Sistemas", empresa: "InovaCorp", local: "São Paulo", salario: "R$ 4.200", tipo: "CLT", urgente: false },
    { id: 3, titulo: "Desenvolvedor React", empresa: "FutureCode", local: "Híbrido - RJ", salario: "R$ 6.800", tipo: "PJ", urgente: true },
  ];

  const projetos = [
    { id: 1, nome: "Startup Verde", autor: "Alice", descricao: "Projeto para energia sustentável.", membros: 12, tags: ["Sustentabilidade", "Energia"] },
    { id: 2, nome: "Plataforma de Mentoria", autor: "Bruno", descricao: "Mentorias para estudantes de TI.", membros: 8, tags: ["Educação", "TI"] },
  ];

  const eventos = [
    { id: 1, titulo: "Webinar: Futuro do Trabalho", data: "20/11/2025", hora: "19:00", descricao: "Tendências e novas profissões.", participantes: 124 },
    { id: 2, titulo: "Hackathon IoT", data: "05/12/2025", hora: "09:00", descricao: "Desafios em dispositivos conectados.", participantes: 89 },
  ];

  // Card
  const Card = ({ children, className = "" }) => (
    <div
      className={`bg-white/10 dark:bg-gray-900/50 p-6 rounded-2xl border border-cyan-600/20 shadow-lg backdrop-blur-lg transition duration-300 hover:border-cyan-600/40 hover:shadow-cyan-600/10 ${className}`}
    >
      {children}
    </div>
  );

  return (
    <div className="min-h-screen font-sans text-gray-800 dark:text-gray-100">

      {/* ================================================= HEADER ================================================= */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">

            <div className="flex items-center">
              <Rocket className="w-8 h-8 text-cyan-600 mr-3" />
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                FutureConnect
              </span>
            </div>

            {/* Search */}
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Buscar cursos, vagas, eventos..."
                  className="w-full pl-10 pr-4 py-2.5 bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-500 hover:text-cyan-600 transition">
                <Bell className="w-6 h-6" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              <button className="relative p-2 text-gray-500 hover:text-cyan-600 transition">
                <MessageCircle className="w-6 h-6" />
              </button>

              <div className="w-8 h-8 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                {usuario.nome.charAt(0)}
              </div>
            </div>

          </div>
        </div>
      </header>

      {/* ================================================= LAYOUT ================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 py-8">

        {/* ================================================= SIDEBAR ================================================= */}
        <aside className="lg:col-span-3 space-y-6">

          {/* Profile Card */}
          <Card className="text-center">
            <div className="flex flex-col items-center">
              <div className="relative">
                <img
                  src={fotoURL}
                  alt="Foto do usuário"
                  className="w-20 h-20 rounded-full object-cover border-4 border-cyan-600 shadow-lg"
                />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full"></div>
              </div>

              <h2 className="text-lg font-bold mt-4">{usuario.nome}</h2>
              <p className="text-cyan-400 text-sm mt-1">{usuario.cargo}</p>
            </div>

            {/* MENU DO SIDEBAR COM ROTAS */}
            <nav className="flex flex-col gap-1 text-sm mt-6 pt-4 border-t border-gray-700/40">
              {[
                { icon: <Briefcase className="w-5 h-5" />, label: "Perfil", path: "/perfil" },
                { icon: <BookOpen className="w-5 h-5" />, label: "Meus Cursos", path: "/area-de-estudos" },
                { icon: <Briefcase className="w-5 h-5" />, label: "Vagas", path: "/vagas" },
                { icon: <Users className="w-5 h-5" />, label: "Profissionais", path: "/profissionais" },
                { icon: <Users className="w-5 h-5" />, label: "Comunidade", path: "/projetos" },
              ].map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  className="flex items-center gap-3 p-3 rounded-lg transition hover:bg-gray-700/40"
                >
                  {item.icon}
                  {item.label}
                </Link>
              ))}
            </nav>

          </Card>

          {/* Quick Stats */}
          <Card>
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-cyan-600" />
              Seu Progresso
            </h3>

            <div className="space-y-4">

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Perfil Completo</span>
                  <span>80%</span>
                </div>
                <div className="w-full bg-gray-700/40 rounded-full h-2">
                  <div className="bg-cyan-600 h-2 rounded-full" style={{ width: '80%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Habilidades Validadas</span>
                  <span>3/8</span>
                </div>
                <div className="w-full bg-gray-700/40 rounded-full h-2">
                  <div className="bg-cyan-600 h-2 rounded-full" style={{ width: '37.5%' }}></div>
                </div>
              </div>

            </div>

          </Card>

        </aside>

        {/* ================================================= MAIN CONTENT ================================================= */}
        <main className="lg:col-span-9 space-y-8">

          {/* BEM-VINDO */}
          <section>
            <div className="bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl p-8 text-white">
              <h1 className="text-2xl font-bold mb-2">Bem-vindo de volta, {usuario.nome.split(" ")[0]}! 👋</h1>
              <p className="text-cyan-100 mb-4">
                Continue sua jornada de aprendizado e descubra novas oportunidades
              </p>

              <Link
                to="/cursos"
                className="bg-white text-cyan-600 px-6 py-2.5 rounded-xl font-medium hover:bg-gray-100 transition"
              >
                Explorar Cursos
              </Link>
            </div>
          </section>

          {/* DESTAQUES */}
          <section className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <Rocket className="text-cyan-600 w-6 h-6" />,
                titulo: "Oportunidade do Dia",
                texto: "Curso avançado de Python para elevar sua carreira.",
                badge: "Novo",
              },
              {
                icon: <Briefcase className="text-cyan-600 w-6 h-6" />,
                titulo: "Vaga em Alta",
                texto: "Desenvolvedor React — FutureCode.",
                badge: "Urgente",
              },
              {
                icon: <CalendarDays className="text-cyan-600 w-6 h-6" />,
                titulo: "Próximo Evento",
                texto: "Webinar: Futuro do Trabalho — 20/11",
                badge: "Em breve",
              },
            ].map((item, i) => (
              <Card key={i} className="cursor-pointer group hover:-translate-y-1 transition-all">
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-start">
                    {item.icon}
                    <span className="text-xs bg-cyan-600/20 text-cyan-300 px-2 py-1 rounded-full">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="font-bold text-lg">{item.titulo}</h3>
                  <p className="text-sm text-gray-400">{item.texto}</p>

                  <a
                    href="#"
                    className="mt-2 text-cyan-400 flex items-center text-sm font-medium group-hover:text-cyan-300"
                  >
                    Ver detalhes
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </a>
                </div>
              </Card>
            ))}
          </section>

          {/* VAGAS + EVENTOS */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">

            {/* VAGAS */}
            <div className="lg:col-span-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold flex items-center gap-3">
                  <Briefcase className="w-6 h-6 p-1 bg-cyan-600/20 text-cyan-600 rounded-lg" />
                  Vagas em Destaque
                </h2>

                <Link
                  to="/vagas"
                  className="text-cyan-400 text-sm font-medium hover:text-cyan-300 flex items-center"
                >
                  Ver todas <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>

              <div className="space-y-4">
                {vagas.map((vaga) => (
                  <Card
                    key={vaga.id}
                    className="p-6 border-l-4 border-cyan-600/40 hover:border-cyan-600 transition-all hover:shadow-lg"
                  >
                    <div className="flex justify-between items-start">

                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-bold">{vaga.titulo}</h3>

                          {vaga.urgente && (
                            <span className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded-full">
                              Urgente
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                          <span className="flex items-center gap-1">
                            <Briefcase className="w-4 h-4" />
                            {vaga.empresa}
                          </span>

                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {vaga.local}
                          </span>

                          <span className="text-cyan-400">{vaga.salario}</span>
                        </div>

                        <span className="text-xs bg-gray-600/40 text-gray-300 px-2 py-1 rounded-full">
                          {vaga.tipo}
                        </span>
                      </div>

                      <button className="px-5 py-2.5 rounded-xl bg-cyan-600 text-white text-sm font-medium hover:bg-cyan-500 transition ml-4">
                        Aplicar
                      </button>

                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* EVENTOS */}
            <div className="lg:col-span-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold flex items-center gap-3">
                  <CalendarDays className="w-6 h-6 p-1 bg-cyan-600/20 text-cyan-600 rounded-lg" />
                  Próximos Eventos
                </h2>
              </div>

              <div className="space-y-4">
                {eventos.map((e) => (
                  <Card key={e.id} className="p-5 hover:-translate-y-1 transition-all">
                    <div className="flex justify-between items-start mb-3">
                      <p className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                        {e.data}
                      </p>

                      <span className="text-xs bg-cyan-600/20 text-cyan-300 px-2 py-1 rounded-full">
                        {e.participantes} participantes
                      </span>
                    </div>

                    <h3 className="font-bold text-lg mb-2">{e.titulo}</h3>
                    <p className="text-sm text-gray-400 mb-3">{e.descricao}</p>

                    <div className="flex justify-between items-center text-sm text-gray-400">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {e.hora}
                      </span>

                      <button className="text-cyan-400 hover:text-cyan-300 text-sm font-medium">
                        Participar
                      </button>
                    </div>

                  </Card>
                ))}

                <Link
                  to="/eventos"
                  className="block text-center text-cyan-400 text-sm font-medium hover:text-cyan-300 py-3 border border-dashed border-cyan-600/30 rounded-xl transition"
                >
                  Ver todos os eventos
                </Link>
              </div>
            </div>

          </section>

          {/* CURSOS */}
          <section>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <BookOpen className="w-6 h-6 p-1 bg-cyan-600/20 text-cyan-600 rounded-lg" />
                Aprendizado & Crescimento
              </h2>

              <Link
                to="/cursos"
                className="text-cyan-400 text-sm font-medium hover:text-cyan-300 flex items-center"
              >
                Ver todos <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {cursos.map((curso) => (
                <Card key={curso.id} className="group hover:-translate-y-1 transition-all">
                  <div>
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-bold">{curso.nome}</h3>

                      <span className="flex items-center gap-1 text-sm text-yellow-400">
                        <Star className="w-4 h-4 fill-current" />
                        {curso.rating}
                      </span>
                    </div>

                    <p className="text-sm text-gray-400 mb-4">{curso.descricao}</p>

                    {/* Progress */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progresso</span>
                        <span>{curso.progresso}%</span>
                      </div>

                      <div className="w-full bg-gray-700/40 rounded-full h-2">
                        <div
                          className="bg-cyan-600 h-2 rounded-full"
                          style={{ width: `${curso.progresso}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-gray-700/40">
                    <span className="text-xs p-2 px-3 bg-cyan-600/20 text-cyan-300 font-medium rounded-full flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {curso.carga}
                    </span>

                    <Link
                      to={`/curso/${curso.id}`}
                      className="text-sm font-medium text-cyan-400 hover:text-cyan-300 flex items-center"
                    >
                      Continuar <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* PROJETOS */}
          <section>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <Users className="w-6 h-6 p-1 bg-cyan-600/20 text-cyan-600 rounded-lg" />
                Comunidade & Projetos
              </h2>

              <Link
                to="/projetos"
                className="text-cyan-400 text-sm font-medium hover:text-cyan-300 flex items-center"
              >
                Ver todos <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {projetos.map((p) => (
                <Card key={p.id} className="group hover:-translate-y-1 transition-all">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-bold text-lg">{p.nome}</h3>

                    <span className="text-xs bg-cyan-600/20 text-cyan-300 px-2 py-1 rounded-full flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {p.membros}
                    </span>
                  </div>

                  <p className="text-sm text-gray-400 mb-2">Por: {p.autor}</p>
                  <p className="text-sm text-gray-300 mb-4">{p.descricao}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {p.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="text-xs bg-gray-600/40 text-gray-300 px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <a
                    href="#"
                    className="text-cyan-400 flex items-center text-sm font-medium hover:text-cyan-300"
                  >
                    Ver Projeto <ArrowRight className="w-4 h-4 ml-1" />
                  </a>
                </Card>
              ))}
            </div>

          </section>

        </main>

      </div>
    </div>
  );
}
