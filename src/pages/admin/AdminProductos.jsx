import React, { useEffect, useState } from "react";
import axios from "axios";

const initialForm = {
  nombre: "",
  descripcion: "",
  precio: 0,
  categoria: "",
  tipoProducto: "",
  imagenDestacada: "",
  marca: "",
  colores: [],
  tallas: [],
};

const AdminProductos = () => {
  const [productos, setProductos] = useState([]);
  const [formData, setFormData] = useState(initialForm);
  const [editandoId, setEditandoId] = useState(null);

  useEffect(() => {
    obtenerProductos();
  }, []);

  const obtenerProductos = async () => {
    try {
      const res = await axios.get("https://tienda-bm-backend-1.onrender.com/api/productos");
      if (Array.isArray(res.data)) {
        setProductos(res.data);
      }
    } catch (err) {
      console.error("❌ Error al obtener productos:", err);
    }
  };

  const eliminarProducto = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este producto?")) return;
    try {
      await axios.delete(`https://tienda-bm-backend-1.onrender.com/api/productos/${id}`);
      obtenerProductos();
    } catch (err) {
      console.error("❌ Error al eliminar:", err);
    }
  };

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    if (["colores", "tallas"].includes(name)) {
      setFormData({ ...formData, [name]: value.split(",").map((v) => v.trim()) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const manejarSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editandoId) {
        await axios.put(`https://tienda-bm-backend-1.onrender.com/api/productos/${editandoId}`, formData);
      } else {
        await axios.post(`https://tienda-bm-backend-1.onrender.com/api/productos`, formData);
      }
      setFormData(initialForm);
      setEditandoId(null);
      obtenerProductos();
    } catch (err) {
      console.error("❌ Error al guardar producto:", err);
    }
  };

  const cargarEdicion = (producto) => {
    setFormData({
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precio,
      categoria: producto.categoria,
      tipoProducto: producto.tipoProducto,
      imagenDestacada: producto.imagenDestacada || "",
      marca: producto.marca || "",
      colores: producto.colores || [],
      tallas: producto.tallas || [],
    });
    setEditandoId(producto._id);
    window.scrollTo({ top: 0, behavior: "smooth" }); // para subir al formulario
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Administrar david Productos</h1>

      {/* Formulario de creación/edición */}
      <form onSubmit={manejarSubmit} className="bg-white shadow p-6 rounded mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <input type="text" name="nombre" placeholder="Nombre" value={formData.nombre} onChange={manejarCambio} className="p-2 border rounded" required />
        <input type="number" name="precio" placeholder="Precio" value={formData.precio} onChange={manejarCambio} className="p-2 border rounded" required />
        <input type="text" name="categoria" placeholder="Categoría" value={formData.categoria} onChange={manejarCambio} className="p-2 border rounded" />
        <input type="text" name="tipoProducto" placeholder="Tipo" value={formData.tipoProducto} onChange={manejarCambio} className="p-2 border rounded" />
        <input type="text" name="imagenDestacada" placeholder="Imagen destacada (URL)" value={formData.imagenDestacada} onChange={manejarCambio} className="p-2 border rounded" />
        <input type="text" name="marca" placeholder="Marca" value={formData.marca} onChange={manejarCambio} className="p-2 border rounded" />
        <input type="text" name="colores" placeholder="Colores (rojo, azul)" value={formData.colores.join(", ")} onChange={manejarCambio} className="p-2 border rounded" />
        <input type="text" name="tallas" placeholder="Tallas (S, M, L)" value={formData.tallas.join(", ")} onChange={manejarCambio} className="p-2 border rounded" />
        <textarea name="descripcion" placeholder="Descripción" value={formData.descripcion} onChange={manejarCambio} rows="3" className="p-2 border rounded col-span-full" />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded col-span-full">
          {editandoId ? "Guardar Cambios" : "➕ Crear Producto"}
        </button>
      </form>

      {/* Tabla de productos */}
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
              <tr key={producto._id} className="border-b hover:bg-gray-50">
                <td className="p-2">{producto.nombre}</td>
                <td className="p-2">${producto.precio.toLocaleString("es-CO")}</td>
                <td className="p-2 space-x-2">
                  <button onClick={() => cargarEdicion(producto)} className="bg-yellow-500 text-white px-2 py-1 rounded">
                    Editar
                  </button>
                  <button onClick={() => eliminarProducto(producto._id)} className="bg-red-600 text-white px-2 py-1 rounded">
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center p-4">No hay productos para mostrar.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProductos;
