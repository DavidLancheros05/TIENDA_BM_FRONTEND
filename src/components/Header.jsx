import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Header = () => {
  const location = useLocation();

  useEffect(() => {
    // Cerrar menú al hacer clic en un enlace
    const links = document.querySelectorAll('.nav-link');
    links.forEach((link) =>
      link.addEventListener('click', () => {
        const navbarToggler = document.querySelector('.navbar-toggler') as HTMLElement;
        const menu = document.getElementById('menuPrincipal');
        if (menu?.classList.contains('show')) {
          navbarToggler?.click();
        }
      })
    );

    // Cerrar menú al hacer scroll hacia abajo
    let lastScrollTop = window.scrollY;
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const goingDown = currentScroll > lastScrollTop;

      const menu = document.getElementById('menuPrincipal');
      if (goingDown && menu?.classList.contains('show')) {
        const navbarToggler = document.querySelector('.navbar-toggler') as HTMLElement;
        navbarToggler?.click();
      }

      lastScrollTop = currentScroll;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Estilo activo para el enlace seleccionado
  const isActive = (path: string) =>
    location.pathname === path ? 'text-warning' : 'text-light';

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div className="container">
        <Link className="navbar-brand" to="/">ColBogBike</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menuPrincipal">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="menuPrincipal">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/')}`} to="/">Inicio</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/productos')}`} to="/productos">Productos</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/sobrenosotros')}`} to="/sobrenosotros">Sobre Nosotros</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/contacto')}`} to="/contacto">Contacto</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
