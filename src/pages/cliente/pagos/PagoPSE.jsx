import React, { useContext } from 'react';
import { CarritoContext } from '../../../context/CarritoContext'
import axios from 'axios';

const Carrito = () => {
  const { carrito, eliminarDelCarrito, limpiarCarrito } = useContext(CarritoContext);

  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  const crearLinkPago = async () => {
    const totalEnCentavos = Math.round(total * 100); // Wompi requiere valor en centavos

    const BASE_FRONTEND_URL = window.location.origin;
    const API_URL = process.env.REACT_APP_API_URL;

    const datosPago = {
      name: "Pago de compra en Col_Bog_Bike",
      description: "Compra de productos",
      single_use: true,
      collect_shipping: false,
      currency: "COP",
      amount_in_cents: totalEnCentavos,
      redirect_url: `${BASE_FRONTEND_URL}/pago-exitoso`,
      cancel_url: `${BASE_FRONTEND_URL}/pago-cancelado`,
    };

    console.log("📦 Payload enviado:\n", datosPago);

    try {
      console.log("🚀 Enviando solicitud a backend:", `${API_URL}/api/pagos/crear-link-pago`);
      const response = await axios.post(`${API_URL}/api/pagos/crear-link-pago`, datosPago);

      console.log("✅ Respuesta del backend:", response.data);
      if (response.data && response.data.link_pago) {
        window.location.href = response.data.link_pago;
      } else {
        console.error("⚠️ No se recibió URL de pago válida.");
        alert("No se pudo generar el link de pago.");
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

          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4>Total: ${total.toFixed(2)}</h4>
            <button className="btn btn-outline-danger" onClick={limpiarCarrito}>
              Vaciar Carrito
            </button>
          </div>

          {/* ✅ Botón para pagar con Wompi */}
          <div className="text-center">
            <button
              onClick={crearLinkPago}
              className="btn btn-success px-4 py-2"
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
