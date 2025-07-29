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
      <div className="p-4 shadow rounded bg-white border">
        <h2 className="mb-4 text-center">🛒 Tu Carrito</h2>

        {carrito.length === 0 ? (
          <p className="text-center">No hay productos en el carrito.</p>
        ) : (
          <>
            <div className="d-flex flex-column gap-4">
              {carrito.map((item, idx) => (
                <div
                  key={idx}
                  className="d-flex flex-row align-items-start gap-3 border-bottom pb-3"
                  style={{ flexWrap: 'nowrap' }}
                >
                  {/* Imagen */}
<img
  src={
    item.producto?.imagenes?.[0]?.url
      ? item.producto.imagenes[0].url.startsWith('http')
        ? item.producto.imagenes[0].url
        : `${import.meta.env.VITE_BACKEND_URL}/${item.producto.imagenes[0].url}`
      : 'https://via.placeholder.com/100'
  }
  alt={item.producto?.nombre}
  style={{
    width: '100px',
    height: '100px',
    objectFit: 'cover',
    borderRadius: '8px',
    flexShrink: 0,
  }}
/>


                  {/* Detalles del producto */}
                  <div className="d-flex flex-column flex-grow-1">
                    <div className="d-flex justify-content-between align-items-start flex-wrap">
                      <h5>{item.producto?.nombre}</h5>
                      <button
                        onClick={() => eliminarDelCarrito(item.producto?._id)}
                        className="btn btn-outline-danger btn-sm"
                      >
                        🗑️ Eliminar
                      </button>
                    </div>

                    <p className="mb-1">
                      <strong>Color:</strong> {item.color} &nbsp;&nbsp;
                      <strong>Talla:</strong> {item.talla}
                    </p>

                    <div className="d-flex align-items-center mb-2">
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

                    <div>
                      <p className="mb-1">
                        <strong>Precio:</strong> ${item.producto?.precio?.toLocaleString('es-CO')} c/u
                      </p>
                      <p className="mb-0">
                        <strong>Total:</strong>{' '}
                        ${(item.producto?.precio * item.cantidad).toLocaleString('es-CO')}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 d-flex justify-content-between align-items-center flex-wrap">
              <h4 className="mb-3 mb-md-0 text-primary">
                💰 Total: <span className="fw-bold text-success">${total.toLocaleString('es-CO')}</span>
              </h4>
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
    </div>
  );
};

export default Carrito;
