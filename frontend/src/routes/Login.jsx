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
      setMensagem(
        erro.response?.data?.message || "Erro ao logar. Verifique suas credenciais."
      );
    }
  };

  return (
    <section className="flex items-center justify-center py-10 transition-colors duration-300 pt-20">
  <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 w-full max-w-md border border-gray-200 dark:border-gray-700">
    
    <h2 className="text-3xl font-bold text-center mb-4 text-cyan-600 dark:text-cyan-400">
      Login
    </h2>

    <form onSubmit={handleLogin} className="flex flex-col gap-3">
      <input
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
        required
      />

      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        required
        autoComplete="current-password"
        className="p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
      />

      <button
        type="submit"
        className="mt-3 bg-cyan-600 dark:bg-cyan-500 text-white font-semibold py-3 rounded-lg hover:bg-cyan-700 dark:hover:bg-cyan-600 transition-colors"
      >
        Entrar
      </button>
    </form>

    {mensagem && (
      <p className="mt-3 text-center text-cyan-600 dark:text-cyan-400">{mensagem}</p>
    )}

    <p className="text-center text-sm text-gray-700 dark:text-gray-300 mt-4">
      Ainda não tem conta?{" "}
      <span
        onClick={() => navigate("/cadastro")}
        className="text-cyan-600 dark:text-cyan-400 font-semibold cursor-pointer hover:underline"
      >
        Cadastre-se agora
      </span>
    </p>
  </div>
</section>
)};