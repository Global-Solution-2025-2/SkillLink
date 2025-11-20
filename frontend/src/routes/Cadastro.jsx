import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Cadastro() {
  const [novoPerfil, setNovoPerfil] = useState({
    nome: "",
    email: "",
    senha: "",
  });
  const [mensagem, setMensagem] = useState("");
  const navigate = useNavigate();

  const handleCadastro = async (e) => {
    e.preventDefault();
    setMensagem("");

    if (!novoPerfil.nome || !novoPerfil.email || !novoPerfil.senha) {
      setMensagem("Por favor, preencha todos os campos!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/cadastro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: novoPerfil.nome,
          email: novoPerfil.email,
          senha: novoPerfil.senha
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMensagem("Cadastro realizado com sucesso!");
        setTimeout(() => navigate("/login"), 1200);
      } else {
        setMensagem(data.message || "Erro ao cadastrar. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      setMensagem("Erro de conexão com o servidor.");
    }
  };

  return (
    <section className="flex items-center mt-8 justify-center py-6 px-4 transition-colors duration-300">
      <div
        className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 w-full max-w-md border border-gray-200 dark:border-gray-700"
        style={{
          maxHeight: "calc(100vh - 120px)",
          overflowY: "auto",
        }}
      >
        <h2 className="text-2xl font-bold text-center mb-4 text-cyan-600 dark:text-cyan-400">
          Criar Conta
        </h2>

        <form onSubmit={handleCadastro} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Nome completo"
            value={novoPerfil.nome}
            onChange={(e) =>
              setNovoPerfil({ ...novoPerfil, nome: e.target.value })
            }
            className="p-2.5 rounded-lg border border-gray-300 dark:border-gray-600
            bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100
            placeholder-gray-400 dark:placeholder-gray-300
            focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
            required
            autoComplete="name"
          />

          <input
            type="email"
            placeholder="E-mail"
            value={novoPerfil.email}
            onChange={(e) =>
              setNovoPerfil({ ...novoPerfil, email: e.target.value })
            }
            className="p-2.5 rounded-lg border border-gray-300 dark:border-gray-600
            bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100
            placeholder-gray-400 dark:placeholder-gray-300
            focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
            required
            autoComplete="email"
          />

          <input
            type="password"
            placeholder="Senha"
            value={novoPerfil.senha}
            onChange={(e) =>
              setNovoPerfil({ ...novoPerfil, senha: e.target.value })
            }
            required
            className="p-2.5 rounded-lg border border-gray-300 dark:border-gray-600
            bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100
            placeholder-gray-400 dark:placeholder-gray-300
            focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
            autoComplete="new-password"
          />

          <button
            type="submit"
            className="mt-3 bg-cyan-600 dark:bg-cyan-500 text-white font-semibold
            py-2.5 rounded-lg hover:bg-cyan-700 dark:hover:bg-cyan-600 transition-colors"
          >
            Cadastrar
          </button>
        </form>

        {mensagem && (
          <p className="mt-3 text-center text-cyan-600 dark:text-cyan-400">
            {mensagem}
          </p>
        )}

        <p className="text-center text-sm text-gray-700 dark:text-gray-300 mt-4">
          Já tem conta?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-cyan-600 dark:text-cyan-400 font-semibold cursor-pointer hover:underline"
          >
            Faça login
          </span>
        </p>
      </div>
    </section>
  );
}