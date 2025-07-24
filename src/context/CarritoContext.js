import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';

export const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  const { usuario } = useContext(AuthContext);
  const [carrito, setCarrito] = useState([]);
  const API_URL = `${process.env.REACT_APP_API_URL}/api/carrito`;

  // ✅ Cargar carrito desde backend
  useEffect(() => {
    if (usuario) {
      const token = localStorage.getItem('token');

      fetch(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log('🛒 Cargando carrito:', data);

          if (data.mensaje === 'Token inválido') {
            console.warn('⚠️ Token inválido, cerrando sesión');
            localStorage.removeItem('token');
            localStorage.removeItem('usuario');
            setCarrito([]);
            return;
          }

          setCarrito(
            data.productos?.map((p) => ({
              _id: p.producto._id,
              nombre: p.producto.nombre,
              precio: p.producto.precio,
              cantidad: p.cantidad,
            })) || []
          );
        })
        .catch((err) => console.error(err));
    }
  }, [usuario]);

  const guardarCarrito = () => {
    if (!usuario) return;

    const payload = {
      productos: carrito.map((item) => ({
        producto: item._id,
        cantidad: item.cantidad,
      })),
    };

    console.log('🚩 Guardando carrito con:', payload);

    const token = localStorage.getItem('token');

    fetch(`${API_URL}/guardar`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('✅ Carrito guardado:', data);
      })
      .catch((err) => console.error(err));
  };

  const agregarAlCarrito = (producto) => {
    setCarrito((prev) => {
      const existe = prev.find((item) => item._id === producto._id);
      if (existe) {
        return prev.map((item) =>
          item._id === producto._id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      } else {
        return [...prev, { ...producto, cantidad: 1 }];
      }
    });
  };

  const eliminarDelCarrito = (id) => {
    setCarrito((prev) => prev.filter((item) => item._id !== id));
  };

  const limpiarCarrito = () => {
    setCarrito([]);
  };

  // ✅ Guarda carrito solo si hay productos
  useEffect(() => {
    if (usuario && carrito.length > 0) {
      guardarCarrito();
    }
  }, [carrito]);

  return (
    <CarritoContext.Provider
      value={{ carrito, agregarAlCarrito, eliminarDelCarrito, limpiarCarrito }}
    >
      {children}
    </CarritoContext.Provider>
  );
};
