import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBoxOpen, FaClipboardList, FaWarehouse, FaTools } from 'react-icons/fa';

function Card({ title, description, icon, onClick }) {
  return (
    <div className="min-w-[16rem] max-w-[16rem] bg-white border border-gray-200 shadow-md rounded-xl px-4 py-4 hover:shadow-lg transition flex flex-col justify-between">
      <div className="flex items-center gap-3 mb-3">
        <div className="text-3xl text-orange-500">{icon}</div>
        <h3 className="text-lg font-bold text-gray-800">{title}</h3>
      </div>
      <p className="text-sm text-gray-600 mb-4">{description}</p>
      <button
        onClick={onClick}
        className="bg-yellow-400 text-white px-4 py-2 rounded-md hover:bg-yellow-500 transition self-start"
      >
        Ir
      </button>
    </div>
  );
}

export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="bg-white text-gray-900 py-10 px-4 sm:px-10 min-h-screen">
      <h2 className="text-3xl font-bold mb-10 text-center flex items-center justify-center gap-2">
        <span role="img" aria-label="panel">📊</span> Panel de Administración
      </h2>

      {/* Scroll horizontal de tarjetas */}
      <div className="flex overflow-x-auto gap-6 pb-4 px-2">
        <Card
          title="Productos"
          description="Crea, edita y elimina productos de la tienda."
          icon={<FaBoxOpen />}
          onClick={() => navigate('/admin/productos')}
        />
        <Card
          title="Ventas"
          description="Consulta todas las ventas realizadas."
          icon={<FaClipboardList />}
          onClick={() => navigate('/admin/ventas')}
        />
        <Card
          title="Inventario"
          description="Gestiona el stock y las existencias."
          icon={<FaWarehouse />}
          onClick={() => navigate('/admin/inventario')}
        />
        <Card
          title="Otros"
          description="Opciones adicionales y futuras funciones."
          icon={<FaTools />}
          onClick={() => alert('Función no implementada')}
        />
      </div>
    </div>
  );
}
