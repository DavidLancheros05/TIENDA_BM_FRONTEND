import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(() => {
    // Leer usuario guardado en localStorage al cargar la app
    const storedUser = localStorage.getItem('usuario');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Guardar usuario en localStorage cada vez que cambia
  useEffect(() => {
    if (usuario) {
      localStorage.setItem('usuario', JSON.stringify(usuario));
    } else {
      localStorage.removeItem('usuario');
    }
  }, [usuario]);

  // login recibe token y rol, guarda ambos en usuario
  const login = (token, rol) => {
    setUsuario({ token, rol });
  };

  const logout = () => {
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
