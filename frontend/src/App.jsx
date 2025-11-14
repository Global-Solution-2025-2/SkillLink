import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./routes/Home";
import Profissionais from "./routes/Profissionais";
import News from "./routes/News";
import SmartDesk from "./routes/SmartDesk";
import Cursos from "./routes/Cursos";
import Carreiras from "./routes/Carreiras";
import Login from "./routes/Login";
import Cadastro from "./routes/Cadastro";
import Feed from "./routes/Feed";
import Perfil from "./routes/Perfil";
import Error from "./routes/Error";

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

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
            ? "bg-[#0f172a] text-gray-100"
            : "bg-white text-gray-900"
        }`}
      >
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />

        <main className="flex-1 pt-24 pb-12">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profissionais" element={<Profissionais />} />
            <Route path="/cursos" element={<Cursos />} />
            <Route path="/carreiras" element={<Carreiras />} />
            <Route path="/news" element={<News />} />
            <Route path="/smartdesk" element={<SmartDesk />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
