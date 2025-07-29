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
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios.get(`${apiUrl}/productos/${id}`)
      .then(res => {
        setProducto(res.data);
        if (res.data.colores?.length > 0) setColorSeleccionado(res.data.colores[0]);
        if (res.data.tallas?.length > 0) setTallaSeleccionada(res.data.tallas[0]);
        return axios.get(`${apiUrl}/resenas/${res.data._id}`);
      })
      .then(resResenas => setResenas(resResenas.data))
      .catch(err => {
        console.error('❌ Error cargando producto:', err);
        setProducto(null);
      });
  }, [id, apiUrl]); // ✅ incluimos apiUrl

const handleAgregar = () => {
  console.log("....");
  console.log("....");
  console.log("....");
  console.log('🛒 Añadiendo al carrito:', { producto, cantidad, colorSeleccionado, tallaSeleccionada });
  agregarAlCarrito(producto, cantidad, colorSeleccionado, tallaSeleccionada);
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
      `${apiUrl}/productos/${producto._id}/resena`,
      { estrellas, comentario },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setComentario('');
    setEstrellas(5);

    const res = await axios.get(`${apiUrl}/productos/${producto._id}`);
    setProducto(res.data);
    setResenas((await axios.get(`${apiUrl}/resenas/${producto._id}`)).data);
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
    <div className="container py-4">
      <h2 className="mb-4">{producto.nombre}</h2>

      <div className="d-flex flex-wrap gap-3">
        {/* Columna izquierda */}
        <div className="flex-grow-1 p-3 shadow rounded" style={{ backgroundColor: '#e3f2fd', minWidth: '60%' }}>
          <GaleriaImagenes
            imagenes={producto.imagenes?.length > 0 ? producto.imagenes : [producto.imagen]}
            getImagenUrl={getImagenUrl}
          />

          <div className="row mt-4">
            <div className="row">
              {/* Columna 1 */}
              <div className="col-md-4 mb-4">
                <p><strong>Marca:</strong> {producto.marca}</p>
                <p><strong>Categoría:</strong> {producto.categoria}</p>
                <p><strong>Stock:</strong> {producto.stock > 0 ? `Disponible (${producto.stock})` : 'Agotado'}</p>
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
                <h4 className="text-success">
                  ${producto.precio.toLocaleString('es-CO')}
                </h4>
              </div>

              {/* Columna 2 */}
              <div className="col-md-4 mb-4">
                <label><strong>Color:</strong></label>
                <select className="form-select mb-3" value={colorSeleccionado} onChange={e => setColorSeleccionado(e.target.value)}>
                  {producto.colores?.map((color, idx) => (
                    <option key={idx} value={color}>{color}</option>
                  ))}
                </select>

                <label><strong>Talla:</strong></label>
                <select className="form-select mb-3" value={tallaSeleccionada} onChange={e => setTallaSeleccionada(e.target.value)}>
                  {producto.tallas?.map((talla, idx) => (
                    <option key={idx} value={talla}>{talla}</option>
                  ))}
                </select>
              </div>

              {/* Columna 3 */}
              <div className="col-md-4 mb-4">
                <p><strong>Precio total:</strong> ${producto.precio.toLocaleString('es-CO')}</p>
                <label><strong>Cantidad:</strong></label>
                <div className="d-flex align-items-center mb-3" style={{ gap: '0.5rem' }}>
                  <button className="btn btn-outline-secondary" onClick={() => cantidad > 1 && setCantidad(cantidad - 1)}>-</button>
                  <input type="number" className="form-control text-center" value={cantidad} readOnly style={{ width: '60px' }} />
                  <button className="btn btn-outline-secondary" onClick={() => cantidad < producto.stock && setCantidad(cantidad + 1)}>+</button>
                </div>

                <div className="d-grid gap-2">
                  

                  <button
                    className="btn btn-success fw-bold"
                    disabled={producto.stock === 0}
                    onClick={handleComprarAhora}
                  >
                    ⚡ Comprar ahora
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Columna derecha */}
        <div className="p-3 bg-light border rounded shadow-sm" style={{ minWidth: '280px', maxWidth: '400px', flex: '1' }}>
          <h5 className="mb-3"><strong>Descripción:</strong></h5>
          <ul className="list-unstyled">
            {producto.descripcion.split('-').map((item, index) => {
              const texto = item.trim();
              const capitalizado = texto.charAt(0).toUpperCase() + texto.slice(1);
              return texto ? (
                <li key={index} className="mb-2">
                  <span style={{ color: 'red', marginRight: '0.5rem' }}>‣</span>
                  {capitalizado}
                </li>
              ) : null;
            })}
          </ul>
        </div>
      </div>

      <hr className="my-5" />
      <p><strong>Calificación:</strong> {renderEstrellas(producto.promedioEstrellas)}</p>
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
