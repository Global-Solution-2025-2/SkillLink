import React from "react";
import {
  BookOpen,
  Briefcase,
  Users,
  CalendarDays,
  Rocket,
  ArrowRight,
} from "lucide-react";
 
export default function Feed() {
  // Configuração simulada do usuário (usando localStorage para simulação)
  const usuario =
    JSON.parse(localStorage.getItem("usuarioLogado")) || {
      nome: "Usuário Futurista",
      cargo: "Estudante de Eng. Software",
      cursos: 5,
      aplicacoes: 3,
      foto: null,
    };
 
  // Lógica para gerar URL da foto
  const buildFotoURL = (f) => {
    // Usando um placeholder genérico, já que não temos o servidor local
    return "https://placehold.co/150x150/4f46e5/ffffff?text=U";
  };
 
  const fotoURL = buildFotoURL(usuario.foto);
 
  // Dados Mockados
  const cursos = [
    { id: 1, nome: "IA Básica", descricao: "Fundamentos de Inteligência Artificial", carga: "12h" },
    { id: 2, nome: "React Avançado", descricao: "Componentes, Hooks e APIs", carga: "18h" },
    { id: 3, nome: "Cloud & DevOps", descricao: "Infraestrutura moderna", carga: "20h" },
  ];
 
  const vagas = [
    { id: 1, titulo: "Estágio Frontend", empresa: "TechWave", local: "Remoto" },
    { id: 2, titulo: "Analista Júnior de Sistemas", empresa: "InovaCorp", local: "SP" },
    { id: 3, titulo: "Desenvolvedor React", empresa: "FutureCode", local: "Híbrido - RJ" },
  ];
 
  const projetos = [
    { id: 1, nome: "Startup Verde", autor: "Alice", descricao: "Projeto para energia sustentável.", views: 120 },
    { id: 2, nome: "Plataforma de Mentoria", autor: "Bruno", descricao: "Mentorias para estudantes de TI.", views: 250 },
  ];
 
  const eventos = [
    { id: 1, titulo: "Webinar: Futuro do Trabalho", data: "20/11/2025", descricao: "Tendências e novas profissões." },
    { id: 2, titulo: "Hackathon IoT", data: "05/12/2025", descricao: "Desafios em dispositivos conectados." },
  ];
 
  // Componente Reutilizável de Card (Opcional, mas melhora a leitura)
  const Card = ({ children, className = "" }) => (
    <div
      className={`bg-white/10 dark:bg-gray-900/40 p-6 rounded-2xl border border-gray-300/20 dark:border-gray-700/20 shadow-lg backdrop-blur-md transition duration-300 ${className}`}
    >
      {children}
    </div>
  );
 
  return (
    // Adicionando fundo escuro sutil para melhorar o contraste do modo escuro
    <div className="min-h-screen  font-sans text-gray-800 dark:text-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 py-10">
 
        {/* ========================= SIDEBAR (col-span-3) ========================= */}
        <aside className="lg:col-span-3">
          <Card className="h-fit sticky top-6 hover:shadow-xl hover:shadow-indigo-500/10">
            <div className="flex flex-col items-center">
              <img
                src={fotoURL}
                alt="Foto do usuário"
                className="w-24 h-24 rounded-full object-cover border-4 border-indigo-500 shadow-md"
              />
              <h2 className="text-xl font-extrabold mt-4 text-center">
                {usuario.nome}
              </h2>
              <p className="text-indigo-400 text-sm mt-1 mb-4 text-center">
                {usuario.cargo}
              </p>
            </div>
 
            {/* Navegação */}
            <nav className="flex flex-col gap-1 text-sm mt-6 pt-4 border-t border-gray-700/50">
              <a className="flex items-center gap-3 p-3 font-medium rounded-lg bg-indigo-500/10 text-indigo-400" href="/perfil">
                <Rocket className="w-5 h-5" /> Início
              </a>
              <a className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700/50 transition" href="/perfil">
                <Briefcase className="w-5 h-5" /> Perfil
              </a>
              <a className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700/50 transition" href="/area-de-estudos">
                <BookOpen className="w-5 h-5" /> Meus Cursos
              </a>
              <a className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700/50 transition" href="/vagas">
                <Briefcase className="w-5 h-5" /> Vagas
              </a>
              <a className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700/50 transition" href="/comunidade">
                <Users className="w-5 h-5" /> Comunidade
              </a>
            </nav>
          </Card>
        </aside>
 
        {/* =========================== MAIN CONTENT (col-span-9) =========================== */}
        <main className="lg:col-span-9 flex flex-col gap-10">
 
          {/* 1. DESTAQUES (Full Width) */}
          <section className="grid md:grid-cols-3 gap-6">
            {[{
              icon: <Rocket className="text-indigo-500 w-6 h-6" />,
              titulo: "Oportunidade do Dia",
              texto: "Curso avançado de Python para elevar sua carreira."
            }, {
              icon: <Briefcase className="text-indigo-500 w-6 h-6" />,
              titulo: "Vaga em Alta",
              texto: "Desenvolvedor React — FutureCode."
            }, {
              icon: <CalendarDays className="text-indigo-500 w-6 h-6" />,
              titulo: "Próximo Evento",
              texto: "Webinar: Futuro do Trabalho — 20/11"
            }].map((d, i) => (
              <Card
                key={i}
                className="hover:shadow-indigo-500/10 hover:border-indigo-500/50 cursor-pointer flex flex-col justify-between"
              >
                {d.icon}
                <h3 className="font-bold text-lg mt-3">{d.titulo}</h3>
                <p className="text-sm text-gray-400 mt-1">{d.texto}</p>
                <a href="#" className="mt-4 text-indigo-400 flex items-center text-sm font-medium hover:text-indigo-300">
                    Ver detalhes <ArrowRight className="w-4 h-4 ml-1" />
                </a>
              </Card>
            ))}
          </section>
 
          {/* 2. LAYOUT DIVIDIDO: VAGAS (6 cols) e EVENTOS (3 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-9 gap-8">
           
            {/* 2a. MERCADO DE TRABALHO (lg:col-span-6) */}
            <section className="lg:col-span-6">
              <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
                <Briefcase className="w-7 h-7 p-1 bg-indigo-500/20 text-indigo-400 rounded-full" /> Vagas em Destaque
              </h2>
              <div className="space-y-4">
                {vagas.map((vaga) => (
                  <Card key={vaga.id} className="p-4 hover:shadow-indigo-500/10 cursor-pointer border-l-4 border-indigo-600/50">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-bold">{vaga.titulo}</h3>
                        <p className="text-sm text-gray-400">{vaga.empresa} • <span className="text-indigo-400">{vaga.local}</span></p>
                      </div>
                      <button className="px-4 py-2 rounded-full bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-500 transition shadow-lg">
                        Aplicar
                      </button>
                    </div>
                  </Card>
                ))}
              </div>
            </section>
 
            {/* 2b. EVENTOS & WORKSHOPS (lg:col-span-3) */}
            <section className="lg:col-span-3">
              <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
                <CalendarDays className="w-7 h-7 p-1 bg-indigo-500/20 text-indigo-400 rounded-full" /> Próximos Eventos
              </h2>
              <div className="space-y-4">
                {eventos.map((e) => (
                  <Card key={e.id} className="p-4 border-l-4 border-indigo-400/50">
                    <p className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">{e.data}</p>
                    <h3 className="font-bold text-base mt-1">{e.titulo}</h3>
                    <p className="text-xs text-gray-400 mt-1 line-clamp-2">{e.descricao}</p>
                  </Card>
                ))}
                {/* Adicionar um CTA para Mobile/Events */}
                <div className="text-center pt-2">
                    <a href="/eventos" className="text-indigo-400 text-sm font-medium hover:text-indigo-300 flex items-center justify-center">
                        Ver todos os eventos <ArrowRight className="w-4 h-4 ml-1" />
                    </a>
                </div>
              </div>
            </section>
          </div>
         
          {/* 3. APRENDIZADO & CRESCIMENTO (Cursos - Full Width) */}
          <section>
            <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
              <BookOpen className="w-7 h-7 p-1 bg-indigo-500/20 text-indigo-400 rounded-full" /> Aprendizado & Crescimento
            </h2>
 
            <div className="grid md:grid-cols-3 gap-6">
              {cursos.map((curso) => (
                <Card
                  key={curso.id}
                  className="hover:shadow-indigo-500/10 hover:border-indigo-500/50 cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <h3 className="text-lg font-bold">{curso.nome}</h3>
                    <p className="text-sm text-gray-400 mt-2 line-clamp-2">{curso.descricao}</p>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-xs inline-block p-1 px-3 bg-indigo-600/20 text-indigo-300 font-medium rounded-full">{curso.carga}</span>
                    <a href={`/curso/${curso.id}`} className="text-sm font-medium text-indigo-400 hover:text-indigo-300">Acessar</a>
                  </div>
                </Card>
              ))}
            </div>
          </section>
         
          {/* 4. PROJETOS (Full Width) */}
          <section>
            <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
              <Users className="w-7 h-7 p-1 bg-indigo-500/20 text-indigo-400 rounded-full" /> Comunidade & Projetos
            </h2>
 
            <div className="grid md:grid-cols-2 gap-6">
              {projetos.map((p) => (
                <Card key={p.id} className="hover:shadow-indigo-500/10 cursor-pointer">
                  <h3 className="font-bold text-lg">{p.nome}</h3>
                  <p className="text-sm text-gray-400 mt-1">Por: {p.autor}</p>
                  <p className="text-sm text-gray-300 mt-2 line-clamp-2">{p.descricao}</p>
                  <a href="#" className="mt-4 text-indigo-400 flex items-center text-sm font-medium hover:text-indigo-300">
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