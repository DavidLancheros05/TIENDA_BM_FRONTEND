import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

import api from '../services/api'; // o desde la ruta correcta


const MisCompras = () => {
    const { usuario } = useAuth();
    const token = usuario?.token;
    const [compras, setCompras] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const obtenerMisCompras = async () => {
        setLoading(true);
        setError(null);
        try {
            console.log("📦 MisCompras: obtenerMisCompras ejecutado");

            // Usar axios para la petición
            const res = await api.get('/ventas/mis-ventas');
            
            console.log("🧾 MisCompras response data:", res.data);
            console.log("🔐 Token usado:", token);

            setCompras(res.data);
            setLoading(false);
        } catch (err) {
            console.error('❌ Error en obtenerMisCompras:', err.message);
            setError('No se pudieron cargar tus compras. Intenta de nuevo más tarde.');
            setLoading(false);
        }
    };

    useEffect(() => {
        console.log("🌀 useEffect token:", token);
        if (token) {
            obtenerMisCompras();
        } else {
            console.log("⚠️ Token no disponible aún, esperando...");
            setLoading(false); // No hay token, no hay compras que cargar
        }
    }, [token]);

    if (loading) {
        return <div className="container mt-5 text-center">Cargando tus compras...</div>;
    }

    if (error) {
        return <div className="container mt-5 alert alert-danger">{error}</div>;
    }

    if (compras.length === 0) {
        return <div className="container mt-5 alert alert-info">Aún no has realizado ninguna compra.</div>;
    }

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Mis Compras</h2>
            {compras.map((compra) => (
                <div key={compra._id} className="card mb-4 shadow-sm">
                    <div className="card-header bg-primary text-white">
                        <h4 className="mb-0">Orden ID: **{compra._id}**</h4>
                        <p className="mb-0">Fecha de Compra: **{new Date(compra.fechaCreacion).toLocaleDateString()}**</p>
                        <p className="mb-0">Estado: **{compra.estado.charAt(0).toUpperCase() + compra.estado.slice(1)}**</p>
                    </div>
                    <div className="card-body">
                        {compra.productos.map((item, index) => (
                            <div key={index} className="d-flex align-items-center mb-3 border-bottom pb-3">
                                <img 
                                    src={item.producto?.imagenes[0]?.url || 'https://via.placeholder.com/60'} 
                                    alt={item.producto?.nombre} 
                                    className="img-thumbnail me-3" 
                                    style={{ width: '60px', height: '60px', objectFit: 'cover' }} 
                                />
                                <div>
                                    <p className="fw-bold mb-0">Producto: {item.producto?.nombre || 'Producto desconocido'}</p>
                                    {item.color && <p className="mb-0">Color: {item.color}</p>}
                                    {item.talla && <p className="mb-0">Talla: {item.talla}</p>}
                                    <p className="mb-0">Cantidad: {item.cantidad}</p>
                                    <p className="mb-0">Precio Unitario: ${item.precioUnitario?.toLocaleString()}</p>
                                </div>
                            </div>
                        ))}
                        <div className="text-end pt-3">
                            <h5>Total Pagado: **${compra.total.toLocaleString()}**</h5>
                            <p className="text-muted">Método de Pago: {compra.metodoPago}</p>
                            <p className="text-muted">Dirección de Envío: {compra.direccionEnvio?.direccionLinea1}, {compra.direccionEnvio?.ciudad}, {compra.direccionEnvio?.departamento}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MisCompras;