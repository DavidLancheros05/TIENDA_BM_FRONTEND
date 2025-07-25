import React from 'react';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div>
      <h2>📊 Panel de Administración</h2>

      <button onClick={() => navigate('/admin/productos')}>
        Administrar Productos
      </button>

      <button onClick={() => navigate('/admin/ventas')}>
        Ver Todas las Ventas
      </button>

      <button onClick={() => navigate('/admin/inventario')}>
        Gestionar Inventario
      </button>

      <button onClick={() => alert('Función no implementada')}>
        Administrar Otros
      </button>
    </div>
  );
}

export default AdminDashboard;
