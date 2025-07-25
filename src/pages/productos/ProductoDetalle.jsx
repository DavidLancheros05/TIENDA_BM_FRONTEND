import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CarritoContext } from '../../context/CarritoContext';
import { GaleriaImagenes } from '../../components/producto/GaleriaImagenes';
import { ResenasProducto } from '../../components/producto/ResenasProducto';
import { ResenaForm } from '../../components/producto/ResenaForm';

const ProductoDetalle = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [colorSeleccionado, setColorSeleccionado] = useState('');
  const [tallaSeleccionada, setTallaSeleccionada] = useState('');
  const { agregarAlCarrito } = useContext(CarritoContext);
  const navigate = useNavigate();
  const [resenas, setResenas] = useState([]);
  const [estrellas, setEstrellas] = useState(5);
  const [comentario, setComentario] = useState('');
  const token = localStorage.getItem('token');
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    axios.get(`${apiUrl}/api/productos/${id}`)
      .then(res => {
        setProducto(res.data);
        if (res.data.colores?.length > 0) setColorSeleccionado(res.data.colores[0]);
        if (res.data.tallas?.length > 0) setTallaSeleccionada(res.data.tallas[0]);

        return axios.get(`${apiUrl}/api/resenas/${res.data._id}`);
      })
      .then(resResenas => setResenas(resResenas.data))
      .catch(err => {
        console.error('❌ Error cargando producto:', err);
        setProducto(null);
      });
  }, [id]);

  const handleAgregar = () => {
    console.log('🟢 Añadiendo al carrito:', {
      producto: producto,
      cantidad: cantidad,
      color: colorSeleccionado,
      talla: tallaSeleccionada,
    });

    agregarAlCarrito({
      producto: producto,
      cantidad: cantidad,
      color: colorSeleccionado,
      talla: tallaSeleccionada,
    });
  };

  const handleComprarAhora = () => {
    handleAgregar();
    navigate('/carrito');
  };

  const renderEstrellas = (prom) => {
    const llenas = Math.floor(prom);
    return (
      <>
        <span className="text-warning">{'★'.repeat(llenas)}</span>
        <span className="text-secondary">{'☆'.repeat(5 - llenas)}</span>
      </>
    );
  };

  const enviarResena = async () => {
    if (!token) return navigate('/login');

    await axios.post(
      `${apiUrl}/api/productos/${producto._id}/resena`,
      { estrellas, comentario },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setComentario('');
    setEstrellas(5);

    const res = await axios.get(`${apiUrl}/api/productos/${producto._id}`);
    setProducto(res.data);
    setResenas((await axios.get(`${apiUrl}/api/resenas/${producto._id}`)).data);
  };

  if (!producto) {
    return (
      <div className="container py-5 text-center">
        <h4 className="text-danger">❌ Producto no encontrado</h4>
      </div>
    );
  }

  const getImagenUrl = (url) => {
    return url.startsWith('http')
      ? url
      : `${apiUrl.replace(/\/$/, '')}/${url.replace(/^\/+/, '')}`;
  };

  return (
    <div className="container py-5">
      <div className="row mb-5">
        {/* IZQUIERDA: Galería */}
        <div className="col-md-4">
          <GaleriaImagenes
            imagenes={producto.imagenes?.length > 0 ? producto.imagenes : [producto.imagen]}
            getImagenUrl={getImagenUrl}
          />
        </div>

        {/* CENTRO: Info */}
        <div className="col-md-5">
          <h2 className="mb-2">{producto.nombre}</h2>
          <p><strong>Marca:</strong> {producto.marca}</p>
          <p><strong>Categoría:</strong> {producto.categoria}</p>
          <p><strong>Tipo:</strong> {producto.tipoProducto}</p>
          <p><strong>Descripción:</strong> {producto.descripcion}</p>

          <p><strong>Colores disponibles:</strong></p>
          {producto.colores?.length > 0 ? (
            <select
              className="form-select mb-3"
              value={colorSeleccionado}
              onChange={(e) => setColorSeleccionado(e.target.value)}
            >
              {producto.colores.map((color, idx) => (
                <option key={idx} value={color}>{color}</option>
              ))}
            </select>
          ) : (
            <p>No hay colores.</p>
          )}

          <p><strong>Tallas disponibles:</strong></p>
          {producto.tallas?.length > 0 ? (
            <select
              className="form-select mb-3"
              value={tallaSeleccionada}
              onChange={(e) => setTallaSeleccionada(e.target.value)}
            >
              {producto.tallas.map((talla, idx) => (
                <option key={idx} value={talla}>{talla}</option>
              ))}
            </select>
          ) : (
            <p>No hay tallas.</p>
          )}

          <p><strong>Calificación:</strong> {renderEstrellas(producto.promedioEstrellas)}</p>
          {producto.precioOriginal && producto.precioOriginal > producto.precio && (
            <p>
              <span className="text-muted text-decoration-line-through">
                ${producto.precioOriginal.toLocaleString('es-CO')}
              </span>{' '}
              {producto.descuento?.porcentaje && (
                <span className="badge bg-danger ms-2">
                  -{producto.descuento.porcentaje}%
                </span>
              )}
            </p>
          )}
          <h4 className="text-success">${producto.precio.toLocaleString('es-CO')}</h4>
        </div>

        {/* DERECHA: Compra */}
        <div className="col-md-3">
          <div className="border rounded p-4 bg-light">
            <h4 className="mb-3">🛒 Comprar</h4>
            <p><strong>Precio:</strong> ${producto.precio.toLocaleString('es-CO')}</p>
            <p><strong>Stock:</strong> {producto.stock > 0 ? `Disponible (${producto.stock})` : 'Agotado'}</p>
            <label><strong>Cantidad:</strong></label>

            <div className="input-group mb-3" style={{ maxWidth: '120px' }}>
              <button className="btn btn-outline-secondary" onClick={() => cantidad > 1 && setCantidad(cantidad - 1)}>-</button>
              <input
                type="number"
                className="form-control text-center"
                value={cantidad}
                readOnly
              />
              <button className="btn btn-outline-secondary" onClick={() => cantidad < producto.stock && setCantidad(cantidad + 1)}>+</button>
            </div>

            <div className="d-flex flex-column gap-2">
              <button
                className="btn btn-primary"
                disabled={producto.stock === 0}
                onClick={handleAgregar}
              >
                🛒 Añadir al carrito
              </button>
              <button
                className="btn btn-success"
                disabled={producto.stock === 0}
                onClick={handleComprarAhora}
              >
                💳 Comprar ahora
              </button>
            </div>
          </div>
        </div>
      </div>

      <hr className="my-5" />
      <h4 className="mb-4">📝 Opiniones y reseñas</h4>
      <ResenasProducto resenas={resenas} renderEstrellas={renderEstrellas} />
      <ResenaForm
        estrellas={estrellas}
        comentario={comentario}
        setEstrellas={setEstrellas}
        setComentario={setComentario}
        enviarResena={enviarResena}
        token={token}
      />
    </div>
  );
};

export default ProductoDetalle;
