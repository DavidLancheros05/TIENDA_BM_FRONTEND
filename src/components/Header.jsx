import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CarritoContext } from '../context/CarritoContext';
import { AuthContext } from '../context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Header = () => {
  const { carrito } = useContext(CarritoContext);
  const { usuario, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // Cerrar menú al hacer clic en un enlace
  useEffect(() => {
    const links = document.querySelectorAll('.nav-link');
    const collapseMenu = () => {
      const menu = document.getElementById('menuPrincipal');
      const isOpen = menu?.classList.contains('show');
      if (isOpen) {
        const toggler = document.querySelector('.navbar-toggler') as HTMLElement;
        toggler?.click();
      }
    };
    links.forEach(link => link.addEventListener('click', collapseMenu));
    return () => {
      links.forEach(link => link.removeEventListener('click', collapseMenu));
    };
  }, []);

  // Cerrar menú si se hace scroll hacia abajo
  useEffect(() => {
    let lastScrollTop = window.scrollY;

    const handleScroll = () => {
      const currentScrollTop = window.scrollY;
      const goingDown = currentScrollTop > lastScrollTop;

      if (goingDown) {
        const menu = document.getElementById('menuPrincipal');
        const isOpen = menu?.classList.contains('show');
        if (isOpen) {
          const toggler = document.querySelector('.navbar-toggler') as HTMLElement;
          toggler?.click(); // Cierra el menú
        }
      }

      lastScrollTop = currentScrollTop;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top shadow-sm">
      <div className="container">
        <Link className="navbar-brand" to="/">Col_Bog_Bike</Link>
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
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/productos">Productos</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/sobre-nosotros">Sobre Nosotros</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/carrito">
                Carrito ({carrito.length})
              </Link>
            </li>
            {usuario ? (
              <>
                {usuario.rol === 'admin' && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/admin">Panel Admin</Link>
                  </li>
                )}
                <li className="nav-item">
                  <button className="btn btn-link nav-link" onClick={logout}>Cerrar sesión</button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Iniciar sesión</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/registro">Registrarse</Link>
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
