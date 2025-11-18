import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5000";

export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const navigate = useNavigate();

  const handleCadastro = async (e) => {
    e.preventDefault();
    setMensagem("");

    try {
      const response = await axios.post(`${API_URL}/cadastro`, {
        nome,
        email,
        senha,
      });

      setMensagem(response.data.message);

      if (response.data.sucesso) {
        setTimeout(() => navigate("/login"), 1000);
      }
    } catch (erro) {
      setMensagem(
        erro.response?.data?.message || "Erro ao cadastrar usuário."
      );
    }
  };

  return (
    <section className="flex items-center mt-8 justify-center py-6 px-4 transition-colors duration-300">
      <div
        className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 w-full max-w-md border border-gray-200 dark:border-gray-700"
        style={{
          maxHeight: "calc(100vh - 120px)", // evita scroll externo
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
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="p-2.5 rounded-lg border border-gray-300 dark:border-gray-600
            bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100
            placeholder-gray-400 dark:placeholder-gray-300
            focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
            required
          />

          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2.5 rounded-lg border border-gray-300 dark:border-gray-600
            bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100
            placeholder-gray-400 dark:placeholder-gray-300
            focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
            required
          />

          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            className="p-2.5 rounded-lg border border-gray-300 dark:border-gray-600
            bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100
            placeholder-gray-400 dark:placeholder-gray-300
            focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
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
