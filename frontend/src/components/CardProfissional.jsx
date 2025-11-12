export default function CardProfissional({ profissional, darkMode }) {
  return (
    <div
      className={`p-6 rounded-lg shadow-md transition-colors duration-300
        ${darkMode ? "bg-[#145374] text-[#C8D6E5]" : "bg-white text-[#0D1B2A]"}
      `}
    >
      <img
        src={profissional.foto}
        alt={profissional.nome}
        className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
      />
      <h2 className="text-xl font-semibold text-center mb-1">{profissional.nome}</h2>
      <p className="text-center mb-2">{profissional.cargo}</p>
      <p className="text-sm text-center mb-4">{profissional.localizacao}</p>

      <div className="flex flex-wrap justify-center gap-2 mb-4">
        {profissional.habilidadesTecnicas.map((skill, idx) => (
          <span
            key={idx}
            className={`px-2 py-1 rounded-full text-xs font-medium transition-colors duration-300
              ${darkMode ? "bg-[#0D1B2A] text-[#C8D6E5]" : "bg-gray-200 text-gray-800"}
            `}
          >
            {skill}
          </span>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        {profissional.softSkills.map((skill, idx) => (
          <span
            key={idx}
            className={`px-2 py-1 rounded-full text-xs font-medium transition-colors duration-300
              ${darkMode ? "bg-[#0D1B2A] text-[#C8D6E5]" : "bg-gray-100 text-gray-700"}
            `}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
