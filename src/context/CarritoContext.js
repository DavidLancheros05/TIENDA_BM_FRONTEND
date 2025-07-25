import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';

export const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  const { usuario } = useContext(AuthContext);
  const [carrito, setCarrito] = useState([]);

  const API_URL = `${process.env.REACT_APP_API_URL}/api/carrito`;

  // 🔄 Cargar carrito al iniciar sesión
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
              producto: p.producto, // objeto populado
              cantidad: p.cantidad,
              color: p.color,
              talla: p.talla,
            })) || []
          );
        })
        .catch(err => console.error('❌ Error cargando carrito:', err));
    }
  }, [usuario]);

  // 🔄 Guardar carrito cada vez que cambia
  const guardarCarrito = () => {
    if (!usuario || !usuario.token) return;

    const payload = {
      productos: carrito
        .filter(item => item.producto?._id)
        .map(item => ({
          producto: item.producto._id,
          cantidad: item.cantidad,
          color: item.color,
          talla: item.talla,
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

  // ➕ Agregar al carrito
  const agregarAlCarrito = (item) => {
    console.log('➕ Intentando agregar al carrito:', item);
    setCarrito(prev => {
      const existe = prev.find(p =>
        p.producto?._id === item.producto._id &&
        p.color === item.color &&
        p.talla === item.talla
      );

      if (existe) {
        console.log('🔄 Ya existe, sumando cantidad...');
        return prev.map(p =>
          p.producto._id === item.producto._id &&
          p.color === item.color &&
          p.talla === item.talla
            ? { ...p, cantidad: p.cantidad + item.cantidad }
            : p
        );
      } else {
        console.log('🆕 No existe, agregando nuevo item...');
        return [...prev, item];
      }
    });
  };

  // ❌ Eliminar del carrito
  const eliminarDelCarrito = (id) => {
    setCarrito(prev =>
      prev.filter(item => item.producto?._id !== id)
    );
  };

  // 🧹 Vaciar carrito
  const limpiarCarrito = () => {
    setCarrito([]);
  };

  // 🔄 Sincronizar carrito cada vez que cambia
  useEffect(() => {
    if (usuario) guardarCarrito();
  }, [carrito]);

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        setCarrito,
        agregarAlCarrito,
        eliminarDelCarrito,
        limpiarCarrito
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
};
