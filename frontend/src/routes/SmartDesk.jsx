import React from "react";
import { Thermometer, Sun, Volume2, UserCheck, BarChart2 } from "lucide-react";

export default function SmartDeskPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 pt-28 pb-20 space-y-16">

      {/* ===================== BANNER PRINCIPAL ===================== */}
      <section className="text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">
          Smart Desk – Estação de Trabalho Inteligente
        </h1>
        <p className="mt-4 text-gray-600 dark:text-gray-300 text-lg">
          Transformando ergonomia, produtividade e saúde no trabalho do futuro
        </p>
      </section>

      {/* ===================== CENÁRIO ===================== */}
      <section className="bg-white/10 dark:bg-gray-900/40 backdrop-blur-xl p-8 rounded-2xl border border-gray-300/20 dark:border-gray-700/20 shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Cenário do Trabalho do Futuro</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Ambientes híbridos e escritórios compartilhados exigem monitoramento de produtividade, ergonomia e bem-estar. 
          O Smart Desk garante um ambiente ideal para o trabalhador moderno.
        </p>
      </section>

      {/* ===================== FUNCIONALIDADES ===================== */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Funcionalidades do Sistema</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white/10 dark:bg-gray-900/40 backdrop-blur-xl p-6 rounded-2xl border border-gray-300/20 dark:border-gray-700/20 shadow-lg text-center hover:shadow-indigo-500/20 transition">
            <Sun className="w-10 h-10 mx-auto text-yellow-400 mb-3"/>
            <h3 className="font-semibold">Luminosidade</h3>
            <p className="text-gray-400 dark:text-gray-300 text-sm mt-1">
              Monitora o nível ideal de luz para reduzir cansaço visual.
            </p>
          </div>

          <div className="bg-white/10 dark:bg-gray-900/40 backdrop-blur-xl p-6 rounded-2xl border border-gray-300/20 dark:border-gray-700/20 shadow-lg text-center hover:shadow-indigo-500/20 transition">
            <Volume2 className="w-10 h-10 mx-auto text-red-400 mb-3"/>
            <h3 className="font-semibold">Ruído</h3>
            <p className="text-gray-400 dark:text-gray-300 text-sm mt-1">
              Detecta níveis de ruído e sugere pausas ou fones de ouvido.
            </p>
          </div>

          <div className="bg-white/10 dark:bg-gray-900/40 backdrop-blur-xl p-6 rounded-2xl border border-gray-300/20 dark:border-gray-700/20 shadow-lg text-center hover:shadow-indigo-500/20 transition">
            <UserCheck className="w-10 h-10 mx-auto text-green-400 mb-3"/>
            <h3 className="font-semibold">Postura/Proximidade</h3>
            <p className="text-gray-400 dark:text-gray-300 text-sm mt-1">
              Ultrassônico detecta postura e posição correta do usuário.
            </p>
          </div>

          <div className="bg-white/10 dark:bg-gray-900/40 backdrop-blur-xl p-6 rounded-2xl border border-gray-300/20 dark:border-gray-700/20 shadow-lg text-center hover:shadow-indigo-500/20 transition">
            <Thermometer className="w-10 h-10 mx-auto text-orange-400 mb-3"/>
            <h3 className="font-semibold">Temperatura & Umidade</h3>
            <p className="text-gray-400 dark:text-gray-300 text-sm mt-1">
              Monitoramento opcional para conforto do trabalhador.
            </p>
          </div>
        </div>
      </section>

      {/* ===================== ALERTAS & AÇÕES ===================== */}
      <section className="bg-white/10 dark:bg-gray-900/40 backdrop-blur-xl p-8 rounded-2xl border border-gray-300/20 dark:border-gray-700/20 shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Ações e Alertas</h2>
        <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
          <li>Alerta de ergonomia se o usuário estiver longe ou curvado.</li>
          <li>Alerta de cansaço visual se a luminosidade estiver baixa.</li>
          <li>Recomenda pausa ou fone se o ruído estiver alto.</li>
          <li>Exibe status no LCD: “Ambiente ótimo”, “Ruído elevado”, etc.</li>
        </ul>
      </section>

      {/* ===================== DASHBOARD ===================== */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Dashboard & Indicadores</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white/10 dark:bg-gray-900/40 backdrop-blur-xl p-6 rounded-2xl border border-gray-300/20 dark:border-gray-700/20 shadow-lg">
            <h3 className="font-semibold mb-2">Índice de Produtividade do Ambiente (IPA)</h3>
            <BarChart2 className="w-12 h-12 text-indigo-500 mb-3"/>
            <p className="text-gray-400 dark:text-gray-300 text-sm">
              Calculado a partir dos dados de postura, luminosidade, ruído e temperatura.
            </p>
          </div>

          <div className="bg-white/10 dark:bg-gray-900/40 backdrop-blur-xl p-6 rounded-2xl border border-gray-300/20 dark:border-gray-700/20 shadow-lg">
            <h3 className="font-semibold mb-2">Ambiente Adaptativo</h3>
            <p className="text-gray-400 dark:text-gray-300 text-sm mt-1">
              A mesa se adapta ao trabalhador, proporcionando ergonomia, conforto e produtividade.
            </p>
          </div>
        </div>
      </section>

      {/* ===================== CTA FINAL ===================== */}
      <section className="text-center">
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Inspire-se e conheça mais inovações do futuro do trabalho.
        </p>
        <a href="/login" className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition">
          Entrar no Portal
        </a>
      </section>

    </div>
  );
}
