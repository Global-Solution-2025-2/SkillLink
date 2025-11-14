import { useState } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { Link } from "react-router-dom";

export default function Header({ darkMode, setDarkMode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full bg-gray-100 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 fixed top-0 left-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6">
        
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-[#00B894] rounded-full"></div>
          <h1 className="text-2xl font-bold tracking-wide text-gray-900 dark:text-gray-100">
            SkillLink
          </h1>
        </div>

        {/* Navegação desktop */}
        <nav className="hidden md:flex space-x-8 font-medium">
          <Link to="/" className="hover:text-[#00B894] transition">
            Home
          </Link>
          <Link to="/carreiras" className="hover:text-[#00B894] transition">
            Carreiras
          </Link>
          <Link to="/smartdesk" className="hover:text-[#00B894] transition">
            SmartDesk
          </Link>
          <Link to="/news" className="hover:text-[#00B894] transition">
            Notícias
          </Link>
          <Link to="/cursos" className="hover:text-[#00B894] transition">
            Cursos
          </Link>
          <Link to="/login" className="hover:text-[#00B894] transition">
            Login
          </Link>
        </nav>

        {/* Botões */}
        <div className="flex items-center space-x-4">
          {/* Botão dark mode */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition"
            aria-label="Alternar modo escuro"
          >
            {darkMode ? <Sun size={22} /> : <Moon size={22} />}
          </button>

          {/* Menu mobile toggle */}
          <button
            className="md:hidden focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <div className="md:hidden bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 transition-colors duration-300">
          <nav className="flex flex-col items-center space-y-4 py-4 font-medium">
            <Link
              to="/"
              className="hover:text-[#00B894]"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/profissionais"
              className="hover:text-[#00B894]"
              onClick={() => setMenuOpen(false)}
            >
              Profissionais
            </Link>
            <Link
              to="/cursos"
              className="hover:text-[#00B894]"
              onClick={() => setMenuOpen(false)}
            >
              Cursos
            </Link>
            <Link
              to="/contato"
              className="hover:text-[#00B894]"
              onClick={() => setMenuOpen(false)}
            >
              Contato
            </Link>
            <Link
              to="/login"
              className="hover:text-[#00B894]"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
