import React, { useContext } from 'react';
import { CarritoContext } from '../../context/CarritoContext';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

const BASE_FRONTEND_URL = window.location.origin;
console.log("daviddddd",BASE_FRONTEND_URL);

const Carrito = () => {
  const { carrito, eliminarDelCarrito, limpiarCarrito } = useContext(CarritoContext);
  const { usuario } = useContext(AuthContext);

  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

const pagarConWompi = async () => {
  console.log("👤 Usuario actual:", usuario); // ✅ Verifica que ahora tenga ._id

const usuarioId = usuario?._id || usuario?.id;

if (!usuarioId) {
  console.error("⚠️ Usuario no logueado.");
  alert("Debes iniciar sesión para pagar.");
  return;
}

    if (!carrito || carrito.length === 0) {
      console.error("⚠️ Carrito vacío.");
      alert("Tu carrito está vacío.");
      return;
    }


const ventaYLink = {
  usuarioId,
  productos: carrito.map(item => ({
    producto: item._id,
    cantidad: item.cantidad
  })),
  total,
  metodoPago: "PSE",
  name: "Compra en Col_Bog_Bike",
  description: "Pago con PSE (sandbox)",
  currency: "COP",
  amount_in_cents: total * 100,
  redirect_url: `${BASE_FRONTEND_URL}/pago-exitoso`,
  cancel_url: `${BASE_FRONTEND_URL}/pago-cancelado`,
};

    console.log("📤 Enviando datos para crear link y registrar venta:", ventaYLink);
    console.log("🌐 sss");
    console.log("🌐 API_URL:", process.env.REACT_APP_API_URL);
    try {
      const API_URL = process.env.REACT_APP_API_URL;

      const response = await axios.post(`${API_URL}/api/pagos/crear-link-pago`, ventaYLink);
      const link = response.data?.link_pago;
      console.log("🔗 Redirigiendo a:", link);
      if (link) {
        limpiarCarrito();
        window.location.href = link;
      } else {
        alert("No se pudo obtener el link de pago.");
      }
    } catch (error) {
      console.error("❌ Error creando link de pago:", error.response?.data || error.message);
      alert("Ocurrió un error al crear el link de pago.");
    }
  };

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

          <div className="text-center mt-4">
            <button
              className="btn btn-success px-4 py-2"
              onClick={pagarConWompi}
            >
              💳 Pagar con PSE
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Carrito;
