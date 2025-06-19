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
    setUsuario(user);
    console.log('✅ Usuario logueado:', user); // 👀 Verificación
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
