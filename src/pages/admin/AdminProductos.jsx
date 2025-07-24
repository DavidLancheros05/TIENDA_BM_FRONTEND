import { useEffect, useState } from "react";
import axios from "axios";

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
    imagenes: "",
    imagenPrincipal: "",
    colores: "",
    tallas: "",
  });

  const API_URL = process.env.REACT_APP_API_URL;

useEffect(() => {
  fetchProductos();
}, []);

const fetchProductos = async () => {
  try {
    // ⚡️ Aquí: admin=true para recibir `imagenes` completo
    const res = await axios.get(`${API_URL}/api/productos?admin=true`);
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
      descuento: producto.descuento?.porcentaje || "",
      marca: producto.marca || "",
      tipoProducto: producto.tipoProducto || "",
      categoria: producto.categoria || "",
      imagenPrincipal:
        producto.imagenes?.find((img) => img.esPrincipal)?.url || "",
      imagenes: producto.imagenes
        ?.filter((img) => !img.esPrincipal)
        .map((img) => img.url)
        .join(", ") || "",
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
      const imagenes = [];
      if (formData.imagenPrincipal?.trim()) {
        imagenes.push({ url: formData.imagenPrincipal.trim(), esPrincipal: true });
      }

      const adicionales = formData.imagenes
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      adicionales.forEach((url) => imagenes.push({ url }));

      const actualizado = {
        nombre: formData.nombre,
        descripcion: formData.descripcion,
        precio: parseFloat(formData.precio),
        precioOriginal: parseFloat(formData.precioOriginal),
        descuento: { porcentaje: parseFloat(formData.descuento) },
        marca: formData.marca,
        tipoProducto: formData.tipoProducto,
        categoria: formData.categoria,
        imagenes: imagenes,
        colores: formData.colores.split(",").map((s) => s.trim()),
        tallas: formData.tallas.split(",").map((s) => s.trim()),
      };

      await axios.put(`${API_URL}/api/productos/${id}`, actualizado);
      setEditandoId(null);
      fetchProductos();
    } catch (error) {
      console.error("Error al actualizar producto:", error);
    }
  };

  const handleNuevoChange = (e) => {
    const { name, value } = e.target;
    setNuevoProducto((prev) => ({ ...prev, [name]: value }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAgregarNuevo = async () => {
    try {
      const imagenes = [];
      if (nuevoProducto.imagenPrincipal?.trim()) {
        imagenes.push({ url: nuevoProducto.imagenPrincipal.trim(), esPrincipal: true });
      }

      const adicionales = nuevoProducto.imagenes
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      adicionales.forEach((url) => imagenes.push({ url }));

      const nuevo = {
        nombre: nuevoProducto.nombre,
        descripcion: nuevoProducto.descripcion,
        precio: parseFloat(nuevoProducto.precio),
        precioOriginal: parseFloat(nuevoProducto.precioOriginal),
        descuento: { porcentaje: parseFloat(nuevoProducto.descuento) },
        marca: nuevoProducto.marca,
        tipoProducto: nuevoProducto.tipoProducto,
        categoria: nuevoProducto.categoria,
        imagenes: imagenes,
        colores: nuevoProducto.colores.split(",").map((s) => s.trim()),
        tallas: nuevoProducto.tallas.split(",").map((s) => s.trim()),
      };

      await axios.post(`${API_URL}/api/productos`, nuevo);
      setNuevoProducto({
        nombre: "",
        descripcion: "",
        precio: "",
        precioOriginal: "",
        descuento: "",
        marca: "",
        tipoProducto: "",
        categoria: "",
        imagenPrincipal: "",
        imagenes: "",
        colores: "",
        tallas: "",
      });
      fetchProductos();
    } catch (error) {
      console.error("Error al agregar producto:", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Administrar Productos</h2>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border text-xs">
          <thead className="bg-gray-200">
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Precio Original</th>
              <th>Descuento %</th>
              <th>Marca</th>
              <th>Tipo</th>
              <th>Categoría</th>
              <th>Imagen Principal</th>
              <th>Imágenes Extra</th>
              <th>Colores</th>
              <th>Tallas</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-t bg-green-50">
              <td><input name="nombre" value={nuevoProducto.nombre} onChange={handleNuevoChange} /></td>
              <td><input name="descripcion" value={nuevoProducto.descripcion} onChange={handleNuevoChange} /></td>
              <td><input name="precio" value={nuevoProducto.precio} onChange={handleNuevoChange} /></td>
              <td><input name="precioOriginal" value={nuevoProducto.precioOriginal} onChange={handleNuevoChange} /></td>
              <td><input name="descuento" value={nuevoProducto.descuento} onChange={handleNuevoChange} /></td>
              <td><input name="marca" value={nuevoProducto.marca} onChange={handleNuevoChange} /></td>
              <td><input name="tipoProducto" value={nuevoProducto.tipoProducto} onChange={handleNuevoChange} /></td>
              <td><input name="categoria" value={nuevoProducto.categoria} onChange={handleNuevoChange} /></td>
              <td><input name="imagenPrincipal" value={nuevoProducto.imagenPrincipal} onChange={handleNuevoChange} /></td>
              <td><input name="imagenes" value={nuevoProducto.imagenes} onChange={handleNuevoChange} /></td>
              <td><input name="colores" value={nuevoProducto.colores} onChange={handleNuevoChange} /></td>
              <td><input name="tallas" value={nuevoProducto.tallas} onChange={handleNuevoChange} /></td>
              <td>
                <button onClick={handleAgregarNuevo} className="text-green-600 font-bold">
                  ➕
                </button>
              </td>
            </tr>

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
                    <td><input name="imagenPrincipal" value={formData.imagenPrincipal} onChange={handleChange} /></td>
                    <td><input name="imagenes" value={formData.imagenes} onChange={handleChange} /></td>
                    <td><input name="colores" value={formData.colores} onChange={handleChange} /></td>
                    <td><input name="tallas" value={formData.tallas} onChange={handleChange} /></td>
                    <td>
                      <button onClick={() => handleGuardar(producto._id)} className="text-green-600 font-bold">💾</button>
                      <button onClick={handleCancelar} className="text-red-600 font-bold ml-2">✖</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{producto.nombre}</td>
                    <td>{producto.descripcion}</td>
                    <td>{producto.precio}</td>
                    <td>{producto.precioOriginal}</td>
                    <td>{producto.descuento?.porcentaje}</td>
                    <td>{producto.marca}</td>
                    <td>{producto.tipoProducto}</td>
                    <td>{producto.categoria}</td>
                    <td>
                      {producto.imagenes?.find((img) => img.esPrincipal) && (
                        <img
                          src={producto.imagenes.find((img) => img.esPrincipal).url}
                          alt="Principal"
                          className="h-12"
                        />
                      )}
                    </td>
                    <td>
                      {producto.imagenes?.filter((img) => !img.esPrincipal).map((img, i) => (
                        <span key={i}>{img.url}{i < producto.imagenes.length - 1 ? ", " : ""}</span>
                      ))}
                    </td>
                    <td>{producto.colores?.join(", ")}</td>
                    <td>{producto.tallas?.join(", ")}</td>
                    <td>
                      <button onClick={() => handleEditar(producto)} className="text-blue-600 font-bold">✎</button>
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
