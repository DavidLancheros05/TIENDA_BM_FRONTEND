import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function AdminProductos() {
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const [editandoId, setEditandoId] = useState(null);
  const [formData, setFormData] = useState({});
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: "",
    descripcion: "",
    precioOriginal: "",
    descuento: "",
    precio: "",
    marca: "",
    tipoProducto: "",
    categoria: "",
    colores: "",
    tallas: "",
  });

  const fetchProductos = async () => {
    const res = await api.get("/productos?admin=true");
    setProductos(res.data);
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  // Calcular precio al cambiar descuento o precioOriginal (formulario nuevo producto)
// Para nuevo producto
useEffect(() => {
  const { precioOriginal, descuento } = nuevoProducto;
  const original = parseFloat(precioOriginal);
  const dto = parseFloat(descuento);

  if (!isNaN(original) && !isNaN(dto)) {
    const calculado = original - (original * dto / 100);
    setNuevoProducto((prev) => ({ ...prev, precio: calculado.toFixed(2) }));
  } else {
    setNuevoProducto((prev) => ({ ...prev, precio: "0.00" }));
  }
}, [nuevoProducto.precioOriginal, nuevoProducto.descuento]);

// Para producto en edición
useEffect(() => {
  const { precioOriginal, descuento } = formData;
  const original = parseFloat(precioOriginal);
  const dto = parseFloat(descuento);

  if (!isNaN(original) && !isNaN(dto)) {
    const calculado = original - (original * dto / 100);
    setFormData((prev) => ({ ...prev, precio: calculado.toFixed(2) }));
  } else {
    setFormData((prev) => ({ ...prev, precio: "0.00" }));
  }
}, [formData.precioOriginal, formData.descuento]);

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
      precioOriginal: parseFloat(formData.precioOriginal),
      descuento: { porcentaje: parseFloat(formData.descuento) },
      precio: parseFloat(formData.precio),
      marca: formData.marca,
      tipoProducto: formData.tipoProducto,
      categoria: formData.categoria,
      colores: formData.colores.split(",").map(c => c.trim()),
      tallas: formData.tallas.split(",").map(t => t.trim()),
    };
    await api.put(`/productos/${editandoId}`, actualizado);
    setEditandoId(null);
    fetchProductos();
  };

  const handleEliminar = async (id) => {
    if (!window.confirm("¿Eliminar este producto?")) return;
    await api.delete(`/productos/${id}`);
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
      precioOriginal: parseFloat(nuevoProducto.precioOriginal),
      descuento: { porcentaje: parseFloat(nuevoProducto.descuento) },
      precio: parseFloat(nuevoProducto.precio),
      marca: nuevoProducto.marca,
      tipoProducto: nuevoProducto.tipoProducto,
      categoria: nuevoProducto.categoria,
      colores: nuevoProducto.colores.split(",").map(c => c.trim()),
      tallas: nuevoProducto.tallas.split(",").map(t => t.trim()),
    };

    try {
      const res = await api.post("/productos", nuevo);
      const nuevoId = res.data._id;
      setNuevoProducto({
        nombre: "",
        descripcion: "",
        precioOriginal: "",
        descuento: "",
        precio: "",
        marca: "",
        tipoProducto: "",
        categoria: "",
        colores: "",
        tallas: "",
      });
      fetchProductos();
      navigate(`/admin/productos/${nuevoId}/variantes`);
    } catch (error) {
      console.error("Error al crear producto:", error);
      alert("No se pudo crear el producto");
    }
  };

  const calcularStockTotal = (producto) => {
    if (!producto.variantes || producto.variantes.length === 0) return 0;
    return producto.variantes.reduce((total, variante) => total + (variante.stock || 0), 0);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Administrar Productos</h2>

      <div className="table-responsive" style={{ overflowX: "auto", overflowY: "auto", maxHeight: "500px" }}>
        <table className="table table-bordered table-striped mb-0" style={{ minWidth: "800px" }}>
          <thead className="table-dark" style={{ position: "sticky", top: 0, zIndex: 2 }}>
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Precio Original</th>
              <th>Dto.</th>
              <th>Precio</th>
              <th>Marca</th>
              <th>Tipo</th>
              <th>Categoría</th>
              <th>Colores</th>
              <th>Tallas</th>
              <th>Stock</th>
              <th>Img</th>
              <th>Acc.</th>
            </tr>
          </thead>
          <tbody>
            {/* Fila para nuevo producto */}
            <tr className="bg-light">
              {Object.entries(nuevoProducto).map(([key, value]) => (
                <td key={key}>
                  {key === "precio" ? (
                    <input
                      name={key}
                      value={value}
                      readOnly
                      className="form-control form-control-sm bg-light"
                    />
                  ) : (
                    <input
                      name={key}
                      value={value}
                      onChange={handleNuevoChange}
                      className="form-control form-control-sm"
                    />
                  )}
                </td>
              ))}
              <td>—</td>
              <td>—</td>
              <td>
                <button onClick={handleAgregarNuevo} className="btn btn-success btn-sm">
                  ➕
                </button>
              </td>
            </tr>

            {/* Productos existentes */}
            {productos.map((producto) => (
              <tr key={producto._id}>
                {editandoId === producto._id ? (
                  <>
                    {Object.keys(nuevoProducto).map((key) => (
                      <td key={key}>
                        {key === "precio" ? (
                          <input
                            name={key}
                            value={formData[key]}
                            readOnly
                            className="form-control form-control-sm bg-light"
                          />
                        ) : (
                          <input
                            name={key}
                            value={formData[key]}
                            onChange={handleChange}
                            className="form-control form-control-sm"
                          />
                        )}
                      </td>
                    ))}
                    <td>
                      {calcularStockTotal(producto)}
                      <button
                        onClick={() => navigate(`/admin/productos/${producto._id}/variantes`)}
                        className="btn btn-link btn-sm p-0"
                      >
                        <i className="bi bi-pencil"></i>
                      </button>
                    </td>
                    <td>
                      <Link to={`/admin/productos/${producto._id}/imagenes`} className="btn btn-link btn-sm p-0">
                        <i className="bi bi-pencil"></i>
                      </Link>
                    </td>
                    <td>
                      <button onClick={handleGuardar} className="btn btn-success btn-sm me-1">💾</button>
                      <button onClick={handleCancelar} className="btn btn-warning btn-sm">✖</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td style={{ minWidth: "150px" }}>
                      <div style={{ maxHeight: "150px", overflowY: "hidden" }}>{producto.nombre}</div>
                    </td>
                    <td>
                      <div
                        style={{ maxHeight: "100px", overflowY: "hidden" }}
                        onMouseEnter={(e) => (e.currentTarget.style.overflowY = "auto")}
                        onMouseLeave={(e) => (e.currentTarget.style.overflowY = "hidden")}
                      >
                        {producto.descripcion}
                      </div>
                    </td>
                    <td>{producto.precioOriginal}</td>
                    <td>{producto.descuento?.porcentaje}%</td>
                    <td>{producto.precio}</td>
                    <td>{producto.marca}</td>
                    <td>{producto.tipoProducto}</td>
                    <td>{producto.categoria}</td>
                    <td>{producto.colores?.join(", ")}</td>
                    <td>{producto.tallas?.join(", ")}</td>
                    <td>
                      {calcularStockTotal(producto)}{" "}
                      <button
                        onClick={() => navigate(`/admin/productos/${producto._id}/variantes`)}
                        className="btn btn-link btn-sm p-0"
                        title="Editar stock"
                      >
                        <i className="bi bi-pencil"></i>
                      </button>
                    </td>
                    <td>
                      <Link
                        to={`/admin/productos/${producto._id}/imagenes`}
                        className="btn btn-link btn-sm p-0"
                        title="Editar imágenes"
                      >
                        <i className="bi bi-pencil"></i>
                      </Link>
                    </td>
                    <td>
                      <button onClick={() => handleEditar(producto)} className="btn btn-primary btn-sm me-1">✎</button>
                      <button onClick={() => handleEliminar(producto._id)} className="btn btn-danger btn-sm">🗑️</button>
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
