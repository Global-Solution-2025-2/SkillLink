import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const navigate = useNavigate();

  // 🔧 Limpar usuário antigo ao carregar a página de login
  useEffect(() => {
    localStorage.removeItem("usuarioLogado");
    console.log("✅ localStorage limpo - pronto para novo login");
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setMensagem("");

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha }),
      });

      const data = await response.json();

      if (response.ok) {
        // 🔧 **CORREÇÃO AQUI**: Garantir que está salvando TODOS os dados do usuário
        const usuarioCompleto = {
          ...data.perfil,
          // Garantir que campos essenciais existam
          cursos: data.perfil.cursos || [],
          cargo: data.perfil.cargo || "",
          area: data.perfil.area || "",
          localizacao: data.perfil.localizacao || "",
          foto: data.perfil.foto || "/uploads/default.jpg"
        };
        
        localStorage.setItem("usuarioLogado", JSON.stringify(usuarioCompleto));
        console.log("🔐 Novo usuário logado:", usuarioCompleto.nome);
        console.log("📊 Dados salvos:", usuarioCompleto);
        
        setMensagem("Login realizado com sucesso!");
        setTimeout(() => navigate("/feed"), 1200); // ✅ Redireciona para /feed
      } else {
        setMensagem(data.message || "E-mail ou senha inválidos!");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setMensagem("Erro de conexão com o servidor.");
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
            autoComplete="username"
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
  );
}