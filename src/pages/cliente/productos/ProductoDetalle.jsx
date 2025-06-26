// ProductoDetalle.jsx

import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CarritoContext } from '../context/CarritoContext';

const ProductoDetalle = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const { agregarAlCarrito } = useContext(CarritoContext);
  const navigate = useNavigate();
  const [resenas, setResenas] = useState([]);
  const [estrellas, setEstrellas] = useState(5);
  const [comentario, setComentario] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/productos/${id}`)
      .then(res => {
        setProducto(res.data);
        return axios.get(`${process.env.REACT_APP_API_URL}/api/resenas/${res.data._id}`);
      })
      .then(resResenas => {
        setResenas(resResenas.data);
      })
      .catch(err => {
        console.error('Error:', err);
        setProducto(null);
      });
  }, [id]);

  const handleAgregar = () => {
    agregarAlCarrito({ ...producto, cantidad });
  };

  const handleComprarAhora = () => {
    agregarAlCarrito({ ...producto, cantidad });
    navigate('/carrito');
  };

  const renderEstrellas = (promedio) => {
    const llenas = Math.floor(promedio);
    const vacias = 5 - llenas;
    return (
      <>
        <span className="text-warning">{'★'.repeat(llenas)}</span>
        <span className="text-secondary">{'☆'.repeat(vacias)}</span>
      </>
    );
  };

  const enviarResena = async () => {
    if (!token) {
      alert('Debes iniciar sesión para dejar una reseña');
      navigate('/login');
      return;
    }

    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/productos/${producto._id}/resena`,
        { estrellas, comentario },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert('✅ Reseña enviada');
      setComentario('');
      setEstrellas(5);

      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/productos/${producto._id}`);
      const resResenas = await axios.get(`${process.env.REACT_APP_API_URL}/api/resenas/${producto._id}`);

      setProducto(res.data);
      setResenas(resResenas.data);
    } catch (err) {
      console.error('Error al enviar reseña:', err);
      alert('⚠️ Error al enviar reseña');
    }
  };

  if (!producto) {
    return (
      <div className="container py-5 text-center">
        <h4 className="text-danger">❌ Producto no encontrado</h4>
      </div>
    );
  }

  return (
    <div className="container py-5">

      {/* =================== 1. INFORMACIÓN DEL PRODUCTO =================== */}
      <div className="row mb-5">
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <img
            src={`${process.env.REACT_APP_API_URL}/${producto.imagen}`}
            alt={producto.nombre}
            className="img-fluid rounded shadow"
            style={{ maxHeight: '350px', objectFit: 'contain' }}
          />
        </div>

        <div className="col-md-6">
          <h3>{producto.nombre}</h3>
          <p><strong>Marca:</strong> {producto.marca || 'Sin especificar'}</p>
          {producto.color && <p><strong>Color:</strong> {producto.color}</p>}
          {producto.talla && <p><strong>Talla:</strong> {producto.talla}</p>}

          {producto.descripcion && (
            <div className="mt-3">
              <h5>Descripción:</h5>
              <p>{producto.descripcion}</p>
            </div>
          )}

          <div className="mt-4">
            <h5>Puntaje promedio:</h5>
            {renderEstrellas(producto.promedioEstrellas || 0)}
          </div>
        </div>
      </div>

      {/* =================== 2. ACCIONES DE COMPRA =================== */}
      <div className="border rounded p-4 bg-light mb-5">
        <h4 className="mb-4">🛒 Comprar este producto</h4>

        <div className="row">
          <div className="col-md-6">
            <h4 className="text-success">${producto.precio.toLocaleString()}</h4>
            <p>
              <strong>Stock:</strong>{' '}
              {producto.stock > 0 ? (
                <span className="text-success">Disponible ({producto.stock})</span>
              ) : (
                <span className="text-danger">Agotado</span>
              )}
            </p>

            <div className="mb-3">
              <label><strong>Cantidad:</strong></label>
              <input
                type="number"
                className="form-control"
                value={cantidad}
                min={1}
                max={producto.stock}
                onChange={(e) => setCantidad(Number(e.target.value))}
                style={{ width: '100px' }}
              />
            </div>

            <div className="d-flex gap-3">
              <button className="btn btn-primary" disabled={producto.stock === 0} onClick={handleAgregar}>
                🛒 Añadir al carrito
              </button>
              <button className="btn btn-success" disabled={producto.stock === 0} onClick={handleComprarAhora}>
                💳 Comprar ahora
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* =================== 3. RESEÑAS =================== */}
      <hr className="my-5" />
      <h4 className="mb-4">📝 Opiniones y reseñas</h4>

      {resenas.length > 0 ? (
        resenas.map((resena, index) => (
          <div key={index} className="border rounded p-3 mb-3 bg-light">
            <strong>{resena.nombreUsuario || 'Anónimo'}</strong>
            <div>{renderEstrellas(resena.estrellas)}</div>
            <p>{resena.comentario}</p>
            <small className="text-muted">{new Date(resena.fecha).toLocaleDateString()}</small>
          </div>
        ))
      ) : (
        <p className="text-muted">Este producto aún no tiene reseñas.</p>
      )}

      <div className="mt-5">
        <h5>¿Qué opinas de este producto?</h5>
        <div className="mb-2">
          <label>Estrellas:</label>
          <select
            className="form-select"
            value={estrellas}
            onChange={(e) => setEstrellas(Number(e.target.value))}
          >
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>{n} estrella{n > 1 ? 's' : ''}</option>
            ))}
          </select>
        </div>

        <div className="mb-2">
          <label>Comentario:</label>
          <textarea
            className="form-control"
            rows="3"
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
          />
        </div>

        {token ? (
          <button className="btn btn-outline-primary" onClick={enviarResena}>
            Enviar reseña
          </button>
        ) : (
          <p className="text-danger">Debes iniciar sesión para dejar una reseña.</p>
        )}
      </div>
    </div>
  );
};

export default ProductoDetalle;
