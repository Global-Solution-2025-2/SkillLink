import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BookOpen, CheckCircle, PlayCircle, Clock, ArrowLeft, BarChart3, User } from "lucide-react";
import axios from "axios";

export default function Curso() {
  const location = useLocation();
  const navigate = useNavigate();
  const { curso, usuario } = location.state || {};

  const [progresso, setProgresso] = useState(curso?.progresso || 0);
  const [loading, setLoading] = useState(false);
  const [aulas, setAulas] = useState([]);

  // Gerar aulas simuladas
  useEffect(() => {
    if (!curso) return;
    const aulasSimuladas = Array.from({ length: 6 }, (_, i) => ({
      id: i + 1,
      nome: `Aula ${i + 1}`,
      duracao: `${20 + i * 5}min`,
      concluida: i < Math.floor((progresso / 16.6)),
    }));
    setAulas(aulasSimuladas);
  }, [curso, progresso]);

  if (!curso) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <div className="text-center">
          <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Curso não encontrado</h2>
          <button
            onClick={() => navigate("/area-de-estudos")}
            className="px-4 py-2 bg-cyan-600 text-white rounded-lg text-sm"
          >
            Voltar para Estudos
          </button>
        </div>
      </div>
    );
  }

  // Avançar aula
  const concluirAula = async (aulaId) => {
    if (progresso >= 100) return;
    setLoading(true);

    const novoProgresso = Math.min(progresso + 16.6, 100);
    const aulasAtualizadas = aulas.map((aula) =>
      aula.id === aulaId ? { ...aula, concluida: true } : aula
    );

    try {
      const cursosAtualizados = usuario.cursos.map((c) =>
        c.id === curso.id ? { ...c, progresso: novoProgresso } : c
      );
      await axios.put(`http://localhost:5000/perfil/${usuario.id}`, {
        cursos: cursosAtualizados,
      });

      localStorage.setItem(
        "usuarioLogado",
        JSON.stringify({ ...usuario, cursos: cursosAtualizados })
      );

      setProgresso(novoProgresso);
      setAulas(aulasAtualizadas);
    } catch (err) {
      console.error("Erro ao atualizar progresso do curso", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Cabeçalho */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">{curso.nome}</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">{curso.carreira}</p>
          </div>
        </div>

        {/* Layout com Cards Laterais */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Coluna Lateral Esquerda - Informações do Curso */}
          <div className="lg:col-span-1 space-y-4">
            
            {/* Card Informações do Curso - CONTEÚDO MELHORADO */}
<div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm">
  <div className="flex items-start gap-4 mb-4">
    <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl shadow-md">
      <span className="text-2xl">🤖</span>
    </div>
    <div className="flex-1">
      <h2 className="font-bold text-gray-900 dark:text-white text-lg mb-2">Fundamentos de IA</h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
        Aprenda os conceitos essenciais de Inteligência Artificial e Machine Learning na prática.
      </p>
      <div className="flex items-center gap-2 flex-wrap">
        <span className="px-2.5 py-1 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 text-xs font-medium rounded-full flex items-center gap-1">
          ⏱️ {curso.horas || "40h"}
        </span>
        <span className="px-2.5 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs font-medium rounded-full flex items-center gap-1">
          🎯 {curso.level || "Iniciante"}
        </span>
        <span className="px-2.5 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-medium rounded-full flex items-center gap-1">
          ⭐ 4.8
        </span>
      </div>
    </div>
  </div>
  
  <div className="space-y-3">
    
      
      
 
    
    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
      <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
        <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-900 dark:text-white">O que você vai aprender</p>
        <p className="text-xs text-gray-600 dark:text-gray-400">
          Conceitos de IA • Machine Learning • Projetos práticos
        </p>
      </div>
    </div>

    
    
  </div>
</div>

            {/* Card Progresso */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
              <div className="flex items-center gap-2 mb-3">
                <BarChart3 className="w-5 h-5 text-cyan-600" />
                <h3 className="font-semibold text-gray-900 dark:text-white">Seu Progresso</h3>
              </div>
              
              <div className="text-center mb-4">
                <div className="text-3xl font-bold text-cyan-600 mb-2">{Math.round(progresso)}%</div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div
                    className="h-full bg-cyan-600 rounded-full transition-all"
                    style={{ width: `${progresso}%` }}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="font-bold text-gray-900 dark:text-white">
                    {aulas.filter(a => a.concluida).length}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Concluídas</div>
                </div>
                <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="font-bold text-gray-900 dark:text-white">
                    {aulas.length - aulas.filter(a => a.concluida).length}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Restantes</div>
                </div>
              </div>
            </div>

          </div>

          {/* Coluna Principal - Lista de Aulas */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-5 h-5 text-cyan-600" />
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">Aulas do Curso</h2>
              </div>

              <div className="space-y-3">
                {aulas.map((aula) => (
                  <div
                    key={aula.id}
                    className={`flex items-center justify-between p-4 rounded-lg border ${
                      aula.concluida
                        ? "border-green-200 bg-green-50 dark:bg-green-900/20"
                        : "border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                    } transition-colors`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${
                        aula.concluida 
                          ? "bg-green-100 dark:bg-green-900/30" 
                          : "bg-cyan-100 dark:bg-cyan-900/30"
                      }`}>
                        {aula.concluida ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <PlayCircle className="w-5 h-5 text-cyan-500" />
                        )}
                      </div>
                      
                      <div>
                        <h3 className={`font-medium ${
                          aula.concluida 
                            ? "text-gray-500 line-through" 
                            : "text-gray-900 dark:text-white"
                        }`}>
                          {aula.nome}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Clock className="w-3 h-3 text-gray-400" />
                          <span className="text-xs text-gray-500">{aula.duracao}</span>
                        </div>
                      </div>
                    </div>
                    
                    {!aula.concluida && (
                      <button
                        onClick={() => concluirAula(aula.id)}
                        disabled={loading}
                        className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-sm font-medium disabled:opacity-50 transition-colors"
                      >
                        {loading ? "..." : "Concluir"}
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Mensagem de Conclusão */}
              {progresso === 100 && (
                <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-center">
                  <CheckCircle className="w-6 h-6 text-green-500 mx-auto mb-2" />
                  <p className="text-green-800 dark:text-green-200 font-medium">
                    Curso concluído com sucesso! 🎉
                  </p>
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}