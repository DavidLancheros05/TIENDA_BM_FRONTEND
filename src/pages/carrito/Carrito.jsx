import React, { useContext } from 'react';
import { CarritoContext } from '../../context/CarritoContext';
import { useNavigate } from 'react-router-dom';

const Carrito = () => {
  // Destructura las funciones con los nombres correctos del contexto:
  // 'eliminarDelCarrito' y 'vaciarCarrito'
  const { carrito, total, eliminarDelCarrito, vaciarCarrito, setCarrito } = useContext(CarritoContext);
  const navigate = useNavigate();

  // El total ya se calcula y se proporciona desde el CarritoContext,
  // así que esta línea es redundante si ya lo tienes en el contexto.
  // const total = carrito.reduce(
  //   (acc, item) => acc + ((item.producto?.precio || 0) * item.cantidad),
  //   0
  // );

  const irAPagar = () => {
    if (carrito.length === 0) {
      // Es mejor usar un modal o un mensaje en la UI en lugar de alert()
      console.warn("Tu carrito está vacío.");
      alert("Tu carrito está vacío."); // Manteniendo alert() por ahora, pero considera cambiarlo
      return;
    }
    navigate('/checkout');
  };

  // Función cambiarCantidad sin anotaciones de tipo de TypeScript
  const cambiarCantidad = (index, delta) => {
    setCarrito(prev => {
      const nuevo = [...prev];
      // Asegúrate de que 'cantidad' exista en el objeto del carrito
      if (nuevo[index]) {
        const nuevaCantidad = nuevo[index].cantidad + delta;
        if (nuevaCantidad < 1) return prev; // No permitir cantidad menor a 1
        nuevo[index].cantidad = nuevaCantidad;
      }
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
                  key={`${item.producto._id}-${item.color || ''}-${item.talla || ''}-${idx}`} // Clave más robusta
                  className="d-flex flex-row align-items-start gap-3 border-bottom pb-3"
                  style={{ flexWrap: 'nowrap' }}
                >
                  {/* Imagen */}
                  <img
                    src={
                      item.producto?.imagenes?.[0]?.url
                        ? item.producto.imagenes[0].url.startsWith('http')
                          ? item.producto.imagenes[0].url
                          : `${import.meta.env.VITE_API_URL}/uploads/${item.producto.imagenes[0].url}` // Usar VITE_API_URL
                        : 'https://via.placeholder.com/100' // Imagen de fallback
                    }
                    alt={item.producto?.nombre || 'Producto'}
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
                      <h5>{item.producto?.nombre || 'Producto desconocido'}</h5>
                      <button
                        // Llama a 'eliminarDelCarrito' pasando los TRES argumentos:
                        onClick={() => eliminarDelCarrito(item.producto?._id || '', item.color, item.talla)}
                        className="btn btn-outline-danger btn-sm"
                      >
                        🗑️ Eliminar
                      </button>
                    </div>

                    <p className="mb-1">
                      <strong>Color:</strong> {item.color || 'N/A'} &nbsp;&nbsp;
                      <strong>Talla:</strong> {item.talla || 'N/A'}
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
                        <strong>Precio:</strong> ${item.producto?.precio?.toLocaleString('es-CO') || '0'} c/u
                      </p>
                      <p className="mb-0">
                        <strong>Total:</strong>{' '}
                        {(item.producto?.precio && item.cantidad) ? (item.producto.precio * item.cantidad).toLocaleString('es-CO') : 'N/A'}
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
              <button onClick={vaciarCarrito} className="btn btn-outline-danger">
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
