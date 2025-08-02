import React, { useEffect, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { CarritoContext } from '../context/CarritoContext';
import { AuthContext } from '../context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Header = () => {
  const { carrito } = useContext(CarritoContext);
  const { usuario, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const totalItems = Array.isArray(carrito)
    ? carrito.reduce((acc, item) => acc + item.cantidad, 0)
    : 0;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Cierra el menú hamburguesa al hacer scroll
  useEffect(() => {
    let lastScrollTop = window.scrollY;

    const handleScroll = () => {
      const currentScrollTop = window.scrollY;
      const goingDown = currentScrollTop > lastScrollTop;

      if (goingDown) {
        const menu = document.getElementById('menuPrincipal');
        const isOpen = menu?.classList.contains('show');
        if (isOpen) {
          const toggler = document.querySelector('.navbar-toggler');
          toggler?.click();
        }
      }

      lastScrollTop = currentScrollTop;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow">
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img
            src="/img/logo-colbogbike.jpg"
            alt="ColBogBike Logo"
            style={{ width: '40px', marginRight: '10px' }}
          />
          <strong style={{ color: '#ffc107' }}>ColBogBike</strong>
        </Link>

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

        <div className="collapse navbar-collapse" id="menuPrincipal">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center gap-2">

  {/* Rutas principales */}
  <NavItem to="/" label="Inicio" currentPath={location.pathname} />
  <NavItem to="/bicicletas" label="Bicicletas" currentPath={location.pathname} />
  <NavItem to="/bicicletaselectrica" label="Eléctricas" currentPath={location.pathname} />
  <NavItem to="/accesorios" label="Accesorios" currentPath={location.pathname} />
  <NavItem to="/sobrenosotros" label="Sobre Nosotros" currentPath={location.pathname} />

  {/* Separador */}
  <li><div className="vr mx-3 d-none d-lg-block" style={{ height: '30px' }}></div></li>

  {/* Carrito */}
  <li className="nav-item position-relative">
    <Link className="nav-link text-warning" to="/carrito" style={{ fontSize: '1.4rem' }}>
      🛒
      {totalItems > 0 && (
        <span
          className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
          style={{ fontSize: '0.7rem' }}
        >
          {totalItems}
        </span>
      )}
    </Link>
  </li>

  {/* Admin */}
  {usuario?.rol === 'admin' && (
    <>
      <li><div className="vr mx-3 d-none d-lg-block" style={{ height: '30px' }}></div></li>
      <NavItem to="/adminDashboard" label="Panel" currentPath={location.pathname} />
    </>
  )}

  {/* Mis Compras */}
  {usuario && (
    <NavItem to="/miscompras" label="Mis Compras" currentPath={location.pathname} />
  )}

  {/* Separador */}
  <li><div className="vr mx-3 d-none d-lg-block" style={{ height: '30px' }}></div></li>

  {/* Sesión */}
  {!usuario ? (
    <>
      <li>
        <Link className="btn btn-outline-warning" to="/login">Iniciar sesión</Link>
      </li>
      <li>
        <Link className="btn btn-warning" to="/register">Registrarse</Link>
      </li>
    </>
  ) : (
    <>
      <li className="nav-item text-white ms-2">👋 Hola, {usuario.nombre}</li>
      <li className="nav-item ms-2">
        <button onClick={handleLogout} className="btn btn-danger">Cerrar sesión</button>
      </li>
    </>
  )}
</ul>
        </div>
      </div>
    </nav>
  );
};

const NavItem = ({ to, label, currentPath }) => {
  const isActive = currentPath === to;

  const handleCloseMenu = () => {
    const menu = document.getElementById('menuPrincipal');
    const isOpen = menu?.classList.contains('show');
    if (isOpen) {
      const toggler = document.querySelector('.navbar-toggler');
      toggler?.click();
    }
  };

  return (
    <li className="nav-item">
      <Link
        to={to}
        className={`nav-link text-warning ${isActive ? 'bg-danger text-white' : ''}`}
        onClick={handleCloseMenu}
      >
        {label}
      </Link>
    </li>
  );
};

export default Header;
