import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./routes/Home";
import Profissionais from "./routes/Profissionais";
import News from "./routes/News";
import Cursos from "./routes/Cursos";
import Carreiras from "./routes/Carreiras";
import Login from "./routes/Login";
import Cadastro from "./routes/Cadastro";
import Feed from "./routes/Feed";
import Perfil from "./routes/Perfil";
import AreaDeEstudos from "./routes/AreaDeEstudos";
import Error from "./routes/Error";

// Componente para lidar com o Header e padding das páginas
function AppContent({ darkMode, setDarkMode }) {
  const location = useLocation();

  // Páginas onde NÃO queremos padding do Header
  const paginasSemHeaderPadding = ["/feed"];
  const removerPadding = paginasSemHeaderPadding.includes(location.pathname);

  return (
    <>
      {/* Header com darkMode */}
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* Ajuste do padding para não ficar coberto pelo Header */}
      <main className={`flex-1 pb-12 ${removerPadding ? "pt-0" : "pt-24"}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profissionais" element={<Profissionais />} />
          <Route path="/cursos" element={<Cursos />} />
          <Route path="/carreiras" element={<Carreiras />} />
          <Route path="/news" element={<News />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/area-de-estudos" element={<AreaDeEstudos />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  // 🔥 Aplica ou remove a classe dark no <html> e salva no localStorage
  useEffect(() => {
    const html = document.documentElement;
    if (darkMode) {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <BrowserRouter>
      <div
        className={`flex flex-col min-h-screen transition-colors duration-500 ${
          darkMode
            ? "bg-slate-900 text-slate-100"
            : "bg-[#d4e8fc] text-slate-800"
        }`}
      >
        {/* Passa darkMode e setDarkMode para o Header */}
        <AppContent darkMode={darkMode} setDarkMode={setDarkMode} />
      </div>
    </BrowserRouter>
  );
}

export default App;
