import profissionais from "../../../backend/data/perfil.json";
import CardProfissional from "../components/CardProfissional";

export default function Profissionais() {
  return (
    <section className="min-h-screen transition-colors duration-300 pt-5 pb-5 bg-light dark:bg-dark text-light dark:text-dark">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-3xl font-bold mb-8 text-center text-light dark:text-dark">
          Profissionais em Destaque
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {profissionais.map((pessoa) => (
            <CardProfissional key={pessoa.id} profissional={pessoa} />
          ))}
        </div>
      </div>
    </section>
  );
}
