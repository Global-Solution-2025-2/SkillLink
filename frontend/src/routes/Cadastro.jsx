import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
      const response = await axios.post(`${API_URL}/cadastro`, { nome, email, senha });
      setMensagem(response.data.message);
      setTimeout(() => navigate("/login"), 2000);
    } catch (erro) {
      setMensagem(erro.response?.data?.message || "Erro ao cadastrar usuário.");
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-light dark:bg-dark transition-colors duration-300 pt-20">
      <div className="bg-white dark:bg-slate-800 shadow-lg rounded-2xl p-8 w-full max-w-md border border-slate-200 dark:border-slate-700">
        <h2 className="text-3xl font-bold text-center mb-6 text-[#00B894] dark:text-[#00B894]">
          Cadastro
        </h2>

        <form onSubmit={handleCadastro} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Nome completo"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="p-3 rounded-lg border border-gray-300 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#00B894]"
            required
          />

          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 rounded-lg border border-gray-300 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#00B894]"
            required
          />

          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            autoComplete="new-password"
            className="p-3 rounded-lg border border-gray-300 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#00B894]"
          />

          <button
            type="submit"
            className="mt-4 bg-[#00B894] text-white font-semibold py-3 rounded-lg hover:bg-[#009874] transition-colors"
          >
            Cadastrar
          </button>
        </form>

        {mensagem && <p className="mt-4 text-center text-green-600">{mensagem}</p>}

        <p className="text-center text-sm text-gray-700 dark:text-gray-300 mt-6">
          Já tem uma conta?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-[#00B894] font-semibold cursor-pointer hover:underline"
          >
            Faça login
          </span>
        </p>
      </div>
    </section>
  );
}
