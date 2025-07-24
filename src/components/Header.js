import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CarritoContext } from '../context/CarritoContext';
import { AuthContext } from '../context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Header = () => {
  const { carrito } = useContext(CarritoContext);
  const { usuario, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary sticky-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          🚴‍♂️ <strong>BiciShop</strong>
        </Link>

        {/* Botón hamburguesa para móviles */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#menuPrincipal"
          aria-controls="menuPrincipal"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menú colapsable */}
        <div className="collapse navbar-collapse" id="menuPrincipal">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">Inicio</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/bicicletas">Bicicletas</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/accesorios">Accesorios</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/carrito">
                Carrito 🛒 ({totalItems})
              </Link>
            </li>

            {!usuario && (
              <>
                <li className="nav-item ms-2">
                  <Link className="btn btn-success" to="/login">
                    Iniciar sesión
                  </Link>
                </li>
                <li className="nav-item ms-2">
                  <Link className="btn btn-outline-success" to="/register">
                    Registrar
                  </Link>
                </li>
              </>
            )}

            {usuario && (
              <>
                <li className="nav-item d-flex align-items-center text-white me-3">
                  👋 Hola, {usuario.nombre}
                </li>
                {usuario.rol === 'admin' && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/adminDashboard">Panel</Link>
                  </li>
                )}
                <li className="nav-item ms-2">
                  <button
                    onClick={handleLogout}
                    className="btn btn-danger"
                  >
                    Cerrar sesión
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
