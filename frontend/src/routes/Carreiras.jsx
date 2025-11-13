import React, { useState } from "react";
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
} from "react-icons/fa";

export default function CarreirasFuturas() {
  const initial = [
    {
      id: "curador-ia",
      title: "Curador de Inteligência Artificial",
      icon: <FaRobot className="text-blue-500 text-3xl" />,
      tags: ["IA", "Dados", "Governança"],
      short:
        "Seleciona, valida e organiza modelos, datasets e pipelines para aplicações responsáveis de IA.",
      description:
        "Responsável por selecionar modelos e datasets, validar qualidade e viés, montar pipelines de inferência e documentação. Trabalha com equipes de ML, ética e produto para garantir que modelos em produção entreguem valor sem causar danos.",
    },
    {
      id: "designer-vr-ar",
      title: "Designer de Experiências Imersivas (VR/AR)",
      icon: <FaVrCardboard className="text-purple-500 text-3xl" />,
      tags: ["VR", "AR", "Design"],
      short:
        "Cria experiências 3D imersivas, colaborando com artistas, engenheiros e UX para mundos e interações naturais.",
      description:
        "Projeta experiências imersivas para educação, entretenimento e trabalho remoto. Domina ferramentas 3D, prototipagem de interação e heurísticas de conforto para reduzir enjoo e aumentar engajamento.",
    },
    {
      id: "engenheiro-sustentabilidade",
      title: "Engenheiro de Sustentabilidade Digital",
      icon: <FaLeaf className="text-green-600 text-3xl" />,
      tags: ["Sustentabilidade", "Infra"],
      short:
        "Otimiza infraestrutura e software para reduzir consumo energético e impacto ambiental digital.",
      description:
        "Mapeia impacto energético de serviços, aplica práticas de eficiência, calcula emissões de carbono digitais e propõe arquiteturas e SLAs verdes. Trabalha com operações, cloud e produto para tornar serviços mais sustentáveis.",
    },
    {
      id: "especialista-bci",
      title: "Especialista em Interfaces Cérebro-Computador",
      icon: <FaBrain className="text-pink-500 text-3xl" />,
      tags: ["BCI", "Neurotech"],
      short:
        "Projeta e valida interfaces que conectam sinais neurais a aplicações computacionais.",
      description:
        "Trabalha com aquisição de sinais, processamento em tempo real, segurança e privacidade neural. Atua em pesquisa e produtos que usam EEG, ECoG ou outras tecnologias para comunicação e controle assistivo.",
    },
    {
      id: "gestor-ecossistemas-robos",
      title: "Gestor de Ecossistemas de Robôs",
      icon: <FaCogs className="text-yellow-500 text-3xl" />,
      tags: ["Robótica", "Sistemas"],
      short:
        "Coordena redes de robôs, orquestrando tarefas, telemetria e manutenção colaborativa.",
      description:
        "Define estratégias de escalonamento, simulação e monitoramento para frotas de robôs (delivery, inspeção, manufatura). Garante interoperabilidade, segurança e recuperação de falhas.",
    },
    {
      id: "arquiteto-mundos",
      title: "Arquiteto de Mundos Virtuais",
      icon: <FaGlobe className="text-indigo-500 text-3xl" />,
      tags: ["Mundos Virtuais", "3D", "Economia"],
      short:
        "Projeta economia, narrativa e arquitetura técnica de mundos virtuais persistentes.",
      description:
        "Combina design de jogos, economia tokenizada, infraestrutura distribuída e ferramentas de criação para construir espaços persistentes e sociais com regras, comércio e governança.",
    },
    {
      id: "analista-etica",
      title: "Analista de Ética de Algoritmos",
      icon: <FaBalanceScale className="text-red-500 text-3xl" />,
      tags: ["Ética", "Política"],
      short:
        "Avalia impactos sociais e legais de algoritmos e constrói políticas de mitigação.",
      description:
        "Realiza auditorias algorítmicas, testes de viés, avaliação de impacto e recomenda controles técnicos e processuais. Colabora com jurídico, compliance e produto para `deploy` responsável.",
    },
    {
      id: "desenhista-personalidades-ia",
      title: "Desenhista de Personalidades de IA",
      icon: <FaComments className="text-teal-500 text-3xl" />,
      tags: ["IA", "Design Conversacional"],
      short:
        "Cria identidades conversacionais para agentes e assistentes, definindo tom, limites e persona.",
      description:
        "Projeta personalidade, roteiros de diálogo, fallback e estratégias de escalonamento humano. Testa naturalidade, consistência e aceitabilidade social das interações.",
    },
    {
      id: "gestor-reputacao-digital",
      title: "Gestor de Reputação Digital",
      icon: <FaShieldAlt className="text-amber-500 text-3xl" />,
      tags: ["Reputação", "Trust"],
      short:
        "Monitora e gerencia a presença e reputação de pessoas e marcas em ambientes digitais complexos.",
      description:
        "Implementa estratégias de recuperação, análise de sentimento e políticas de transparência. Trabalha com PR, jurídico e produto para mitigar riscos reputacionais em redes, marketplaces e mundos virtuais.",
    },
    {
      id: "designer-impacto-social",
      title: "Designer de Impacto Social",
      icon: <FaUsers className="text-rose-500 text-3xl" />,
      tags: ["Social", "Design"],
      short:
        "Projeta soluções digitais com foco em impacto social mensurável e inclusão.",
      description:
        "Conduz pesquisas com comunidades, define métricas de impacto, prototipa intervenções e mede resultados. Trabalha com ONGs, governos e empresas para garantir acessibilidade e justiça distributiva.",
    },
  ];

  const [carreiras] = useState(initial);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);

  const resultados = carreiras.filter((c) => {
    const q = query.toLowerCase();
    return (
      c.title.toLowerCase().includes(q) ||
      c.short.toLowerCase().includes(q) ||
      c.tags.join(" ").toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen  from-white to-gray-50 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Cabeçalho */}
        <header className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
            Carreiras do Futuro
          </h1>
          <p className="text-gray-600 text-lg">
            Descubra novas profissões e as habilidades necessárias para o amanhã.
          </p>
        </header>

        {/* Barra de busca */}
        <div className="flex flex-col sm:flex-row gap-3 mb-10 justify-center">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="🔍 Pesquise por cargo, tag ou palavra-chave..."
            className="flex-1 border border-gray-300 rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={() => setQuery("")}
            className="px-5 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Limpar
          </button>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {resultados.map((c) => (
            <div
              key={c.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl p-6 transition transform hover:-translate-y-1 cursor-pointer"
              onClick={() => setSelected(c)}
            >
              <div className="flex items-center gap-4 mb-3">
                {c.icon}
                <h2 className="text-lg font-bold text-gray-800">{c.title}</h2>
              </div>
              <p className="text-gray-600 text-sm mb-4">{c.short}</p>
              <div className="flex flex-wrap gap-2">
                {c.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Mensagem se não encontrar resultados */}
        {resultados.length === 0 && (
          <p className="text-center text-gray-500 mt-10">
            Nenhuma carreira encontrada para essa busca.
          </p>
        )}

        {/* Modal de detalhes */}
        {selected && (
          <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-2xl max-w-3xl w-full p-8 shadow-xl">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold">{selected.title}</h2>
                  <div className="text-sm text-gray-500 mt-1">
                    {selected.tags.join(" • ")}
                  </div>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="text-gray-500 hover:text-red-600 text-xl font-bold"
                >
                  ✕
                </button>
              </div>

              <p className="mt-4 text-gray-700">{selected.description}</p>

              <div className="mt-6 grid sm:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-800">
                    Competências sugeridas
                  </h4>
                  <ul className="list-disc ml-5 text-gray-600 mt-2">
                    <li>Conhecimento técnico relevante</li>
                    <li>Raciocínio crítico e resolução de problemas</li>
                    <li>Colaboração multidisciplinar</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">
                    Primeiros passos
                  </h4>
                  <ul className="list-disc ml-5 text-gray-600 mt-2">
                    <li>Fazer cursos introdutórios e projetos práticos</li>
                    <li>Participar de comunidades e redes profissionais</li>
                    <li>Construir um portfólio focado</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
