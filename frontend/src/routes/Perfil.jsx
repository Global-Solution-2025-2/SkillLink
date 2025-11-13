import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Perfil() {
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const logado = JSON.parse(localStorage.getItem("usuarioLogado"));
    if (!logado) return navigate("/login");
    setUsuario(logado);
  }, [navigate]);

  if (!usuario) return <p>Carregando...</p>;

  return (
    <section className="min-h-screen flex flex-col items-center pt-20">
      <img src={usuario.foto} alt="Foto" className="w-32 h-32 rounded-full"/>
      <h2 className="text-2xl font-bold mt-4">{usuario.nome}</h2>
      <p>Email: {usuario.email}</p>
      <p>Data de nascimento: {usuario.dataNascimento}</p>
    </section>
  );
}
