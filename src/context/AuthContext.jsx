import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(() => {
    const storedUser = localStorage.getItem('usuario');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    if (usuario) {
      localStorage.setItem('usuario', JSON.stringify(usuario));
    } else {
      localStorage.removeItem('usuario');
    }
  }, [usuario]);

  // ✅ login ahora guarda TODO el usuario (incluyendo _id, nombre, token, rol, etc.)
const login = (user) => {
  const usuarioConId = {
    ...user,
    _id: user._id || user.id // 🔁 asegura que siempre exista _id
  };

  setUsuario(usuarioConId);
  console.log('✅ Usuario logueado:', usuarioConId);
};

  const logout = () => {
    setUsuario(null);
    console.log('👋 Usuario deslogueado');
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
