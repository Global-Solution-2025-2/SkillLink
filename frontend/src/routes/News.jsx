import React from "react";

export default function PortalFuturoTrabalho() {

  const artigos = [
    {
      id: 1,
      titulo: "Habilidades Essenciais até 2030",
      resumo: "Descubra as competências que o mercado vai demandar nos próximos anos e como se preparar.",
    },
    {
      id: 2,
      titulo: "IA e Inclusão Digital",
      resumo: "Como a tecnologia pode gerar oportunidades para todos, promovendo inclusão no mercado.",
    },
    {
      id: 3,
      titulo: "Profissões Emergentes",
      resumo: "Quais carreiras estarão em alta nos próximos anos e como se antecipar às mudanças.",
    },
    {
      id: 4,
      titulo: "Soft Skills que Valem Ouro na Era da IA",
      resumo: "Conheça as habilidades humanas — como criatividade e pensamento crítico — que a tecnologia não substitui.",
    },
  ];

  const noticias = [
    { id: 1, titulo: "Mercado de TI cresce 20% em 2025", fonte: "TechNews" },
    { id: 2, titulo: "Startups verdes atraem investimentos", fonte: "EcoTrends" },
    { id: 3, titulo: "Trabalho remoto: novas regulamentações", fonte: "GlobalWork" },
  ];

  const dicas = [
    { id: 1, titulo: "Aprenda a programar com Python", descricao: "A linguagem mais usada para IA e automação." },
    { id: 2, titulo: "Participe de hackathons", descricao: "Networking e experiência prática garantida." },
    { id: 3, titulo: "Atualize seu LinkedIn", descricao: "Mantenha seu perfil alinhado com as tendências." },
    { id: 4, titulo: "Domine as Ferramentas de Colaboração", descricao: "Aprenda a usar plataformas como Notion, Slack e Miro para trabalhar em equipes híbridas." },
  ];

  const profissoesDestaque = [
    {
      id: 1,
      titulo: "Engenheiro de Prompt",
      descricao: "Elabora comandos para IAs, maximizando performance e criatividade.",
      area: "Inteligência Artificial",
    },
    {
      id: 2,
      titulo: "Designer de UX de Metaverso",
      descricao: "Cria ambientes e interações imersivas e intuitivas em realidades virtuais.",
      area: "Realidade Estendida",
    },
    {
      id: 3,
      titulo: "Consultor de Sustentabilidade (ESG)",
      descricao: "Orienta empresas na adoção de práticas ambientais, sociais e de governança.",
      area: "Economia Verde",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 pt-28 pb-20 space-y-16">

      {/* ===================== BANNER PRINCIPAL ===================== */}
      <section className="text-center mt-auto mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">
          Portal do Futuro do Trabalho
        </h1>
        <p className="mt-4 text-gray-600 dark:text-gray-300 text-lg">
          Descubra tendências, novas profissões e habilidades essenciais para o mercado do futuro
        </p>
        <button className="mt-6 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition">
          Explorar Tendências
        </button>
      </section>

      {/* ===================== PROFISSÕES EM DESTAQUE - NOVO! ===================== */}
      <section>
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          ✨ Oportunidades em Destaque: Profissões do Amanhã
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {profissoesDestaque.map((p) => (
            <div key={p.id} className="bg-white/10 dark:bg-gray-900/40 backdrop-blur-xl p-6 rounded-2xl border border-indigo-300/40 dark:border-indigo-700/40 shadow-xl hover:shadow-indigo-500/40 transition">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">{p.area}</span>
              <h3 className="text-xl font-bold mt-2">{p.titulo}</h3>
              <p className="text-gray-400 dark:text-gray-300 mt-3 text-sm">{p.descricao}</p>
              <button className="mt-4 text-indigo-400 hover:text-indigo-300 font-semibold text-sm">
                Saiba mais →
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* --- SEPARADOR --- */}
      <hr className="border-gray-200 dark:border-gray-700" />

      {/* ===================== ARTIGOS ===================== */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Artigos Recentes</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"> {/* Mudança para 4 colunas */}
          {artigos.map((a) => (
            <div key={a.id} className="bg-white/10 dark:bg-gray-900/40 backdrop-blur-xl p-6 rounded-2xl border border-gray-300/20 dark:border-gray-700/20 shadow-lg hover:shadow-indigo-500/20 transition flex flex-col justify-between">
              <h3 className="text-lg font-bold">{a.titulo}</h3>
              <p className="text-gray-400 dark:text-gray-300 mt-3 text-sm">{a.resumo}</p>
              <button className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-500 transition text-sm">
                Ler mais
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* --- SEPARADOR --- */}
      <hr className="border-gray-200 dark:border-gray-700" />

      {/* ===================== NOTÍCIAS ===================== */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Notícias & Tendências</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {noticias.map((n) => (
            <div key={n.id} className="bg-white/10 dark:bg-gray-900/40 p-4 rounded-xl border border-gray-300/20 dark:border-gray-700/20 hover:shadow-lg transition">
              <h3 className="font-semibold">{n.titulo}</h3>
              <p className="text-xs text-gray-400 mt-1">{n.fonte}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- SEPARADOR --- */}
      <hr className="border-gray-200 dark:border-gray-700" />

      {/* ===================== DICAS ===================== */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Dicas Rápidas</h2>
        <div className="grid md:grid-cols-4 gap-4"> {/* Mudança para 4 colunas */}
          {dicas.map((d) => (
            <div key={d.id} className="bg-white/10 dark:bg-gray-900/40 p-4 rounded-xl border border-gray-300/20 dark:border-gray-700/20 hover:shadow-lg transition">
              <h3 className="font-semibold">{d.titulo}</h3>
              <p className="text-sm text-gray-400 mt-1">{d.descricao}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== RECURSOS ===================== */}
      <section className="text-center mt-16">
        <h2 className="text-2xl font-bold mb-4">Recursos Recomendados</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">Explore cursos, bootcamps e materiais para se manter atualizado.</p>
        <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition">
          Ver Recursos
        </button>
      </section>

    </div>
  );
}