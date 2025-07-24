import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { CarritoContext } from '../../context/CarritoContext';
import { Link } from 'react-router-dom';
// Después (funciona con Create React App)
console.log('API URL:', process.env.REACT_APP_API_URL);
const Productos = () => {
  const [productos, setProductos] = useState([]);
  const { carrito, agregarAlCarrito } = useContext(CarritoContext);

  useEffect(() => {
  axios
    .get(`${process.env.REACT_APP_API_URL}/api/productos`)
    .then(res => setProductos(res.data))
    .catch(err => console.error(err));
}, []);

  const total = carrito.reduce((acc, item) => acc + item.producto.precio * item.cantidad, 0);

  return (
    <>


      {/* Contenido principal */}
      <main className="container" style={{ padding: '2rem 1rem', maxWidth: '1140px', margin: 'auto' }}>
        <h2 style={{ marginBottom: '1.5rem', textAlign: 'center', color: '#333' }}>
          Explora nuestras bicicletas y accesorios al mejor precio
        </h2>

        <div className="row">
          {productos.map(producto => (
            <div className="col-md-3 mb-4" key={producto._id}>
              <div className="card h-100 shadow-sm">
                <img
                  src={`${process.env.REACT_APP_API_URL}${producto.imagen}`}
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
          ))}
        </div>
      </main>

      {/* Pie de página */}
      

      {/* Carrito flotante (como antes) */}
      <Link to="/carrito" style={{ textDecoration: 'none' }}>
        <div
          style={{
            position: 'fixed',
            top: '25%',
            right: '20px',
            backgroundColor: '#0d6efd',
            color: 'white',
            padding: '15px 20px',
            borderRadius: '15px',
            boxShadow: '0 0 15px rgba(0,0,0,0.3)',
            zIndex: 999,
            fontWeight: 'bold',
            cursor: 'pointer',
            width: '260px',
            border: '2px solid white',
            userSelect: 'none',
          }}
          onClick={e => e.preventDefault()}
        >
          <div style={{ fontSize: '1.2rem', marginBottom: '10px', borderBottom: '1px solid white', paddingBottom: '5px' }}>
            🛒 Carrito de Compras
          </div>
          <div style={{ maxHeight: '180px', overflowY: 'auto', marginBottom: '10px' }}>
            {carrito.length === 0 ? (
              <p style={{ fontWeight: 'normal', fontSize: '0.9rem' }}>No hay productos</p>
            ) : (
              carrito.map(item => (
                <div
                  key={item._id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '0.9rem',
                    marginBottom: '4px',
                  }}
                >
                  <span>{item.nombre} - {item.cantidad} x ${item.precio.toFixed(2)}</span>
                  <span>${(item.precio * item.cantidad).toFixed(2)}</span>
                </div>
              ))
            )}
          </div>
          <div style={{ borderTop: '1px solid white', paddingTop: '8px', fontSize: '1rem' }}>
            Total: ${total.toFixed(2)}
          </div>
        </div>
      </Link>
    </>
  );
};

export default Productos;
