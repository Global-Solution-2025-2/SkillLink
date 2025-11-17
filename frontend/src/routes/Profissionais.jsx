import { useEffect, useState } from "react";
import CardProfissional from "../components/CardProfissional";
import { Search } from "lucide-react";

export default function Profissionais() {
  const [profissionais, setProfissionais] = useState([]);
  const [filtrados, setFiltrados] = useState([]);

  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  // Inputs dos filtros
  const [busca, setBusca] = useState("");
  const [area, setArea] = useState("");
  const [cidade, setCidade] = useState("");
  const [tecnologia, setTecnologia] = useState("");

  useEffect(() => {
    const carregarProfissionais = async () => {
      try {
        const resposta = await fetch("http://localhost:5000/profissionais");
        if (!resposta.ok) throw new Error("Erro ao buscar profissionais");

        const dados = await resposta.json();
        setProfissionais(dados);
        setFiltrados(dados);
      } catch (err) {
        setErro(err.message);
      } finally {
        setCarregando(false);
      }
    };

    carregarProfissionais();
  }, []);

  // Filtros inteligentes e corrigidos
  useEffect(() => {
    let lista = [...profissionais];

    // Função para normalizar texto (case-insensitive e sem acentos)
    const normalizar = (txt) =>
      txt
        ?.toString()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

    // 🔍 BUSCA (nome + cargo)
    if (busca.trim() !== "") {
      const b = normalizar(busca);
      lista = lista.filter(
        (p) =>
          normalizar(p.nome)?.includes(b) ||
          normalizar(p.cargo)?.includes(b)
      );
    }

    // 🎯 ÁREA (corresponde mesmo se estiver diferente no JSON)
    if (area !== "") {
      const a = normalizar(area);
      lista = lista.filter((p) => normalizar(p.area)?.includes(a));
    }

    // 🏙 CIDADE / LOCALIZAÇÃO
    if (cidade !== "") {
      const c = normalizar(cidade);
      lista = lista.filter((p) => normalizar(p.localizacao)?.includes(c));
    }

    // 💻 TECNOLOGIA (hard skill)
    if (tecnologia !== "") {
      const t = normalizar(tecnologia);
      lista = lista.filter((p) =>
        p.habilidadesTecnicas?.some((skill) =>
          normalizar(skill)?.includes(t)
        )
      );
    }

    setFiltrados(lista);
  }, [busca, area, cidade, tecnologia, profissionais]);

  return (
    <section className="min-h-screen pt-10 pb-10 bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* TÍTULO */}
        <h1 className="text-4xl font-extrabold mb-10 text-center text-gray-800 dark:text-gray-100">
          Profissionais Cadastrados
        </h1>

        {/* CAIXA DE BUSCA E FILTROS */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-300 dark:border-gray-700 mb-10">

          {/* BUSCA */}
          <div className="flex items-center gap-3 mb-5">
            <Search className="text-indigo-500 w-6 h-6" />
            <input
              type="text"
              placeholder="Buscar por nome ou cargo..."
              className="w-full p-3 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 outline-none"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>

          {/* FILTROS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">

            {/* ÁREA */}
            <select
              className="p-3 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
              value={area}
              onChange={(e) => setArea(e.target.value)}
            >
              <option value="">Todas as Áreas</option>
              <option value="TI">TI</option>
              <option value="Tecnologia">Tecnologia</option>
              <option value="Design">Design</option>
              <option value="Marketing">Marketing</option>
              <option value="Saúde">Saúde</option>
              <option value="Educação">Educação</option>
            </select>

            {/* CIDADE */}
            <select
              className="p-3 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
              value={cidade}
              onChange={(e) => setCidade(e.target.value)}
            >
              <option value="">Todas as Cidades</option>
              <option value="São Paulo/SP">São Paulo/SP</option>
              <option value="Rio de Janeiro/RJ">Rio de Janeiro/RJ</option>
              <option value="Curitiba/PR">Curitiba/PR</option>
              <option value="Belo Horizonte/MG">Belo Horizonte/MG</option>
            </select>

            {/* TECNOLOGIA */}
            <select
              className="p-3 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
              value={tecnologia}
              onChange={(e) => setTecnologia(e.target.value)}
            >
              <option value="">Todas as Tecnologias</option>
              <option value="JavaScript">JavaScript</option>
              <option value="React">React</option>
              <option value="Python">Python</option>
              <option value="SQL">SQL</option>
              <option value="UI/UX">UI/UX</option>
            </select>

          </div>
        </div>

        {/* ESTADOS */}
        {carregando && (
          <p className="text-center text-lg text-gray-500 dark:text-gray-300">
            Carregando profissionais...
          </p>
        )}

        {erro && (
          <p className="text-center text-red-500 font-semibold">
            {erro}
          </p>
        )}

        {!carregando && !erro && filtrados.length === 0 && (
          <p className="text-center text-gray-500 dark:text-gray-300 text-lg font-medium">
            Nenhum profissional encontrado com os filtros aplicados.
          </p>
        )}

        {/* LISTA DE PROFISSIONAIS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8">
          {filtrados.map((pessoa) => (
            <CardProfissional key={pessoa.id} profissional={pessoa} />
          ))}
        </div>
      </div>
    </section>
  );
}
