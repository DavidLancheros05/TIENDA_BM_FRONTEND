import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CarritoContext } from '../context/CarritoContext';
import { AuthContext } from '../context/AuthContext';

const Header = () => {
  const { carrito } = useContext(CarritoContext);
  const { usuario, logout } = useContext(AuthContext);
  const navigate = useNavigate();
 console.log('Usuario en Header:', usuario);
  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header style={headerStyle}>
      <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
        <h1 style={{ fontSize: '1.5rem', margin: 0 }}>
          🚴‍♂️ <strong>BiciShop</strong>
        </h1>
      </Link>
        <nav>
        <Link to="/" style={linkStyle}>Inicio</Link>
        <Link to="/bicicletas" style={linkStyle}>Bicicletas</Link>
        <Link to="/accesorios" style={linkStyle}>Accesorios</Link>
        <Link to="/carrito" style={linkStyle}>Carrito 🛒 ({totalItems})</Link>
        
        {!usuario && (
            <>
            <Link to="/login" style={linkStyle}>Login</Link>
            <Link to="/register" style={linkStyle}>Registrar</Link>
            </>
        )}

        {usuario && (
            <>
            {usuario.rol === 'admin' && (
                <Link to="/admin" style={linkStyle}>Panel</Link>
            )}
            <button onClick={handleLogout} style={buttonStyle}>
                Cerrar sesión
            </button>
            </>
        )}
        </nav>
    </header>
  );
};

const headerStyle = {
  backgroundColor: '#0d6efd',
  color: 'white',
  padding: '0.75rem 1rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  position: 'sticky',
  top: 0,
  zIndex: 100,
};

const linkStyle = {
  color: 'white',
  marginRight: '15px',
  textDecoration: 'none',
  fontWeight: '500',
};

const buttonStyle = {
  background: 'none',
  border: 'none',
  color: 'white',
  cursor: 'pointer',
  fontWeight: '500',
};

export default Header;
