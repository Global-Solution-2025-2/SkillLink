import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Edit, PlusCircle, Trash2, Upload,
  Briefcase, Calendar, MapPin, User, Mail, Lock,
  Cake, Globe, Zap, Heart, Save, X
} from "lucide-react";

// Componente de Input simplificado
const InputField = ({ label, type = "text", value, onChange, placeholder, Icon, isTextArea, maxLength }) => (
  <div className="space-y-2">
    <label className="text-sm font-semibold flex items-center text-gray-700 dark:text-gray-300">
      {Icon && <Icon size={16} className="mr-2 text-cyan-600" />}
      {label}
    </label>

    {isTextArea ? (
      <>
        <textarea
          value={value || ""}
          onChange={onChange}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-cyan-600"
          placeholder={placeholder}
          maxLength={maxLength}
          rows={4}
        />
        <p className="text-right text-xs text-gray-500">
          {value?.length || 0}/{maxLength}
        </p>
      </>
    ) : (
      <input
        type={type}
        value={value || ""}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-cyan-600"
      />
    )}
  </div>
);

// Componente de Lista Dinâmica
const ListaDinamica = ({ titulo, campo, items, onAdd, onRemove, onUpdate, Icon }) => (
  <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg border dark:border-gray-700">
    <div className="flex justify-between items-center mb-3">
      <h4 className="font-semibold flex items-center gap-2 text-white">
        <Icon size={18} className="text-cyan-600" />
        {titulo}
      </h4>
      <button
        type="button"
        onClick={onAdd}
        className="bg-cyan-600 text-white px-3 py-1 rounded-lg flex items-center gap-2 text-sm"
      >
        <PlusCircle size={16} /> Add
      </button>
    </div>

    <div className="space-y-2">
      {items?.map((item, index) => (
        <div key={index} className="flex gap-2">
          <input
            value={item}
            onChange={(e) => onUpdate(index, e.target.value)}
            className="flex-1 px-3 py-2 rounded-lg bg-white dark:bg-gray-800 border dark:border-gray-700"
            placeholder={`Adicionar ${titulo.toLowerCase()}...`}
          />
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ))}

      {!items?.length && (
        <p className="text-gray-500 dark:text-gray-400 text-sm italic text-center py-2">
          Nenhum item adicionado
        </p>
      )}
    </div>
  </div>
);

export default function Perfil() {
  const [usuario, setUsuario] = useState(null);
  const [editando, setEditando] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [novaFoto, setNovaFoto] = useState(null);

  const navigate = useNavigate();

  // Carregar usuário do localStorage
  useEffect(() => {
    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
    if (!usuarioLogado) return navigate("/login");
    setUsuario(usuarioLogado);
  }, [navigate]);

  const toggleEdicao = () => {
    setEditando(!editando);
    setNovaFoto(null);
  };

  const handleFotoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) setNovaFoto(file);
  };

  const buildFotoURL = (f) => {
    if (!f) return "https://placehold.co/150x150/0891b2/ffffff?text=U";
    if (f.startsWith("http")) return f;
    if (f.startsWith("/")) return `http://localhost:5000${f}`;
    return `http://localhost:5000/${f}`;
  };

  // Funções para gerenciar listas
  const adicionarItem = (campo) => {
    setUsuario(prev => ({
      ...prev,
      [campo]: [...(prev[campo] || []), ""]
    }));
  };

  const removerItem = (campo, index) => {
    setUsuario(prev => {
      const novaLista = [...(prev[campo] || [])];
      novaLista.splice(index, 1);
      return { ...prev, [campo]: novaLista };
    });
  };

  const atualizarItem = (campo, index, valor) => {
    setUsuario(prev => {
      const novaLista = [...(prev[campo] || [])];
      novaLista[index] = valor;
      return { ...prev, [campo]: novaLista };
    });
  };

  // Salvar perfil
  const handleSalvar = async (e) => {
    e.preventDefault();
    if (!usuario) return;
    
    setCarregando(true);
    
    try {
      let fotoUrl = usuario.foto;

      // Upload da foto se houver nova
      if (novaFoto) {
        const formData = new FormData();
        formData.append("foto", novaFoto);

        const uploadRes = await fetch(`http://localhost:5000/upload/${usuario.id}`, {
          method: "POST",
          body: formData
        });

        if (uploadRes.ok) {
          const uploadData = await uploadRes.json();
          fotoUrl = uploadData.foto ? `http://localhost:5000${uploadData.foto}` : fotoUrl;
        }
      }

      // Atualizar perfil
      const updateRes = await fetch(`http://localhost:5000/perfil/${usuario.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...usuario, foto: fotoUrl })
      });

      if (updateRes.ok) {
        const data = await updateRes.json();
        const usuarioAtualizado = {
          ...usuario,
          ...data.perfil,
          ...data.usuario,
          foto: fotoUrl
        };

        localStorage.setItem("usuarioLogado", JSON.stringify(usuarioAtualizado));
        setUsuario(usuarioAtualizado);
        setNovaFoto(null);
        setEditando(false);
        alert("Perfil atualizado com sucesso!");
      }
    } catch (error) {
      console.error("Erro ao salvar:", error);
      alert("Erro ao salvar perfil");
    }
    
    setCarregando(false);
  };

  if (!usuario) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Carregando perfil...</p>
      </div>
    );
  }

  // Dados para as seções
  const secoes = [
  { campo: "habilidadesTecnicas", titulo: "Habilidades Técnicas", icon: Zap },
  { campo: "softSkills", titulo: "Soft Skills", icon: Heart },
  { campo: "idiomas", titulo: "Idiomas", icon: Globe },
  { campo: "formacao", titulo: "Formação", icon: Calendar },
  { campo: "experiencias", titulo: "Experiências", icon: Briefcase },
  { campo: "projetos", titulo: "Projetos", icon: PlusCircle },
  { campo: "certificacoes", titulo: "Certificações", icon: Save },
  { campo: "areaInteresses", titulo: "Áreas de Interesse", icon: Zap },
];


  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Header com Botões de Ação NO TOPO */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold ">Meu Perfil</h1>
          
          {editando ? (
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleSalvar}
                disabled={carregando}
                className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2 rounded-lg font-semibold flex items-center gap-2"
              >
                {carregando ? (
                  "Salvando..."
                ) : (
                  <>
                    <Save size={18} />
                    Salvar
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={toggleEdicao}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-lg font-semibold flex items-center gap-2"
              >
                <X size={18} />
                Cancelar
              </button>
            </div>
          ) : (
            <button
              onClick={toggleEdicao}
              className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2 rounded-lg font-semibold flex items-center gap-2"
            >
              <Edit size={18} />
              Editar Perfil
            </button>
          )}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            
            {/* Sidebar */}
            <div className="lg:w-1/3 p-6 border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-gray-700">
              <div className="text-center">
                <img
                  src={novaFoto ? URL.createObjectURL(novaFoto) : buildFotoURL(usuario.foto)}
                  className="w-32 h-32 rounded-full object-cover border-4 border-cyan-600 mx-auto"
                  alt="Foto do perfil"
                />
                
                {editando && (
                  <label className="mt-3 cursor-pointer inline-flex items-center gap-2 bg-cyan-600 text-white px-4 py-2 rounded-lg text-sm">
                    <Upload size={16} />
                    Trocar Foto
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFotoChange}
                      className="hidden"
                    />
                  </label>
                )}
                
                <h2 className="text-2xl font-bold mt-4 text-white">
                  {usuario.nome}
                </h2>
                <p className="text-cyan-600 font-medium mt-1">
                  {usuario.cargo || "Sem cargo definido"}
                </p>
                <p className="text-gray-600 dark:text-gray-300 mt-2 flex items-center justify-center">
                  <Mail size={16} className="mr-2" />
                  {usuario.email}
                </p>
              </div>

              <div className="mt-6 space-y-3">
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <MapPin size={16} className="mr-2 text-cyan-600" />
                  {usuario.localizacao || "Localização não informada"}
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <Cake size={16} className="mr-2 text-cyan-600" />
                  {usuario.dataNascimento || "Data não informada"}
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <Briefcase size={16} className="mr-2 text-cyan-600" />
                  {usuario.area || "Área não definida"}
                </div>
              </div>

              {usuario.resumo && (
                <div className="mt-6">
                  <h3 className="font-semibold mb-2 text-cyan-600 ">Resumo</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    {usuario.resumo}
                  </p>
                </div>
              )}
            </div>

            {/* Conteúdo Principal */}
            <div className="lg:w-2/3 p-6">
              {editando ? (
                <form onSubmit={handleSalvar} className="space-y-6">
                  
                  <div>
  <h3 className="text-xl font-bold mb-4 text-white">Dados Pessoais</h3>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    
    <InputField
      label="Nome Completo"
      value={usuario.nome}
      onChange={(e) => setUsuario({ ...usuario, nome: e.target.value })}
      Icon={User}
    />

    <InputField
      label="Email"
      value={usuario.email}
      disabled
      Icon={Mail}
    />

    <InputField
      label="Senha"
      type="password"
      value={usuario.senha}
      onChange={(e) => setUsuario({ ...usuario, senha: e.target.value })}
      Icon={Lock}
    />

    <InputField
      label="Data de Nascimento"
      type="date"
      value={usuario.dataNascimento}
      onChange={(e) => setUsuario({ ...usuario, dataNascimento: e.target.value })}
      Icon={Cake}
    />

    <InputField
      label="Localização"
      value={usuario.localizacao}
      onChange={(e) => setUsuario({ ...usuario, localizacao: e.target.value })}
      Icon={MapPin}
    />

    <InputField
      label="Cargo"
      value={usuario.cargo}
      onChange={(e) => setUsuario({ ...usuario, cargo: e.target.value })}
      Icon={Briefcase}
    />

    <InputField
      label="Área"
      value={usuario.area}
      onChange={(e) => setUsuario({ ...usuario, area: e.target.value })}
      Icon={Zap}
    />
  </div>

  <div className="mt-4">
    <InputField
      label="Resumo Profissional"
      isTextArea
      maxLength={300}
      value={usuario.resumo}
      onChange={(e) => setUsuario({ ...usuario, resumo: e.target.value })}
      placeholder="Fale um pouco sobre você..."
      Icon={Briefcase}
    />
  </div>
</div>


                  {/* Listas Dinâmicas */}
                  <div>
                    <h3 className="text-xl font-bold mb-4 text-white">Informações Adicionais</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {secoes.map(sec => (
                        <ListaDinamica
                          key={sec.campo}
                          titulo={sec.titulo}
                          campo={sec.campo}
                          items={usuario[sec.campo]}
                          onAdd={() => adicionarItem(sec.campo)}
                          onRemove={(index) => removerItem(sec.campo, index)}
                          onUpdate={(index, valor) => atualizarItem(sec.campo, index, valor)}
                          Icon={sec.icon}
                        />
                      ))}
                    </div>
                  </div>
                </form>
              ) : (
                /* Modo Visualização */
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-white">Meu Currículo</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {secoes.map(sec => (
                      <div key={sec.campo} className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg text-white border dark:border-gray-700">
                        <h3 className="font-semibold mb-3 flex items-center gap-2 text-white">
                          <sec.icon size={18} className="text-cyan-600" />
                          {sec.titulo}
                        </h3>
                        
                        {usuario[sec.campo]?.length ? (
                          <ul className="space-y-2">
                            {usuario[sec.campo].map((item, index) => (
                              <li key={index} className="bg-white dark:bg-gray-800 p-2 text-white rounded border dark:border-gray-700">
                                {item}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-gray-500 dark:text-gray-400 italic text-sm">
                            Nenhum item adicionado
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}