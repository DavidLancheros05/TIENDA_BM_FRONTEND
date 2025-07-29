import React, { useEffect, useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CarritoContext } from '../context/CarritoContext';
import { AuthContext } from '../context/AuthContext';
import api from '../services/axios'; // Importa tu instancia 'api'

const PagoExitoso = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [ordenDetalles, setOrdenDetalles] = useState(null);
    const [mensaje, setMensaje] = useState('Verificando el estado de tu pago...');

    const { vaciarCarrito } = useContext(CarritoContext);
    const { usuario } = useContext(AuthContext); // Obtenemos el usuario del AuthContext para acceder al token

    // Obtener la URL base de la API desde las variables de entorno
    const API_BASE_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const ordenId = query.get('ordenId');

        if (ordenId) {
            const verificarEstadoOrden = async () => {
                try {
                    const token = usuario?.token || localStorage.getItem('token');

                    if (!token) {
                        setMensaje('No estás autenticado. Por favor, inicia sesión para ver los detalles de tu orden.');
                        // navigate('/login'); // Opcional: redirigir al login
                        return;
                    }

                    const config = {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    };

                    // Usa la variable de entorno para la URL de la API
                    const response = await api.get(`/ordenes/${ordenId}`, config);
                    const orden = response.data;
                    setOrdenDetalles(orden);

                    if (orden.estado === 'pagado') {
                        setMensaje('¡Tu pago ha sido exitoso! 🎉');
                        vaciarCarrito();
                    } else if (orden.estado === 'pendiente') {
                        setMensaje('Tu pago está pendiente de confirmación. Te notificaremos cuando se procese.');
                    } else {
                        setMensaje('Hubo un problema con tu pago. Por favor, intenta de nuevo o contacta a soporte.');
                    }
                } catch (error) {
                    console.error("❌ Error al verificar estado de la orden:", error);
                    if (error.response && error.response.status === 401) {
                        setMensaje('No autorizado para ver esta orden. Por favor, inicia sesión de nuevo.');
                    } else if (error.response && error.response.status === 404) {
                        setMensaje('Orden no encontrada o no tienes permiso para verla.');
                    } else {
                        setMensaje('Error al verificar el estado de tu pago. Por favor, contacta a soporte.');
                    }
                }
            };
            verificarEstadoOrden();
        } else {
            setMensaje('No se encontró información de la orden.');
        }
    }, [location.search, vaciarCarrito, usuario]);

    return (
        <div className="container mx-auto p-4 text-center">
            <h1 className="text-3xl font-bold mb-4">Estado del Pago</h1>
            <p className="text-xl mb-6">{mensaje}</p>

            {ordenDetalles && ordenDetalles.estado === 'pagado' && (
                <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6" role="alert">
                    <p className="font-bold">¡Pago Completado!</p>
                    <p>Referencia de la Orden: **{ordenDetalles._id}**</p>
                    <p>Gracias por tu compra.</p>
                </div>
            )}

            {ordenDetalles && (
                <div className="mt-8 text-left border p-4 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold mb-4">Detalles de la Orden</h2>
                    <p><strong>Estado:</strong> {ordenDetalles.estado}</p>
                    <p><strong>Total:</strong> ${ordenDetalles.total.toFixed(2)}</p>
                    <p><strong>Fecha:</strong> {new Date(ordenDetalles.fechaCreacion).toLocaleDateString()}</p>

                    <h3 className="text-xl font-medium mt-4 mb-2">Productos:</h3>
                    <ul>
                        {ordenDetalles.productos.map((item, index) => (
                            <li key={index} className="flex items-center mb-2">
                                {/* Construye la URL de la imagen usando la variable de entorno */}
                                <img
                                    src={`${API_BASE_URL}/uploads/${item.producto.imagenes[0]?.url}`}
                                    alt={item.producto.nombre}
                                    className="w-16 h-16 object-cover rounded-md mr-4"
                                    onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/60x60/cccccc/000000?text=No+Img" }}
                                />
                                <div>
                                    <p className="font-semibold">{item.producto.nombre}</p>
                                    <p>Cantidad: {item.cantidad}</p>
                                    <p>Precio Unitario: ${item.precioUnitario.toFixed(2)}</p>
                                    {item.color && <p>Color: {item.color}</p>}
                                    {item.talla && <p>Talla: {item.talla}</p>}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <button
                onClick={() => navigate('/mis-compras')}
                className="mt-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Ver Mis Compras
            </button>
            <button
                onClick={() => navigate('/')}
                className="mt-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded ml-2"
            >
                Volver al Inicio
            </button>
        </div>
    );
};

export default PagoExitoso;
