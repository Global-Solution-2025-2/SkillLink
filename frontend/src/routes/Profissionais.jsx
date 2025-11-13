import { useEffect, useState } from "react";
import CardProfissional from "../components/CardProfissional";

export default function Profissionais() {
  const [profissionais, setProfissionais] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    const carregarProfissionais = async () => {
      try {
        const resposta = await fetch("http://localhost:5000/profissionais");
        if (!resposta.ok) throw new Error("Erro ao buscar profissionais");
        const dados = await resposta.json();
        setProfissionais(dados);
      } catch (err) {
        setErro(err.message);
      } finally {
        setCarregando(false);
      }
    };

    carregarProfissionais();
  }, []);

  return (
    <section className="min-h-screen transition-colors duration-300 pt-5 pb-5 bg-light dark:bg-dark text-light dark:text-dark">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-3xl font-bold mb-8 text-center text-light dark:text-dark">
          Profissionais em Destaque
        </h1>

        {carregando && (
          <p className="text-center text-lg text-gray-500">Carregando...</p>
        )}

        {erro && (
          <p className="text-center text-red-500 font-semibold">
            {erro}
          </p>
        )}

        {!carregando && !erro && profissionais.length === 0 && (
          <p className="text-center text-gray-500">
            Nenhum profissional cadastrado ainda.
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {profissionais.map((pessoa) => (
            <CardProfissional key={pessoa.id} profissional={pessoa} />
          ))}
        </div>
      </div>
    </section>
  );
}
