import { useState } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function Header({ darkMode, setDarkMode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  const paginasSemHeader = ["/feed","/perfil","/area-de-estudos","/curso/:cursoId","/profissionais","/vagas","/eventos","/projetos","/skilltalks"];
  
  if (paginasSemHeader.includes(pathname)) return null;

  return (
    <header className="w-full bg-gray-100 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 fixed top-0 left-0 z-50 transition-colors duration-300">
      <div className="w-full max-w-7xl mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-cyan-600 rounded-full"></div>
          <h1 className="text-2xl font-bold tracking-wide text-gray-900 dark:text-gray-100">
            SkillLink
          </h1>
        </div>

        {/* Navegação desktop */}
        <nav className="hidden md:flex space-x-8 font-medium">
          <Link to="/" className="hover:text-cyan-600 transition">Home</Link>
          <Link to="/carreiras" className="hover:text-cyan-600 transition">Carreiras</Link>
          <Link to="/news" className="hover:text-cyan-600 transition">Notícias</Link>
          <Link to="/login" className="hover:text-cyan-600 transition">Login</Link>
        </nav>

        {/* Botões */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition"
          >
            {darkMode ? <Sun size={22} /> : <Moon size={22} />}
          </button>

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
        <div className="md:hidden bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
          <nav className="flex flex-col items-center space-y-4 py-4 font-medium">
            <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link to="/carreiras" onClick={() => setMenuOpen(false)}>Carreiras</Link>
            <Link to="/news" onClick={() => setMenuOpen(false)}>Notícias</Link>
            <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
