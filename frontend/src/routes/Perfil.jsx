import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Edit, Save, PlusCircle, Trash2, Upload } from "lucide-react";

export default function Perfil() {
  const [usuario, setUsuario] = useState(null);
  const [editando, setEditando] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [novaFoto, setNovaFoto] = useState(null);
  const navigate = useNavigate();

  // Carrega usuário logado
  useEffect(() => {
    const logado = JSON.parse(localStorage.getItem("usuarioLogado"));
    if (!logado) {
      navigate("/login");
      return;
    }
    setUsuario(logado);
  }, [navigate]);

  const handleEditar = () => setEditando((s) => !s);

  // Seleciona foto (preview local)
  const handleFotoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) setNovaFoto(file);
  };

  // Salvar perfil + foto
  const handleSalvar = async (e) => {
    e.preventDefault();
    if (!usuario) return;
    setCarregando(true);

    try {
      let fotoUrl = usuario.foto || null;

      // 1) upload da imagem caso exista preview
      if (novaFoto) {
        const formData = new FormData();
        formData.append("foto", novaFoto);

        const uploadRes = await fetch(`http://localhost:5000/upload/${usuario.id}`, {
          method: "POST",
          body: formData,
        });

        const uploadJson = await uploadRes.json();
        if (!uploadRes.ok) throw new Error(uploadJson.message || "Erro no upload");

        // backend deve retornar { caminho: "uploads/arquivo.jpg" } ou similar
        fotoUrl = uploadJson.caminho || uploadJson.foto || fotoUrl;
      }

      // 2) atualizar perfil
      const resposta = await fetch(`http://localhost:5000/perfil/${usuario.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...usuario, foto: fotoUrl }),
      });

      const respostaJson = await resposta.json();
      if (!resposta.ok) throw new Error(respostaJson.message || "Erro ao salvar perfil");

      // 3) salvar no localStorage e estado
      const perfilAtualizado = respostaJson.perfil || respostaJson.usuario || null;
      if (perfilAtualizado) {
        localStorage.setItem("usuarioLogado", JSON.stringify(perfilAtualizado));
        setUsuario(perfilAtualizado);
      } else {
        // fallback: atualizar somente campo foto
        setUsuario((u) => ({ ...u, foto: fotoUrl }));
        const fromLocal = JSON.parse(localStorage.getItem("usuarioLogado")) || {};
        fromLocal.foto = fotoUrl;
        localStorage.setItem("usuarioLogado", JSON.stringify(fromLocal));
      }

      setNovaFoto(null);
      setEditando(false);
      alert("✅ Perfil atualizado com sucesso!");
    } catch (err) {
      console.error(err);
      alert("❌ Erro ao atualizar o perfil: " + (err.message || err));
    } finally {
      setCarregando(false);
    }
  };

  // Funções de listas dinâmicas
  const adicionarItem = (campo) =>
    setUsuario((u) => ({ ...u, [campo]: [...(u?.[campo] || []), ""] }));

  const removerItem = (campo, index) =>
    setUsuario((u) => {
      const lista = [...(u?.[campo] || [])];
      lista.splice(index, 1);
      return { ...u, [campo]: lista };
    });

  const atualizarItem = (campo, index, valor) =>
    setUsuario((u) => {
      const lista = [...(u?.[campo] || [])];
      lista[index] = valor;
      return { ...u, [campo]: lista };
    });

  // Helper para montar URL da foto
  const buildFotoURL = (f) => {
    if (!f) return "/images/default.jpg";
    if (f.startsWith("http://") || f.startsWith("https://")) return f;
    if (f.startsWith("/")) return `http://localhost:5000${f}`;
    return `http://localhost:5000/${f}`;
  };

  if (!usuario) return <p className="text-center py-10">Carregando...</p>;

  return (
    <section className="min-h-screen flex flex-col items-center py-16 px-6">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-lg p-8">
        <div className="flex flex-col items-center">
          {/* FOTO DO USUÁRIO */}
          <img
            src={
              novaFoto
                ? URL.createObjectURL(novaFoto) // preview local
                : usuario.foto
                ? buildFotoURL(usuario.foto) // caminho do backend
                : "/images/default.jpg"
            }
            alt="Foto do usuário"
            className="w-32 h-32 rounded-full shadow-md object-cover"
          />

          {editando && (
            <label className="mt-3 cursor-pointer bg-purple-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-purple-700">
              <Upload size={18} />
              Trocar foto
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFotoChange}
              />
            </label>
          )}

          <h2 className="text-2xl font-bold mt-4">{usuario.nome}</h2>
          <p className="text-gray-600">{usuario.email}</p>

          <button
            onClick={handleEditar}
            className="mt-4 flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
          >
            <Edit size={18} />
            {editando ? "Cancelar edição" : "Editar perfil"}
          </button>
        </div>

        {/* MODO DE EDIÇÃO */}
        {editando ? (
          <form onSubmit={handleSalvar} className="mt-8 flex flex-col gap-6">
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Nome completo"
                value={usuario.nome || ""}
                onChange={(e) => setUsuario({ ...usuario, nome: e.target.value })}
                className="border rounded-md p-2"
              />

              <input
                type="email"
                placeholder="Email"
                value={usuario.email || ""}
                onChange={(e) => setUsuario({ ...usuario, email: e.target.value })}
                className="border rounded-md p-2"
              />

              <input
                type="date"
                value={usuario.dataNascimento || ""}
                onChange={(e) =>
                  setUsuario({ ...usuario, dataNascimento: e.target.value })
                }
                className="border rounded-md p-2"
              />

              <input
                type="text"
                placeholder="Cargo"
                value={usuario.cargo || ""}
                onChange={(e) => setUsuario({ ...usuario, cargo: e.target.value })}
                className="border rounded-md p-2"
              />

              <input
                type="text"
                placeholder="Área de atuação"
                value={usuario.area || ""}
                onChange={(e) => setUsuario({ ...usuario, area: e.target.value })}
                className="border rounded-md p-2"
              />

              <input
                type="text"
                placeholder="Localização"
                value={usuario.localizacao || ""}
                onChange={(e) =>
                  setUsuario({ ...usuario, localizacao: e.target.value })
                }
                className="border rounded-md p-2"
              />
            </div>

            <textarea
              placeholder="Resumo profissional"
              value={usuario.resumo || ""}
              onChange={(e) => setUsuario({ ...usuario, resumo: e.target.value })}
              className="border rounded-md p-2 h-28"
            />

            {/* LISTAS DINÂMICAS */}
            {[
              "habilidadesTecnicas",
              "softSkills",
              "idiomas",
              "formacao",
              "experiencias",
              "projetos",
              "certificacoes",
              "areaInteresses",
            ].map((campo) => (
              <div key={campo} className="bg-gray-100 p-4 rounded-md">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold capitalize">
                    {campo.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase())}
                  </h3>

                  <button
                    type="button"
                    onClick={() => adicionarItem(campo)}
                    className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                  >
                    <PlusCircle size={18} /> Adicionar
                  </button>
                </div>

                {(usuario[campo] || []).map((item, index) => (
                  <div key={index} className="flex items-center gap-2 mb-2 bg-white p-2 rounded-md">
                    <input
                      type="text"
                      value={item || ""}
                      onChange={(e) => atualizarItem(campo, index, e.target.value)}
                      className="flex-1 border rounded-md p-2"
                    />

                    <button
                      type="button"
                      onClick={() => removerItem(campo, index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            ))}

            <button
              type="submit"
              disabled={carregando}
              className="bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition flex items-center justify-center gap-2 mt-6"
            >
              <Save size={20} />
              {carregando ? "Salvando..." : "Salvar alterações"}
            </button>
          </form>
        ) : (
          <div className="mt-8 space-y-6 text-gray-800">
            <p><strong>Data de nascimento:</strong> {usuario.dataNascimento || "—"}</p>
            <p><strong>Cargo:</strong> {usuario.cargo || "—"}</p>
            <p><strong>Área:</strong> {usuario.area || "—"}</p>
            <p><strong>Localização:</strong> {usuario.localizacao || "—"}</p>
            <p><strong>Resumo:</strong> {usuario.resumo || "—"}</p>

            {[
              { label: "Habilidades Técnicas", campo: "habilidadesTecnicas" },
              { label: "Soft Skills", campo: "softSkills" },
              { label: "Idiomas", campo: "idiomas" },
              { label: "Formação", campo: "formacao" },
              { label: "Experiências", campo: "experiencias" },
              { label: "Projetos", campo: "projetos" },
              { label: "Certificações", campo: "certificacoes" },
              { label: "Áreas de Interesse", campo: "areaInteresses" },
            ].map(({ label, campo }) => (
              <div key={campo}>
                <h3 className="font-semibold text-lg">{label}</h3>
                {usuario[campo]?.length ? (
                  <ul className="list-disc ml-6 text-gray-700">
                    {usuario[campo].map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">— Nenhum item adicionado</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
