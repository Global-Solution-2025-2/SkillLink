import React from "react";
import {
  FaLaptopCode,
  FaLeaf,
  FaGlobeAmericas,
  FaNewspaper,
  FaBolt,
  FaCode,
  FaUsers,
  FaTools,
  FaRegLightbulb,
  FaHandsHelping,
} from "react-icons/fa";

export default function PortalFuturoTrabalho() {
  const noticiaPrincipal = {
    titulo: "HomeSync promete revolucionar o futuro do trabalho híbrido",
    resumo:
      "Mesa inteligente monitora postura, luz, ruído e conforto para aumentar produtividade e bem-estar.",
    conteudo:
      "A HomeSync – Estação de Trabalho Inteligente – chega como uma solução inovadora para ambientes híbridos, coworkings e profissionais que buscam mais ergonomia e eficiência. Com sensores de luminosidade, ruído, postura e temperatura, a mesa envia dados ao FIWARE e emite alertas automáticos de ergonomia, cansaço visual e distrações. O sistema também gera um Índice de Produtividade do Ambiente (IPA), que avalia a qualidade do espaço de trabalho em tempo real.",
  };

  const tecnologiasAtualidades = [
  {
    id: 1,
    titulo: "Inteligência Artificial",
    resumo: "Modelos de IA estão transformando setores como saúde, finanças e educação.",
    icone: FaLaptopCode,
  },
  {
    id: 2,
    titulo: "Computação em Nuvem",
    resumo: "Serviços em nuvem evoluem para serem mais seguros, rápidos e colaborativos.",
    icone: FaCode,
  },
  {
    id: 3,
    titulo: "Sustentabilidade & ESG",
    resumo: "Empresas adotam práticas verdes, impulsionando inovação e tecnologia limpa.",
    icone: FaLeaf,
  },
  {
    id: 4,
    titulo: "Metaverso e XR",
    resumo: "O crescimento das experiências digitais imersivas vem transformando a forma como interagimos com a tecnologia",
    icone: FaGlobeAmericas,
  },
];


  const artigos = [
    {
      id: 1,
      titulo: "Habilidades Essenciais até 2030",
      resumo:
        "Descubra as competências que o mercado vai demandar nos próximos anos.",
    },
    {
      id: 2,
      titulo: "IA e Inclusão Digital",
      resumo:
        "Como a tecnologia pode gerar oportunidades para todos.",
    },
    {
      id: 3,
      titulo: "Soft Skills na Era da IA",
      resumo:
        "Habilidades humanas como criatividade e pensamento crítico continuam em alta.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 font-sans">

      {/* ===================== NOTÍCIA PRINCIPAL ===================== */}
      <section className="group">
        <div className="relative overflow-hidden bg-white dark:bg-slate-800 p-8 md:p-12 rounded-3xl shadow-2xl shadow-cyan-500/10 dark:shadow-slate-700/30 border-t-4 border-cyan-500 transition duration-300 transform group-hover:scale-[1.01]">
          <div className="absolute inset-0 opacity-15 dark:opacity-5 bg-[url('../src/assets/smart-desk.avif')] bg-cover bg-center"></div>
          <div className="relative z-10 text-left">
            <span className="inline-block px-3 py-1 mb-3 text-sm font-semibold text-white bg-cyan-600 rounded-full">
              DESTAQUE DA SEMANA
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-gray-900 dark:text-white leading-snug">
              {noticiaPrincipal.titulo}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 text-lg mb-4">
              {noticiaPrincipal.resumo}
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed max-w-4xl">
              {noticiaPrincipal.conteudo}
            </p>
            <button className="mt-6 inline-flex items-center px-8 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-xl transition shadow-lg hover:shadow-cyan-500/50">
              Ler matéria completa →
            </button>
          </div>
        </div>
      </section>

      {/* ===================== TECNOLOGIAS EM DESTAQUE ===================== */}
      <section>
        <h2 className="text-3xl font-bold mb-10 text-cyan-600 text-center flex items-center justify-center gap-3">
          <FaRegLightbulb className="text-yellow-500" />
          Tendências Tecnológicas
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tecnologiasAtualidades.map((t) => {
            const Icon = t.icone;
            return (
              <div
                key={t.id}
                className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-md hover:shadow-cyan-400/20 transition duration-300 transform hover:-translate-y-1 group"
              >
                <div className="flex items-center gap-4 mb-3">
                  <Icon className="w-8 h-8 text-cyan-600 dark:text-cyan-400 group-hover:scale-110 transition" />
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-cyan-600 transition">
                    {t.titulo}
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm leading-relaxed">
                  {t.resumo}
                </p>
                <button className="mt-4 text-sm font-semibold text-cyan-600 hover:text-cyan-500">
                  Ver detalhe →
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* ===================== ARTIGOS ===================== */}
      <section>
        <h2 className="text-3xl font-bold mb-10 text-cyan-600 text-center flex items-center justify-center gap-3">
          <FaHandsHelping className="text-purple-500" />
          Desenvolvimento & Soft Skills
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {artigos.map((a) => (
            <div
              key={a.id}
              className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-cyan-600 shadow-sm hover:shadow-cyan-400/20 transition duration-300"
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{a.titulo}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-3">{a.resumo}</p>
              <button className="mt-5 text-sm font-semibold text-cyan-600 hover:text-cyan-500 transition">
                Ler artigo completo →
              </button>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
