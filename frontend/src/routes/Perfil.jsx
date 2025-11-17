import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Edit, Save, PlusCircle, Trash2, Upload,
  Briefcase, Calendar, MapPin, User, Mail,
  Cake, Globe, Zap, Heart,
} from "lucide-react";

/* ===========================================================
   COMPONENTE GENÉRICO DE INPUT
=========================================================== */
const InputField = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  disabled,
  Icon,
  isTextArea,
  maxLength,
}) => (
  <div className="space-y-1">
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
        />
        <p className="text-right text-xs text-gray-500 dark:text-gray-400">
          {value?.length || 0}/{maxLength}
        </p>
      </>
    ) : (
      <input
        type={type}
        value={value || ""}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        className={`w-full px-3 py-2 border rounded-lg text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-cyan-600 ${
          disabled ? "opacity-60 cursor-not-allowed" : ""
        }`}
      />
    )}
  </div>
);

/* ===========================================================
   PÁGINA DE PERFIL COMPLETA
=========================================================== */
export default function Perfil() {
  const [usuario, setUsuario] = useState(null);
  const [editando, setEditando] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [novaFoto, setNovaFoto] = useState(null);

  const navigate = useNavigate();

  /* Carregar usuário */
  useEffect(() => {
    const logado = JSON.parse(localStorage.getItem("usuarioLogado"));
    if (!logado) return navigate("/login");
    setUsuario(logado);
  }, [navigate]);

  const handleEditar = () => setEditando((prev) => !prev);

  const handleFotoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) setNovaFoto(file);
  };

  const buildFotoURL = (f) => {
    if (!f) return "/images/default.jpg";
    if (f.startsWith("http")) return f;
    if (f.startsWith("/")) return `http://localhost:5000${f}`;
    return `http://localhost:5000/${f}`;
  };

  /* Salvar tudo */
  const handleSalvar = async (e) => {
    e.preventDefault();
    setCarregando(true);

    try {
      let fotoUrl = usuario.foto;

      if (novaFoto) {
        const fd = new FormData();
        fd.append("foto", novaFoto);

        const up = await fetch(
          `http://localhost:5000/upload/${usuario.id}`,
          { method: "POST", body: fd }
        );
        const upJson = await up.json();
        fotoUrl = upJson.caminho || fotoUrl;
      }

      const req = await fetch(
        `http://localhost:5000/perfil/${usuario.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...usuario, foto: fotoUrl }),
        }
      );

      const json = await req.json();
      const novoPerfil = json.perfil || json.usuario;

      localStorage.setItem(
        "usuarioLogado",
        JSON.stringify(novoPerfil)
      );

      setUsuario(novoPerfil);
      setNovaFoto(null);
      setEditando(false);
      alert("Perfil atualizado!");
    } catch (err) {
      alert("Erro ao salvar: " + err.message);
    }

    setCarregando(false);
  };

  /* Adicionar, remover, editar itens de listas */
  const adicionarItem = (campo) =>
    setUsuario((u) => ({
      ...u,
      [campo]: [...(u[campo] || []), ""],
    }));

  const removerItem = (campo, index) =>
    setUsuario((u) => {
      const nova = [...(u[campo] || [])];
      nova.splice(index, 1);
      return { ...u, [campo]: nova };
    });

  const atualizarItem = (campo, index, valor) =>
    setUsuario((u) => {
      const nova = [...(u[campo] || [])];
      nova[index] = valor;
      return { ...u, [campo]: nova };
    });

  if (!usuario)
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-gray-900">
        <p className="text-gray-600 dark:text-gray-300">Carregando perfil...</p>
      </div>
    );

  /* ===========================================================
     SIDEBAR DE VISUALIZAÇÃO
  =========================================================== */
  const Sidebar = () => (
    <div className="lg:w-1/3 p-6 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800">

      <div className="flex flex-col items-center text-center">
        <img
          src={
            novaFoto
              ? URL.createObjectURL(novaFoto)
              : buildFotoURL(usuario.foto)
          }
          className="w-32 h-32 rounded-full object-cover border-4 border-cyan-600"
        />

        <h2 className="text-2xl font-bold mt-4 text-gray-900 dark:text-gray-100">
          {usuario.nome}
        </h2>

        <p className="text-cyan-600 dark:text-cyan-400 font-medium">
          {usuario.cargo || "Sem cargo definido"}
        </p>

        <div className="flex items-center text-gray-600 dark:text-gray-300 mt-3 text-sm">
          <Mail size={16} className="mr-2 text-cyan-600" />
          {usuario.email}
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-3 flex items-center text-gray-900 dark:text-gray-100">
          <Briefcase size={18} className="mr-2 text-cyan-600" />
          Resumo
        </h3>

        <p className="text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg leading-relaxed">
          {usuario.resumo ||
            "Nenhum resumo adicionado ainda."}
        </p>
      </div>

      <div className="mt-8 space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Dados pessoais
        </h3>

        <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg flex items-center">
          <MapPin size={16} className="mr-2 text-cyan-600" />
          {usuario.localizacao || "Não informado"}
        </div>

        <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg flex items-center">
          <Cake size={16} className="mr-2 text-cyan-600" />
          {usuario.dataNascimento || "Sem data"}
        </div>

        <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg flex items-center">
          <Briefcase size={16} className="mr-2 text-cyan-600" />
          {usuario.area || "Sem área definida"}
        </div>
      </div>
    </div>
  );

  /* ===========================================================
     RENDERIZAÇÃO PRINCIPAL
  =========================================================== */
  return (
    <div className="min-h-screen py-10 px-4 dark:bg-gray-900 dark:text-gray-100">

      <div className="max-w-7xl mx-auto">

        {/* TITULO + BOTÃO */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Meu Perfil</h1>

          <button
            onClick={handleEditar}
            className={`px-6 py-2 rounded-lg flex items-center gap-2 font-semibold text-white ${
              editando ? "bg-red-600" : "bg-cyan-600"
            }`}
          >
            <Edit size={18} />
            {editando ? "Cancelar" : "Editar"}
          </button>
        </div>

        {/* CARD PRINCIPAL */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col lg:flex-row">

          {/* SIDEBAR */}
          <Sidebar />

          {/* ==================== MODO DE EDIÇÃO ==================== */}
          {editando ? (
            <form onSubmit={handleSalvar} className="lg:w-2/3 p-8 space-y-10">

              {/* FOTO */}
              <div className="flex flex-col items-center">
                <img
                  src={
                    novaFoto
                      ? URL.createObjectURL(novaFoto)
                      : buildFotoURL(usuario.foto)
                  }
                  className="w-36 h-36 rounded-full border-4 border-cyan-600 object-cover"
                />

                <label className="mt-3 cursor-pointer bg-cyan-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                  <Upload size={18} />
                  Trocar Foto
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFotoChange}
                    className="hidden"
                  />
                </label>
              </div>

              {/* DADOS PESSOAIS */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold mb-2">Dados Pessoais</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField
                    label="Nome Completo"
                    value={usuario.nome}
                    onChange={(e) =>
                      setUsuario({ ...usuario, nome: e.target.value })
                    }
                    Icon={User}
                  />

                  <InputField
                    label="Email"
                    value={usuario.email}
                    disabled
                    Icon={Mail}
                  />

                  <InputField
                    label="Data de Nascimento"
                    type="date"
                    value={usuario.dataNascimento}
                    onChange={(e) =>
                      setUsuario({
                        ...usuario,
                        dataNascimento: e.target.value,
                      })
                    }
                    Icon={Cake}
                  />

                  <InputField
                    label="Localização"
                    value={usuario.localizacao}
                    onChange={(e) =>
                      setUsuario({
                        ...usuario,
                        localizacao: e.target.value,
                      })
                    }
                    Icon={MapPin}
                  />

                  <InputField
                    label="Cargo Atual"
                    value={usuario.cargo}
                    onChange={(e) =>
                      setUsuario({
                        ...usuario,
                        cargo: e.target.value,
                      })
                    }
                    Icon={Briefcase}
                  />

                  <InputField
                    label="Área de atuação"
                    value={usuario.area}
                    onChange={(e) =>
                      setUsuario({
                        ...usuario,
                        area: e.target.value,
                      })
                    }
                    Icon={Zap}
                  />
                </div>

                <InputField
                  label="Resumo Profissional"
                  isTextArea
                  maxLength={300}
                  value={usuario.resumo}
                  placeholder="Fale sobre você..."
                  onChange={(e) =>
                    setUsuario({
                      ...usuario,
                      resumo: e.target.value,
                    })
                  }
                  Icon={Briefcase}
                />
              </div>

              {/* LISTAS DINÂMICAS */}
              <div className="space-y-10">

                {[
                  { campo: "habilidadesTecnicas", titulo: "Habilidades Técnicas", icon: Zap },
                  { campo: "softSkills", titulo: "Soft Skills", icon: Heart },
                  { campo: "idiomas", titulo: "Idiomas", icon: Globe },
                  { campo: "formacao", titulo: "Formação", icon: Calendar },
                  { campo: "experiencias", titulo: "Experiências", icon: Briefcase },
                  { campo: "projetos", titulo: "Projetos", icon: PlusCircle },
                  { campo: "certificacoes", titulo: "Certificações", icon: Edit },
                  { campo: "areaInteresses", titulo: "Áreas de Interesse", icon: Heart },
                ].map((item) => (
                  <div key={item.campo} className="bg-gray-100 dark:bg-gray-900 p-5 rounded-lg border dark:border-gray-700">
                    <div className="flex justify-between mb-4">
                      <h4 className="font-bold flex items-center gap-2">
                        <item.icon size={18} className="text-cyan-600" />
                        {item.titulo}
                      </h4>

                      <button
                        type="button"
                        onClick={() => adicionarItem(item.campo)}
                        className="bg-cyan-600 text-white px-3 py-1 rounded-lg flex items-center gap-2"
                      >
                        <PlusCircle size={16} /> Add
                      </button>
                    </div>

                    <div className="space-y-3">
                      {(usuario[item.campo] || []).map((itemValor, index) => (
                        <div key={index} className="relative">
                          <input
                            value={itemValor}
                            onChange={(e) =>
                              atualizarItem(item.campo, index, e.target.value)
                            }
                            className="w-full px-3 py-2 rounded-lg bg-white dark:bg-gray-800 border dark:border-gray-700"
                          />

                          <button
                            type="button"
                            onClick={() => removerItem(item.campo, index)}
                            className="absolute right-2 top-2 text-red-600"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))}

                      {!usuario[item.campo]?.length && (
                        <p className="text-gray-500 dark:text-gray-400 text-sm italic">
                          Nenhum item adicionado.
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* BOTÃO SALVAR */}
              <button
                type="submit"
                disabled={carregando}
                className="w-full bg-cyan-600 text-white py-3 rounded-lg text-lg font-semibold"
              >
                {carregando ? "Salvando..." : "Salvar Perfil"}
              </button>
            </form>
          ) : (
            /* ==================== MODO DE VISUALIZAÇÃO ==================== */
            <div className="lg:w-2/3 p-8 space-y-10">

              <h3 className="text-2xl font-bold border-b pb-2">
                Visão Geral do Currículo
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { campo: "habilidadesTecnicas", titulo: "Habilidades Técnicas", icon: Zap, cor: "bg-blue-100 dark:bg-blue-900" },
                  { campo: "softSkills", titulo: "Soft Skills", icon: Heart, cor: "bg-green-100 dark:bg-green-900" },
                  { campo: "idiomas", titulo: "Idiomas", icon: Globe, cor: "bg-purple-100 dark:bg-purple-900" },
                  { campo: "formacao", titulo: "Formação", icon: Calendar },
                  { campo: "experiencias", titulo: "Experiências", icon: Briefcase },
                  { campo: "projetos", titulo: "Projetos", icon: PlusCircle },
                  { campo: "certificacoes", titulo: "Certificações", icon: Edit },
                  { campo: "areaInteresses", titulo: "Áreas de Interesse", icon: Heart },
                ].map((sec) => (
                  <div
                    key={sec.campo}
                    className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-5"
                  >
                    <h4 className="font-bold mb-3 flex items-center gap-2">
                      <sec.icon size={18} className="text-cyan-600" />
                      {sec.titulo}
                    </h4>

                    {usuario[sec.campo]?.length ? (
                      <ul className="space-y-2">
                        {usuario[sec.campo].map((item, i) => (
                          <li
                            key={i}
                            className={`p-2 rounded-lg ${
                              sec.cor || "bg-gray-100 dark:bg-gray-800"
                            }`}
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-500 dark:text-gray-400 italic">
                        Nenhum item adicionado.
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
  );
}
