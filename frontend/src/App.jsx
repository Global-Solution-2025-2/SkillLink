import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import HeaderPrincipal from "./components/Header";
import HeaderSecundario from "./components/HeaderSecundario";
import Footer from "./components/Footer";

import Home from "./routes/Home";
import Profissionais from "./routes/Profissionais";
import News from "./routes/News";
import Cursos from "./routes/Cursos";
import Carreiras from "./routes/Carreiras";
import Quiz from "./routes/Quiz";
import Login from "./routes/Login";
import Cadastro from "./routes/Cadastro";
import Feed from "./routes/Feed";
import Perfil from "./routes/Perfil";
import AreaDeEstudos from "./routes/AreaDeEstudos";
import CursoAula from "./routes/CursoAula";
import Vagas from "./routes/Vagas";
import Eventos from "./routes/Eventos";
import Projetos from "./routes/Projetos";
import Error from "./routes/Error";

// ===============================
// CONTROLADOR DE HEADER + PADDING
// ===============================
function AppContent({ darkMode, setDarkMode }) {
  const location = useLocation();

  // Páginas com Header Secundário
  const paginasSecundarias = ["/feed", "/perfil","/area-de-estudos","/curso/:cursoId"];
  const usarSecundario = paginasSecundarias.includes(location.pathname);

  // Definição automática do padding
  const paddingTop = usarSecundario ? "-pt-8" : "pt-24";

  return (
    <>
      {/* HEADER DEPENDENDO DA PÁGINA */}
      {usarSecundario ? (
        <HeaderSecundario darkMode={darkMode} setDarkMode={setDarkMode} />
      ) : (
        <HeaderPrincipal darkMode={darkMode} setDarkMode={setDarkMode} />
      )}

      {/* EVITA QUE O HEADER CUBRA O CONTEÚDO */}
      <main className={`flex-1 pb-12 ${paddingTop}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profissionais" element={<Profissionais />} />
          <Route path="/cursos" element={<Cursos />} />
          <Route path="/carreiras" element={<Carreiras />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/news" element={<News />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/area-de-estudos" element={<AreaDeEstudos />} />
          <Route path="/curso/:cursoId" element={<CursoAula />} />
          <Route path="/vagas" element={<Vagas />} />
          <Route path="/eventos" element={<Eventos />} />
          <Route path="/projetos" element={<Projetos />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}

// ===============
// APP PRINCIPAL
// ===============
function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  // Atualiza HTML + localStorage
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
        <AppContent darkMode={darkMode} setDarkMode={setDarkMode} />
      </div>
    </BrowserRouter>
  );
}

export default App;
