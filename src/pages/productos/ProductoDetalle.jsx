import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CarritoContext } from '../../context/CarritoContext';
import { GaleriaImagenes } from '../../components/producto/GaleriaImagenes';
import { InfoProducto } from '../../components/producto/InfoProducto';
import { ResenasProducto } from '../../components/producto/ResenasProducto';
import { ResenaForm } from '../../components/producto/ResenaForm';

const ProductoDetalle = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const { agregarAlCarrito } = useContext(CarritoContext);
  const navigate = useNavigate();
  const [resenas, setResenas] = useState([]);
  const [estrellas, setEstrellas] = useState(5);
  const [comentario, setComentario] = useState('');
  const [imagenSeleccionada, setImagenSeleccionada] = useState('');
  const token = localStorage.getItem('token');
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    axios.get(`${apiUrl}/api/productos/${id}`)
      .then(res => {
        setProducto(res.data);
        const img = res.data.imagenes?.[0];
        setImagenSeleccionada(typeof img === 'string' ? img : img?.url || res.data.imagen);
        return axios.get(`${apiUrl}/api/resenas/${res.data._id}`);
      })
      .then(resResenas => setResenas(resResenas.data))
      .catch(err => {
        console.error(err);
        setProducto(null);
      });
  }, [id]);

  const handleAgregar = () => agregarAlCarrito({ ...producto, cantidad });

  const handleComprarAhora = () => {
    agregarAlCarrito({ ...producto, cantidad });
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

  const imagenUrlFinal = getImagenUrl(imagenSeleccionada);

  return (
    <div className="container py-5">
      <div className="row mb-5">
        <div className="col-md-6 d-flex">
          <GaleriaImagenes
            imagenes={producto.imagenes?.length > 0 ? producto.imagenes : [producto.imagen]}
            imagenSeleccionada={imagenSeleccionada}
            onSeleccionar={setImagenSeleccionada}
            getImagenUrl={getImagenUrl} // ✅ PASA el helper correcto
          />
          <div className="flex-grow-1 d-flex align-items-center justify-content-center">
            <img
              src={imagenUrlFinal}
              alt={producto.nombre}
              className="img-fluid rounded shadow"
              style={{ maxHeight: '400px', objectFit: 'contain' }}
            />
          </div>
        </div>

        <InfoProducto producto={producto} renderEstrellas={renderEstrellas} />
      </div>

      <div className="border rounded p-4 bg-light mb-5">
        <h4 className="mb-4">🛒 Comprar este producto</h4>
        <div className="row">
          <div className="col-md-6">
            <h4 className="text-success">${producto.precio.toLocaleString()}</h4>
            <p><strong>Stock:</strong> {producto.stock > 0 ? `Disponible (${producto.stock})` : 'Agotado'}</p>
            <input
              type="number"
              className="form-control mb-3"
              value={cantidad}
              min={1}
              max={producto.stock || 1}
              onChange={(e) => setCantidad(Number(e.target.value))}
              style={{ width: '100px' }}
            />
            <div className="d-flex gap-3">
              <button className="btn btn-primary" disabled={producto.stock === 0} onClick={handleAgregar}>🛒 Añadir al carrito</button>
              <button className="btn btn-success" disabled={producto.stock === 0} onClick={handleComprarAhora}>💳 Comprar ahora</button>
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
