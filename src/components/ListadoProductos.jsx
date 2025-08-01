import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from "../services/api"; // o "../../services/api" según la ruta

const ListadoProductos = ({ tipo }) => {
  const [productos, setProductos] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductos = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/productos?tipoProducto=${tipo}`);
        setProductos(res.data);
      } catch (err) {
        console.error(`❌ Error al obtener ${tipo}s:`, err);
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

  const titulo =
    tipo === 'bicicleta' ? '🚴 Bicicletas Disponibles' : '🧢 Accesorios Disponibles';
  const placeholder = tipo === 'bicicleta' ? 'Buscar bicicleta...' : 'Buscar accesorio...';

  return (
    <div className="container" style={{ padding: '2rem' }}>
      <h2 className="mb-4 text-center">{titulo}</h2>

      <input
        type="text"
        className="form-control mb-4"
        placeholder={placeholder}
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
                  {producto.imagenes && producto.imagenes.length > 0 && (
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
                    <p className="fw-bold text-success">
                      ${producto.precio.toFixed(2)}
                    </p>
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
