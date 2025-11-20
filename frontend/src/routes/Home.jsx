import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Rocket, BookOpen, Users, MessageCircle } from "lucide-react";

export default function Home() {
  return (
    <div className="w-full font-sans">

      {/* ============================= HERO ============================= */}
<section className="max-w-7xl mx-auto px-6 pt-24 pb-16 text-center flex flex-col items-center gap-6">
  <h1 className="text-4xl md:text-6xl font-bold leading-tight ">
    Construa sua jornada nas <br />
    <span className="bg-clip-text text-cyan-600">
      Profissões do Futuro
    </span>
  </h1>

  <p className="mt-4 md:mt-6 text-lg max-w-2xl">
    Na SkillLink, você encontra cursos inovadores e trilhas de aprendizado que conectam
    tecnologia, negócios e criatividade. Prepare-se para carreiras que transformam
    o mundo e aceleram sua evolução profissional.
  </p>

  {/* CTA Button */}
  <Link
    to="/cursos"
    className="inline-flex items-center gap-2 px-8 py-3 bg-cyan-600 hover:bg-cyan-700 rounded-xl text-lg font-medium text-white transition shadow-md hover:shadow-cyan-400/50 mt-6"
  >
    Conhecer Cursos
    <ArrowRight className="w-5 h-5" />
  </Link>
</section>


      {/* DIVISOR */}
      <div className="w-full flex justify-center py-6">
        <div className="w-3/4 border-b border-gray-300 dark:border-gray-700"></div>
      </div>

      {/* ============================= SOBRE ============================= */}
      <section className="max-w-7xl mx-auto px-6 py-16 flex flex-col justify-center">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-12">
          <div className="md:w-1/2 flex justify-center">
            <img
              src="../src/assets/smart-desk.avif"
              alt="Crescimento profissional"
              className="rounded-2xl shadow-lg w-full object-cover"
            />
          </div>

          <div className="md:w-1/2 flex flex-col gap-8">
            <div className="flex items-start gap-4">
              <Rocket className="w-10 h-10 text-cyan-600 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-1 text-cyan-600">Trilhas de Aprendizado</h3>
                <p>
                  Navegue por trilhas inovadoras que desenvolvem suas habilidades digitais e preparam você para o mercado do futuro.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <BookOpen className="w-10 h-10 text-cyan-600 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-1 text-cyan-600">Cursos Atualizados</h3>
                <p>
                  Conteúdos sempre revisados e alinhados às demandas do mercado, com foco em tecnologia, inovação e negócios.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Users className="w-10 h-10 text-cyan-600 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-1 text-cyan-600">Comunidade Colaborativa</h3>
                <p>
                  Conecte-se com outros profissionais, participe de projetos reais e construa sua rede de contatos estratégicos.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <MessageCircle className="w-10 h-10 text-cyan-600 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-1 text-cyan-600">Vagas e Oportunidades</h3>
                <p>
                  Fique por dentro das vagas mais recentes, estágios e programas de desenvolvimento para impulsionar sua carreira.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DIVISOR */}
      <div className="w-full flex justify-center py-6">
        <div className="w-3/4 border-b border-gray-300 dark:border-gray-700"></div>
      </div>

      {/* ============================= TRILHAS ============================= */}
      <section className="max-w-6xl mx-auto px-6 py-16 flex flex-col justify-center">
  <h2 className="text-3xl font-bold text-center mb-12 text-cyan-600">
    Trilhas Conectadas ao Mercado
  </h2>

  <div className="grid md:grid-cols-3 gap-10">
    {/* Card 1 */}
    <div className="p-8 rounded-2xl bg-slate-800 border border-cyan-600/30 backdrop-blur-lg shadow-lg hover:shadow-cyan-600/50 transition">
      <Rocket className="w-10 h-10 text-cyan-600 mb-4" />
      <h3 className="text-xl font-bold mb-2 text-white">Tecnologias Emergentes</h3>
      <p className="text-white">
        Domine IA, Machine Learning, Cloud, Data Science e prepare-se para
        liderar a próxima geração de inovação.
      </p>
    </div>

    {/* Card 2 */}
    <div className="p-8 rounded-2xl bg-slate-800 border border-cyan-600/30 backdrop-blur-lg shadow-lg hover:shadow-cyan-600/50 transition">
      <BookOpen className="w-10 h-10 text-cyan-600 mb-4" />
      <h3 className="text-xl font-bold mb-2 text-white">Desenvolvimento e Engenharia</h3>
      <p className="text-white">
        Aprenda programação, frameworks modernos, práticas de DevOps e engenharia
        de software com foco no mercado.
      </p>
    </div>

    {/* Card 3 */}
    <div className="p-8 rounded-2xl bg-slate-800 border border-cyan-600/30 backdrop-blur-lg shadow-lg hover:shadow-cyan-600/50 transition">
      <Users className="w-10 h-10 text-cyan-600 mb-4" />
      <h3 className="text-xl font-bold mb-2 text-white">Carreira & Networking</h3>
      <p className="text-white">
        Construa seu portfólio, participe de projetos reais e conecte-se com
        especialistas que já estão transformando o futuro.
      </p>
    </div>
  </div>
</section>


      {/* DIVISOR */}
      <div className="w-full flex justify-center py-6">
        <div className="w-3/4 border-b border-gray-300 dark:border-gray-700"></div>
      </div>

      {/* ============================= DEPOIMENTOS ============================= */}
      <section className="max-w-6xl mx-auto px-6 py-16 flex flex-col justify-center">
        <h2 className="text-3xl font-bold text-center mb-12 text-cyan-600">
          Histórias de Transformação
        </h2>

        <div className="grid md:grid-cols-2 gap-10">
          <div className="p-8 rounded-2xl bg-white/10  border border-cyan-600/20 hover:border-cyan-600/40 transition backdrop-blur-lg shadow-lg">
            <p className="leading-relaxed mb-6">
              “As trilhas de IA me ajudaram a conquistar minha primeira vaga como
              Analista de Dados. O conteúdo é prático, direto e totalmente alinhado
              às necessidades do mercado.”
            </p>
            <span className="font-bold">— Ana Martins</span>
          </div>

          <div className="p-8 rounded-2xl bg-white/10   border border-cyan-600/20 hover:border-cyan-600/40 transition backdrop-blur-lg shadow-lg">
            <p className="leading-relaxed mb-6">
              “A comunidade colaborativa me permitiu participar de projetos reais
              que elevaram meu portfólio. Finalmente sinto que estou construindo
              minha carreira no futuro.”
            </p>
            <span className="font-bold">— Gabriel Rocha</span>
          </div>
        </div>
      </section>

      {/* DIVISOR */}
      <div className="w-full flex justify-center py-6">
        <div className="w-3/4 border-b border-gray-300 dark:border-gray-700"></div>
      </div>

      {/* ============================= CTA FINAL ============================= */}
<section className="max-w-4xl mx-auto px-6 py-16 text-center flex flex-col items-center justify-center gap-6">
  <h2 className="text-3xl font-bold text-cyan-600">
    Prepare-se para liderar o amanhã
  </h2>

  <p className="text-lg max-w-xl">
    Comece hoje sua especialização, evolua suas habilidades e conecte-se
    a oportunidades que só os profissionais do futuro terão acesso.
  </p>

  <Link
    to="/cadastro"
    className="inline-flex text-white items-center gap-2 px-8 py-3 bg-cyan-600 hover:bg-cyan-700 rounded-lg text-lg font-medium transition"
  >
    Criar Minha Conta
    <ArrowRight className="w-5 h-5" />
  </Link>
</section>


    </div>
  );
}
