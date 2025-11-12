import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/perfil");
      const usuarios = await response.json();

      const usuario = usuarios.find(
        (u) => u.email === email && u.senha === senha
      );

      if (usuario) {
        localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
        navigate("/"); // redireciona para home ou dashboard, se quiser mudar depois
      } else {
        alert("E-mail ou senha inválidos!");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      alert("Erro de conexão com o servidor.");
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
            required
            className="p-3 rounded-lg border border-gray-300 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#00B894]"
          />

          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            className="p-3 rounded-lg border border-gray-300 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#00B894]"
          />

          <button
            type="submit"
            className="mt-4 bg-[#00B894] text-white font-semibold py-3 rounded-lg hover:bg-[#009874] transition-colors"
          >
            Entrar
          </button>
        </form>

        {/* link para cadastro */}
        <p className="text-center text-sm text-gray-700 dark:text-gray-300 mt-6">
          Ainda não faz parte do SkillLink?{" "}
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
