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
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow">
      <div className="container-fluid">
        {/* Logo + Nombre */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img
            src="/img/logo-colbogbike.jpg"
            alt="ColBogBike Logo"
            style={{ width: '40px', marginRight: '10px' }}
          />
          <strong style={{ color: '#ffc107' }}>ColBogBike</strong>
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
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center gap-2">

            {/* Inicio y productos */}
            <div className="d-flex align-items-center gap-2">
              <li className="nav-item">
                <Link className="nav-link text-warning" to="/">Inicio</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-warning" to="/bicicletas">Bicicletas</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-warning" to="/bicicletaselectrica">Eléctricas</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-warning" to="/accesorios">Accesorios</Link>
              </li>
            </div>

            {/* Separador */}
            <div className="vr mx-3 d-none d-lg-block" style={{ height: '30px' }}></div>

            {/* Carrito */}
            <li className="nav-item">
              <Link className="nav-link text-warning" to="/carrito">
                🛒 ({totalItems})
              </Link>
            </li>

            {/* Panel de admin */}
            {usuario?.rol === 'admin' && (
              <>
                <div className="vr mx-3 d-none d-lg-block" style={{ height: '30px' }}></div>
                <li className="nav-item">
                  <Link className="nav-link text-warning" to="/adminDashboard">Panel</Link>
                </li>
              </>
            )}

            {/* Sesión */}
            <div className="vr mx-3 d-none d-lg-block" style={{ height: '30px' }}></div>
            {!usuario ? (
              <div className="d-flex align-items-center gap-2">
                <Link className="btn btn-outline-warning" to="/login">
                  Iniciar sesión
                </Link>
                <Link className="btn btn-warning" to="/register">
                  Registrarse
                </Link>
              </div>
            ) : (
              <>
                <li className="nav-item text-white ms-2">
                  👋 Hola, {usuario.nombre}
                </li>
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
