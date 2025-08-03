// src/pages/productos/ProductoDetalle.jsx
import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CarritoContext } from '../../context/CarritoContext';
import { GaleriaImagenes } from '../../components/producto/GaleriaImagenes';
import InfoBasicaProducto from '../../components/producto/InfoBasicaProducto';
import SeleccionVariantes from '../../components/producto/SeleccionVariantes';
import AgregarAlCarrito from '../../components/producto/AgregarAlCarrito';
import DescripcionProducto from '../../components/producto/DescripcionProducto';
import CalificacionYResenas from '../../components/producto/CalificacionYResenas';
import axios from 'axios';
const ProductoDetalle = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [colorSeleccionado, setColorSeleccionado] = useState('');
  const [tallaSeleccionada, setTallaSeleccionada] = useState('');
  const [stockDisponible, setStockDisponible] = useState(0);
  const [productoAgotado, setProductoAgotado] = useState(false);
  const { agregarAlCarrito } = useContext(CarritoContext);
  const navigate = useNavigate();
  const [resenas, setResenas] = useState([]);
  const [estrellas, setEstrellas] = useState(5);
  const [comentario, setComentario] = useState('');
  const token = localStorage.getItem('token');
  const apiUrl = import.meta.env.VITE_API_URL;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [variantesDisponibles, setVariantesDisponibles] = useState([]);

  useEffect(() => {
    if (!id) {
      setError('ID de producto no proporcionado.');
      setLoading(false);
      return;
    }

    const fetchProducto = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`${apiUrl}/productos/${id}`);
        setProducto(data);
        setVariantesDisponibles(data.variantes || []);

        if (data.colores?.length) setColorSeleccionado(data.colores[0]);
        if (data.tallas?.length) setTallaSeleccionada(data.tallas[0]);

        setCantidad(1);

        const resenasResp = await axios.get(`${apiUrl}/resenas/${data._id}`);
        setResenas(resenasResp.data);
      } catch (err) {
        console.error(err);
        setError('Error al cargar producto.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducto();
  }, [id]);

  useEffect(() => {
    if (producto?.variantes?.length > 0) {
      const agotado = producto.variantes.every((v) => v.stock === 0);
      setProductoAgotado(agotado);
    } else {
      setProductoAgotado(true);
    }
  }, [producto]);

  useEffect(() => {
    if (producto && colorSeleccionado && tallaSeleccionada && producto.variantes) {
      const variante = producto.variantes.find(
        (v) => v.color === colorSeleccionado && v.talla === tallaSeleccionada
      );
      setStockDisponible(variante?.stock || 0);
    }
  }, [producto, colorSeleccionado, tallaSeleccionada]);

  const handleAgregar = () => {
    if (stockDisponible > 0) {
      agregarAlCarrito(producto, cantidad, colorSeleccionado, tallaSeleccionada);
    }
  };

  const handleComprarAhora = () => {
    if (stockDisponible > 0) {
      handleAgregar();
      navigate('/carrito');
    }
  };

  const enviarResena = async () => {
    if (!token) {
      alert('Debes iniciar sesión.');
      return navigate('/login');
    }

    try {
      await axios.post(
        `${apiUrl}/productos/${producto._id}/resena`,
        { estrellas, comentario },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setComentario('');
      setEstrellas(5);
      const { data } = await axios.get(`${apiUrl}/resenas/${producto._id}`);
      setResenas(data);
    } catch (error) {
      alert('Error al enviar la reseña.');
    }
  };

  const getImagenUrl = (url) =>
    url.startsWith('http') ? url : `${apiUrl}/uploads/${url}`;

  if (loading) return <p className="text-center py-5">Cargando producto...</p>;
  if (error) return <p className="text-center text-danger py-5">{error}</p>;

  return (
    <div className="container py-4">
      <h2>{producto.nombre}</h2>

      <div className="d-flex flex-wrap gap-3">
        <div className="flex-grow-1 p-3 shadow rounded bg-white">
          <GaleriaImagenes imagenes={producto.imagenes || [producto.imagen]} getImagenUrl={getImagenUrl} />

          <div className="row mt-4">
            <div className="col-md-4">
              <InfoBasicaProducto producto={producto} agotado={productoAgotado} />
            </div>
            <div className="col-md-4">
              <SeleccionVariantes
                colores={producto.colores}
                tallas={producto.tallas}
                colorSeleccionado={colorSeleccionado}
                tallaSeleccionada={tallaSeleccionada}
                setColorSeleccionado={setColorSeleccionado}
                setTallaSeleccionada={setTallaSeleccionada}
                variantes={variantesDisponibles}
                stockDisponible={stockDisponible}
              />
            </div>
            <div className="col-md-4">
              <AgregarAlCarrito
                precio={producto.precio}
                cantidad={cantidad}
                setCantidad={setCantidad}
                handleAgregar={handleAgregar}
                handleComprarAhora={handleComprarAhora}
                stockDisponible={stockDisponible}
                deshabilitado={stockDisponible === 0}
              />
            </div>
          </div>
        </div>

        <div className="p-3 bg-light border rounded shadow-sm" style={{ minWidth: '280px', maxWidth: '400px' }}>
          <DescripcionProducto descripcion={producto.descripcion} />
        </div>
      </div>

      <CalificacionYResenas
        promedioEstrellas={producto.promedioEstrellas}
        resenas={resenas}
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
