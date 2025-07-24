import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';

export const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  const { usuario } = useContext(AuthContext);
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    if (usuario) {
      fetch(`http://localhost:5000/api/carrito/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
        .then(res => res.json())
        .then(data => {
          console.log('🛒 Cargando carrito:', data);
          setCarrito(data.productos || []);
        })
        .catch(err => console.error(err));
    }
  }, [usuario]);

  const guardarCarrito = () => {
    if (!usuario) return;

    fetch(`http://localhost:5000/api/carrito/guardar`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        usuarioId: usuario._id,
        productos: carrito,
      }),
    })
      .then(res => res.json())
      .then(data => {
        console.log('✅ Carrito guardado:', data);
      })
      .catch(err => console.error(err));
  };

  const agregarAlCarrito = (producto) => {
    setCarrito(prev => {
      const existe = prev.find(item => item._id === producto._id);
      if (existe) {
        return prev.map(item =>
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
    setCarrito(prev => prev.filter(item => item._id !== id));
  };

  const limpiarCarrito = () => {
    setCarrito([]);
  };

  // Guarda carrito cada vez que cambia
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
