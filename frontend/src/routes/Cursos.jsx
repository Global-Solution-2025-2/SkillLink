import React, { useState, useEffect } from "react";
import {
  BookOpen,
  Users,
  Clock,
  User,
  Search,
  Filter,
  Star,
  PlayCircle,
  ArrowRight,
  Rocket
} from "lucide-react";

// ✅ CORREÇÃO: Remova o /api da URL base
const API_BASE_URL = 'http://localhost:5000';

export default function CursosCuradoriaIA() {
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filtroCarreira, setFiltroCarreira] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filtroNivel, setFiltroNivel] = useState("");

  // Função para buscar cursos da API
  const fetchCursos = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // ✅ CORREÇÃO: Agora a URL está correta
      const response = await fetch(`${API_BASE_URL}/cursos`);
      
      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log("📦 Dados recebidos:", data);
      
      // Seu JSON retorna { cursos: [...] }
      const cursosArray = data.cursos || [];
      setCursos(cursosArray);
      
    } catch (err) {
      setError(err.message);
      console.error('Erro ao carregar cursos:', err);
    } finally {
      setLoading(false);
    }
  };

  // Carregar dados ao montar o componente
  useEffect(() => {
    fetchCursos();
  }, []);

  // Mapeamento de ícones para cada carreira
  const getIconePorCarreira = (carreira) => {
    const icones = {
      "Curador de Inteligência Artificial": Rocket,
      "Designer de Experiências Inversivas (VR/AR)": Users
    };
    return icones[carreira] || BookOpen;
  };

  // Obter carreiras únicas para o filtro
  const carreirasUnicas = [...new Set(cursos.map(curso => curso.carreira))];
  const niveisUnicos = [...new Set(cursos.map(curso => curso.level))];

  // Filtrar cursos
  const cursosFiltrados = cursos.filter(curso => {
    const matchCarreira = !filtroCarreira || curso.carreira === filtroCarreira;
    const matchNivel = !filtroNivel || curso.level === filtroNivel;
    const matchSearch = !searchTerm || 
      curso.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      curso.descricao.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchCarreira && matchNivel && matchSearch;
  });

  // Card componente
  const Card = ({ children, className = "" }) => (
  <div className={`bg-slate-800 border border-slate-500 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all ${className}`}>
    {children}
  </div>
);

  if (loading) {
    return (
      <div className="min-h-screen font-sans text-gray-800 dark:text-gray-100 pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-600 mx-auto mb-3"></div>
            <p className="text-gray-500 dark:text-gray-400">Carregando cursos...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen font-sans text-gray-800 dark:text-gray-100 pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="text-center py-8">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="text-red-500 text-xl" />
            </div>
            <h2 className="text-xl font-bold text-red-600 dark:text-red-400 mb-2">
              Erro ao carregar cursos
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{error}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              Certifique-se de que o backend está rodando na porta 5000
            </p>
            <button 
              onClick={fetchCursos}
              className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2 rounded-lg transition-all duration-300 font-medium"
            >
              Tentar Novamente
            </button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-sans -mt-18">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        
        {/* HEADER */}
        <section className="mb-8">
  <div className="flex justify-between items-center mb-6">
    <h1 className="text-3xl font-bold flex items-center gap-3">
      <BookOpen className="w-8 h-8 text-cyan-600" />
      Cursos para o Futuro
    </h1>
    <p className="text-slate-900">
      {cursosFiltrados.length} {cursosFiltrados.length === 1 ? 'curso encontrado' : 'cursos encontrados'}
    </p>
  </div>

  {/* BARRA DE BUSCA E FILTROS */}
  <Card className="p-4">
    <div className="flex flex-col gap-4">
      {/* Container dos Filtros */}
      <div className="flex flex-col sm:flex-row gap-3 w-full">
        {/* Filtro por Área */}
        <div className="flex-1">
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-800 w-4 h-4" />
            <select
              value={filtroCarreira}
              onChange={(e) => setFiltroCarreira(e.target.value)}
              className="w-full pl-10 pr-8 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent appearance-none text-sm md:text-base text-slate-900"
            >
              <option value="" className="text-slate-900">Todas as áreas</option>
              {carreirasUnicas.map(carreira => (
                <option key={carreira} value={carreira} className="text-slate-900">{carreira}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Filtro por Nível */}
        <div className="flex-1">
          <div className="relative">
            <Star className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-400 w-4 h-4" />
            <select
              value={filtroNivel}
              onChange={(e) => setFiltroNivel(e.target.value)}
              className="w-full pl-10 pr-8 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent appearance-none text-sm md:text-base text-slate-900"
            >
              <option value="" className="text-slate-900">Todos os níveis</option>
              {niveisUnicos.map(nivel => (
                <option key={nivel} value={nivel} className="text-slate-900">{nivel}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>

    {/* Filtros Ativos */}
    {(filtroCarreira || filtroNivel || searchTerm) && (
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mt-4 pt-4 border-t border-gray-200">
        <span className="text-sm text-white whitespace-nowrap">Filtros ativos:</span>
        
        <div className="flex flex-wrap gap-2 flex-1">
          {filtroCarreira && (
            <span className="bg-cyan-100 text-cyan-800 px-3 py-1 rounded-full text-sm whitespace-nowrap">
              {filtroCarreira}
            </span>
          )}
          {filtroNivel && (
            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm whitespace-nowrap">
              {filtroNivel}
            </span>
          )}
          {searchTerm && (
            <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm whitespace-nowrap">
              "{searchTerm}"
            </span>
          )}
        </div>
        
        <button 
          onClick={() => {
            setFiltroCarreira("");
            setFiltroNivel("");
            setSearchTerm("");
          }}
          className="text-cyan-600 hover:text-cyan-700 font-medium text-sm whitespace-nowrap sm:ml-auto mt-2 sm:mt-0"
        >
          Limpar filtros
        </button>
      </div>
    )}
  </Card>
</section>

        {/* GRADE DE CURSOS */}
        <section>
          {cursosFiltrados.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              {cursosFiltrados.map((curso) => {
                const Icon = getIconePorCarreira(curso.carreira);
                
                return (
                  <Card key={curso.id} className="group cursor-pointer hover:border-cyan-300 dark:hover:border-cyan-700 transition-all duration-300">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-cyan-50 dark:bg-cyan-900/20 p-2 rounded-lg group-hover:scale-105 transition-transform">
                          <Icon className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                            {curso.nome}
                          </h3>
                          <p className="text-xs text-cyan-600 dark:text-cyan-400 font-medium mt-1">
                            {curso.carreira}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs font-medium bg-cyan-100 dark:bg-cyan-900/40 text-cyan-600 dark:text-cyan-400 px-2 py-1 rounded-full">
                        {curso.level}
                      </span>
                    </div>

                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                      {curso.descricao}
                    </p>

                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-4">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {curso.duracao}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {curso.horas}
                      </span>
                    </div>

                    {/* Profissões Possíveis */}
                    {curso.profissoesPossiveis && curso.profissoesPossiveis.length > 0 && (
                      <div className="mb-4">
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                          Carreiras relacionadas:
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {curso.profissoesPossiveis.slice(0, 3).map((profissao, index) => (
                            <span 
                              key={index}
                              className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full text-xs border border-gray-200 dark:border-gray-600"
                            >
                              {profissao}
                            </span>
                          ))}
                          {curso.profissoesPossiveis.length > 3 && (
                            <span className="bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 px-2 py-1 rounded-full text-xs border border-gray-200 dark:border-gray-600">
                              +{curso.profissoesPossiveis.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    
                  </Card>
                );
              })}
            </div>
          ) : (
            <Card className="text-center py-12">
              <div className="bg-gray-50 dark:bg-gray-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Nenhum curso encontrado
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Tente ajustar os filtros de busca para encontrar o que procura.
              </p>
              <button 
                onClick={() => {
                  setFiltroCarreira("");
                  setFiltroNivel("");
                  setSearchTerm("");
                }}
                className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2 rounded-lg transition-all duration-300 font-medium"
              >
                Limpar filtros e ver todos
              </button>
            </Card>
          )}
        </section>
      </div>
    </div>
  );
}