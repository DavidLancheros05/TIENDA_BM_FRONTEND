import React, { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Header = () => {
  const location = useLocation();

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
          toggler?.click(); // Cierra el menú
        }
      }

      lastScrollTop = currentScrollTop;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <NavLink className="navbar-brand" to="/">ColBogBike</NavLink>
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
              <NavItem to="/" label="Inicio" currentPath={location.pathname} />
              <NavItem to="/productos" label="Productos" currentPath={location.pathname} />
              <NavItem to="/sobre-nosotros" label="Sobre Nosotros" currentPath={location.pathname} />
              <NavItem to="/contacto" label="Contacto" currentPath={location.pathname} />
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

const NavItem = ({ to, label, currentPath }) => {
  const isActive = currentPath === to;

  return (
    <li className="nav-item">
      <NavLink
        to={to}
        className={`nav-link ${isActive ? 'bg-danger text-white' : ''}`}
        onClick={() => {
          const menu = document.getElementById('menuPrincipal');
          const isOpen = menu?.classList.contains('show');
          if (isOpen) {
            const toggler = document.querySelector('.navbar-toggler');
            toggler?.click();
          }
        }}
      >
        {label}
      </NavLink>
    </li>
  );
};

export default Header;
