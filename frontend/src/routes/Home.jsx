import React from "react";
import { 
  FaRobot, FaLaptopCode, FaGlobe, FaBrain, FaScroll, 
  FaCalendarAlt, FaGraduationCap, FaLightbulb, FaBriefcase 
} from 'react-icons/fa';
import { BsArrowRight } from 'react-icons/bs';

const Home = () => {

  // 🔵 Se essas variáveis estão no seu arquivo de estilos, deixe como estão:
  const primaryAccent = "text-cyan-600 dark:text-cyan-400";
  const buttonStyleTransparent = "border border-cyan-500 text-cyan-600 dark:text-cyan-300 dark:border-cyan-400";

  const profissoes = [
    { nome: "Curador de Inteligência Artificial", skills: ["Machine Learning", "Big Data"], icon: FaRobot, color: "text-red-500" },
    { nome: "Designer de Experiências Imersivas (VR/AR)", skills: ["Realidade Virtual", "UX/UI"], icon: FaLaptopCode, color: "text-yellow-500" },
    { nome: "Engenheiro de Sustentabilidade Digital", skills: ["IoT", "Soluções Sustentáveis"], icon: FaGlobe, color: "text-green-500" },
  ];

  const cursos = [
    { nome: "Introdução à Inteligência Artificial", duracao: "4 semanas", icon: FaRobot },
    { nome: "Design de Experiências Imersivas", duracao: "6 semanas", icon: FaLaptopCode },
    { nome: "Sustentabilidade Digital Aplicada", duracao: "5 semanas", icon: FaGlobe },
  ];

  const eventos = [
    { nome: "Webinar: Profissões do Futuro", data: "15/12/2025", icon: FaCalendarAlt },
    { nome: "Feira de Networking em Tecnologia", data: "20/12/2025", icon: FaCalendarAlt },
  ];

  const primaryColor = "text-gray-800 dark:text-cyan-400"; 

  return (
    <div className="min-h-screen bg-light dark:bg-dark text-light dark:text-dark transition-colors duration-500">

      {/* 🌟 HEADER INSERIDA AQUI */}
      <header className="py-20 md:py-32  border-gray-300 dark:border-gray-700  shadow-gray-200/50 dark:shadow-indigo-900/50">
        <div className="max-w-4xl mx-auto px-6 text-center">
            <p className="text-md font-semibold mb-3 tracking-widest uppercase text-cyan-600 dark:text-cyan-400 flex justify-center items-center">
                <FaLightbulb className="mr-2 text-xl" />
                Onde o Conhecimento Encontra o Futuro
            </p>

            <h1 className="text-5xl md:text-6xl font-extrabold mb-5 leading-tight">
                Prepare-se para as <span className={primaryAccent}>Profissões do Amanhã</span>.
            </h1>

            <p className="text-xl opacity-80 mb-10 max-w-3xl mx-auto text-gray-600"> 
              Qualifique-se com cursos de ponta e encontre vagas nas áreas mais inovadoras: IA, VR/AR, e Sustentabilidade.
            </p>

            <div className="flex justify-center gap-6">
                <a 
                  href="/cursos" 
                  className={`inline-flex items-center ${buttonStyleTransparent} py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition duration-300 ease-in-out`}
                >
                    Explorar Cursos <BsArrowRight className="ml-2 text-xl" />
                </a>

                <a 
                  href="/vagas" 
                  className={`inline-flex items-center ${buttonStyleTransparent} py-3 px-8 rounded-full transition duration-300 ease-in-out`}
                >
                    Ver Vagas <FaBriefcase className="ml-2" />
                </a>
            </div>
        </div>
      </header>
      {/* 🌟 FIM DA HEADER */}

      {/* 🔽 Conteúdo original continua igual */}
      <main className="max-w-7xl mx-auto px-6 py-20">

        {/* Profissões em Destaque 🌟 */}
        <section className="mb-24">
          <h2 className={`text-4xl font-extrabold mb-12 text-center ${primaryColor}`}>
             Profissões em Destaque
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {profissoes.map((profissao, index) => (
              <div
                key={index}
                className="p-8 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-xl dark:shadow-inner dark:shadow-cyan-900/40 hover:shadow-2xl hover:border-cyan-500 dark:hover:border-cyan-600 transform hover:-translate-y-1 transition duration-300 cursor-pointer"
              >
                <div className={`text-4xl mb-4 ${profissao.color}`}>
                    <profissao.icon />
                </div>

                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100">{profissao.nome}</h3>

                <p className="text-sm font-semibold mb-3 text-gray-600 dark:text-gray-400">
                  Habilidades Essenciais:
                </p>

                <div className="flex flex-wrap gap-2">
                  {profissao.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-cyan-100 dark:bg-gray-700 text-cyan-800 dark:text-cyan-300 rounded-full text-xs font-medium border border-cyan-300 dark:border-cyan-600 transition"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a 
                href="/carreiras" 
                className="inline-flex items-center bg-cyan-500 text-white dark:bg-cyan-700 dark:text-gray-100 font-bold py-3 px-6 rounded-full shadow-lg hover:bg-cyan-600 dark:hover:bg-cyan-600 transform hover:scale-105 transition duration-300 ease-in-out"
            >
                Explore Todas as Profissões <BsArrowRight className="ml-2 text-xl" />
            </a>
          </div>
        </section>

        {/* Cursos */}
        <section className={`mb-24 bg-gray-50 dark:bg-gray-900 p-10 rounded-3xl shadow-lg dark:shadow-inner dark:shadow-blue-900/30`}>
          <h2 className={`text-4xl font-extrabold mb-12 text-center ${primaryColor}`}>
            <FaGraduationCap className="inline-block mr-3 text-3xl align-top" />
             Cursos para o Amanhã
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {cursos.map((curso, index) => (
              <div
                key={index}
                className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-600 transform hover:scale-[1.02] transition duration-300"
              >
                <div className="flex items-center mb-3">
                    <curso.icon className="text-3xl text-blue-600 dark:text-blue-400 mr-3" />
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">{curso.nome}</h3>
                </div>

                <p className="text-gray-600 dark:text-gray-400">
                    <span className="font-semibold">Duração:</span> {curso.duracao}
                </p>

                <button className="mt-4 w-full py-2 text-sm font-semibold bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                    Ver Detalhes
                </button>

              </div>
            ))}
          </div>
        </section>

        {/* Eventos */}
        <section>
          <h2 className={`text-4xl font-extrabold mb-12 text-center ${primaryColor}`}>
             <FaCalendarAlt className="inline-block mr-3 text-3xl align-top" />
             Próximos Eventos e Networking
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {eventos.map((evento, index) => (
              <div
                key={index}
                className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border-l-4 border-cyan-500 dark:border-teal-400 hover:shadow-xl transition duration-300"
              >
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">{evento.nome}</h3>

                <p className="text-gray-600 dark:text-gray-400">
                    <span className="font-semibold">Data:</span> {evento.data}
                </p>

                <button className="mt-4 py-2 px-4 text-sm font-semibold border border-cyan-500 text-cyan-500 rounded-lg hover:bg-cyan-500 hover:text-white transition">
                    Inscrever-se
                </button>

              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
};

export default Home;
