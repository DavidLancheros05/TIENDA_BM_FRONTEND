import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart3, Package, Users, ShoppingCart, Settings, MessageSquare, DollarSign, Megaphone } from 'lucide-react';

export default function AdminDashboard() {
  const navigate = useNavigate();

  const opciones = [
    { nombre: 'Productos', icono: <Package className="w-5 h-5" />, ruta: '/admin/productos' },
    { nombre: 'Ventas', icono: <ShoppingCart className="w-5 h-5" />, ruta: '/admin/ventas' },
    { nombre: 'Inventario', icono: <BarChart3 className="w-5 h-5" />, ruta: '/admin/inventario' },
    { nombre: 'Configuración', icono: <Settings className="w-5 h-5" />, ruta: '/admin/configuracion' },
    { nombre: 'Usuarios', icono: <Users className="w-5 h-5" />, ruta: '/admin/usuarios' },
    { nombre: 'Reseñas', icono: <MessageSquare className="w-5 h-5" />, ruta: '/admin/resenas' },
    { nombre: 'Finanzas', icono: <DollarSign className="w-5 h-5" />, ruta: '/admin/finanzas' },
    { nombre: 'Marketing', icono: <Megaphone className="w-5 h-5" />, ruta: '/admin/marketing' },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50">
      <h1 className="text-3xl font-bold mt-6 flex items-center gap-2">
        <BarChart3 className="text-blue-500 w-8 h-8" />
        Panel de Administración
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-10 px-4 w-full max-w-6xl">
        {opciones.map((opcion) => (
          <button
            key={opcion.nombre}
            onClick={() => navigate(opcion.ruta)}
            className="flex items-center gap-2 justify-center bg-yellow-400 hover:bg-yellow-500 text-black py-4 px-6 rounded-xl shadow-md font-medium text-lg transition"
          >
            {opcion.icono}
            {opcion.nombre}
          </button>
        ))}
      </div>

     
    </div>
  );
}
