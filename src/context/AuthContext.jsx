import React, { createContext, useState, useEffect, useContext } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(() => {
    const storedUser = localStorage.getItem('usuario');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    if (usuario) {
      localStorage.setItem('usuario', JSON.stringify(usuario));
      if (usuario.token) {
        localStorage.setItem('token', usuario.token);
      }
    } else {
      localStorage.removeItem('usuario');
      localStorage.removeItem('token');
    }
  }, [usuario]);

  const login = (user) => {
    const usuarioConId = {
      ...user,
      _id: user._id || user.id,
    };

    setUsuario(usuarioConId);

    if (user.token) {
      localStorage.setItem('token', user.token);
    }

    console.log('✅ Usuario logueado:', usuarioConId);
  };

  const logout = () => {
    setUsuario(null);
    localStorage.removeItem('usuario');
    localStorage.removeItem('token');
    console.log('👋 Usuario deslogueado');
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Exporta el hook personalizado que te causaba el error
export const useAuth = () => useContext(AuthContext);
