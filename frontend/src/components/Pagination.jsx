import React from 'react';

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  // Certifique-se de que totalPages é um número válido
  if (!totalPages || totalPages <= 0) {
    return null; // Não renderiza o componente se totalPages for inválido
  }

  // Cria um array de páginas para exibição
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center space-x-2 mt-4">
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-4 py-2 rounded ${
            page === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;

