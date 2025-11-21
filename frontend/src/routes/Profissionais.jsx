// src/pages/Profissionais.jsx
import { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  User,
  Home,
  BookOpen,
  Users,
  FolderKanban,
  MessageCircle,
  ThumbsUp,
  X,
  MapPin,
  Mail,
  Briefcase,
  Award,
  Calendar,
  Globe,
  Phone,
  Bookmark,
  Heart,
  Languages,
  GraduationCap,
  Building,
} from "lucide-react";

export default function Profissionais() {
  const [profissionais, setProfissionais] = useState([]);
  const [filtrados, setFiltrados] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  const [busca, setBusca] = useState("");
  const [area, setArea] = useState("");
  const [tecnologia, setTecnologia] = useState("");

  const [usuarioLogado, setUsuarioLogado] = useState(null);

  const [areasUnicas, setAreasUnicas] = useState([]);
  const [tecnologiasUnicas, setTecnologiasUnicas] = useState([]);

  // Estados para o modal
  const [modalAberto, setModalAberto] = useState(false);
  const [profissionalSelecionado, setProfissionalSelecionado] = useState(null);
  const [perfilCompleto, setPerfilCompleto] = useState(null);
  const [carregandoPerfil, setCarregandoPerfil] = useState(false);

  const navigate = useNavigate();

  // FOTO
  const buildFotoURL = useCallback((foto) => {
    if (!foto) return "https://placehold.co/150x150/0891b2/ffffff?text=U";
    if (foto.startsWith("http")) return foto;
    return foto;
  }, []);

  // Carregar usuário logado
  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem("usuarioLogado"));
      setUsuarioLogado(user);
    } catch (e) {
      console.error("Erro ao carregar usuário:", e);
      setUsuarioLogado(null);
    }
  }, []);

  // Carregar profissionais
  useEffect(() => {
    const carregarProfissionais = async () => {
      try {
        setCarregando(true);
        const resposta = await fetch("http://localhost:5000/profissionais");

        if (!resposta.ok) {
          throw new Error(`Erro ${resposta.status}: ${resposta.statusText}`);
        }

        const dados = await resposta.json();

        const perfisAjustados = dados.map((p) => ({
          ...p,
          recomendacoes: p.recomendacoes || {
            count: 0,
            recomendadores: [],
          },
        }));

        setProfissionais(perfisAjustados);
        setFiltrados(perfisAjustados);

        const areas = [...new Set(dados.map((p) => p.area).filter(Boolean))];
        setAreasUnicas(areas);

        const techs = [
          ...new Set(
            dados.flatMap((p) => p.habilidadesTecnicas || []).filter(Boolean)
          ),
        ];
        setTecnologiasUnicas(techs);

        setErro(null);
      } catch (err) {
        console.error("Erro ao carregar profissionais:", err);
        setErro(err.message);
      } finally {
        setCarregando(false);
      }
    };

    carregarProfissionais();
  }, []);

  // Buscar perfil completo do usuário
  const buscarPerfilCompleto = async (profissionalId) => {
    try {
      setCarregandoPerfil(true);
      const resposta = await fetch(`http://localhost:5000/profissionais/${profissionalId}`);
      
      if (!resposta.ok) {
        throw new Error(`Erro ${resposta.status}: ${resposta.statusText}`);
      }

      const perfil = await resposta.json();
      setPerfilCompleto(perfil);
    } catch (err) {
      console.error("Erro ao carregar perfil completo:", err);
      // Se der erro, usa os dados básicos que já temos
      setPerfilCompleto(profissionalSelecionado);
    } finally {
      setCarregandoPerfil(false);
    }
  };

  // Abrir modal com informações completas
  const abrirModal = async (profissional) => {
    setProfissionalSelecionado(profissional);
    setModalAberto(true);
    setPerfilCompleto(null); // Reseta o perfil anterior
    await buscarPerfilCompleto(profissional.id);
  };

  // Fechar modal
  const fecharModal = () => {
    setModalAberto(false);
    setProfissionalSelecionado(null);
    setPerfilCompleto(null);
  };

  // FILTRAR
  useEffect(() => {
    const filtrarProfissionais = () => {
      let lista = [...profissionais];

      const normalize = (texto) =>
        texto?.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") ||
        "";

      if (busca.trim() !== "") {
        const termoBusca = normalize(busca);
        lista = lista.filter(
          (p) =>
            normalize(p.nome)?.includes(termoBusca) ||
            normalize(p.cargo)?.includes(termoBusca) ||
            normalize(p.resumo)?.includes(termoBusca)
        );
      }

      if (area !== "") {
        lista = lista.filter((p) => p.area === area);
      }

      if (tecnologia.trim() !== "") {
        const tech = normalize(tecnologia);
        lista = lista.filter((p) =>
          p.habilidadesTecnicas?.some((habilidade) =>
            normalize(habilidade).includes(tech)
          )
        );
      }

      setFiltrados(lista);
    };

    filtrarProfissionais();
  }, [busca, area, tecnologia, profissionais]);

  // Nome do recomendador
  const getNomeRecomendador = useCallback(
    (id) => {
      const usuario = profissionais.find((p) => p.id === id);
      return usuario ? usuario.nome : "Usuário";
    },
    [profissionais]
  );

  // Verifica se já recomendou
  const usuarioJaRecomendou = useCallback(
    (prof) =>
      prof.recomendacoes?.recomendadores?.includes(usuarioLogado?.id),
    [usuarioLogado]
  );

  // Recomendar
  const recomendarProfissional = async (prof) => {
    if (!usuarioLogado) {
      alert("Você precisa estar logado!");
      return;
    }

    if (usuarioJaRecomendou(prof)) return;

    try {
      const resposta = await fetch(
        `http://localhost:5000/recomendar/${prof.id}/${usuarioLogado.id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!resposta.ok) {
        throw new Error(`Erro ${resposta.status}`);
      }

      const dados = await resposta.json();

      if (!dados.success) {
        alert(dados.error || "Erro ao recomendar profissional");
        return;
      }

      setProfissionais((prev) =>
        prev.map((p) => (p.id === prof.id ? dados.profissional : p))
      );
      
      // Atualiza também o profissional selecionado no modal se estiver aberto
      if (modalAberto && profissionalSelecionado?.id === prof.id) {
        setProfissionalSelecionado(dados.profissional);
        setPerfilCompleto(prev => prev ? {...prev, ...dados.profissional} : dados.profissional);
      }
    } catch (err) {
      console.error("Erro ao recomendar:", err);
      alert("Erro ao recomendar profissional. Tente novamente.");
    }
  };

  // Remover recomendação
  const removerRecomendacao = async (prof) => {
    if (!usuarioJaRecomendou(prof)) return;

    try {
      const resposta = await fetch(
        `http://localhost:5000/recomendar/${prof.id}/${usuarioLogado.id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!resposta.ok) {
        throw new Error(`Erro ${resposta.status}`);
      }

      const dados = await resposta.json();

      setProfissionais((prev) =>
        prev.map((p) => (p.id === prof.id ? dados.profissional : p))
      );
      
      // Atualiza também o profissional selecionado no modal se estiver aberto
      if (modalAberto && profissionalSelecionado?.id === prof.id) {
        setProfissionalSelecionado(dados.profissional);
        setPerfilCompleto(prev => prev ? {...prev, ...dados.profissional} : dados.profissional);
      }
    } catch (err) {
      console.error("Erro ao remover recomendação:", err);
      alert("Erro ao remover recomendação. Tente novamente.");
    }
  };

  // Navegar para SkillTalks
  const navegarParaSkillTalks = (email) => {
    if (!usuarioLogado) {
      alert("Você precisa estar logado para enviar mensagens!");
      return;
    }
    
    if (!email) {
      alert("Profissional não possui email cadastrado");
      return;
    }
    
    if (email.toLowerCase() === usuarioLogado.email?.toLowerCase()) {
      alert("Você não pode enviar mensagem para si mesmo!");
      return;
    }
    
    localStorage.setItem('contatoSelecionado', email);
    navigate('/skilltalks');
  };

  // LOADING
  if (carregando) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            Carregando profissionais...
          </p>
        </div>
      </div>
    );
  }

  // ERRO
  if (erro) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-red-600 dark:text-red-400">
          <p>Erro ao carregar profissionais: {erro}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700"
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  // Dados para mostrar no modal (usa perfil completo ou dados básicos)
  const dadosModal = perfilCompleto || profissionalSelecionado;

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* --- SIDEBAR --- */}
        <aside className="lg:col-span-3 lg:sticky lg:top-[80px] self-start z-10 px-2 lg:px-0">
          <div className="space-y-5 text-center p-5 dark:bg-slate-800 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700">
            
            {/* USUÁRIO */}
            <div className="flex flex-col items-center py-3">
              <img
                src={buildFotoURL(usuarioLogado?.foto)}
                alt={`Foto de ${usuarioLogado?.nome || "Usuário"}`}
                className="w-20 h-20 rounded-full border-3 border-white shadow-lg object-cover"
              />
              <div className="mt-3">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-1">
                  {usuarioLogado?.nome || "Usuário"}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-sm mt-1 line-clamp-2">
                  {usuarioLogado?.cargo || "Cargo não informado"}
                </p>
              </div>
            </div>

            <div className="w-full flex justify-center">
              <div className="w-4/5 border-b border-gray-200 dark:border-gray-600"></div>
            </div>

            {/* NAVEGAÇÃO */}
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
                    item.path === "/profissionais"
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

        {/* --- CONTEÚDO PRINCIPAL --- */}
        <main className="lg:col-span-9">

          {/* FILTROS */}
          <div className="bg-slate-800 rounded-2xl p-6 mb-8 border border-[#162235]">
            <h2 className="text-2xl font-bold text-white mb-4">
              <span className="text-cyan-600">Connect</span>Hub
            </h2>

            <div className="flex flex-col md:flex-row gap-4">
              <input
                className="flex-1 bg-[#2E3A4A] text-white px-4 py-3 rounded-lg border border-gray-500 placeholder-gray-400"
                placeholder="Buscar nome ou cargo..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
              />

              <select
                className="flex-1 bg-[#2E3A4A] text-white px-4 py-3 rounded-lg border border-gray-500"
                value={area}
                onChange={(e) => setArea(e.target.value)}
              >
                <option value="">Todas as áreas</option>
                {areasUnicas.map((areaItem) => (
                  <option key={areaItem} value={areaItem}>
                    {areaItem}
                  </option>
                ))}
              </select>

              <input
                className="flex-1 bg-[#2E3A4A] text-white px-4 py-3 rounded-lg border border-gray-500 placeholder-gray-400"
                placeholder="Skill (ex: React)"
                value={tecnologia}
                onChange={(e) => setTecnologia(e.target.value)}
                list="tecnologias-lista"
              />

              <datalist id="tecnologias-lista">
                {tecnologiasUnicas.map((tech) => (
                  <option key={tech} value={tech} />
                ))}
              </datalist>
            </div>
          </div>

          {/* LISTA */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filtrados.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                  {profissionais.length === 0
                    ? "Nenhum profissional encontrado."
                    : "Nenhum profissional corresponde aos filtros aplicados."}
                </p>
              </div>
            ) : (
              filtrados.map((profissional) => {
                const jaRecomendou = usuarioJaRecomendou(profissional);

                return (
                  <div
                    key={profissional.id}
                    className="group p-5 rounded-2xl border shadow-lg transition-all duration-300 dark:bg-slate-800 border-gray-200 dark:border-gray-700 hover:shadow-xl hover:-translate-y-1 relative overflow-hidden w-full min-h-[320px] flex flex-col cursor-pointer"
                    onClick={() => abrirModal(profissional)}
                  >
                    {/* HEADER COM ÁREA - MAIS COMPACTO */}
                    <div className="flex items-start gap-3 mb-3">
                      <img
                        src={buildFotoURL(profissional.foto)}
                        alt={`Foto de ${profissional.nome}`}
                        className="w-12 h-12 rounded-lg object-cover border border-cyan-600/40 dark:border-cyan-400/30 flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-900 dark:text-white text-base truncate leading-tight">
                          {profissional.nome}
                        </h3>
                        <p className="text-xs text-gray-600 dark:text-gray-400 truncate mt-1">
                          {profissional.cargo}
                        </p>
                        <p className="text-xs text-cyan-600 dark:text-cyan-400 font-medium">
                          {profissional.area}
                        </p>
                      </div>
                    </div>

                    {/* RESUMO - MAIS CURTO */}
                    <p className="text-gray-600 dark:text-gray-300 text-xs mb-3 leading-relaxed line-clamp-2 flex-shrink-0">
                      {profissional.resumo || "Sem descrição"}
                    </p>

                    {/* SKILLS - MAIS COMPACTO */}
                    <div className="flex flex-wrap gap-1.5 mb-3 flex-shrink-0">
                      {profissional.habilidadesTecnicas?.slice(0, 3).map((skill, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 text-xs rounded font-medium  dark:bg-cyan-600 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 truncate max-w-[100px]"
                        >
                          {skill}
                        </span>
                      ))}
                      {profissional.habilidadesTecnicas?.length > 3 && (
                        <span className="px-2 py-1 text-xs rounded font-medium  dark:bg-cyan-800 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700">
                          +{profissional.habilidadesTecnicas.length - 3}
                        </span>
                      )}
                      {(!profissional.habilidadesTecnicas || profissional.habilidadesTecnicas.length === 0) && (
                        <span className="text-xs text-gray-500">
                          Nenhuma skill
                        </span>
                      )}
                    </div>

                    {/* RECOMENDAÇÃO - MAIS COMPACTO */}
                    {profissional.recomendacoes?.recomendadores?.length > 0 && (
                      <div className="mb-3 text-xs p-2 rounded-lg bg-gray-50 dark:bg-[#141A22] border border-gray-200 dark:border-gray-700 flex-shrink-0">
                        <div className="flex items-center gap-1.5">
                          <ThumbsUp className="w-3 h-3 text-cyan-600 dark:text-cyan-400 flex-shrink-0" />
                          <strong className="text-gray-800 dark:text-gray-200 text-xs">
                            Recomendado por:
                          </strong>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 text-xs mt-1 truncate">
                          {profissional.recomendacoes.recomendadores
                            .slice(0, 1)
                            .map((id, index) => (
                              <span key={index}>
                                {getNomeRecomendador(id)}
                              </span>
                            ))}
                          {profissional.recomendacoes.recomendadores.length > 1 && (
                            <span className="text-cyan-600 dark:text-cyan-400 ml-1">
                              +{profissional.recomendacoes.recomendadores.length - 1} outros
                            </span>
                          )}
                        </p>
                      </div>
                    )}

                    {/* BOTÕES - MAIS COMPACTOS */}
                    <div className="flex gap-2 mt-auto pt-2" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() =>
                          jaRecomendou
                            ? removerRecomendacao(profissional)
                            : recomendarProfissional(profissional)
                        }
                        className={`
                          flex-1 px-3 py-2 rounded-lg font-medium flex items-center justify-center gap-1.5
                          transition-all duration-200 text-xs
                          ${
                            jaRecomendou
                              ? "bg-slate-500 text-white hover:bg-gray-500"
                              : "bg-slate-600 text-gray-700 dark:text-gray-300 dark:hover:bg-slate-700 "
                          }
                        `}
                        disabled={!usuarioLogado}
                      >
                        <ThumbsUp className="w-3 h-3" />
                        Recomendar
                      </button>

                      <button
                        onClick={() => navegarParaSkillTalks(profissional.email)}
                        className="
                          flex-1 px-3 py-2 rounded-lg text-xs
                          bg-cyan-600 hover:bg-cyan-700 text-white 
                          flex items-center justify-center gap-1.5 
                          transition-all duration-200
                          disabled:opacity-50 disabled:cursor-not-allowed
                        "
                        disabled={!profissional.email || !usuarioLogado || profissional.email.toLowerCase() === usuarioLogado?.email?.toLowerCase()}
                        title={
                          !usuarioLogado ? "Faça login para enviar mensagens" :
                          !profissional.email ? "Profissional sem email" :
                          profissional.email.toLowerCase() === usuarioLogado.email?.toLowerCase() ? "Você não pode enviar mensagem para si mesmo" :
                          "Enviar mensagem"
                        }
                      >
                        <MessageCircle className="w-3 h-3" />
                        Mensagem
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </main>
      </div>

      {/* MODAL DE INFORMAÇÕES COMPLETAS */}
      {modalAberto && dadosModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 max-w-4xl w-full max-h-[90vh] overflow-hidden">
            {/* HEADER DO MODAL */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Perfil Completo
              </h2>
              <button
                onClick={fecharModal}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            {/* CONTEÚDO DO MODAL */}
            <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
              {carregandoPerfil ? (
                <div className="flex justify-center items-center p-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600"></div>
                </div>
              ) : (
                <div className="p-6">
                  {/* CABEÇALHO COM FOTO E INFOS BÁSICAS */}
                  <div className="flex flex-col md:flex-row gap-6 mb-8">
                    <img
                      src={buildFotoURL(dadosModal.foto)}
                      alt={`Foto de ${dadosModal.nome}`}
                      className="w-24 h-24 rounded-2xl object-cover border-2 border-cyan-600/40 dark:border-cyan-400/30 flex-shrink-0"
                    />
                    <div className="flex-1">
                      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        {dadosModal.nome}
                      </h1>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-300 mb-4">
                        <div className="flex items-center gap-2">
                          <Briefcase className="w-4 h-4 text-cyan-600" />
                          <span>{dadosModal.cargo}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Award className="w-4 h-4 text-cyan-600" />
                          <span className="text-cyan-600 dark:text-cyan-400 font-medium">
                            {dadosModal.area}
                          </span>
                        </div>
                        {dadosModal.localizacao && (
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-cyan-600" />
                            <span>{dadosModal.localizacao}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* SEÇÃO 1: INFORMAÇÕES PESSOAIS E ACADÊMICAS */}
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <User className="w-5 h-5 text-cyan-600" />
                      Informações Pessoais e Acadêmicas
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* CONTATO */}
                      <div className="space-y-3">
                        <h4 className="font-medium text-gray-900 dark:text-white">Contato</h4>
                        <div className="space-y-2">
                          {dadosModal.email && (
                            <div className="flex items-center gap-2 text-sm">
                              <Mail className="w-4 h-4 text-cyan-600" />
                              <span className="text-gray-700 dark:text-gray-300">{dadosModal.email}</span>
                            </div>
                          )}
                          {dadosModal.telefone && (
                            <div className="flex items-center gap-2 text-sm">
                              <Phone className="w-4 h-4 text-cyan-600" />
                              <span className="text-gray-700 dark:text-gray-300">{dadosModal.telefone}</span>
                            </div>
                          )}
                          {dadosModal.linkedin && (
                            <div className="flex items-center gap-2 text-sm">
                              <Users className="w-4 h-4 text-cyan-600" />
                              <a 
                                href={dadosModal.linkedin} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-cyan-600 hover:text-cyan-700 dark:text-cyan-400"
                              >
                                LinkedIn
                              </a>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* FORMAÇÃO ACADÊMICA */}
                      <div className="space-y-3">
                        <h4 className="font-medium text-gray-900 dark:text-white">Formação Acadêmica</h4>
                        <div className="space-y-2">
                          {dadosModal.formacao ? (
                            <div className="flex items-start gap-2 text-sm">
                              <GraduationCap className="w-4 h-4 text-cyan-600 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700 dark:text-gray-300">{dadosModal.formacao}</span>
                            </div>
                          ) : (
                            <p className="text-sm text-gray-500 dark:text-gray-400">Formação não informada</p>
                          )}
                          {dadosModal.instituicao && (
                            <div className="flex items-center gap-2 text-sm">
                              <Building className="w-4 h-4 text-cyan-600" />
                              <span className="text-gray-700 dark:text-gray-300">{dadosModal.instituicao}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* SEÇÃO 2: EXPERIÊNCIAS E HABILIDADES TÉCNICAS */}
                  {/* SEÇÃO 2 + SEÇÃO 3 LADO A LADO */}
<div className="mb-8">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

    {/* === COLUNA 1 — EXPERIÊNCIAS E HABILIDADES TÉCNICAS === */}
    <div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        <Briefcase className="w-5 h-5 text-cyan-600" />
        Experiências e Habilidades
      </h3>

      {/* EXPERIÊNCIA PROFISSIONAL */}
<div className="mb-6">
  <h4 className="font-medium text-gray-900 dark:text-white mb-3">
    Experiência Profissional
  </h4>

  {dadosModal.experiencias ? (
    <div className="flex items-start gap-2">
      <Calendar className="w-4 h-4 text-cyan-600 mt-0.5 flex-shrink-0" />

      <div>
        <p className="text-gray-700 dark:text-gray-300">
          {dadosModal.experiencias}
        </p>

        {dadosModal.anosExperiencia && (
          <p className="text-sm text-cyan-600 dark:text-cyan-400 mt-1">
            {dadosModal.anosExperiencia} anos de experiência
          </p>
        )}
      </div>
    </div>
  ) : (
    <p className="text-gray-500 dark:text-gray-400">
      Experiência não informada
    </p>
  )}
</div>


      {/* HABILIDADES TÉCNICAS */}
      <div>
        <h4 className="font-medium text-gray-900 dark:text-white mb-3">Habilidades Técnicas</h4>
        <div className="flex flex-wrap gap-2">
          {dadosModal.habilidadesTecnicas?.map((skill, index) => (
            <span
              key={index}
              className="px-3 py-2 text-sm rounded-lg font-medium bg-cyan-100 dark:bg-cyan-900/30 text-cyan-800 dark:text-cyan-200 border border-cyan-200 dark:border-cyan-800"
            >
              {skill}
            </span>
          ))}
          {(!dadosModal.habilidadesTecnicas || dadosModal.habilidadesTecnicas.length === 0) && (
            <p className="text-gray-500 dark:text-gray-400">Nenhuma habilidade técnica informada</p>
          )}
        </div>
      </div>
    </div>

    {/* === COLUNA 2 — SOFT SKILLS === */}
    <div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        <Heart className="w-5 h-5 text-cyan-600" />
        Soft Skills
      </h3>

      <div>
        <h4 className="font-medium text-gray-900 dark:text-white mb-3">Soft Skills</h4>
        <div className="flex flex-wrap gap-2">
          {dadosModal.softSkills?.map((skill, index) => (
            <span
              key={index}
              className="px-3 py-2 text-sm rounded-lg font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 border border-purple-200 dark:border-purple-800"
            >
              {skill}
            </span>
          ))}

          {(!dadosModal.softSkills || dadosModal.softSkills.length === 0) && (
            <p className="text-gray-500 dark:text-gray-400">Soft skills não informadas</p>
          )}
        </div>
      </div>

    </div>
  </div>
</div>


                  {/* SEÇÃO 4: RECOMENDAÇÕES */}
                  {dadosModal.recomendacoes?.recomendadores?.length > 0 && (
                    <div className="mb-8">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <ThumbsUp className="w-5 h-5 text-cyan-600" />
                        Recomendações ({dadosModal.recomendacoes.count})
                      </h3>
                      <div className="bg-gray-50 dark:bg-[#141A22] rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                        <div className="space-y-3">
                          {dadosModal.recomendacoes.recomendadores.map((id, index) => (
                            <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-white dark:bg-gray-800">
                              <div className="w-10 h-10 bg-cyan-100 dark:bg-cyan-900/30 rounded-full flex items-center justify-center text-cyan-700 dark:text-cyan-300 font-bold">
                                {getNomeRecomendador(id).charAt(0)}
                              </div>
                              <div>
                                <span className="text-sm font-medium text-gray-900 dark:text-white">
                                  {getNomeRecomendador(id)}
                                </span>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Recomendou este profissional</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* SEÇÃO 5: BOTÕES DE AÇÃO */}
                  <div className="flex gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <button
                      onClick={() => {
                        const jaRecomendouModal = usuarioJaRecomendou(dadosModal);
                        jaRecomendouModal
                          ? removerRecomendacao(dadosModal)
                          : recomendarProfissional(dadosModal);
                      }}
                      className={`
                        flex-1 px-6 py-3 rounded-xl font-medium flex items-center justify-center gap-3
                        transition-all duration-200 text-lg
                        ${
                          usuarioJaRecomendou(dadosModal)
                            ? "bg-gray-600 text-white hover:bg-gray-500"
                            : "bg-cyan-600 hover:bg-cyan-700 text-white"
                        }
                      `}
                      disabled={!usuarioLogado}
                    >
                      <ThumbsUp className="w-5 h-5" />
                      {usuarioJaRecomendou(dadosModal)
                        ? `Remover Recomendação (${dadosModal.recomendacoes.count})`
                        : `Recomendar Profissional (${dadosModal.recomendacoes.count})`}
                    </button>

                    <button
                      onClick={() => {
                        navegarParaSkillTalks(dadosModal.email);
                        fecharModal();
                      }}
                      className="
                        flex-1 px-6 py-3 rounded-xl text-white text-lg
                        bg-slate-800 hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600
                        flex items-center justify-center gap-3 transition-all duration-200
                        disabled:opacity-50 disabled:cursor-not-allowed
                      "
                      disabled={!dadosModal.email || !usuarioLogado || dadosModal.email.toLowerCase() === usuarioLogado?.email?.toLowerCase()}
                    >
                      <MessageCircle className="w-5 h-5" />
                      Enviar Mensagem
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}