import React, { useState } from "react";
import {
  Rocket,
  Sun,
  Moon,
  User,
  LogOut,
} from "lucide-react";

export default function HeaderSecundario({ darkMode, setDarkMode }) {
  const [avatarOpen, setAvatarOpen] = useState(false);

  // ===== CARREGA USUÁRIO DO LOCALSTORAGE =====
  const [user, setUser] = useState(() => {
    try {
      return (
        JSON.parse(localStorage.getItem("usuarioLogado")) || {
          nome: "Usuário Futurista",
          cargo: "Estudante de Eng. Software",
          foto: null,
          id: "",
        }
      );
    } catch {
      return {
        nome: "Usuário Futurista",
        cargo: "Estudante de Eng. Software",
        foto: null,
        id: "",
      };
    }
  });

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <div className="flex items-center">
            <Rocket className="w-8 h-8 text-cyan-600 mr-2" />
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              SkillLink
            </span>
          </div>

          {/* Ícones e Usuário */}
          <div className="flex items-center space-x-4">

            {/* Tema Dark/Light */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 text-gray-500 hover:text-cyan-600 dark:hover:text-cyan-400 transition"
            >
              {darkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            {/* Avatar e Menu */}
            <div className="relative">
              <button
                onClick={() => setAvatarOpen(!avatarOpen)}
                className="flex items-center space-x-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition"
              >
                <User className="w-5 h-5 text-gray-500" />

                {/* ===== MOSTRA O NOME DO USUÁRIO ===== */}
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Olá, {user?.nome?.split(" ")[0] || "Usuário"}
                </span>
              </button>

              {/* Dropdown */}
              {avatarOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-1">

                  <button
                    onClick={() => (window.location.href = "/perfil")}
                    className="w-full flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                  >
                    <User className="w-4 h-4 mr-2" />
                    Meu Perfil
                  </button>

                  <button
                    onClick={() => {
                      localStorage.removeItem("usuarioLogado");
                      window.location.href = "/";
                    }}
                    className="w-full flex items-center px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sair
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
