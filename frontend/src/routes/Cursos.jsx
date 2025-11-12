import React from "react";
import { FaRobot, FaLaptopCode, FaGlobe, FaBrain, FaLeaf, FaChartLine } from "react-icons/fa";

export default function Cursos() {
  const cursos = [
    {
      id: 1,
      nome: "Introdução à Inteligência Artificial",
      descricao:
        "Aprenda os fundamentos da IA e descubra como aplicar aprendizado de máquina em soluções do dia a dia.",
      duracao: "4 semanas",
      nivel: "Iniciante",
      icon: FaRobot,
      cor: "text-cyan-500",
    },
    {
      id: 2,
      nome: "Design de Experiências Imersivas (VR/AR)",
      descricao:
        "Crie experiências interativas em realidade virtual e aumentada com foco em usabilidade e inovação.",
      duracao: "6 semanas",
      nivel: "Intermediário",
      icon: FaLaptopCode,
      cor: "text-purple-500",
    },
    {
      id: 3,
      nome: "Sustentabilidade Digital Aplicada",
      descricao:
        "Combine tecnologia e meio ambiente para desenvolver projetos mais sustentáveis e eficientes.",
      duracao: "5 semanas",
      nivel: "Avançado",
      icon: FaGlobe,
      cor: "text-green-500",
    },
    {
      id: 4,
      nome: "Neurotecnologia e Interfaces Cérebro-Computador",
      descricao:
        "Entenda como a mente humana pode interagir com máquinas e impulsionar novas possibilidades cognitivas.",
      duracao: "8 semanas",
      nivel: "Avançado",
      icon: FaBrain,
      cor: "text-indigo-500",
    },
    {
      id: 5,
      nome: "Gestão de Impacto Social e Inovação",
      descricao:
        "Aprenda a planejar e liderar projetos de impacto positivo que unem tecnologia e responsabilidade social.",
      duracao: "4 semanas",
      nivel: "Intermediário",
      icon: FaLeaf,
      cor: "text-pink-500",
    },
    {
      id: 6,
      nome: "Estratégias para o Futuro do Trabalho",
      descricao:
        "Descubra tendências e habilidades essenciais para se destacar em um mercado em constante mudança.",
      duracao: "3 semanas",
      nivel: "Iniciante",
      icon: FaChartLine,
      cor: "text-yellow-500",
    },
  ];

  return (
    <section className="min-h-screen bg-light dark:bg-dark text-light dark:text-dark transition-colors duration-500 pt-5 pt-auto">

      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl font-extrabold text-center mb-12 text-gray-900 dark:text-cyan-400">
          Cursos para o Futuro do Trabalho
        </h1>

        <p className="text-center text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-16">
          Desenvolva habilidades para as novas carreiras digitais e amplie suas oportunidades no mercado.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {cursos.map((curso) => {
            const Icon = curso.icon;
            return (
              <div
                key={curso.id}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1 duration-300 flex flex-col justify-between"
              >
                <div className="p-8 flex flex-col justify-between h-full">
                  <div>
                    <div className={`text-4xl mb-4 ${curso.cor}`}>
                      <Icon />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                      {curso.nome}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-6">
                      {curso.descricao}
                    </p>
                  </div>

                  <div className="mt-auto">
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-6">
                      <span><strong>Duração:</strong> {curso.duracao}</span>
                      <span><strong>Nível:</strong> {curso.nivel}</span>
                    </div>

                    <button className="w-full py-2 bg-cyan-500 text-white rounded-lg font-semibold hover:bg-cyan-600 transition">
                      Inscrever-se
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
