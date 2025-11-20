import { useEffect, useState } from "react";
import CardProfissional from "../components/CardProfissional";
import { Search, Users, Filter, MessageCircle, ThumbsUp } from "lucide-react";

export default function Profissionais() {
  const [profissionais, setProfissionais] = useState([]);
  const [filtrados, setFiltrados] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  // Inputs dos filtros
  const [busca, setBusca] = useState("");
  const [area, setArea] = useState("");
  const [tecnologia, setTecnologia] = useState("");

  // Estados para funcionalidades
  const [recomendacoes, setRecomendacoes] = useState({});
  const [mensagemAberta, setMensagemAberta] = useState(null);
  const [textoMensagem, setTextoMensagem] = useState("");
  const [enviandoMensagem, setEnviandoMensagem] = useState(false);
  const [usuarioLogado, setUsuarioLogado] = useState(null);

  // Estados para valores únicos dos filtros
  const [areasUnicas, setAreasUnicas] = useState([]);
  const [tecnologiasUnicas, setTecnologiasUnicas] = useState([]);

  // Carregar usuário logado do localStorage
  useEffect(() => {
    const carregarUsuario = () => {
      try {
        const usuario = JSON.parse(localStorage.getItem("usuario")) || 
                       JSON.parse(localStorage.getItem("usuarioLogado"));
        setUsuarioLogado(usuario);
      } catch (error) {
        console.error("Erro ao carregar usuário:", error);
      }
    };
    carregarUsuario();
  }, []);

  // Carregar profissionais
  useEffect(() => {
    const carregarProfissionais = async () => {
      try {
        const resposta = await fetch("http://localhost:5000/profissionais");
        if (!resposta.ok) throw new Error("Erro ao buscar profissionais");

        const dados = await resposta.json();
        setProfissionais(dados);
        setFiltrados(dados);

        // Carregar recomendações do localStorage
        const recomendacoesSalvas = JSON.parse(localStorage.getItem('recomendacoesProfissionais')) || {};
        setRecomendacoes(recomendacoesSalvas);

        // Extrair valores únicos para os filtros
        const areas = [...new Set(dados.map(p => p.area).filter(Boolean))];
        const tecnologias = [...new Set(dados.flatMap(p => p.habilidadesTecnicas).filter(Boolean))];
        
        setAreasUnicas(areas);
        setTecnologiasUnicas(tecnologias);

      } catch (err) {
        setErro(err.message);
      } finally {
        setCarregando(false);
      }
    };

    carregarProfissionais();
  }, []);

  // Filtros inteligentes
  useEffect(() => {
    let lista = [...profissionais];

    const normalizar = (txt) =>
      txt
        ?.toString()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

    // 🔍 BUSCA (nome + cargo + resumo)
    if (busca.trim() !== "") {
      const b = normalizar(busca);
      lista = lista.filter(
        (p) =>
          normalizar(p.nome)?.includes(b) ||
          normalizar(p.cargo)?.includes(b) ||
          normalizar(p.resumo)?.includes(b)
      );
    }

    // 🎯 ÁREA
    if (area !== "") {
      const a = normalizar(area);
      lista = lista.filter((p) => normalizar(p.area)?.includes(a));
    }

    // 💻 TECNOLOGIA
    if (tecnologia !== "") {
      const t = normalizar(tecnologia);
      lista = lista.filter((p) =>
        p.habilidadesTecnicas?.some((skill) =>
          normalizar(skill)?.includes(t)
        )
      );
    }

    setFiltrados(lista);
  }, [busca, area, tecnologia, profissionais]);

  // Função para recomendar profissional
  const recomendarProfissional = async (profissionalId) => {
    if (!usuarioLogado) {
      alert("Você precisa estar logado para recomendar um profissional.");
      return;
    }

    try {
      // Atualizar estado local
      const novasRecomendacoes = {
        ...recomendacoes,
        [profissionalId]: (recomendacoes[profissionalId] || 0) + 1
      };
      
      setRecomendacoes(novasRecomendacoes);
      
      // Salvar no localStorage
      localStorage.setItem('recomendacoesProfissionais', JSON.stringify(novasRecomendacoes));

      // Atualizar no backend (opcional)
      const profissional = profissionais.find(p => p.id === profissionalId);
      if (profissional) {
        await fetch(`http://localhost:5000/profissionais/${profissionalId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            recomendacoes: (profissional.recomendacoes || 0) + 1
          })
        });
      }

      // Feedback visual
      alert(`Você recomendou ${profissionais.find(p => p.id === profissionalId)?.nome}!`);

    } catch (error) {
      console.error("Erro ao recomendar:", error);
      alert("Erro ao recomendar profissional. Tente novamente.");
    }
  };

  // Função para enviar mensagem
  const enviarMensagem = async (profissionalId) => {
    if (!usuarioLogado) {
      alert("Você precisa estar logado para enviar mensagens.");
      return;
    }

    if (!textoMensagem.trim()) {
      alert("Por favor, digite uma mensagem.");
      return;
    }

    setEnviandoMensagem(true);

    try {
      const mensagem = {
        id: Date.now(),
        de: usuarioLogado.id,
        para: profissionalId,
        texto: textoMensagem,
        timestamp: new Date().toISOString(),
        lida: false
      };

      // Salvar mensagem no localStorage
      const mensagensExistentes = JSON.parse(localStorage.getItem('mensagens')) || [];
      const novasMensagens = [...mensagensExistentes, mensagem];
      localStorage.setItem('mensagens', JSON.stringify(novasMensagens));

      // Atualizar no backend (opcional)
      await fetch('http://localhost:5000/mensagens', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mensagem)
      });

      // Feedback e limpar
      alert("Mensagem enviada com sucesso!");
      setTextoMensagem("");
      setMensagemAberta(null);

    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      alert("Erro ao enviar mensagem. Tente novamente.");
    } finally {
      setEnviandoMensagem(false);
    }
  };

  // Abrir modal de mensagem
  const abrirModalMensagem = (profissionalId) => {
    if (!usuarioLogado) {
      alert("Você precisa estar logado para enviar mensagens.");
      return;
    }
    setMensagemAberta(profissionalId);
  };

  // Fechar modal de mensagem
  const fecharModalMensagem = () => {
    setMensagemAberta(null);
    setTextoMensagem("");
  };

  // Limpar filtros
  const limparFiltros = () => {
    setBusca("");
    setArea("");
    setTecnologia("");
  };

  // Obter contagem de recomendações
  const getRecomendacoesCount = (profissionalId) => {
    return recomendacoes[profissionalId] || 0;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* HEADER */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
            Profissionais ConectaPro
          </h1>
          <div className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400">
            <Users className="w-4 h-4" />
            <span className="text-sm">
              {profissionais.length} profissionais conectados
            </span>
          </div>
        </div>

        {/* PAINEL DE BUSCA E FILTROS */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 border border-gray-100 dark:border-gray-700 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <h2 className="text-base font-semibold text-gray-800 dark:text-gray-200">
                Encontre profissionais
              </h2>
            </div>
            
            <button
              onClick={limparFiltros}
              className="px-3 py-1.5 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 rounded-lg border border-gray-300 dark:border-gray-600"
            >
              Limpar Filtros
            </button>
          </div>

          {/* BARRA DE BUSCA */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por nome, cargo ou descrição..."
              className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-800 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all duration-200 text-sm"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>

          {/* FILTROS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                Área de Atuação
              </label>
              <select
                className="w-full p-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all duration-200 text-sm"
                value={area}
                onChange={(e) => setArea(e.target.value)}
              >
                <option value="">Todas as Áreas</option>
                {areasUnicas.map((areaItem) => (
                  <option key={areaItem} value={areaItem}>
                    {areaItem}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                Tecnologias
              </label>
              <select
                className="w-full p-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all duration-200 text-sm"
                value={tecnologia}
                onChange={(e) => setTecnologia(e.target.value)}
              >
                <option value="">Todas as Tecnologias</option>
                {tecnologiasUnicas.map((tech) => (
                  <option key={tech} value={tech}>
                    {tech}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* ESTADOS DE CARREGAMENTO */}
        {carregando && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-cyan-600 border-t-transparent mb-3"></div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Carregando profissionais...
            </p>
          </div>
        )}

        {erro && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 text-center mb-6">
            <p className="text-red-600 dark:text-red-400 font-medium text-sm mb-1">
              Erro ao carregar dados
            </p>
            <p className="text-red-500 dark:text-red-300 text-xs">{erro}</p>
          </div>
        )}

        {/* GRID DE CARDS */}
        {!carregando && !erro && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                Resultados
                <span className="text-cyan-600 dark:text-cyan-400 ml-2">
                  ({filtrados.length})
                </span>
              </h2>
              
              {filtrados.length > 0 && (
                <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                  {filtrados.length} de {profissionais.length}
                </span>
              )}
            </div>

            {filtrados.length === 0 ? (
              <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <h3 className="text-base font-medium text-gray-600 dark:text-gray-400 mb-2">
                  Nenhum profissional encontrado
                </h3>
                <p className="text-gray-500 dark:text-gray-500 text-sm mb-4">
                  Tente ajustar os filtros ou termos de busca
                </p>
                <button
                  onClick={limparFiltros}
                  className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors duration-200 text-sm font-medium"
                >
                  Limpar Filtros
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filtrados.map((profissional) => (
                  <div 
                    key={profissional.id}
                    className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-5 hover:shadow-md hover:border-cyan-200 dark:hover:border-cyan-800 transition-all duration-200 group"
                  >
                    {/* HEADER DO CARD */}
                    <div className="flex items-start gap-4 mb-4">
                      <img 
                        src={profissional.foto || "/images/avatar-default.jpg"} 
                        alt={profissional.nome}
                        className="w-12 h-12 rounded-lg object-cover border border-gray-200 dark:border-gray-600 group-hover:border-cyan-300 dark:group-hover:border-cyan-600 transition-colors duration-200"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors duration-200">
                          {profissional.nome}
                        </h3>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            {profissional.cargo}
                          </span>
                          <span className="px-2 py-1 bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-300 rounded text-xs font-medium border border-cyan-200 dark:border-cyan-800">
                            {profissional.area}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* DESCRIÇÃO */}
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2">
                      {profissional.resumo}
                    </p>

                    {/* HABILIDADES */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {profissional.habilidadesTecnicas?.slice(0, 3).map((skill, index) => (
                        <span 
                          key={index}
                          className="px-2 py-1 bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-300 rounded text-xs font-medium border border-cyan-200 dark:border-cyan-800"
                        >
                          {skill}
                        </span>
                      ))}
                      {profissional.habilidadesTecnicas?.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded text-xs font-medium">
                          +{profissional.habilidadesTecnicas.length - 3}
                        </span>
                      )}
                    </div>

                    {/* RECOMENDAÇÕES */}
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-4 flex items-center gap-1">
                      <ThumbsUp className="w-3 h-3" />
                      {getRecomendacoesCount(profissional.id)} recomendações
                    </div>

                    {/* LOCALIZAÇÃO */}
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-4 flex items-center gap-1">
                      <span>📍</span>
                      {profissional.localizacao}
                    </div>

                    {/* BOTÕES */}
                    <div className="flex gap-2">
                      <button 
                        onClick={() => recomendarProfissional(profissional.id)}
                        className="flex-1 px-3 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-1"
                      >
                        <ThumbsUp className="w-3 h-3" />
                        Recomendar
                      </button>
                      <button 
                        onClick={() => (window.location.href = "/skilltalks")}
                        className="flex-1 px-3 py-2 bg-white dark:bg-gray-700 border border-cyan-600 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-900/20 rounded text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-1"
                      >
                        <MessageCircle className="w-3 h-3" />
                        Mensagem
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}