export default function CardProfissional({ profissional, darkMode }) {
  return (
    <div
      className={`p-6 rounded-xl shadow-lg border transition-all duration-300 hover:scale-[1.02]
        ${darkMode
          ? "bg-[#145374] text-[#C8D6E5] border-[#0D1B2A]"
          : "bg-white text-[#0D1B2A] border-gray-200"
        }`}
    >
      <img
        src={profissional.foto || "./images/default.jpg"}
        alt={profissional.nome}
        className="w-28 h-28 rounded-full mx-auto mb-4 object-cover border-4 border-[#5588A3]"
      />

      <h2 className="text-xl font-semibold text-center mb-1">
        {profissional.nome}
      </h2>

      <p className="text-center text-sm mb-2 opacity-80">
        {profissional.cargo || "Cargo não informado"}
      </p>

      <p className="text-center text-sm mb-2">
        <strong>Área:</strong> {profissional.area || "Área não informada"}
      </p>

      <p className="text-center text-sm mb-4">
        <strong>Localização:</strong> {profissional.localizacao || "Localização não informada"}
      </p>

      {/* Bio propositalmente ignorada */}
      {/* profissional.resumo não será exibido aqui */}

      {Array.isArray(profissional.habilidadesTecnicas) &&
        profissional.habilidadesTecnicas.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {profissional.habilidadesTecnicas.map((skill, idx) => (
              <span
                key={idx}
                className={`px-2 py-1 rounded-full text-xs font-medium
                  ${darkMode
                    ? "bg-[#0D1B2A] text-[#C8D6E5]"
                    : "bg-gray-100 text-gray-800"
                  }`}
              >
                {skill}
              </span>
            ))}
          </div>
        )}

      {Array.isArray(profissional.softSkills) &&
        profissional.softSkills.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {profissional.softSkills.map((skill, idx) => (
              <span
                key={idx}
                className={`px-2 py-1 rounded-full text-xs font-medium
                  ${darkMode
                    ? "bg-[#0D1B2A] text-[#C8D6E5]"
                    : "bg-gray-200 text-gray-700"
                  }`}
              >
                {skill}
              </span>
            ))}
          </div>
        )}

    </div>
  );
}
