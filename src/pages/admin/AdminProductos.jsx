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
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Administrar Productos</h2>

      <div className="overflow-x-auto">
        <table className="table-auto table-fixed w-full border text-xs">
          <thead className="bg-gray-200">
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Precio Original</th>
              <th>Descuento</th>
              <th>Marca</th>
              <th>Tipo</th>
              <th>Categoría</th>
              <th>Colores</th>
              <th>Tallas</th>
              <th>Imágenes</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {/* Fila agregar nuevo */}
            <tr className="bg-green-50 border-t">
              <td><input name="nombre" value={nuevoProducto.nombre} onChange={handleNuevoChange} /></td>
              <td><input name="descripcion" value={nuevoProducto.descripcion} onChange={handleNuevoChange} /></td>
              <td><input name="precio" value={nuevoProducto.precio} onChange={handleNuevoChange} /></td>
              <td><input name="precioOriginal" value={nuevoProducto.precioOriginal} onChange={handleNuevoChange} /></td>
              <td><input name="descuento" value={nuevoProducto.descuento} onChange={handleNuevoChange} /></td>
              <td><input name="marca" value={nuevoProducto.marca} onChange={handleNuevoChange} /></td>
              <td><input name="tipoProducto" value={nuevoProducto.tipoProducto} onChange={handleNuevoChange} /></td>
              <td><input name="categoria" value={nuevoProducto.categoria} onChange={handleNuevoChange} /></td>
              <td><input name="colores" value={nuevoProducto.colores} onChange={handleNuevoChange} /></td>
              <td><input name="tallas" value={nuevoProducto.tallas} onChange={handleNuevoChange} /></td>
              <td className="text-center">—</td>
              <td>
                <button onClick={handleAgregarNuevo} className="text-green-600 font-bold">➕</button>
              </td>
            </tr>

            {/* Productos existentes */}
            {productos.map((producto) => (
              <tr key={producto._id} className="border-t">
                {editandoId === producto._id ? (
                  <>
                    <td><input name="nombre" value={formData.nombre} onChange={handleChange} /></td>
                    <td><input name="descripcion" value={formData.descripcion} onChange={handleChange} /></td>
                    <td><input name="precio" value={formData.precio} onChange={handleChange} /></td>
                    <td><input name="precioOriginal" value={formData.precioOriginal} onChange={handleChange} /></td>
                    <td><input name="descuento" value={formData.descuento} onChange={handleChange} /></td>
                    <td><input name="marca" value={formData.marca} onChange={handleChange} /></td>
                    <td><input name="tipoProducto" value={formData.tipoProducto} onChange={handleChange} /></td>
                    <td><input name="categoria" value={formData.categoria} onChange={handleChange} /></td>
                    <td><input name="colores" value={formData.colores} onChange={handleChange} /></td>
                    <td><input name="tallas" value={formData.tallas} onChange={handleChange} /></td>
                    <td>
                      <Link to={`/admin/productos/${producto._id}/imagenes`} className="text-blue-600 underline">Editar imágenes</Link>
                    </td>
                    <td>
                      <button onClick={handleGuardar} className="text-green-600 font-bold">💾</button>
                      <button onClick={handleCancelar} className="text-yellow-600 font-bold ml-1">✖</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{producto.nombre}</td>
                    <td>{producto.descripcion}</td>
                    <td>{producto.precio}</td>
                    <td>{producto.precioOriginal}</td>
                    <td>{producto.descuento?.porcentaje}%</td>
                    <td>{producto.marca}</td>
                    <td>{producto.tipoProducto}</td>
                    <td>{producto.categoria}</td>
                    <td>{producto.colores?.join(", ")}</td>
                    <td>{producto.tallas?.join(", ")}</td>
                    <td>
                      <Link to={`/admin/productos/${producto._id}/imagenes`} className="text-blue-600 underline">Editar imágenes</Link>
                    </td>
                    <td>
                      <button onClick={() => handleEditar(producto)} className="text-blue-600 font-bold">✎</button>
                      <button onClick={() => handleEliminar(producto._id)} className="text-red-600 font-bold ml-1">🗑️</button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
