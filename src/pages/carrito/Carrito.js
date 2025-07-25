import React, { useContext } from 'react';
import { CarritoContext } from '../../context/CarritoContext';
import { useNavigate } from 'react-router-dom';

const Carrito = () => {
  const { carrito, eliminarDelCarrito, limpiarCarrito, setCarrito } = useContext(CarritoContext);
  const navigate = useNavigate();

  const total = carrito.reduce(
    (acc, item) => acc + ((item.producto?.precio || 0) * item.cantidad),
    0
  );

  const irAPagar = () => {
    if (carrito.length === 0) {
      alert("Tu carrito está vacío.");
      return;
    }
    navigate('/checkout');
  };

  const cambiarCantidad = (index, delta) => {
    setCarrito(prev => {
      const nuevo = [...prev];
      const nuevaCantidad = nuevo[index].cantidad + delta;
      if (nuevaCantidad < 1) return prev;
      nuevo[index].cantidad = nuevaCantidad;
      return nuevo;
    });
  };

  return (
    <div className="container py-5">
      <h2>🛒 Tu Carrito</h2>

      {carrito.length === 0 ? (
        <p>No hay productos.</p>
      ) : (
        <>
          <ul className="list-group mb-3">
            {carrito.map((item, idx) => (
              <li key={idx} className="list-group-item">
                <strong>{item.producto?.nombre}</strong><br />
                Color: {item.color} | Talla: {item.talla}<br />
                <div className="d-flex align-items-center">
                  <button onClick={() => cambiarCantidad(idx, -1)}>-</button>
                  <span className="mx-2">{item.cantidad}</span>
                  <button onClick={() => cambiarCantidad(idx, 1)}>+</button>
                  <span className="ms-3">
                    ${item.producto?.precio?.toLocaleString('es-CO')} c/u | Total: ${(item.producto?.precio * item.cantidad).toLocaleString('es-CO')}
                  </span>
                  <button onClick={() => eliminarDelCarrito(item.producto?._id)} className="btn btn-danger btn-sm ms-3">Eliminar</button>
                </div>
              </li>
            ))}
          </ul>

          <div className="d-flex justify-content-between">
            <h4>Total: ${total.toLocaleString('es-CO')}</h4>
            <button onClick={limpiarCarrito} className="btn btn-outline-danger">Vaciar</button>
          </div>

          <div className="mt-4 text-center">
            <button onClick={irAPagar} className="btn btn-success">👉 Ir a pagar</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Carrito;
