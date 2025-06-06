import React, { useContext } from 'react';
import { CarritoContext } from '../context/CarritoContext';

const Carrito = () => {
  const { carrito, eliminarDelCarrito, limpiarCarrito } = useContext(CarritoContext);

  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  return (
    <div
      style={{
        position: 'fixed',
        top: '20vh',        // cerca de 1/4 de la altura (puedes ajustar)
        right: '20px',
        width: '300px',
        maxHeight: '60vh',
        backgroundColor: 'white',
        boxShadow: '0 0 15px rgba(0,0,0,0.3)',
        borderRadius: '8px',
        padding: '15px',
        overflowY: 'auto',
        zIndex: 1000,
      }}
    >
      <h3 style={{ borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>🛒 Carrito de Compras</h3>

      {carrito.length === 0 ? (
        <p>Tu carrito está vacío</p>
      ) : (
        <>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {carrito.map(item => (
              <li
                key={item._id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '10px',
                  alignItems: 'center',
                }}
              >
                <div>
                  <strong>{item.nombre}</strong> <br />
                  {item.cantidad} x ${item.precio.toFixed(2)}
                </div>
                <button
                  onClick={() => eliminarDelCarrito(item._id)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'red',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    fontSize: '18px',
                    lineHeight: '1',
                  }}
                  title="Eliminar"
                >
                  ×
                </button>
              </li>
            ))}
          </ul>

          <hr />

          <div style={{ fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '10px' }}>
            Total: ${total.toFixed(2)}
          </div>

          <button
            onClick={() => alert('Implementa la lógica de pago aquí')}
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#0d6efd',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '1rem',
            }}
            disabled={carrito.length === 0}
          >
            Pagar
          </button>

          <button
            onClick={limpiarCarrito}
            style={{
              marginTop: '10px',
              width: '100%',
              padding: '8px',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '0.9rem',
            }}
            disabled={carrito.length === 0}
          >
            Vaciar carrito
          </button>
        </>
      )}
    </div>
  );
};

export default Carrito;
