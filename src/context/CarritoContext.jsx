import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import api from "../services/api"; // ✅ CORRECTO
export const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
    const [carrito, setCarrito] = useState([]);
    const [total, setTotal] = useState(0);

    // --- ¡AÑADIDA ESTA LÍNEA! ---
    const apiUrl = import.meta.env.VITE_API_URL; // Asegura que apiUrl esté definida
    // --- FIN DE LA LÍNEA AÑADIDA ---

    // Cargar carrito desde backend al iniciar
    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            //console.log('⏳ Esperando token...');
            return;
        }

        //console.log('Token encontrado: ', token);

        //console.log('/carrito');

        api.get('/carrito')
            .then(res => {
                //console.log('📦 carrito API response:', res.data);
                setCarrito(res.data.carrito.productos || []);
            })
            .catch(err => {
                //console.error('❌ Error al cargar el carrito', err);
            })
            .finally(() => {
                //console.log('✅ Fin carga carrito');
            });
    }, []);

    // Recalcular total cuando cambia carrito
useEffect(() => {
    const nuevoTotal = carrito.reduce((acc, item) => {
        const precio = Number(item?.precio || item?.producto?.precio || 0);
        const cantidad = Number(item?.cantidad || 0);
        return acc + (precio * cantidad);
    }, 0);

    setTotal(nuevoTotal);
}, [carrito]);

    // Sincronizar carrito con backend cuando cambia carrito
    useEffect(() => {
        const sincronizarCarrito = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                //console.log('⚠️ No token para sincronizar carrito');
                return;
            }

            try {
                const productosSinCircular = carrito.map(p => ({
                    producto: p.producto._id,
                    cantidad: p.cantidad,
                    precio: p.precio,
                    color: p.color,
                    talla: p.talla,
                }));

                //console.log('🔄 Sincronizando carrito backend:', productosSinCircular);

                // --- ¡ESTA ES LA LÍNEA CLAVE QUE DEBE USAR apiUrl! ---
                const res = await axios.post(`${apiUrl}/carrito/guardar`, { productos: productosSinCircular }, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                // --- FIN DE LA LÍNEA CLAVE ---

                //console.log('✅ Carrito sincronizado backend:', res.data);
            } catch (err) {
                //console.error('❌ Error sincronizando carrito:', err);
            }
        };

        if (carrito.length > 0) {
            sincronizarCarrito();
        }
    }, [carrito, apiUrl]); // Asegúrate de que apiUrl esté en las dependencias para que el efecto se re-ejecute si cambia

    // Añadir producto al carrito (considerando color y talla)
    const agregarAlCarrito = (producto, cantidad = 1, color = '', talla = '') => {
        if (!producto || !producto._id) return;

        const key = `${producto._id}-${color}-${talla}`;

        const indexExistente = carrito.findIndex(p =>
            `${p.producto._id}-${p.color}-${p.talla}` === key
        );

        let nuevoCarrito = [...carrito];

        if (indexExistente !== -1) {
            nuevoCarrito[indexExistente].cantidad += cantidad;
        } else {
            nuevoCarrito.push({ producto, cantidad, precio: producto.precio, color, talla });
        }

        //console.log('🛒 Añadiendo al carrito:', { producto, cantidad, color, talla });
        setCarrito(nuevoCarrito);
    };

    // Quitar producto del carrito
const eliminarDelCarrito = (productoId, color, talla) => {
    const nuevoCarrito = carrito.filter(item => {
        return !(item.producto._id === productoId && item.color === color && item.talla === talla);
    });
    setCarrito(nuevoCarrito);
    sincronizarConBackend(nuevoCarrito); // ✅ sincronizar
};

    // Vaciar carrito completo
const vaciarCarrito = () => {
    setCarrito([]);
    sincronizarConBackend([]); // ✅ sincronizar
};

    useEffect(() => {
        //console.log('🧾 Carrito final actualizado:', carrito);
    }, [carrito]);
const sincronizarConBackend = async (carritoActualizado) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
        const productosSinCircular = carritoActualizado.map(p => ({
            producto: p.producto._id,
            cantidad: p.cantidad,
            precio: p.precio,
            color: p.color,
            talla: p.talla,
        }));

        await axios.post(`${apiUrl}/carrito/guardar`, { productos: productosSinCircular }, {
            headers: { Authorization: `Bearer ${token}` },
        });

    } catch (error) {
        console.error('❌ Error al sincronizar carrito después de eliminar o vaciar:', error);
    }
};
    return (
        <CarritoContext.Provider value={{
            carrito,
            total,
            agregarAlCarrito,
            eliminarDelCarrito,
            vaciarCarrito,
            setCarrito,
        }}>
            {children}
        </CarritoContext.Provider>
    );
};
