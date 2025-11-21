import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  User,
  Home,
  BookOpen,
  Users,
  FolderKanban,
  MessageCircle,
  Search,
  Filter,
  X,
  Code,
  Smartphone,
  Brain,
  Wifi,
  Diamond
} from "lucide-react";

export default function Projetos() {
  const [busca, setBusca] = useState("");
  const [categoria, setCategoria] = useState("Todos");
  const [modalAberto, setModalAberto] = useState(false);
  const [projetoSelecionado, setProjetoSelecionado] = useState(null);
  const [projetos, setProjetos] = useState([]);
  const [usuario, setUsuario] = useState({});
  const [carregando, setCarregando] = useState(true);

  // Categorias diretamente no componente
  const categorias = ["Todos", "Desenvolvimento Web", "Mobile", "IA", "IoT", "Blockchain"];

  // Função para identificar o usuário atual
  const identificarUsuarioAtual = (usuariosArray) => {
    console.log(" Usuários disponíveis:", usuariosArray);

    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
    const usuarioLogadoId = localStorage.getItem("usuarioLogadoId");

    console.log("🔐 Usuário logado:", usuarioLogado);
    console.log(" ID salvo no localStorage:", usuarioLogadoId);

    // 1. PRIORIDADE MÁXIMA → usuarioLogado do localStorage
    if (usuarioLogado && usuarioLogado.id) {
      const encontrado = usuariosArray.find(
        (u) => u.id === usuarioLogado.id
      );

      if (encontrado) {
        console.log(" Encontrado pelo usuarioLogado:", encontrado);
        return encontrado;
      }
    }

    // 2. Se não achou, tenta pelo ID armazenado
    if (usuarioLogadoId) {
      const encontradoPorId = usuariosArray.find(
        (u) => u.id === parseInt(usuarioLogadoId)
      );

      if (encontradoPorId) {
        console.log(" Encontrado pelo usuarioLogadoId:", encontradoPorId);
        return encontradoPorId;
      }
    }

    // 3. Fallback → primeiro usuário (garante que nunca fica vazio)
    console.log(" Fallback: retornando primeiro usuário");
    return usuariosArray[0] || {};
  };

  // Carregar dados da API do backend
  useEffect(() => {
    const carregarDados = async () => {
      try {
        setCarregando(true);
        
        // Carrega projetos
        const respostaProjetos = await fetch('http://localhost:5000/api/projetos');
        const dadosProjetos = await respostaProjetos.json();
        setProjetos(dadosProjetos.projetos || []);
        
        // Carrega usuário
        const respostaUsuario = await fetch('http://localhost:5000/api/usuario');
        const dadosUsuario = await respostaUsuario.json();
        
        console.log(' Todos os usuários disponíveis:', dadosUsuario);
        
        // Identifica o usuário atual
        if (Array.isArray(dadosUsuario)) {
          const usuarioAtual = identificarUsuarioAtual(dadosUsuario);
          console.log(' Usuário atual selecionado:', usuarioAtual);
          setUsuario(usuarioAtual || {});
        } else {
          console.log(' Dados do usuário (não array):', dadosUsuario);
          setUsuario(dadosUsuario.usuario || dadosUsuario || {});
        }
        
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        // Fallback
        setProjetos([
          {
            id: 1,
            nome: "EcoTrack - Monitoramento Ambiental",
            autor: "Ana Silva",
            descricao: "Sistema para monitorar qualidade do ar e água usando IoT.",
            membros: 8,
            vagas: 3,
            categoria: "IoT",
            status: "Recrutando",
            detalhes: "Projeto focado em sustentabilidade usando sensores IoT e análise de dados em tempo real.",
            tecnologias: ["Python", "IoT", "Data Science", "Arduino"],
          },
          {
            id: 2,
            nome: "LearnTogether - Plataforma Educacional",
            autor: "Carlos Santos",
            descricao: "Plataforma colaborativa de ensino com gamificação.",
            membros: 12,
            vagas: 5,
            categoria: "Desenvolvimento Web",
            status: "Ativo",
            detalhes: "Plataforma educacional que conecta estudantes e mentores.",
            tecnologias: ["React", "Node.js", "MongoDB", "JavaScript"],
          }
        ]);
        
        setUsuario({
          nome: "Usuário Futurista",
          cargo: "Estudante de Eng. Software",
          foto: "https://placehold.co/150x150/0891b2/ffffff?text=U"
        });
      } finally {
        setCarregando(false);
      }
    };

    carregarDados();
  }, []);

  if (carregando) {
    return (
      <div className="min-h-screen bg-slate-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Carregando projetos...</p>
        </div>
      </div>
    );
  }

  const buildFotoURL = (f) => {
    const placeholder = "https://placehold.co/150x150/0891b2/ffffff?text=U";
    if (!f) return placeholder;
    if (typeof f !== "string") return placeholder;
    if (f.startsWith("http")) return f;
    if (f.startsWith("/")) return `http://localhost:5000${f}`;
    return `http://localhost:5000/${f}`;
  };

  // Filtro simplificado
  const projetosFiltrados = projetos.filter(projeto => {
    const buscaMatch = projeto.nome.toLowerCase().includes(busca.toLowerCase()) ||
                      projeto.descricao.toLowerCase().includes(busca.toLowerCase()) ||
                      (projeto.tecnologias && projeto.tecnologias.some(tech => 
                        tech.toLowerCase().includes(busca.toLowerCase())
                      ));
    
    const categoriaMatch = categoria === "Todos" || projeto.categoria === categoria;
    
    return buscaMatch && categoriaMatch;
  });

  const abrirModal = (projeto) => {
    setProjetoSelecionado(projeto);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setProjetoSelecionado(null);
  };

  const participarProjeto = (projetoId) => {
    setProjetos(prevProjetos => 
      prevProjetos.map(projeto => 
        projeto.id === projetoId && projeto.vagas > 0 
          ? { ...projeto, vagas: projeto.vagas - 1, membros: projeto.membros + 1 }
          : projeto
      )
    );
    fecharModal();
    alert('Você se juntou ao projeto com sucesso!');
  };

  const getCategoriaIcon = (categoria) => {
    const icons = {
      "Desenvolvimento Web": <Code className="w-4 h-4" />,
      "Mobile": <Smartphone className="w-4 h-4" />,
      "IA": <Brain className="w-4 h-4" />,
      "IoT": <Wifi className="w-4 h-4" />,
      "Blockchain": <Diamond className="w-4 h-4" />
    };
    return icons[categoria] || <Code className="w-4 h-4" />;
  };

  const Card = ({ children, className = "" }) => (
    <div className={`bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm hover:shadow-md transition-all ${className}`}>
      {children}
    </div>
  );

  return (
    <div className="min-h-screen ">
      <div className="max-w-7xl mx-auto px-4 py-6">
        
        {/* LAYOUT CORRIGIDO - Aside 1 coluna, Conteúdo 3 colunas */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Sidebar - CORRIGIDO: lg:col-span-1 */}
          <aside className="lg:col-span-1 lg:sticky lg:top-6 self-start">
            <div className="dark:bg-slate-800 bg-white rounded-2xl p-5 border border-gray-200 dark:border-gray-700 space-y-5">
              
              {/* FOTO + NOME DO USUÁRIO */}
              <div className="flex flex-col items-center py-3">
                <img
                  src={buildFotoURL(usuario?.foto)}
                  alt={`Foto de ${usuario?.nome || "Usuário"}`}
                  className="w-20 h-20 rounded-full border-3 border-white shadow-lg object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "https://placehold.co/150x150/0891b2/ffffff?text=U";
                  }}
                />

                <div className="mt-3 text-center">
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-1">
                    {usuario?.nome}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mt-1 line-clamp-2">
                    {usuario?.cargo}
                  </p>
                </div>
              </div>

              {/* LINHA SEPARADORA */}
              <div className="w-full flex justify-center">
                <div className="w-4/5 border-b border-gray-200 dark:border-gray-600"></div>
              </div>

              {/* MENU DE NAVEGAÇÃO */}
              <nav className="space-y-2.5 mt-3">
                {[
                  { icon: <Home className="w-4 h-4" />, label: "Feed", path: "/feed" },
                  { icon: <BookOpen className="w-4 h-4" />, label: "Meus Cursos", path: "/area-de-estudos" },
                  { icon: <FolderKanban className="w-4 h-4" />, label: "Future Lab", path: "/projetos" },
                  { icon: <Users className="w-4 h-4" />, label: "Connect Hub", path: "/profissionais" },
                  { icon: <MessageCircle className="w-4 h-4" />, label: "SkillTalks", path: "/skilltalks" },
                  { icon: <User className="w-4 h-4" />, label: "Meu Perfil", path: "/perfil" },
                ].map((item, index) => (
                  <Link
                    key={index}
                    to={item.path}
                    className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
                      item.path === "/projetos"
                        ? "bg-cyan-50 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 font-semibold"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    {item.icon}
                    <span className="text-sm">{item.label}</span>
                  </Link>
                ))}
              </nav>
            </div>
          </aside>

          {/* Conteúdo Principal - CORRIGIDO: lg:col-span-3 */}
          <div className="lg:col-span-3">
            
            {/* FILTROS */}
            <div className="bg-slate-800 rounded-2xl p-6 mb-8 border border-[#162235]">
              <h2 className="text-2xl font-bold text-white mb-4">
                <span className="text-cyan-600">Future</span>Lab
              </h2>

              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                  <input
                    className="w-full bg-[#2E3A4A] text-white px-4 py-3 pl-10 rounded-lg border border-gray-500 placeholder-gray-400"
                    placeholder="Buscar projetos..."
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                  />
                </div>

                <select
                  className="flex-1 bg-[#2E3A4A] text-white px-4 py-3 rounded-lg border border-gray-500"
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                >
                  {categorias.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Lista de Projetos */}
            <div className="grid gap-4">
              {projetosFiltrados.map((projeto) => (
                <Card key={projeto.id}>
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {projeto.nome}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                        {projeto.descricao}
                      </p>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="bg-cyan-100 dark:bg-cyan-900 text-cyan-800 dark:text-cyan-200 px-3 py-1 rounded-full flex items-center gap-1">
                          {getCategoriaIcon(projeto.categoria)}
                          {projeto.categoria}
                        </span>
                        <span className="text-gray-500 dark:text-gray-400">
                          {projeto.vagas} vagas disponíveis
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <button 
                        onClick={() => abrirModal(projeto)}
                        className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        Saber Mais
                      </button>
                      <button 
                        onClick={() => participarProjeto(projeto.id)}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                          projeto.vagas > 0 
                            ? "bg-cyan-600 hover:bg-cyan-700 text-white" 
                            : "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                        }`}
                        disabled={projeto.vagas === 0}
                      >
                        {projeto.vagas > 0 ? 'Participar' : 'Lotado'}
                      </button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {projetosFiltrados.length === 0 && (
              <Card className="text-center py-12">
                <FolderKanban className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Nenhum projeto encontrado
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Tente ajustar os filtros de busca.
                </p>
              </Card>
            )}
          </div>
        </div>

        {/* Modal */}
        {modalAberto && projetoSelecionado && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {projetoSelecionado.nome}
                  </h3>
                  <button 
                    onClick={fecharModal}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Descrição</h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      {projetoSelecionado.detalhes}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Área</h4>
                      <span className="bg-cyan-100 dark:bg-cyan-900 text-cyan-800 dark:text-cyan-200 px-3 py-1 rounded-full text-sm flex items-center gap-1 w-fit">
                        {getCategoriaIcon(projetoSelecionado.categoria)}
                        {projetoSelecionado.categoria}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Vagas</h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        {projetoSelecionado.vagas} disponíveis
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Líder</h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        {projetoSelecionado.autor}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Status</h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        {projetoSelecionado.status}
                      </p>
                    </div>
                  </div>

                  {projetoSelecionado.tecnologias && (
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Tecnologias</h4>
                      <div className="flex flex-wrap gap-2">
                        {projetoSelecionado.tecnologias.map((tech, index) => (
                          <span key={index} className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-sm">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3 pt-4">
                    <button 
                      onClick={fecharModal}
                      className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      Fechar
                    </button>
                    <button 
                      onClick={() => participarProjeto(projetoSelecionado.id)}
                      className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                        projetoSelecionado.vagas > 0 
                          ? "bg-cyan-600 hover:bg-cyan-700 text-white" 
                          : "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                      }`}
                      disabled={projetoSelecionado.vagas === 0}
                    >
                      {projetoSelecionado.vagas > 0 ? 'Participar do Projeto' : 'Projeto Lotado'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}