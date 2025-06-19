import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';

const PagoCancelado = () => {
  const location = useLocation();

  useEffect(() => {
    console.log("🔴 Componente PagoCancelado montado");

    const queryParams = new URLSearchParams(location.search);
    const ventaId = queryParams.get("ventaId");

    console.log("🔙 Volvimos del intento de pago cancelado con ventaId:", ventaId);

    if (!ventaId) {
      console.error("⚠️ No se encontró ventaId en la URL");
      return;
    }

    const cancelarVenta = async () => {
      try {
        const API_URL = process.env.REACT_APP_API_URL;
        console.log("📤 Enviando solicitud para cancelar venta con ID:", ventaId);

        const respuesta = await axios.post(`${API_URL}/api/pagos/cancelar-venta`, {
          ventaId,
        });

        console.log("✅ Venta cancelada:", respuesta.data);
      } catch (error) {
        console.error("❌ Error cancelando venta:", error.response?.data || error.message);
      }
    };

    cancelarVenta();
  }, [location.search]);

  return (
    <div className="text-center mt-5">
      <h2 className="text-danger">❌ ¡Pago cancelado!</h2>
      <p>Tu compra no fue completada.</p>
      <Link to="/" className="btn btn-outline-primary mt-3">⬅️ Seguir comprando</Link>
    </div>
  );
};

export default PagoCancelado;
