import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Cadastro() {
  const [novoPerfil, setNovoPerfil] = useState({
    nome: "",
    dataNascimento: "",
    email: "",
    senha: "",
    tipo: "usuário",
  });

  const navigate = useNavigate();

  const handleCadastro = async (e) => {
    e.preventDefault();

    if (
      !novoPerfil.nome ||
      !novoPerfil.dataNascimento ||
      !novoPerfil.email ||
      !novoPerfil.senha
    ) {
      alert("Por favor, preencha todos os campos!");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/cadastro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novoPerfil),
      });

      const data = await response.json();

      if (response.ok) {
        alert(`Usuário ${data.perfil.nome} cadastrado com sucesso!`);
        navigate("/login");
      } else {
        alert(data.message || "Erro ao cadastrar. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      alert("Erro de conexão com o servidor.");
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
            value={novoPerfil.nome}
            onChange={(e) =>
              setNovoPerfil({ ...novoPerfil, nome: e.target.value })
            }
            required
            className="p-3 rounded-lg border border-gray-300 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#00B894]"
          />

          <input
            type="date"
            value={novoPerfil.dataNascimento}
            onChange={(e) =>
              setNovoPerfil({
                ...novoPerfil,
                dataNascimento: e.target.value,
              })
            }
            required
            className="p-3 rounded-lg border border-gray-300 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#00B894]"
          />

          <input
            type="email"
            placeholder="E-mail"
            value={novoPerfil.email}
            onChange={(e) =>
              setNovoPerfil({ ...novoPerfil, email: e.target.value })
            }
            required
            className="p-3 rounded-lg border border-gray-300 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#00B894]"
          />

          <input
            type="password"
            placeholder="Senha"
            value={novoPerfil.senha}
            onChange={(e) =>
              setNovoPerfil({ ...novoPerfil, senha: e.target.value })
            }
            required
            className="p-3 rounded-lg border border-gray-300 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#00B894]"
          />

          <button
            type="submit"
            className="mt-4 bg-[#00B894] text-white font-semibold py-3 rounded-lg hover:bg-[#009874] transition-colors"
          >
            Cadastrar
          </button>
        </form>

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
