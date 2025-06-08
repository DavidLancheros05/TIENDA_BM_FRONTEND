import React, { useContext } from 'react';
import { CarritoContext } from '../context/CarritoContext';

const Carrito = () => {
  const { carrito, eliminarDelCarrito, limpiarCarrito } = useContext(CarritoContext);

  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  return (
    <div className="container" style={{ padding: '2rem', maxWidth: '800px', margin: 'auto' }}>
      <h2>🛒 Tu Carrito de Compras</h2>

      {carrito.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <>
          <ul className="list-group mb-3">
            {carrito.map(item => (
              <li key={item._id} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <strong>{item.nombre}</strong> <br />
                  Cantidad: {item.cantidad} <br />
                  Precio unitario: ${item.precio.toFixed(2)}
                </div>
                <div>
                  <span className="fw-bold">${(item.precio * item.cantidad).toFixed(2)}</span>
                  <button 
                    className="btn btn-sm btn-danger ms-3"
                    onClick={() => eliminarDelCarrito(item._id)}
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="d-flex justify-content-between align-items-center">
            <h4>Total: ${total.toFixed(2)}</h4>
            <button className="btn btn-outline-danger" onClick={limpiarCarrito}>
              Vaciar Carrito
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Carrito;
