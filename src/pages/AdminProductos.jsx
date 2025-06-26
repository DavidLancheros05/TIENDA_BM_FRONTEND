import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminProductos = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    obtenerProductos();
  }, []);

  const obtenerProductos = async () => {
    try {
      const res = await axios.get("/api/productos");
      console.log("📦 Productos desde backend:", res.data);

      if (Array.isArray(res.data)) {
        setProductos(res.data);
      } else {
        console.warn("⚠️ La API no devolvió un array.");
        setProductos([]);
      }
    } catch (error) {
      console.error("❌ Error al cargar productos:", error);
    }
  };

  const eliminarProducto = async (id) => {
    try {
      await axios.delete(`/api/productos/${id}`);
      obtenerProductos();
    } catch (error) {
      console.error("❌ Error al eliminar producto:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Administrar Productos</h1>

      <table className="min-w-full bg-white rounded shadow">
        <thead>
          <tr className="text-left border-b">
            <th className="p-2">Nombre</th>
            <th className="p-2">Precio</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.length > 0 ? (
            productos.map((producto) => (
              <tr key={producto._id} className="border-b hover:bg-gray-100">
                <td className="p-2">{producto.nombre}</td>
                <td className="p-2">${producto.precio.toLocaleString("es-CO")}</td>
                <td className="p-2 space-x-2">
                  <button className="bg-yellow-500 text-white px-2 py-1 rounded">
                    Editar
                  </button>
                  <button
                    onClick={() => eliminarProducto(producto._id)}
                    className="bg-red-600 text-white px-2 py-1 rounded"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="p-4 text-center">
                No hay productos disponibles.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProductos;
