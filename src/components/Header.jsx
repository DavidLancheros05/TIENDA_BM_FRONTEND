import React, { useContext, useEffect, useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CarritoContext } from '../context/CarritoContext';
import { AuthContext } from '../context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// ¡Ya no necesitamos importar './Header.css'; aquí!

const Header = () => {
  const { carrito } = useContext(CarritoContext);
  const { usuario, logout } = useContext(AuthContext);
  const location = useLocation();
  const [activePath, setActivePath] = useState(location.pathname);
  const navbarTogglerRef = useRef<HTMLButtonElement>(null); // Referencia para el botón del menú

  useEffect(() => {
    setActivePath(location.pathname);
  }, [location]);

  useEffect(() => {
    let lastScrollTop = window.scrollY;

    const handleScroll = () => {
      const currentScrollTop = window.scrollY;
      const menu = document.getElementById('menuPrincipal');
      const isOpen = menu?.classList.contains('show');

      // Si el menú está abierto Y la página se está scrollando (cambio de posición)
      if (isOpen && currentScrollTop !== lastScrollTop) {
        if (navbarTogglerRef.current) {
          navbarTogglerRef.current.click(); // Cierra el menú
        }
      }
      lastScrollTop = currentScrollTop;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleItemClick = () => {
    const menu = document.getElementById('menuPrincipal');
    const isOpen = menu?.classList.contains('show');
    if (isOpen) {
      if (navbarTogglerRef.current) {
        navbarTogglerRef.current.click(); // Cierra el menú
      }
    }
  };

  const linkClass = (path: string) =>
    `nav-link ${activePath === path ? 'text-warning fw-bold active-red-bg' : ''}`; // ¡Usamos la clase aquí!

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/" onClick={handleItemClick}>
          🛒 ColBogBike
        </Link>
        <button
          ref={navbarTogglerRef} // Asignamos la referencia al botón
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
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={linkClass('/')} to="/" onClick={handleItemClick}>
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link className={linkClass('/productos')} to="/productos" onClick={handleItemClick}>
                Productos
              </Link>
            </li>
            <li className="nav-item">
              <Link className={linkClass('/sobrenosotros')} to="/sobrenosotros" onClick={handleItemClick}>
                Sobre Nosotros
              </Link>
            </li>
            <li className="nav-item">
              <Link className={linkClass('/carrito')} to="/carrito" onClick={handleItemClick}>
                Carrito ({carrito.length})
              </Link>
            </li>
            {usuario?.rol === 'admin' && (
              <li className="nav-item">
                <Link className={linkClass('/admin')} to="/admin" onClick={handleItemClick}>
                  Panel Admin
                </Link>
              </li>
            )}
          </ul>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {usuario ? (
              <>
                <li className="nav-item">
                  <span className="navbar-text text-light me-2">
                    Hola, {usuario.nombre}
                  </span>
                </li>
                <li className="nav-item">
                  <button className="btn btn-outline-warning" onClick={logout}>
                    Cerrar sesión
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link className="btn btn-outline-light" to="/login" onClick={handleItemClick}>
                  Iniciar sesión
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;