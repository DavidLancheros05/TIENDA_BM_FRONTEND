import React, { useEffect, useState } from 'react';

import api from "../../services/api"; // ajusta el path según tu estructura

function AdminVentas() {
  const [ordenes, setOrdenes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrdenes = async () => {
      try {
        const res = await api.get(`/ordenes`);
        setOrdenes(res.data);
      } catch (err) {
        console.error('❌ Error cargando órdenes:', err);
        setError('No se pudieron cargar las órdenes.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrdenes();
  }, []);

  return (
    <div>
      <h2>🧾 Todas las Ventas / Órdenes</h2>

      {loading ? (
        <p>Cargando...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <table border="1" cellPadding="8" style={{ width: '100%' }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Cliente</th>
              <th>Total</th>
              <th>Estado</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {ordenes.map((orden) => (
              <tr key={orden._id}>
                <td>{orden._id}</td>
                <td>{orden.direccionEnvio?.nombreCompleto || 'Sin nombre'}</td>
                <td>${orden.total}</td>
                <td>{orden.estado}</td>
                <td>{new Date(orden.fechaCreacion).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminVentas;
