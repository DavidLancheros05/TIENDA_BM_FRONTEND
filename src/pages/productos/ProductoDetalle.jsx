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
    // La cantidad se inicializa siempre en 1, sin importar el stock
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

    // --- ESTADOS PARA MANEJAR LA CARGA Y ERRORES ---
    const [loading, setLoading] = useState(true); // Se inicializa en true porque al inicio estamos cargando
    const [error, setError] = useState(null);   // Para almacenar mensajes de error específicos
    // --- FIN ESTADOS ---

    useEffect(() => {
        // Asegurarse de que el ID exista antes de hacer la petición
        if (!id) {
            setLoading(false);
            setError('ID de producto no proporcionado en la URL.');
            return;
        }

        const fetchProductData = async () => {
            setLoading(true); // Indica que la carga ha comenzado
            setError(null);   // Limpia errores previos
            try {
                const productResponse = await axios.get(`${apiUrl}/productos/${id}`);
                setProducto(productResponse.data);

                if (productResponse.data.colores?.length > 0) setColorSeleccionado(productResponse.data.colores[0]);
                if (productResponse.data.tallas?.length > 0) setTallaSeleccionada(productResponse.data.tallas[0]);
                // La cantidad se inicializa siempre en 1, sin importar el stock
                setCantidad(1);

                const reviewsResponse = await axios.get(`${apiUrl}/resenas/${productResponse.data._id}`);
                setResenas(reviewsResponse.data);

            } catch (err) {
                console.error('❌ Error cargando producto:', err);
                setProducto(null); // Limpiar producto si hay un error
                if (err.response && err.response.status === 404) {
                    setError('El producto que buscas no existe.');
                } else {
                    setError('Hubo un problema al cargar el producto. Inténtalo de nuevo más tarde.');
                }
            } finally {
                setLoading(false); // Indica que la carga ha terminado, ya sea con éxito o error
            }
        };

        fetchProductData();
    }, [id, apiUrl]);

    // --- DEFINICIÓN DE FUNCIONES ---
    const handleAgregar = () => {
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
        if (!token) {
            alert('Debes iniciar sesión para enviar una reseña.'); // Usar un modal en producción
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

            // Volver a cargar el producto y las reseñas para actualizar la UI
            const res = await axios.get(`${apiUrl}/productos/${producto._id}`);
            setProducto(res.data);
            setResenas((await axios.get(`${apiUrl}/resenas/${producto._id}`)).data);
            alert('Reseña enviada con éxito!'); // Usar un modal en producción
        } catch (error) {
            console.error('❌ Error enviando reseña:', error);
            alert('Error al enviar la reseña. Inténtalo de nuevo.'); // Usar un modal en producción
        }
    };
    // --- FIN DEFINICIÓN DE FUNCIONES ---

    // --- Manejo de estados de carga y error antes de renderizar el producto ---
    if (loading) {
        return (
            <div className="container py-5 text-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Cargando producto...</span>
                </div>
                <p className="mt-3">Cargando detalles del producto...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container py-5 text-center">
                <h4 className="text-danger">❌ {error}</h4>
            </div>
        );
    }

    // Si no está cargando y no hay error, pero el producto es null (por algún fallo no capturado)
    if (!producto) {
        return (
            <div className="container py-5 text-center">
                <h4 className="text-warning">⚠️ No se pudo cargar el producto.</h4>
            </div>
        );
    }

    // Función para obtener la URL completa de la imagen
    const getImagenUrl = (url) => {
        // Si la URL ya es absoluta (http/https), la devuelve tal cual
        if (url.startsWith('http')) {
            return url;
        }
        // Si es una ruta relativa, la construye usando la apiUrl y el prefijo 'uploads'
        // Aseguramos que no haya dobles barras al unir las rutas
        return `${apiUrl.replace(/\/$/, '')}/uploads/${url.replace(/^\/+/, '')}`;
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
                                {/* Ya no se muestra el stock como "Disponible (X)" */}
                                <p><strong>Estado:</strong> {producto.stock > 0 ? 'Disponible' : 'Agotado'}</p>
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
                                    <button
                                        className="btn btn-outline-secondary"
                                        onClick={() => {
                                            if (cantidad > 1) {
                                                setCantidad(cantidad - 1);
                                            }
                                        }}
                                    >-</button>
                                    <input type="number" className="form-control text-center" value={cantidad} readOnly style={{ width: '60px' }} />
                                    <button
                                        className="btn btn-outline-secondary"
                                        onClick={() => {
                                            // Ya no se limita por producto.stock
                                            setCantidad(cantidad + 1);
                                        }}
                                    >+</button>
                                </div>

                                <div className="d-grid gap-2">
                                    <button
                                        className="btn btn-primary fw-bold"
                                        // Los botones ya no se deshabilitan por stock o cantidad 0
                                        onClick={handleAgregar}
                                    >
                                        🛒 Añadir al carrito
                                    </button>

                                    <button
                                        className="btn btn-success fw-bold"
                                        // Los botones ya no se deshabilitan por stock o cantidad 0
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
