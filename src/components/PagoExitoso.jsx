import React, { useEffect, useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CarritoContext } from '../context/CarritoContext';
import { AuthContext } from '../context/AuthContext'; // 📌 ¡Importa tu AuthContext!

const PagoExitoso = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [ordenDetalles, setOrdenDetalles] = useState(null);
    const [mensaje, setMensaje] = useState('Verificando el estado de tu pago...');

    const { vaciarCarrito } = useContext(CarritoContext);
    const { user } = useContext(AuthContext); // 📌 ¡Obtén el usuario del AuthContext para acceder al token!

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const ordenId = query.get('ordenId');

        if (ordenId) {
            const verificarEstadoOrden = async () => {
                try {
                    // 📌 Obtener el token del almacenamiento local (o del contexto si ya lo tienes ahí)
                    const token = localStorage.getItem('token'); // Asume que guardas el token en localStorage

                    if (!token) {
                        setMensaje('No estás autenticado. Por favor, inicia sesión.');
                        // Opcional: Redirigir al login si no hay token
                        // navigate('/login');
                        return;
                    }

                    const config = {
                        headers: {
                            Authorization: `Bearer ${token}` // 📌 ¡Añade el token a la cabecera de autorización!
                        }
                    };

                    const response = await axios.get(`http://localhost:5000/api/ordenes/${ordenId}`, config); // 📌 Pasa la configuración
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
                        // Opcional: Manejar la expiración del token o redirigir
                        // navigate('/login');
                    } else {
                        setMensaje('Error al verificar el estado de tu pago. Por favor, contacta a soporte.');
                    }
                }
            };
            verificarEstadoOrden();
        } else {
            setMensaje('No se encontró información de la orden.');
        }
    }, [location.search, vaciarCarrito, user]); // Añade 'user' a las dependencias si lo usas para el token directamente

    // ... (el resto de tu componente, sin cambios)

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
                                <img src={`http://localhost:5000/${item.producto.imagenes[0]}`} alt={item.producto.nombre} className="w-16 h-16 object-cover rounded-md mr-4"/>
                                <div>
                                    <p className="font-semibold">{item.producto.nombre}</p>
                                    <p>Cantidad: {item.cantidad}</p>
                                    <p>Precio Unitario: ${item.producto.precio.toFixed(2)}</p>
                                    <p>Color: {item.color}</p>
                                    <p>Talla: {item.talla}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <button
                onClick={() => navigate('/')}
                className="mt-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Volver al Inicio
            </button>
        </div>
    );
};

export default PagoExitoso;