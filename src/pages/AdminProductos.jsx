import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminProductos() {
  const [productos, setProductos] = useState([]);
  const [editandoId, setEditandoId] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/productos");
      setProductos(res.data);
    } catch (error) {
      console.error("Error al obtener productos:", error);
    }
  };

  const handleEditar = (producto) => {
    setEditandoId(producto._id);
    setFormData({
      nombre: producto.nombre || "",
      descripcion: producto.descripcion || "",
      precio: producto.precio || "",
      precioOriginal: producto.precioOriginal || "",
      descuento: producto.descuento || "",
      marca: producto.marca || "",
      tipoProducto: producto.tipoProducto || "",
      categoria: producto.categoria || "",
      imagen: producto.imagen || "",
      colores: producto.colores?.join(", ") || "",
      tallas: producto.tallas?.join(", ") || "",
    });
  };

  const handleCancelar = () => {
    setEditandoId(null);
    setFormData({});
  };

  const handleGuardar = async (id) => {
    try {
      const actualizado = {
        ...formData,
        colores: formData.colores.split(",").map((c) => c.trim()),
        tallas: formData.tallas.split(",").map((t) => t.trim()),
      };
      await axios.put(`http://localhost:5000/api/productos/${id}`, actualizado);
      setEditandoId(null);
      fetchProductos();
    } catch (error) {
      console.error("Error al actualizar producto:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Administrar Productos</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border">
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
              <th>Imagen</th>
              <th>Colores</th>
              <th>Tallas</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto) => (
              <tr key={producto._id} className="border-t text-sm">
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
                    <td><input name="imagen" value={formData.imagen} onChange={handleChange} /></td>
                    <td><input name="colores" value={formData.colores} onChange={handleChange} /></td>
                    <td><input name="tallas" value={formData.tallas} onChange={handleChange} /></td>
                    <td>
                      <button onClick={() => handleGuardar(producto._id)} className="text-green-600">💾</button>
                      <button onClick={handleCancelar} className="text-red-600 ml-2">✖</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{producto.nombre}</td>
                    <td>{producto.descripcion}</td>
                    <td>{producto.precio}</td>
                    <td>{producto.precioOriginal}</td>
                    <td>{producto.descuento}</td>
                    <td>{producto.marca}</td>
                    <td>{producto.tipoProducto}</td>
                    <td>{producto.categoria}</td>
                    <td>
                      {producto.imagen && <img src={producto.imagen} alt="img" className="h-12" />}
                    </td>
                    <td>{producto.colores?.join(", ")}</td>
                    <td>{producto.tallas?.join(", ")}</td>
                    <td>
                      <button onClick={() => handleEditar(producto)} className="text-blue-600">✎</button>
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
