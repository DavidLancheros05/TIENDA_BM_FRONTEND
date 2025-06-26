import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminProductos = () => {
  const [productos, setProductos] = useState([]);
  const [formulario, setFormulario] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    precioOriginal: "",
    categoria: "",
    tipoProducto: "",
    imagenDestacada: "",
    imagenes: "",
    marca: "",
    colores: "",
    tallas: "",
    variantes: "",
  });
  const [modoEdicion, setModoEdicion] = useState(false);
  const [idEditando, setIdEditando] = useState(null);

  useEffect(() => {
    obtenerProductos();
  }, []);

  const obtenerProductos = async () => {
    try {
      const res = await axios.get("https://tienda-bm-backend-1.onrender.com/api/productos");
      if (Array.isArray(res.data)) {
        setProductos(res.data);
      } else {
        console.warn("⚠️ La API no devolvió un array.");
        setProductos([]);
      }
    } catch (error) {
      console.error("❌ Error al obtener productos:", error);
    }
  };

  const eliminarProducto = async (id) => {
    try {
      await axios.delete(`https://tienda-bm-backend-1.onrender.com/api/productos/${id}`);
      obtenerProductos();
    } catch (error) {
      console.error("❌ Error al eliminar producto:", error);
    }
  };

  const cargarProducto = (producto) => {
    setFormulario({
      nombre: producto.nombre || "",
      descripcion: producto.descripcion || "",
      precio: producto.precio || "",
      precioOriginal: producto.precioOriginal || "",
      categoria: producto.categoria || "",
      tipoProducto: producto.tipoProducto || "",
      imagenDestacada: producto.imagenDestacada || "",
      imagenes: (producto.imagenes || []).join(", "),
      marca: producto.marca || "",
      colores: (producto.colores || []).join(", "),
      tallas: (producto.tallas || []).join(", "),
      variantes: JSON.stringify(producto.variantes || []),
    });
    setModoEdicion(true);
    setIdEditando(producto._id);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });
  };

  const manejarSubmit = async (e) => {
    e.preventDefault();

    const datos = {
      ...formulario,
      precio: Number(formulario.precio),
      precioOriginal: Number(formulario.precioOriginal),
      imagenes: formulario.imagenes.split(",").map((img) => img.trim()),
      colores: formulario.colores.split(",").map((c) => c.trim()),
      tallas: formulario.tallas.split(",").map((t) => t.trim()),
      variantes: JSON.parse(formulario.variantes || "[]"),
    };

    try {
      if (modoEdicion) {
        await axios.put(`https://tienda-bm-backend-1.onrender.com/api/productos/${idEditando}`, datos);
        setModoEdicion(false);
        setIdEditando(null);
      } else {
        await axios.post("https://tienda-bm-backend-1.onrender.com/api/productos", datos);
      }

      setFormulario({
        nombre: "",
        descripcion: "",
        precio: "",
        precioOriginal: "",
        categoria: "",
        tipoProducto: "",
        imagenDestacada: "",
        imagenes: "",
        marca: "",
        colores: "",
        tallas: "",
        variantes: "",
      });
      obtenerProductos();
    } catch (err) {
      console.error("❌ Error guardando producto:", err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Administrar Productos</h1>

      <form onSubmit={manejarSubmit} className="mb-6 space-y-2 bg-gray-100 p-4 rounded">
        {Object.keys(formulario).map((campo) => (
          <input
            key={campo}
            type="text"
            name={campo}
            value={formulario[campo]}
            onChange={handleInputChange}
            placeholder={campo}
            className="w-full p-2 border rounded"
          />
        ))}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {modoEdicion ? "Guardar Cambios" : "Agregar Producto"}
        </button>
      </form>

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
                  <button
                    onClick={() => cargarProducto(producto)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                  >
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
              <td className="p-4 text-center" colSpan="3">
                No hay productos para mostrar.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProductos;
