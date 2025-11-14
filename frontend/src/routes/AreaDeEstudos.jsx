import React from "react";
import { BookOpen, Target, Clock, BarChart3, CheckCircle2, PlayCircle } from "lucide-react";

export default function AreaEstudos() {
  const usuario = JSON.parse(localStorage.getItem("usuarioLogado")) || {
    nome: "Usuário",
  };

  const cursosEmAndamento = [
    {
      id: 1,
      nome: "Introdução à Inteligência Artificial",
      progresso: 60,
      horas: "12h",
    },
    {
      id: 2,
      nome: "React Avançado",
      progresso: 35,
      horas: "18h",
    },
    {
      id: 3,
      nome: "Fundamentos de Cloud",
      progresso: 80,
      horas: "15h",
    },
  ];

  const cursosConcluidos = [
    { id: 1, nome: "Lógica de Programação" },
    { id: 2, nome: "Git & GitHub Completo" },
  ];

  const metas = [
    { id: 1, nome: "Estudar 1h por dia", status: "Em andamento" },
    { id: 2, nome: "Terminar 2 cursos este mês", status: "Não iniciado" },
    { id: 3, nome: "Praticar IA 3x semana", status: "Em andamento" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 pb-20 grid grid-cols-1 lg:grid-cols-12 gap-10">

      {/* ===================== SIDEBAR ===================== */}
      <aside className="lg:col-span-3 bg-white/10 dark:bg-gray-900/40 backdrop-blur-xl rounded-3xl p-6 border border-gray-300/20 dark:border-gray-700/20 shadow-xl h-fit sticky top-24 flex flex-col gap-6">

        <div>
          <h2 className="text-xl font-bold">Olá, {usuario.nome}</h2>
          <p className="text-gray-400 text-sm mt-1">Bem-vindo(a) à sua área de estudos 📚</p>
        </div>

        <div className="p-4 rounded-2xl bg-indigo-500/10 dark:bg-indigo-500/20 flex flex-col gap-2">
          <h3 className="text-sm font-semibold">Estudo da Semana</h3>
          <p className="text-gray-300 text-sm">3h concluídas de 7h planejadas</p>
          <div className="w-full h-2 bg-gray-700/30 rounded-full mt-1">
            <div className="h-full bg-indigo-500 rounded-full" style={{ width: "45%" }}></div>
          </div>
        </div>

        <nav className="text-sm flex flex-col gap-2">
          <a className="p-3 rounded-xl bg-white/5 hover:bg-indigo-500/10 transition" href="/feed">Voltar ao Feed</a>
          <a className="p-3 rounded-xl bg-white/5 hover:bg-indigo-500/10 transition" href="/cursos">Todos os Cursos</a>
          <a className="p-3 rounded-xl bg-white/5 hover:bg-indigo-500/10 transition" href="/perfil">Perfil</a>
        </nav>

      </aside>

      {/* ===================== ÁREA PRINCIPAL ===================== */}
      <main className="lg:col-span-9 flex flex-col gap-14">

        {/* ===================== CABEÇALHO ===================== */}
        <header className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold">Área de Estudos</h1>
          <p className="text-gray-400 text-sm">
            Acompanhe seu progresso, metas e cursos em andamento.
          </p>
        </header>

        {/* ===================== PROGRESSO GERAL ===================== */}
        <section className="grid md:grid-cols-3 gap-6">

          <div className="bg-white/10 dark:bg-gray-900/40 p-6 rounded-3xl border border-gray-300/20 dark:border-gray-700/20 shadow-xl">
            <Clock className="text-indigo-500 w-6 h-6" />
            <h3 className="font-semibold text-lg mt-2">Horas Estudadas</h3>
            <p className="text-gray-400 text-sm">Esta semana: 3h</p>
          </div>

          <div className="bg-white/10 dark:bg-gray-900/40 p-6 rounded-3xl border border-gray-300/20 dark:border-gray-700/20 shadow-xl">
            <BookOpen className="text-indigo-500 w-6 h-6" />
            <h3 className="font-semibold text-lg mt-2">Cursos Ativos</h3>
            <p className="text-gray-400 text-sm">{cursosEmAndamento.length} em andamento</p>
          </div>

          <div className="bg-white/10 dark:bg-gray-900/40 p-6 rounded-3xl border border-gray-300/20 dark:border-gray-700/20 shadow-xl">
            <Target className="text-indigo-500 w-6 h-6" />
            <h3 className="font-semibold text-lg mt-2">Metas Ativas</h3>
            <p className="text-gray-400 text-sm">{metas.length} metas registradas</p>
          </div>

        </section>

        {/* ===================== CURSOS EM ANDAMENTO ===================== */}
        <section>
          <h2 className="text-2xl font-bold mb-6">📘 Cursos em andamento</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {cursosEmAndamento.map((curso) => (
              <div key={curso.id} className="bg-white/10 dark:bg-gray-900/40 p-6 rounded-2xl border border-gray-300/20 dark:border-gray-700/20 shadow-lg">
                <h3 className="font-semibold text-lg">{curso.nome}</h3>
                <p className="text-gray-400 text-sm mt-1">Carga horária: {curso.horas}</p>

                <div className="mt-4">
                  <p className="text-xs mb-1 text-gray-400">{curso.progresso}% concluído</p>
                  <div className="w-full h-2 bg-gray-700/30 rounded-full">
                    <div
                      className="h-full bg-indigo-500 rounded-full"
                      style={{ width: `${curso.progresso}%` }}
                    ></div>
                  </div>
                </div>

                <button className="mt-4 px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm hover:bg-indigo-500 transition flex items-center gap-2">
                  <PlayCircle className="w-4 h-4" />
                  Continuar estudando
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* ===================== CURSOS CONCLUÍDOS ===================== */}
        <section>
          <h2 className="text-2xl font-bold mb-4">🎉 Cursos concluídos</h2>

          <div className="space-y-4">
            {cursosConcluidos.map((c) => (
              <div
                key={c.id}
                className="bg-white/10 dark:bg-gray-900/40 p-4 rounded-xl border border-gray-300/20 dark:border-gray-700/20 flex items-center justify-between hover:shadow-lg transition"
              >
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="text-green-400" />
                  <p className="font-medium">{c.nome}</p>
                </div>
                <span className="text-xs bg-green-500/20 text-green-300 px-3 py-1 rounded-lg">
                  Concluído
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ===================== METAS DE ESTUDO ===================== */}
        <section>
          <h2 className="text-2xl font-bold mb-4">🏆 Metas de estudo</h2>

          <div className="space-y-4">
            {metas.map((m) => (
              <div key={m.id} className="bg-white/10 dark:bg-gray-900/40 p-4 rounded-xl border border-gray-300/20 dark:border-gray-700/20 flex justify-between items-center">
                <p className="font-medium">{m.nome}</p>
                <span className="text-xs bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-lg">
                  {m.status}
                </span>
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}
