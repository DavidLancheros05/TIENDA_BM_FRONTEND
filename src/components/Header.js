import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CarritoContext } from '../context/CarritoContext';
import { AuthContext } from '../context/AuthContext';

const Header = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const { carrito } = useContext(CarritoContext);
  const { usuario, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-blue-600 text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold flex items-center gap-2">
          🚴‍♂️ BiciShop
        </Link>

        {/* Botón hamburguesa */}
        <button
          className="lg:hidden text-white text-2xl"
          onClick={() => setMenuAbierto(!menuAbierto)}
          aria-label="Abrir menú"
        >
          <i className="fas fa-bars"></i>
        </button>

        {/* Menú principal */}
        <nav
          className={`${
            menuAbierto ? 'block' : 'hidden'
          } lg:flex flex-col lg:flex-row absolute lg:static bg-blue-600 w-full left-0 top-full lg:w-auto lg:items-center gap-4 px-4 py-4 lg:py-0 lg:px-0`}
        >
          <Link to="/" className="hover:underline">Inicio</Link>
          <Link to="/bicicletas" className="hover:underline">Bicicletas</Link>
          <Link to="/accesorios" className="hover:underline">Accesorios</Link>
          <Link to="/carrito" className="hover:underline">
            Carrito 🛒 ({totalItems})
          </Link>

          {!usuario && (
            <>
              <Link to="/login" className="hover:underline">Login</Link>
              <Link to="/register" className="hover:underline">Registrar</Link>
            </>
          )}

          {usuario && (
            <>
              {usuario.rol === 'admin' && (
                <Link to="/admin" className="hover:underline">Panel</Link>
              )}
              <button
                onClick={handleLogout}
                className="hover:underline text-left lg:text-inherit"
              >
                Cerrar sesión
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
