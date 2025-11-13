import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Edit, Save, PlusCircle, Trash2 } from "lucide-react";

export default function Perfil() {
  const [usuario, setUsuario] = useState(null);
  const [editando, setEditando] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const logado = JSON.parse(localStorage.getItem("usuarioLogado"));
    if (!logado) return navigate("/login");
    setUsuario(logado);
  }, [navigate]);

  const handleEditar = () => setEditando(!editando);

  const handleSalvar = async (e) => {
    e.preventDefault();
    setCarregando(true);

    try {
      const resposta = await fetch(`http://localhost:5000/perfil/${usuario.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuario),
      });

      const data = await resposta.json();
      if (!resposta.ok) throw new Error(data.message || "Erro ao salvar");

      localStorage.setItem("usuarioLogado", JSON.stringify(data.perfil));
      setUsuario(data.perfil);
      setEditando(false);
      alert("✅ Perfil atualizado com sucesso!");
    } catch (err) {
      console.error(err);
      alert("❌ Erro ao atualizar o perfil!");
    } finally {
      setCarregando(false);
    }
  };

  // 🔹 Funções auxiliares para listas (habilidades, idiomas etc.)
  const adicionarItem = (campo) =>
    setUsuario({ ...usuario, [campo]: [...(usuario[campo] || []), ""] });

  const removerItem = (campo, index) => {
    const novaLista = usuario[campo].filter((_, i) => i !== index);
    setUsuario({ ...usuario, [campo]: novaLista });
  };

  const atualizarItem = (campo, index, valor) => {
    const novaLista = [...usuario[campo]];
    novaLista[index] = valor;
    setUsuario({ ...usuario, [campo]: novaLista });
  };

  if (!usuario) return <p>Carregando...</p>;

  return (
    <section className="min-h-screen  flex flex-col items-center py-16 px-6">
      {/* Foto e informações básicas */}
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-lg p-8">
        <div className="flex flex-col items-center">
          <img
            src={usuario.foto || "./images/default.jpg"}
            alt="Foto do usuário"
            className="w-32 h-32 rounded-full shadow-md object-cover"
          />
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

        {editando ? (
          <form onSubmit={handleSalvar} className="mt-8 flex flex-col gap-6">
            {/* Dados principais */}
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

            {/* Seções dinâmicas */}
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
                    {campo
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, (c) => c.toUpperCase())}
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
                  <div
                    key={index}
                    className="flex items-center gap-2 mb-2 bg-white p-2 rounded-md"
                  >
                    <input
                      type="text"
                      value={item || ""}
                      onChange={(e) =>
                        atualizarItem(campo, index, e.target.value)
                      }
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
          // 🟢 Exibição do perfil (modo visual)
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
