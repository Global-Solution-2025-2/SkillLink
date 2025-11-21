import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Rocket, BookOpen, Users, MessageCircle } from "lucide-react";

export default function Home() {
  return (
    <div className="w-full font-sans">

      {/* ============================= HERO ============================= */}
      <section className="max-w-7xl mx-auto px-6 pt-24 pb-16 text-center flex flex-col items-center gap-6">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Construa sua jornada no <br />
          <span className="bg-clip-text text-cyan-600">Futuro do Trabalho</span>
        </h1>

        <p className="mt-4 md:mt-6 text-lg max-w-2xl">
          A SkillLink conecta pessoas, competências e propósito em um só ecossistema.
          Explore cursos, participe de projetos reais e faça conexões que impulsionam
          sua evolução profissional no mundo digital.
        </p>

        <Link
          to="/cursos"
          className="inline-flex items-center gap-2 px-8 py-3 bg-cyan-600 hover:bg-cyan-700 rounded-xl text-lg font-medium text-white transition shadow-md hover:shadow-cyan-400/50 mt-6"
        >
          Conheça nossos cursos
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

            {/* 1 - Trilhas */}
            <div className="flex items-start gap-4">
              <Rocket className="w-10 h-10 text-cyan-600 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-1 text-cyan-600">Trilhas de Desenvolvimento</h3>
                <p>
                  Aprenda no seu ritmo com trilhas criadas para transformar sua carreira.
                  Domine competências técnicas e comportamentais essenciais para o futuro.
                </p>
              </div>
            </div>

            {/* 2 - Cursos */}
            <div className="flex items-start gap-4">
              <BookOpen className="w-10 h-10 text-cyan-600 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-1 text-cyan-600">Cursos Dinâmicos</h3>
                <p>
                  Estude conteúdos atuais, diretos ao ponto e alinhados às tecnologias que profissionais 
                  realmente usam no mercado.
                </p>
              </div>
            </div>

            {/* 3 - Profissionais */}
            <div className="flex items-start gap-4">
              <Users className="w-10 h-10 text-cyan-600 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-1 text-cyan-600">Profissionais da Sua Área</h3>
                <p>
                  Conheça especialistas, descubra trajetórias reais e veja como outros profissionais 
                  estão construindo suas carreiras dentro do ecossistema digital.
                </p>
              </div>
            </div>

            {/* 4 - Conexões */}
            <div className="flex items-start gap-4">
  <MessageCircle className="w-10 h-10 text-cyan-600 flex-shrink-0" />
  <div>
    <h3 className="text-xl font-semibold mb-1 text-cyan-600">Conexões & Projetos Colaborativos</h3>
    <p>
      Conecte-se com profissionais da sua área, participe de projetos colaborativos e 
      compartilhe conhecimento em tempo real. Construir junto fortalece suas habilidades 
      e amplia sua presença no futuro do trabalho.
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
          Trilhas Conectadas ao Futuro
        </h2>

        <div className="grid md:grid-cols-3 gap-10">

          {/* 1 */}
          <div className="p-8 rounded-2xl bg-slate-800 border border-cyan-600/30 backdrop-blur-lg shadow-lg hover:shadow-cyan-600/50 transition">
            <Rocket className="w-10 h-10 text-cyan-600 mb-4" />
            <h3 className="text-xl font-bold mb-2 text-white">Tecnologias Emergentes</h3>
            <p className="text-white">
              Aprenda sobre IA, Cloud, Data e outras tecnologias que estão moldando o mercado global.
            </p>
          </div>

          {/* 2 */}
          <div className="p-8 rounded-2xl bg-slate-800 border border-cyan-600/30 backdrop-blur-lg shadow-lg hover:shadow-cyan-600/50 transition">
            <BookOpen className="w-10 h-10 text-cyan-600 mb-4" />
            <h3 className="text-xl font-bold mb-2 text-white">Engenharia & Dev</h3>
            <p className="text-white">
              Desenvolva habilidades de programação, arquitetura de software e práticas modernas usadas por equipes de alto desempenho.
            </p>
          </div>

          {/* 3 */}
          <div className="p-8 rounded-2xl bg-slate-800 border border-cyan-600/30 backdrop-blur-lg shadow-lg hover:shadow-cyan-600/50 transition">
            <Users className="w-10 h-10 text-cyan-600 mb-4" />
            <h3 className="text-xl font-bold mb-2 text-white">Carreira & Propósito</h3>
            <p className="text-white">
              Evolua profissionalmente, fortaleça sua marca pessoal e conecte-se com pessoas que podem transformar sua jornada.
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
          Histórias que Inspiram
        </h2>

        <div className="grid md:grid-cols-2 gap-10">

          {/* 1 */}
          <div className="p-8 rounded-2xl bg-white/10 border border-cyan-600/20 hover:border-cyan-600/40 transition backdrop-blur-lg shadow-lg">
            <p className="leading-relaxed mb-6">
              “As trilhas me ajudaram a desenvolver competências essenciais para começar minha
              jornada na área de tecnologia. A comunidade me guiou em cada passo.”
            </p>
            <span className="font-bold">— Ana Martins</span>
          </div>

          {/* 2 */}
          <div className="p-8 rounded-2xl bg-white/10 border border-cyan-600/20 hover:border-cyan-600/40 transition backdrop-blur-lg shadow-lg">
            <p className="leading-relaxed mb-6">
              “Pude me conectar com profissionais experientes e participar de projetos reais
              que fortaleceram meu portfólio. A SkillLink virou meu ponto de partida.”
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
          Entre no Ecossistema do Futuro
        </h2>

        <p className="text-lg max-w-xl">
          Transforme sua carreira desenvolvendo habilidades modernas, colaborando com profissionais
          da sua área e construindo projetos que fazem a diferença.
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
