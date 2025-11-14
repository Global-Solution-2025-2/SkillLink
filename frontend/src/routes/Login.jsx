import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5000";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMensagem("");

    try {
      const response = await axios.post(`${API_URL}/login`, { email, senha });
      const perfil = response.data.perfil;

      if (perfil) {
        localStorage.setItem("usuarioLogado", JSON.stringify(perfil));
        setMensagem(response.data.message);
        setTimeout(() => navigate("/feed"), 1200);
      } else {
        setMensagem("Erro ao autenticar usuário.");
      }
    } catch (erro) {
      setMensagem(erro.response?.data?.message || "Erro ao logar. Verifique suas credenciais.");
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-light dark:bg-dark transition-colors duration-300 pt-20">
      <div className="bg-white dark:bg-slate-800 shadow-lg rounded-2xl p-8 w-full max-w-md border border-slate-200 dark:border-slate-700">
        <h2 className="text-3xl font-bold text-center mb-6 text-[#00B894] dark:text-[#00B894]">
          Login
        </h2>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
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
            autoComplete="current-password"
            className="p-3 rounded-lg border border-gray-300 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#00B894]"
          />

          <button
            type="submit"
            className="mt-4 bg-[#00B894] text-white font-semibold py-3 rounded-lg hover:bg-[#009874] transition-colors"
          >
            Entrar
          </button>
        </form>

        {mensagem && <p className="mt-4 text-center text-red-600">{mensagem}</p>}

        <p className="text-center text-sm text-gray-700 dark:text-gray-300 mt-6">
          Ainda não tem conta?{" "}
          <span
            onClick={() => navigate("/cadastro")}
            className="text-[#00B894] font-semibold cursor-pointer hover:underline"
          >
            Cadastre-se agora
          </span>
        </p>
      </div>
    </section>
  );
}
