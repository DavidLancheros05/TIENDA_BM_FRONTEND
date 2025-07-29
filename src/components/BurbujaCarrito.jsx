import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CarritoContext } from '../context/CarritoContext';

const BurbujaCarrito = () => {
  const { carrito } = useContext(CarritoContext);
  const navigate = useNavigate();

  const cantidad = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <div
      onClick={() => navigate('/carrito')}
      style={{
        position: 'fixed',
        bottom: '90px', // más arriba para no tapar el WhatsApp
        right: '20px',
        backgroundColor: '#ff5722',
        color: 'white',
        borderRadius: '50%',
        width: '50px',
        height: '50px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '22px',
        cursor: 'pointer',
        zIndex: 1000,
        boxShadow: '0 4px 6px rgba(0,0,0,0.2)'
      }}
    >
      <i className="fas fa-shopping-cart"></i>
      {cantidad > 0 && (
        <span
          style={{
            position: 'absolute',
            top: '-5px',
            right: '-5px',
            backgroundColor: 'red',
            borderRadius: '50%',
            padding: '2px 6px',
            fontSize: '12px',
            color: 'white'
          }}
        >
          {cantidad}
        </span>
      )}
    </div>
  );
};

export default BurbujaCarrito;
