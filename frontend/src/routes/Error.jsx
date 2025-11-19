import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="fixed inset-0 bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="text-center">
        
        <h1 className="text-6xl font-bold text-gray-300 dark:text-gray-700 mb-2">
          404
        </h1>

        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
          Página Não Encontrada
        </h2>
        
        <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm">
          A página que você está procurando não existe.
        </p>

        <Link
          to="/"
          className="inline-block bg-cyan-600 hover:bg-cyan-700 text-white font-medium py-2 px-6 rounded-lg transition-colors text-sm"
        >
          Voltar para o Início
        </Link>

      </div>
    </div>
  );
}

export default NotFound;