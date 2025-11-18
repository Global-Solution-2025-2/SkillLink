import React, { useState, useEffect } from "react";
import {
  FaRobot,
  FaVrCardboard,
  FaLeaf,
  FaBrain,
  FaCogs,
  FaGlobe,
  FaBalanceScale,
  FaComments,
  FaShieldAlt,
  FaUsers,
  FaHeart,
  FaChevronLeft,
  FaChevronRight,
  FaGraduationCap,
  FaClock,
  FaExternalLinkAlt,
  FaSearch,
} from "react-icons/fa";
import { Link } from "react-router-dom";

// Ícones
const ICONS = {
  IA: <FaRobot className="text-blue-500 text-4xl" />,
  VR_AR: <FaVrCardboard className="text-purple-500 text-4xl" />,
  SUSTENTABILIDADE: <FaLeaf className="text-green-600 text-4xl" />,
  NEUROTECH: <FaBrain className="text-pink-500 text-4xl" />,
  ROBOTICA: <FaCogs className="text-yellow-500 text-4xl" />,
  MUNDOS_VIRTUAIS: <FaGlobe className="text-indigo-500 text-4xl" />,
  ETICA: <FaBalanceScale className="text-red-500 text-4xl" />,
  CONVERSACIONAL: <FaComments className="text-teal-500 text-4xl" />,
  REPUTACAO: <FaShieldAlt className="text-amber-500 text-4xl" />,
  SOCIAL: <FaUsers className="text-rose-500 text-4xl" />,
  DESIGN_IMPACTO: <FaHeart className="text-rose-700 text-4xl" />,
  CIBERSEGURANCA: <FaShieldAlt className="text-red-600 text-4xl" />,
};

// 12 profissões
const carreiras = [
  {
    id: 1,
    title: "Curador de Inteligência Artificial",
    icon: ICONS.IA,
    short: "Seleciona, valida e organiza modelos e datasets.",
    tags: ["IA", "Dados", "Governança"],
    cursos: [
      { name: "Fundamentos de IA", level: "Iniciante", duration: "40h" },
      { name: "Machine Learning Aplicado", level: "Intermediário", duration: "60h" },
      { name: "Ética em IA", level: "Avançado", duration: "45h" },
    ],
  },
  {
    id: 2,
    title: "Desenhista de Personalidades de IA",
    icon: ICONS.CONVERSACIONAL,
    short: "Cria identidades conversacionais para agentes inteligentes.",
    tags: ["IA", "Design Conversacional"],
    cursos: [
      { name: "Design Conversacional", level: "Iniciante", duration: "35h" },
      { name: "IA para Chatbots", level: "Intermediário", duration: "50h" },
      { name: "Estratégias Avançadas de Personalidade", level: "Avançado", duration: "45h" },
    ],
  },
  {
    id: 3,
    title: "Especialista em Interfaces Cérebro-Computador",
    icon: ICONS.NEUROTECH,
    short: "Conecta sinais neurais a computadores com tecnologias emergentes.",
    tags: ["BCI", "Neurotech"],
    cursos: [
      { name: "Introdução a Neurotecnologia", level: "Iniciante", duration: "30h" },
      { name: "Processamento de Sinais Neurais", level: "Intermediário", duration: "55h" },
      { name: "Interfaces Cérebro-Computador Avançadas", level: "Avançado", duration: "65h" },
    ],
  },
  {
    id: 4,
    title: "Arquiteto de Mundos Virtuais",
    icon: ICONS.MUNDOS_VIRTUAIS,
    short: "Cria mundos persistentes com economia, regras e narrativa.",
    tags: ["Mundos Virtuais", "3D", "Economia"],
    cursos: [
      { name: "Design de Jogos e Mundos Virtuais", level: "Iniciante", duration: "45h" },
      { name: "Blockchain e Economia Virtual", level: "Intermediário", duration: "50h" },
      { name: "Infraestrutura Distribuída Avançada", level: "Avançado", duration: "70h" },
    ],
  },
  {
    id: 5,
    title: "Designer de Experiências Imersivas (VR/AR)",
    icon: ICONS.VR_AR,
    short: "Cria experiências 3D imersivas em colaboração com UX, artistas e engenheiros.",
    tags: ["VR", "AR", "Design"],
    cursos: [
      { name: "Introdução ao Design 3D", level: "Iniciante", duration: "40h" },
      { name: "UX Imersivo", level: "Intermediário", duration: "55h" },
      { name: "VR/AR Avançado", level: "Avançado", duration: "60h" },
    ],
  },
  {
    id: 6,
    title: "Especialista em Sustentabilidade de IA",
    icon: ICONS.SUSTENTABILIDADE,
    short: "Desenvolve soluções de IA para otimizar recursos e reduzir impacto ambiental.",
    tags: ["Sustentabilidade", "IA", "ESG"],
    cursos: [
      { name: "IA e Meio Ambiente", level: "Iniciante", duration: "35h" },
      { name: "Modelagem de Impacto Climático", level: "Intermediário", duration: "50h" },
      { name: "Governança ESG e Tecnologia", level: "Avançado", duration: "45h" },
    ],
  },
  {
    id: 7,
    title: "Engenheiro de Robótica Autônoma",
    icon: ICONS.ROBOTICA,
    short: "Desenvolve robôs autônomos para diversas aplicações industriais e domésticas.",
    tags: ["Robótica", "Automação", "IA"],
    cursos: [
      { name: "Fundamentos de Robótica", level: "Iniciante", duration: "40h" },
      { name: "Controle de Robôs Autônomos", level: "Intermediário", duration: "55h" },
      { name: "Robótica Avançada com IA", level: "Avançado", duration: "60h" },
    ],
  },
  {
    id: 8,
    title: "Especialista em Ética Tecnológica",
    icon: ICONS.ETICA,
    short: "Avalia impactos sociais, legais e éticos de tecnologias emergentes.",
    tags: ["Ética", "Regulação", "Governança"],
    cursos: [
      { name: "Ética em Tecnologia", level: "Iniciante", duration: "30h" },
      { name: "Regulação e Compliance", level: "Intermediário", duration: "50h" },
      { name: "Gestão Ética de Projetos Tecnológicos", level: "Avançado", duration: "55h" },
    ],
  },
  {
    id: 9,
    title: "Analista de Reputação Digital",
    icon: ICONS.REPUTACAO,
    short: "Gerencia a presença digital e a reputação online de indivíduos e empresas.",
    tags: ["Reputação", "Cibersegurança", "Social"],
    cursos: [
      { name: "Gestão de Redes Sociais", level: "Iniciante", duration: "30h" },
      { name: "Monitoramento de Reputação Online", level: "Intermediário", duration: "50h" },
      { name: "Cibersegurança Aplicada", level: "Avançado", duration: "60h" },
    ],
  },
  {
    id: 10,
    title: "Designer de Impacto Social",
    icon: ICONS.DESIGN_IMPACTO,
    short: "Cria soluções de design voltadas para resolver problemas sociais complexos.",
    tags: ["Social", "Design", "Inovação"],
    cursos: [
      { name: "Design Thinking Social", level: "Iniciante", duration: "35h" },
      { name: "Inovação e Impacto Social", level: "Intermediário", duration: "50h" },
      { name: "Projetos Sociais Avançados", level: "Avançado", duration: "60h" },
    ],
  },
  {
    id: 11,
    title: "Cientista de Dados",
    icon: ICONS.IA,
    short: "Analisa grandes volumes de dados para gerar insights estratégicos.",
    tags: ["Dados", "IA", "Análise"],
    cursos: [
      { name: "Estatística e Probabilidade", level: "Iniciante", duration: "40h" },
      { name: "Data Analytics", level: "Intermediário", duration: "55h" },
      { name: "Machine Learning Avançado", level: "Avançado", duration: "65h" },
    ],
  },
  {
    id: 12,
    title: "Especialista em Cibersegurança",
    icon: ICONS.CIBERSEGURANCA,
    short: "Protege sistemas, redes e dados críticos contra ameaças cibernéticas.",
    tags: ["Segurança", "Ciber", "Redes"],
    cursos: [
      { name: "Fundamentos de Cibersegurança", level: "Iniciante", duration: "40h" },
      { name: "Segurança de Redes", level: "Intermediário", duration: "50h" },
      { name: "Defesa Avançada e Pentest", level: "Avançado", duration: "60h" },
    ],
  },
];

export default function CarreirasCarousel() {
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [cardsPerView, setCardsPerView] = useState(3);

  // Responsivo
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setCardsPerView(1);
      else if (window.innerWidth < 1024) setCardsPerView(2);
      else setCardsPerView(3);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const filtered = carreiras.filter(
    (c) =>
      c.title.toLowerCase().includes(query.toLowerCase()) ||
      c.short.toLowerCase().includes(query.toLowerCase()) ||
      c.tags.join(" ").toLowerCase().includes(query.toLowerCase())
  );

  const totalBlocks = Math.ceil(filtered.length / cardsPerView);

  const prev = () => setIndex((prevIndex) => (prevIndex - 1 + totalBlocks) % totalBlocks);
  const next = () => setIndex((prevIndex) => (prevIndex + 1) % totalBlocks);

  const currentCards = filtered.slice(index * cardsPerView, index * cardsPerView + cardsPerView);

  const renderCard = (c) => (
    <div
      key={c.id}
      className=" bg-white/10  rounded-2xl shadow-lg p-6 flex-1 mx-2 border border-gray-100 dark:border-gray-700 cursor-pointer hover:shadow-xl transition"
      onClick={() => setSelected(c)}
    >
      <div className="flex items-center gap-4 mb-4">{c.icon}</div>
      <h3 className="text-lg font-bold mb-2">{c.title}</h3>
      <p className=" text-sm mb-4">{c.short}</p>
      <div className="flex flex-wrap gap-1.5 mt-auto">
        {c.tags.map((tag, i) => (
          <span key={i} className="text-xs font-medium bg-cyan-800 text-white px-2.5 py-1 rounded-full">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );

  // Quiz section
  const quizSection = (
  <div className="rounded-2xl shadow-lg py-6 px-8 text-center bg-cyan-600 border max-w-7xl mx-auto -mt-4 -mb-15">
    {/* -mt-6 sobe a seção em relação ao conteúdo anterior */}
    <div className="mb-6 flex justify-center">
      <FaBrain className="text-5xl " />
    </div>
    <h2 className="text-2xl text-white font-bold mb-4">
      Descubra Sua Carreira do Futuro
    </h2>
    <p className="mb-6 text-white leading-relaxed">
      Nosso quiz inteligente analisa seus interesses e habilidades para recomendar a carreira mais alinhada com seu perfil.
    </p>
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
      <Link
        to="/quiz"
        className="px-8 py-3 bg-slate-800 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 flex items-center gap-2"
      >
        <FaGraduationCap />
        Fazer Quiz Agora
      </Link>
      <span className="text-sm flex text-white items-center gap-1">
        <FaClock className="text-xs" />
        Apenas 3 minutos
      </span>
    </div>
  </div>
);


  return (
    <div className="min-h-screen pt-8 px-4 sm:px-6 lg:px-8"> {/* pt-12 → pt-8 para subir */}
  <div className="max-w-7xl mx-auto">
    <header className="text-center mb-6"> {/* mb-10 → mb-6 para reduzir espaço abaixo do header */}
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-cyan-600 leading-tight">
        Carreiras do Futuro
      </h1>
      <p className="text-lg max-w-3xl mx-auto leading-relaxed">
        Explore profissões em alta e descubra trilhas de aprendizado para se preparar.
      </p>
    </header>


        {/* Barra de pesquisa */}
<div className="flex justify-center mb-8">
  <div className="relative w-full max-w-2xl">
    <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 " />
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Pesquisar carreira, tecnologia ou área..."
      className="w-full pl-12 pr-4 py-3.5 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm 
                
                 placeholder-gray-500 dark:placeholder-gray-400
                 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition"
    />
  </div>
</div>


        {/* Carousel */}
        <section className="mb-16">
          <div className="flex justify-end mb-4 gap-2">
            <button onClick={prev} className="p-3 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition">
              <FaChevronLeft />
            </button>
            <button onClick={next} className="p-3 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition">
              <FaChevronRight />
            </button>
          </div>

          <div className="flex gap-4">{currentCards.map(renderCard)}</div>
        </section>

        {/* Quiz */}
        <section className="mb-16">{quizSection}</section>

         {/* Modal */}
        {selected && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-center items-center p-4">
            <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200 dark:border-gray-700">
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700">
                      {selected.icon}
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        {selected.title}
                      </h2>
                      <div className="flex flex-wrap gap-2">
                        {selected.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full border border-gray-200 dark:border-gray-600"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelected(null)}
                    className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors text-xl"
                  >
                    &times;
                  </button>
                </div>

                <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-8 border-b border-gray-200 dark:border-gray-700 pb-6">
                  {selected.short}
                </p>

                <div>
                  <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                    <FaGraduationCap className="text-blue-500" />
                    Trilha de Aprendizado Recomendada
                  </h3>
                  <div className="space-y-4">
                    {selected.cursos.map((curso, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-700 transition-colors"
                      >
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                          <span className="text-blue-600 dark:text-blue-400 font-bold text-sm">{i + 1}</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-1">{curso.name}</h4>
                          <div className="flex items-center gap-4 text-sm">
                            <span
                              className={`font-medium px-2.5 py-1 rounded-full ${
                                curso.level === "Iniciante"
                                  ? "bg-green-100 text-green-700 dark:bg-green-700/30 dark:text-green-300"
                                  : curso.level === "Intermediário"
                                  ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-700/30 dark:text-yellow-300"
                                  : "bg-red-100 text-red-700 dark:bg-red-700/30 dark:text-red-300"
                              }`}
                            >
                              {curso.level}
                            </span>
                            <span className="text-gray-500 dark:text-gray-400 flex items-center gap-1">
                              <FaClock className="text-xs" />
                              {curso.duration}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
