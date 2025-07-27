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
      <h2 className="mb-4 text-center">🛒 Tu Carrito</h2>

      {carrito.length === 0 ? (
        <p className="text-center">No hay productos en el carrito.</p>
      ) : (
        <>
          <div className="row g-4">
            {carrito.map((item, idx) => (
              <div key={idx} className="col-md-6 col-lg-4">
                <div className="card shadow-sm h-100">
                  <div className="card-body">
                    <h5 className="card-title">{item.producto?.nombre}</h5>
                    <p className="card-text mb-2">
                      <strong>Color:</strong> {item.color}<br />
                      <strong>Talla:</strong> {item.talla}
                    </p>

                    <div className="d-flex align-items-center mb-3">
                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() => cambiarCantidad(idx, -1)}
                      >
                        -
                      </button>
                      <span className="mx-2">{item.cantidad}</span>
                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() => cambiarCantidad(idx, 1)}
                      >
                        +
                      </button>
                    </div>

                    <p className="mb-2">
                      <strong>Precio:</strong> ${item.producto?.precio?.toLocaleString('es-CO')} c/u
                    </p>
                    <p>
                      <strong>Total:</strong> ${(item.producto?.precio * item.cantidad).toLocaleString('es-CO')}
                    </p>

                    <button
                      onClick={() => eliminarDelCarrito(item.producto?._id)}
                      className="btn btn-outline-danger btn-sm w-100"
                    >
                      🗑️ Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 d-flex justify-content-between align-items-center flex-wrap">
            <h4 className="mb-3 mb-md-0">💰 Total: ${total.toLocaleString('es-CO')}</h4>
            <button onClick={limpiarCarrito} className="btn btn-outline-danger">
              Vaciar Carrito
            </button>
          </div>

          <div className="mt-4 text-center">
            <button onClick={irAPagar} className="btn btn-warning btn-lg">
              👉 Ir a pagar
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Carrito;
