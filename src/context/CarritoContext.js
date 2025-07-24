import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';

export const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  const { usuario } = useContext(AuthContext);
  const [carrito, setCarrito] = useState([]);

  const API_URL = `${process.env.REACT_APP_API_URL}/api/carrito`;

  // ✅ Cargar carrito al iniciar sesión
  useEffect(() => {
    if (usuario && usuario.token) {
      fetch(API_URL, {
        headers: {
          Authorization: `Bearer ${usuario.token}`,
        },
      })
        .then(res => res.json())
        .then(data => {
          console.log('🛒 Cargando carrito:', data);

          setCarrito(
            data.carrito?.productos?.map(p => ({
              producto: p.producto, // 👈 objeto populado con nombre y precio
              cantidad: p.cantidad,
            })) || []
          );
        })
        .catch(err => console.error('❌ Error cargando carrito:', err));
    }
  }, [usuario]);

  // ✅ Guardar carrito cada vez que cambia
  const guardarCarrito = () => {
    if (!usuario || !usuario.token) return;

    const payload = {
      productos: carrito
        .filter(item => item.producto?._id)
        .map(item => ({
          producto: item.producto._id,
          cantidad: item.cantidad,
        })),
    };

    console.log('🚩 Guardando carrito con:', payload);

    fetch(`${API_URL}/guardar`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${usuario.token}`,
      },
      body: JSON.stringify(payload),
    })
      .then(res => res.json())
      .then(data => {
        console.log('✅ Carrito guardado:', data);
      })
      .catch(err => console.error('❌ Error guardando carrito:', err));
  };

  // ✅ Agregar producto
  const agregarAlCarrito = (producto) => {
    setCarrito(prev => {
      const existe = prev.find(item => item.producto?._id === producto._id);
      if (existe) {
        return prev.map(item =>
          item.producto._id === producto._id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      } else {
        return [...prev, { producto: producto, cantidad: 1 }];
      }
    });
  };

  // ✅ Eliminar producto
  const eliminarDelCarrito = (id) => {
    setCarrito(prev =>
      prev.filter(item => item.producto?._id !== id)
    );
  };

  // ✅ Vaciar carrito
  const limpiarCarrito = () => {
    setCarrito([]);
  };

  // 🔄 Sincronizar carrito cada vez que cambia
  useEffect(() => {
    if (usuario) guardarCarrito();
  }, [carrito]);

  return (
    <CarritoContext.Provider
      value={{ carrito, agregarAlCarrito, eliminarDelCarrito, limpiarCarrito }}
    >
      {children}
    </CarritoContext.Provider>
  );
};
