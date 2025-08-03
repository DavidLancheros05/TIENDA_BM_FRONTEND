import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from "../services/api";

const tipoMap = {
  B: 'Bicicleta',
  A: 'Accesorio',
  BE: 'Bicicleta Eléctrica',
  default: 'Producto'
};

const ListadoProductos = ({ tipo }) => {
  const [productos, setProductos] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const nombreTipo = tipoMap[tipo] || tipoMap.default;

  useEffect(() => {
    const fetchProductos = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/productos?tipoProducto=${tipo}`);
        setProductos(res.data);
      } catch (err) {
        console.error(`❌ Error al obtener productos (${tipo}):`, err);
        setError('No se pudieron cargar los productos.');
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, [tipo]);

  const productosFiltrados = filtro
    ? productos.filter(producto =>
        producto.nombre?.toLowerCase().includes(filtro.toLowerCase())
      )
    : productos;

  return (
    <div className="container" style={{ padding: '2rem' }}>
      <h2 className="mb-4 text-center">🛒 {nombreTipo}s Disponibles</h2>

      <input
        type="text"
        className="form-control mb-4"
        placeholder={`Buscar ${nombreTipo.toLowerCase()}...`}
        value={filtro}
        onChange={e => setFiltro(e.target.value)}
      />

      {loading ? (
        <p className="text-center">⏳ Cargando productos...</p>
      ) : error ? (
        <p className="text-center text-danger">{error}</p>
      ) : productosFiltrados.length === 0 ? (
        <p className="text-center">No se encontraron productos que coincidan con el filtro.</p>
      ) : (
        <div className="row">
          {productosFiltrados.map(producto => (
            <div className="col-md-3 mb-4" key={producto._id}>
              <div className="card h-100 shadow-sm d-flex flex-column">
                <Link
                  to={`/producto/${producto._id}`}
                  className="text-decoration-none text-dark"
                >
                  {producto.imagenes?.length > 0 && (
                    <img
                      src={
                        producto.imagenes[0].url.startsWith('http')
                          ? producto.imagenes[0].url
                          : `${import.meta.env.VITE_API_URL}${producto.imagenes[0].url}`
                      }
                      alt={producto.nombre}
                      className="card-img-top"
                      style={{ height: '180px', objectFit: 'cover' }}
                    />
                  )}
<div className="card-body">
  <h5 className="card-title">{producto.nombre}</h5>

  {producto.precioOriginal && producto.precioOriginal > producto.precio ? (
    <div>
      <p className="mb-1">
        <span className="text-danger me-2" style={{ textDecoration: 'line-through' }}>
          ${Math.round(producto.precioOriginal).toLocaleString()}
        </span>
        <span className="text-success fw-bold">
          ${Math.round(producto.precio).toLocaleString()}
        </span>
      </p>
      <span className="badge bg-primary">
        -{Math.round(((producto.precioOriginal - producto.precio) / producto.precioOriginal) * 100)}% OFF
      </span>
    </div>
  ) : (
    <p className="fw-bold text-success">
      ${Math.round(producto.precio).toLocaleString()}
    </p>
  )}
</div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListadoProductos;
