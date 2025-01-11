import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-blue-500 text-white p-4 flex justify-between items-center">
      <div className="flex items-center">
        <img src="/tiao-carreiro-pardinho.png" alt="Tião Carreiro" className="w-12 h-12 rounded-full mr-4" />
        <div>
          <h1 className="text-lg font-bold">Top 5 Músicas Mais Tocadas</h1>
          <h2 className="text-md">Tião Carreiro & Pardinho</h2>
        </div>
      </div>
      <nav className="flex items-center">
        <Link to="/" className="mr-4 hover:underline">
          Home
        </Link>
        {user ? (
          <>
            <Link to="/admin" className="mr-4 hover:underline">
              Admin
            </Link>
            <span className="mr-4">Bem-vindo, {user.name}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
            >
              Sair
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="bg-green-500 px-4 py-2 rounded mr-4 hover:bg-green-600">
              Login
            </Link>
            <Link to="/register" className="bg-yellow-500 px-4 py-2 rounded hover:bg-yellow-600">
              Registrar
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;