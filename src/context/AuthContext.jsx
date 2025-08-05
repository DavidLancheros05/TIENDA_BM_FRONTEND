// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api'; // importa tu instancia de Axios

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  // Verificar token con backend al iniciar
  useEffect(() => {
    const validarToken = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setCargando(false);
        return;
      }

      try {
        const res = await api.get('/auth/validate-token'); // ✅ esta ruta la creas en el backend abajo
        const user = res.data.usuario || res.data.user;
        setUsuario({ ...user, token });
        localStorage.setItem('usuario', JSON.stringify({ ...user, token }));
      } catch (error) {
        console.warn('❌ Token inválido. Cerrando sesión.');
        logout();
      } finally {
        setCargando(false);
      }
    };

    validarToken();
  }, []);

  const login = (user) => {
    const usuarioConId = { ...user, _id: user._id || user.id };
    setUsuario(usuarioConId);
    localStorage.setItem('usuario', JSON.stringify(usuarioConId));
    if (user.token) localStorage.setItem('token', user.token);
    console.log('✅ Usuario logueado:', usuarioConId);
  };

  const logout = () => {
    setUsuario(null);
    localStorage.removeItem('usuario');
    localStorage.removeItem('token');
    console.log('👋 Usuario deslogueado');
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout, cargando }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
