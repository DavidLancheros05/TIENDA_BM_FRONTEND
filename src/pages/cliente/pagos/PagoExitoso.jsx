import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PagoExitoso = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [ventaId, setVentaId] = useState(null);
  const [mensaje, setMensaje] = useState('');
  const [total, setTotal] = useState(0);

  // ✅ Tomamos la URL del backend desde el .env o Render
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    console.log("🟢 Componente PagoExitoso montado");

    const queryParams = new URLSearchParams(location.search);
    const ventaIdFromURL = queryParams.get("ventaId");

    console.log("🔁 Volvimos del pago con ventaId:", ventaIdFromURL);

    if (!ventaIdFromURL) {
      console.error("⚠️ No se encontró ventaId en la URL");
      return;
    }

    setVentaId(ventaIdFromURL);

    const confirmarVenta = async () => {
      try {
        console.log("📤 Enviando confirmación de venta con ID:", ventaIdFromURL);

        const respuesta = await axios.post(`${API_URL}/api/pagos/confirmar-venta`, {
          ventaId: ventaIdFromURL,
        });

        console.log("✅ Venta confirmada:", respuesta.data);
        setMensaje(respuesta.data.mensaje || "Venta confirmada con éxito");

        // 🧾 Obtener detalles de la venta para mostrar resumen
        const { data } = await axios.get(`${API_URL}/api/pagos/detalle-venta/${ventaIdFromURL}`);
        setTotal(data.total);

      } catch (error) {
        console.error("❌ Error confirmando venta:", error.response?.data || error.message);
        setMensaje("Hubo un error al confirmar tu pago.");
      }
    };

    confirmarVenta();
  }, [location.search, API_URL]);

  return (
    <div className="text-center mt-5">
      <h2 className="text-success">✅ ¡Pago exitoso!</h2>
      <p>{mensaje}</p>

      {ventaId && (
        <div className="mt-4">
          <h5>🧾 Resumen del pago</h5>
          <p><strong>ID de venta:</strong> {ventaId}</p>
          <p><strong>Total pagado:</strong> ${total.toLocaleString('es-CO')}</p>
        </div>
      )}

      <button
        onClick={() => navigate('/bicicletas')}
        className="btn btn-primary mt-4"
      >
        🛍️ Seguir comprando
      </button>
    </div>
  );
};

export default PagoExitoso;
