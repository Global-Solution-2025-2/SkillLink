import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Brain, Cpu, Globe, Zap, Code, Palette, Sparkles } from "lucide-react";

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState(null);

  const questions = [
    {
      id: 1,
      question: "Qual dessas áreas mais te interessa?",
      options: [
        { id: 'a', text: "Tecnologia e Inteligência Artificial", icon: <Cpu className="w-5 h-5" />, career: "Curador de Inteligência Artificial" },
        { id: 'b', text: "Realidade Virtual e Aumentada", icon: <Globe className="w-5 h-5" />, career: "Designer de Experiências Imersivas" },
        { id: 'c', text: "Sustentabilidade e Meio Ambiente", icon: <Zap className="w-5 h-5" />, career: "Engenheiro de Sustentabilidade Digital" },
        { id: 'd', text: "Neurociência e Interfaces", icon: <Brain className="w-5 h-5" />, career: "Especialista em Interfaces Cérebro-Computador" },
        { id: 'e', text: "Robótica e Automação", icon: <Code className="w-5 h-5" />, career: "Gestor de Ecossistemas de Robôs" },
        { id: 'f', text: "Mundos Virtuais e Metaverso", icon: <Palette className="w-5 h-5" />, career: "Arquiteto de Mundos Virtuais" }
      ]
    },
    {
      id: 2,
      question: "Como você gosta de resolver problemas?",
      options: [
        { id: 'a', text: "Analisando dados e padrões", career: "Curador de Inteligência Artificial" },
        { id: 'b', text: "Criando experiências visuais e interativas", career: "Designer de Experiências Imersivas" },
        { id: 'c', text: "Pensando em soluções sustentáveis", career: "Engenheiro de Sustentabilidade Digital" },
        { id: 'd', text: "Explorando novas formas de interação", career: "Especialista em Interfaces Cérebro-Computador" },
        { id: 'e', text: "Automatizando processos e fluxos", career: "Gestor de Ecossistemas de Robôs" },
        { id: 'f', text: "Construindo ambientes e narrativas", career: "Arquiteto de Mundos Virtuais" }
      ]
    },
    {
      id: 3,
      question: "Qual ambiente de trabalho você prefere?",
      options: [
        { id: 'a', text: "Laboratório de dados e algoritmos", career: "Curador de Inteligência Artificial" },
        { id: 'b', text: "Estúdio criativo com tecnologia de ponta", career: "Designer de Experiências Imersivas" },
        { id: 'c', text: "Projetos com impacto ambiental positivo", career: "Engenheiro de Sustentabilidade Digital" },
        { id: 'd', text: "Pesquisa em laboratório avançado", career: "Especialista em Interfaces Cérebro-Computador" },
        { id: 'e', text: "Fábricas e linhas de produção inteligentes", career: "Gestor de Ecossistemas de Robôs" },
        { id: 'f', text: "Ambientes digitais e plataformas virtuais", career: "Arquiteto de Mundos Virtuais" }
      ]
    },
    {
      id: 4,
      question: "O que mais te motiva no trabalho?",
      options: [
        { id: 'a', text: "Resolver problemas complexos com tecnologia", career: "Curador de Inteligência Artificial" },
        { id: 'b', text: "Criar experiências imersivas e inovadoras", career: "Designer de Experiências Imersivas" },
        { id: 'c', text: "Contribuir para um futuro mais sustentável", career: "Engenheiro de Sustentabilidade Digital" },
        { id: 'd', text: "Expandir os limites da interação humano-máquina", career: "Especialista em Interfaces Cérebro-Computador" },
        { id: 'e', text: "Otimizar processos e aumentar eficiência", career: "Gestor de Ecossistemas de Robôs" },
        { id: 'f', text: "Construir universos digitais completos", career: "Arquiteto de Mundos Virtuais" }
      ]
    },
    {
      id: 5,
      question: "Qual habilidade você gostaria de desenvolver mais?",
      options: [
        { id: 'a', text: "Análise de dados e machine learning", career: "Curador de Inteligência Artificial" },
        { id: 'b', text: "Design 3D e desenvolvimento de interfaces", career: "Designer de Experiências Imersivas" },
        { id: 'c', text: "Gestão de projetos sustentáveis", career: "Engenheiro de Sustentabilidade Digital" },
        { id: 'd', text: "Programação de sistemas neurais", career: "Especialista em Interfaces Cérebro-Computador" },
        { id: 'e', text: "Programação de robôs e automação", career: "Gestor de Ecossistemas de Robôs" },
        { id: 'f', text: "Narrativa e design de jogos", career: "Arquiteto de Mundos Virtuais" }
      ]
    },
    {
      id: 6,
      question: "Como você lida com desafios éticos?",
      options: [
        { id: 'a', text: "Analisando dados para identificar vieses", career: "Curador de Inteligência Artificial" },
        { id: 'b', text: "Criando experiências inclusivas e acessíveis", career: "Designer de Experiências Imersivas" },
        { id: 'c', text: "Desenvolvendo tecnologias verdes e éticas", career: "Engenheiro de Sustentabilidade Digital" },
        { id: 'd', text: "Estabelecendo limites para neurotecnologias", career: "Especialista em Interfaces Cérebro-Computador" },
        { id: 'e', text: "Implementando segurança em sistemas robóticos", career: "Gestor de Ecossistemas de Robôs" },
        { id: 'f', text: "Criando regras e governança para mundos virtuais", career: "Arquiteto de Mundos Virtuais" }
      ]
    },
    {
      id: 7,
      question: "Qual tipo de projeto te anima mais?",
      options: [
        { id: 'a', text: "Treinar modelos de IA precisos e justos", career: "Curador de Inteligência Artificial" },
        { id: 'b', text: "Desenvolver aplicações de realidade aumentada", career: "Designer de Experiências Imersivas" },
        { id: 'c', text: "Reduzir pegada de carbono digital", career: "Engenheiro de Sustentabilidade Digital" },
        { id: 'd', text: "Criar interfaces cérebro-computador", career: "Especialista em Interfaces Cérebro-Computador" },
        { id: 'e', text: "Coordenar equipes de robôs colaborativos", career: "Gestor de Ecossistemas de Robôs" },
        { id: 'f', text: "Construir economias virtuais funcionais", career: "Arquiteto de Mundos Virtuais" }
      ]
    }
  ];

  const profissõesData = {
    "Curador de Inteligência Artificial": {
      descricao: "Profissional especializado em organizar, revisar e selecionar dados para treinamento de modelos de IA, garantindo qualidade e reduzindo vieses algorítmicos.",
      cursos: [
        "Fundamentos de Curadoria de IA",
        "Treinamento e Avaliação de Modelos",
        "Gerenciamento de Bases e Desvios Algorítmicos"
      ],
      habilidades: ["Análise de dados", "Machine Learning", "Ética em IA", "Gestão de datasets"],
      icon: <Cpu className="w-10 h-10" />,
      salario: "R$ 8.000 - R$ 15.000",
      demanda: "Alta"
    },
    "Designer de Experiências Imersivas": {
      descricao: "Criador de ambientes virtuais e experiências em VR/AR, desenvolvendo interfaces intuitivas e narrativas envolventes para diversos contextos.",
      cursos: [
        "Introdução ao Design Imersivo",
        "Prototipação em Realidade Aumentada",
        "Ambientes Virtuais em Realidade Virtual"
      ],
      habilidades: ["Design 3D", "UX/UI", "Prototipagem", "Narrativa interativa"],
      icon: <Globe className="w-10 h-10" />,
      salario: "R$ 7.000 - R$ 12.000",
      demanda: "Crescente"
    },
    "Engenheiro de Sustentabilidade Digital": {
      descricao: "Especialista em desenvolver soluções tecnológicas que reduzem o impacto ambiental, otimizando recursos e promovendo práticas sustentáveis.",
      cursos: [
        "Sustentabilidade e Tecnologia Digital",
        "Infraestrutura Verde e Computação Eficiente",
        "Políticas Climáticas e Digitalização"
      ],
      habilidades: ["Análise de impacto", "Otimização energética", "ESG", "Inovação sustentável"],
      icon: <Zap className="w-10 h-10" />,
      salario: "R$ 9.000 - R$ 16.000",
      demanda: "Muito Alta"
    },
    "Especialista em Interfaces Cérebro-Computador": {
      descricao: "Pioneiro no desenvolvimento de tecnologias que conectam o cérebro humano a dispositivos digitais, criando novas formas de interação.",
      cursos: [
        "Introdução a Interfaces Cérebro-Computador",
        "Sinais Neurais e Interpretação de Dados",
        "Desenvolvimento de Aplicações BCI"
      ],
      habilidades: ["Neurociência", "Processamento de sinais", "Programação BCI", "Pesquisa aplicada"],
      icon: <Brain className="w-10 h-10" />,
      salario: "R$ 10.000 - R$ 18.000",
      demanda: "Emergente"
    },
    "Gestor de Ecossistemas de Robôs": {
      descricao: "Profissional responsável por coordenar e otimizar a operação de sistemas robóticos em ambientes colaborativos.",
      cursos: [
        "Robôs no Ecossistema Digital",
        "Sistemas Colaborativos entre Humanos e Robôs",
        "Automação Avançada e Orquestração de Robôs"
      ],
      habilidades: ["Programação robótica", "Gestão de sistemas", "Automação", "Coordenação de equipes"],
      icon: <Code className="w-10 h-10" />,
      salario: "R$ 8.500 - R$ 14.000",
      demanda: "Alta"
    },
    "Arquiteto de Mundos Virtuais": {
      descricao: "Criador de universos digitais completos, desenvolvendo desde a estrutura física até as regras sociais e econômicas.",
      cursos: [
        "Princípios de Mundos Virtuais",
        "Construção de Ambientes 3D",
        "Narrativa e Sistemas Interativos"
      ],
      habilidades: ["Design 3D", "Game Design", "Narrativa", "Economia virtual"],
      icon: <Palette className="w-10 h-10" />,
      salario: "R$ 7.500 - R$ 13.000",
      demanda: "Crescente"
    }
  };

  const handleAnswer = (option) => {
    const newAnswers = {
      ...answers,
      [currentQuestion]: option
    };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResult(newAnswers);
    }
  };

  const calculateResult = (answers) => {
    const careerCount = {};
    
    Object.values(answers).forEach(answer => {
      careerCount[answer.career] = (careerCount[answer.career] || 0) + 1;
    });

    let maxCount = 0;
    let resultCareer = "";
    
    Object.entries(careerCount).forEach(([career, count]) => {
      if (count > maxCount) {
        maxCount = count;
        resultCareer = career;
      }
    });

    setResult(resultCareer);
    setShowResult(true);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResult(false);
    setResult(null);
  };

  if (showResult && result) {
    const profissão = profissõesData[result];
    
    return (
      <div className="w-full font-sans min-h-screen flex items-center justify-center ">
        <section className="max-w-4xl mx-auto px-6 py-8 text-center flex flex-col items-center gap-6">
          <div className="p-4 bg-cyan-600 rounded-full text-white">
            {profissão.icon}
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold leading-tight ">
            Sua profissão do futuro é<br />
            <span className="text-cyan-400">
              {result}
            </span>
          </h1>

          <div className="mt-4 p-6 rounded-2xl bg-slate-800 border border-cyan-600/30 backdrop-blur-lg shadow-lg w-full max-w-2xl">
            <p className="text-white text-base leading-relaxed mb-4">
              {profissão.descricao}
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
              <div className="text-center p-3 bg-slate-700 rounded-lg">
                <div className="text-cyan-400 font-semibold">Salário Inicial</div>
                <div className="text-white">{profissão.salario}</div>
              </div>
              <div className="text-center p-3 bg-slate-700 rounded-lg">
                <div className="text-cyan-400 font-semibold">Demanda</div>
                <div className="text-white">{profissão.demanda}</div>
              </div>
            </div>
            
            <div className="text-left">
              <h3 className="text-lg font-semibold mb-3 text-cyan-400">Cursos Recomendados:</h3>
              <ul className="text-white space-y-1 mb-4 text-sm">
                {profissão.cursos.map((curso, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Sparkles className="w-3 h-3 text-cyan-400" />
                    {curso}
                  </li>
                ))}
              </ul>
              
              <h3 className="text-lg font-semibold mb-3 text-cyan-400">Habilidades Principais:</h3>
              <div className="flex flex-wrap gap-1">
                {profissão.habilidades.map((habilidade, index) => (
                  <span key={index} className="px-2 py-1 bg-cyan-600/20 border border-cyan-600/50 rounded-full text-cyan-300 text-xs">
                    {habilidade}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-4">
            <button
              onClick={restartQuiz}
              className="px-6 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg text-base font-medium text-white transition shadow-md"
            >
              Refazer Quiz
            </button>
            <Link
              to="/cursos"
              className="inline-flex items-center gap-2 px-6 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg text-base font-medium text-white transition shadow-md hover:shadow-cyan-400/50"
            >
              Ver Cursos
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="w-full font-sans min-h-screen flex items-center justify-center ">
      {/* ============================= QUIZ ============================= */}
      <section className="max-w-4xl mx-auto px-6 py-8 text-center flex flex-col items-center gap-6">
        <h1 className="text-3xl md:text-4xl font-bold leading-tight ">
          Descubra qual<br />
          <span className="text-cyan-400">
            profissão do futuro
          </span>
          <br />combina com você
        </h1>

        <p className="text-base max-w-xl">
          Responda {questions.length} perguntas rápidas e descubra qual carreira inovadora 
          tem mais a ver com seu perfil.
        </p>

        {/* Progress Bar */}
        <div className="w-full max-w-md bg-gray-700 rounded-full h-2 mb-4">
          <div 
            className="bg-cyan-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          ></div>
        </div>

        {/* Question Card */}
        <div className="w-full max-w-2xl p-6 rounded-2xl bg-slate-800 border border-cyan-600/30 backdrop-blur-lg shadow-lg">
          <h2 className="text-xl font-bold text-white mb-6">
            {questions[currentQuestion].question}
          </h2>

          <div className="grid grid-cols-2 gap-3">
            {questions[currentQuestion].options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleAnswer(option)}
                className="p-4 text-left rounded-lg bg-slate-700 border border-cyan-600/20 hover:border-cyan-600/50 hover:bg-slate-600 transition-all duration-200 group"
              >
                <div className="flex items-center gap-2">
                  {option.icon && (
                    <div className="text-cyan-400 group-hover:text-cyan-300 transition-colors">
                      {option.icon}
                    </div>
                  )}
                  <span className="text-white text-sm font-medium group-hover:text-cyan-100">
                    {option.text}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className=" text-sm">
          Pergunta {currentQuestion + 1} de {questions.length}
        </div>
      </section>
    </div>
  );
}