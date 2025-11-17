export default function Footer() {
  return (
   <footer className=" py-8 text-center bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400">
          <p>&copy; 2025 SkillLink. Todos os direitos reservados.</p>
          <div className="mt-2 text-sm space-x-4">
              <a href="#" className="hover:text-cyan-500">Privacidade</a>
              <a href="#" className="hover:text-cyan-500">Termos</a>
              <a href="#" className="hover:text-cyan-500">Contato</a>
          </div>
      </footer>
  );
}
