import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api"; // ajusta el path según tu estructura

export default function AdminProductos() {
  const [productos, setProductos] = useState([]);
  const [editandoId, setEditandoId] = useState(null);
  const [formData, setFormData] = useState({});
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    precioOriginal: "",
    descuento: "",
    marca: "",
    tipoProducto: "",
    categoria: "",
    colores: "",
    tallas: "",
  });

  const API_URL = import.meta.env.VITE_API_URL;
//console.log("daviddddd",VITE_API_URL)

  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = async () => {
    const res = await api.get("/productos?admin=true"); // ✅
    setProductos(res.data);
  };

  const handleEditar = (producto) => {
    setEditandoId(producto._id);
    setFormData({
      ...producto,
      colores: producto.colores?.join(", "),
      tallas: producto.tallas?.join(", "),
      descuento: producto.descuento?.porcentaje || "",
    });
  };

  const handleCancelar = () => {
    setEditandoId(null);
    setFormData({});
  };

  const handleGuardar = async () => {
    const actualizado = {
      nombre: formData.nombre,
      descripcion: formData.descripcion,
      precio: parseFloat(formData.precio),
      precioOriginal: parseFloat(formData.precioOriginal),
      descuento: { porcentaje: parseFloat(formData.descuento) },
      marca: formData.marca,
      tipoProducto: formData.tipoProducto,
      categoria: formData.categoria,
      colores: formData.colores.split(",").map(c => c.trim()),
      tallas: formData.tallas.split(",").map(t => t.trim()),
    };
    await api.put(`/productos/${editandoId}`, actualizado); // ✅
    setEditandoId(null);
    fetchProductos();
  };

  const handleEliminar = async (id) => {
    if (!window.confirm("¿Eliminar este producto?")) return;
    await api.delete(`/productos/${id}`); // ✅
    fetchProductos();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNuevoChange = (e) => {
    const { name, value } = e.target;
    setNuevoProducto((prev) => ({ ...prev, [name]: value }));
  };

const handleAgregarNuevo = async () => {
  const nuevo = {
    nombre: nuevoProducto.nombre,
    descripcion: nuevoProducto.descripcion,
    precio: parseFloat(nuevoProducto.precio),
    precioOriginal: parseFloat(nuevoProducto.precioOriginal),
    descuento: { porcentaje: parseFloat(nuevoProducto.descuento) },
    marca: nuevoProducto.marca,
    tipoProducto: nuevoProducto.tipoProducto,
    categoria: nuevoProducto.categoria,
    colores: nuevoProducto.colores.split(",").map(c => c.trim()),
    tallas: nuevoProducto.tallas.split(",").map(t => t.trim()),
  };
  await api.post("/productos", nuevo); // ✅
  setNuevoProducto({
    nombre: "",
    descripcion: "",
    precio: "",
    precioOriginal: "",
    descuento: "",
    marca: "",
    tipoProducto: "",
    categoria: "",
    colores: "",
    tallas: "",
  });
  fetchProductos();
};

 return (
  <div className="p-6 max-w-7xl mx-auto">
    <h2 className="text-2xl font-bold mb-6 text-gray-800">📦 Administrar Productos</h2>

    {/* Sección para agregar nuevo producto */}
    <div className="bg-white p-4 rounded-2xl shadow-md mb-6 border">
      <h3 className="font-semibold text-lg mb-4 text-gray-700">➕ Agregar nuevo producto</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.entries(nuevoProducto).map(([key, value]) => (
          <div key={key}>
            <label className="block text-sm font-medium text-gray-600 capitalize">{key}</label>
            <input
              name={key}
              value={value}
              onChange={handleNuevoChange}
              className="w-full mt-1 p-2 border rounded-xl focus:ring focus:ring-blue-200"
              placeholder={`Ingrese ${key}`}
            />
          </div>
        ))}
      </div>
      <button
        onClick={handleAgregarNuevo}
        className="mt-4 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
      >
        Guardar producto
      </button>
    </div>

    {/* Lista de productos */}
    <div className="grid gap-4">
      {productos.map((producto) => (
        <div
          key={producto._id}
          className="bg-white p-4 rounded-2xl shadow-sm border hover:shadow-md transition"
        >
          {editandoId === producto._id ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(formData).map(([key, value]) => {
                if (key === "_id" || key === "__v" || key === "imagenes") return null;
                return (
                  <div key={key}>
                    <label className="block text-sm font-medium text-gray-600 capitalize">{key}</label>
                    <input
                      name={key}
                      value={value}
                      onChange={handleChange}
                      className="w-full mt-1 p-2 border rounded-xl"
                    />
                  </div>
                );
              })}
              <div className="flex items-end space-x-2 col-span-full">
                <button
                  onClick={handleGuardar}
                  className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
                >
                  💾 Guardar
                </button>
                <button
                  onClick={handleCancelar}
                  className="px-4 py-2 bg-yellow-500 text-white rounded-xl hover:bg-yellow-600"
                >
                  ✖ Cancelar
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <div>
                <strong>Nombre:</strong> {producto.nombre}
              </div>
              <div>
                <strong>Precio:</strong> ${producto.precio}
              </div>
              <div>
                <strong>Descuento:</strong> {producto.descuento?.porcentaje}%
              </div>
              <div>
                <strong>Colores:</strong> {producto.colores?.join(", ")}
              </div>
              <div>
                <strong>Tallas:</strong> {producto.tallas?.join(", ")}
              </div>
              <div>
                <strong>Imágenes:</strong>{" "}
                <Link
                  to={`/admin/productos/${producto._id}/imagenes`}
                  className="text-blue-600 underline"
                >
                  Editar imágenes
                </Link>
              </div>
              <div className="flex space-x-2 col-span-full mt-2">
                <button
                  onClick={() => handleEditar(producto)}
                  className="px-3 py-1 bg-blue-500 text-white rounded-xl hover:bg-blue-600"
                >
                  ✎ Editar
                </button>
                <button
                  onClick={() => handleEliminar(producto._id)}
                  className="px-3 py-1 bg-red-500 text-white rounded-xl hover:bg-red-600"
                >
                  🗑️ Eliminar
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
);
