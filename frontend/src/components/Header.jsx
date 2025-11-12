import { useState } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { Link } from "react-router-dom";

export default function Header({ darkMode, setDarkMode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full bg-[#0D1B2A] dark:bg-[#145374] text-[#F9F9F9] dark:text-[#C8D6E5] shadow-md fixed top-0 left-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-[#00B894] rounded-full"></div>
          <h1 className="text-2xl font-bold tracking-wide">SkillLink</h1>
        </div>

        {/* Navegação desktop */}
        <nav className="hidden md:flex space-x-8 font-medium">
          <Link to="/" className="hover:text-[#00B894] transition">
            Home
          </Link>
          <Link to="/profissionais" className="hover:text-[#00B894] transition">
            Profissionais
          </Link>
          <Link to="/sobre" className="hover:text-[#00B894] transition">
            Sobre
          </Link>
          <Link to="/contato" className="hover:text-[#00B894] transition">
            Contato
          </Link>
        </nav>

        {/* Botões */}
        <div className="flex items-center space-x-4">
          {/* Dark mode toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full hover:bg-[#145374] dark:hover:bg-[#0D1B2A] transition"
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
        <div className="md:hidden bg-[#0D1B2A] dark:bg-[#145374] border-t border-[#145374] transition-colors duration-300">
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
              to="/sobre"
              className="hover:text-[#00B894]"
              onClick={() => setMenuOpen(false)}
            >
              Sobre
            </Link>
            <Link
              to="/contato"
              className="hover:text-[#00B894]"
              onClick={() => setMenuOpen(false)}
            >
              Contato
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
