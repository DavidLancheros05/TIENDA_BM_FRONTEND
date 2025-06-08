import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { CarritoContext } from '../context/CarritoContext';

const Bicicletas = () => {
  const [productos, setProductos] = useState([]);
  const [filtro, setFiltro] = useState('');
  const { agregarAlCarrito } = useContext(CarritoContext);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/productos?tipoProducto=bicicleta`)
      .then(res => {
        console.log("🚴 Productos recibidos:", res.data);
        setProductos(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  // Filtrar productos por nombre según filtro de búsqueda (solo si filtro no vacío)
  const productosFiltrados = filtro
    ? productos.filter(producto =>
        producto.nombre?.toLowerCase().includes(filtro.toLowerCase())
      )
    : productos;

  return (
    <div className="container" style={{ padding: '2rem' }}>
      <h2 className="mb-4 text-center">🚴 Bicicletas Disponibles</h2>

      <input
        type="text"
        className="form-control mb-4"
        placeholder="Buscar bicicleta..."
        value={filtro}
        onChange={e => setFiltro(e.target.value)}
      />

      <div className="row">
        {productosFiltrados.length > 0 ? (
          productosFiltrados.map(producto => (
            <div className="col-md-3 mb-4" key={producto._id}>
              <div className="card h-100 shadow-sm">
                <img
                  src={`${process.env.REACT_APP_API_URL}/${producto.imagen}`}
                  alt={producto.nombre}
                  className="card-img-top"
                  style={{ height: '180px', objectFit: 'cover' }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{producto.nombre}</h5>
                  <p className="card-text text-muted">{producto.descripcion}</p>
                  <p className="fw-bold text-success">${producto.precio.toFixed(2)}</p>
                  <button
                    onClick={() => agregarAlCarrito(producto)}
                    className="btn btn-outline-primary mt-auto"
                  >
                    Agregar al carrito
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No se encontraron bicicletas que coincidan con el filtro.</p>
        )}
      </div>
    </div>
  );
};

export default Bicicletas;
