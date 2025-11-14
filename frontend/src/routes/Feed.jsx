import React from "react";
import { BookOpen, UserCircle2, Briefcase } from "lucide-react";

export default function Feed() {
  const usuario = JSON.parse(localStorage.getItem("usuarioLogado")) || {
    nome: "Usuário Futurista",
    bio: "Estudante de Eng. Software • Desenvolvedora Web",
    cursos: 5,
    aplicacoes: 3,
  };

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

  const oportunidades = [
    { id: 1, titulo: "Curso Avançado de Python", descricao: "Aprimore suas habilidades de programação." },
    { id: 2, titulo: "Bootcamp UX/UI", descricao: "Aprenda design centrado no usuário." },
    { id: 3, titulo: "Estágio em IA", descricao: "Aplicar conhecimentos em projetos reais." },
  ];

  const desafios = [
    { id: 1, titulo: "Protótipo Sustentável", descricao: "Crie um protótipo que promova sustentabilidade." },
    { id: 2, titulo: "Mini Hackathon IoT", descricao: "Resolva um problema com dispositivos conectados." },
    { id: 3, titulo: "App Social Impact", descricao: "Desenvolva uma solução de impacto social." },
  ];

  const projetos = [
    { id: 1, nome: "Startup Verde", autor: "Alice", descricao: "Projeto para energia sustentável." },
    { id: 2, nome: "Plataforma de Mentoria", autor: "Bruno", descricao: "Mentorias para estudantes de TI." },
  ];

  const eventos = [
    { id: 1, titulo: "Webinar: Futuro do Trabalho", data: "20/11/2025", descricao: "Discussão sobre tendências e novas profissões." },
    { id: 2, titulo: "Hackathon IoT", data: "05/12/2025", descricao: "Desafios em dispositivos conectados e inovação." },
    { id: 3, titulo: "Workshop Sustentabilidade", data: "12/12/2025", descricao: "Criação de soluções tecnológicas sustentáveis." },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 pb-20 grid grid-cols-1 lg:grid-cols-12 gap-10">

      {/* ===================== PERFIL / SIDEBAR ===================== */}
      <aside className="lg:col-span-3 bg-white/10 dark:bg-gray-900/40 backdrop-blur-xl rounded-2xl p-6 border border-gray-300/20 dark:border-gray-700/20 shadow-xl h-fit sticky top-24">
        <div className="flex flex-col items-center text-center">
          <img
            src=""
            alt="Foto do usuário"
            className="w-24 h-24 rounded-full border-4 border-indigo-500 shadow-md"
          />
          <h2 className="text-xl font-semibold mt-4">{usuario.nome}</h2>
          <p className="text-gray-500 text-sm mt-1">{usuario.bio}</p>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-3 text-center">
          <div className="p-3 rounded-xl bg-indigo-500/10 dark:bg-indigo-500/20">
            <p className="font-bold text-lg">{usuario.cursos}</p>
            <p className="text-xs text-gray-400">Cursos</p>
          </div>
          <div className="p-3 rounded-xl bg-indigo-500/10 dark:bg-indigo-500/20">
            <p className="font-bold text-lg">{usuario.aplicacoes}</p>
            <p className="text-xs text-gray-400">Aplicações</p>
          </div>
          <div className="p-3 rounded-xl bg-indigo-500/10 dark:bg-indigo-500/20">
            <p className="font-bold text-lg">27</p>
            <p className="text-xs text-gray-400">Conexões</p>
          </div>
        </div>

        <a
          className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-xl transition block text-center"
          href="/perfil"
        >
          Acessar Página do Perfil
        </a>
      </aside>

      {/* ===================== ÁREA PRINCIPAL ===================== */}
      <main className="lg:col-span-9 flex flex-col gap-14">

        {/* ===================== CURSOS ===================== */}
        <section>
          <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
            <BookOpen className="w-6 h-6 text-indigo-500" /> Cursos Recomendados
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {cursos.map((curso) => (
              <div key={curso.id} className="bg-white/10 dark:bg-gray-900/40 backdrop-blur-xl p-6 rounded-2xl border border-gray-300/20 dark:border-gray-700/20 shadow-lg hover:shadow-indigo-500/20 transition cursor-pointer">
                <h3 className="text-lg font-semibold">{curso.nome}</h3>
                <p className="text-sm text-gray-400 mt-2">{curso.descricao}</p>
                <span className="text-xs mt-2 inline-block p-1 px-2 bg-indigo-200 dark:bg-indigo-800 rounded-lg">{curso.carga}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ===================== VAGAS ===================== */}
        <section>
          <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
            <Briefcase className="w-6 h-6 text-indigo-500" /> Vagas de Emprego
          </h2>
          <div className="space-y-6">
            {vagas.map((vaga) => (
              <div key={vaga.id} className="bg-white/10 dark:bg-gray-900/40 backdrop-blur-xl p-6 rounded-2xl border border-gray-300/20 dark:border-gray-700/20 shadow-lg hover:shadow-indigo-500/20 transition cursor-pointer">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold">{vaga.titulo}</h3>
                    <p className="text-sm text-gray-400 mt-1">{vaga.empresa} • {vaga.local}</p>
                  </div>
                  <button className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm hover:bg-indigo-500 transition">Aplicar</button>
                </div>
              </div>
            ))}
          </div>
        </section>


        {/* ===================== PROJETOS ===================== */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Projetos Colaborativos</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {projetos.map((p) => (
              <div key={p.id} className="bg-white/10 dark:bg-gray-900/40 p-4 rounded-xl border border-gray-300/20 dark:border-gray-700/20 hover:shadow-lg transition">
                <h3 className="font-semibold">{p.nome}</h3>
                <p className="text-sm text-gray-400 mt-1">Por: {p.autor}</p>
                <p className="text-sm text-gray-400 mt-1">{p.descricao}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ===================== EVENTOS ===================== */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Eventos</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {eventos.map((e) => (
              <div key={e.id} className="bg-white/10 dark:bg-gray-900/40 p-4 rounded-xl border border-gray-300/20 dark:border-gray-700/20 hover:shadow-lg transition">
                <h3 className="font-semibold">{e.titulo}</h3>
                <p className="text-sm text-gray-400 mt-1">Data: {e.data}</p>
                <p className="text-sm text-gray-400 mt-1">{e.descricao}</p>
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}
