// src/components/RutaProtegida.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RutaProtegida({ children, soloAdmin = false }) {
  const { usuario, cargando } = useAuth();

  if (cargando) return <div className="text-center mt-5">Verificando acceso...</div>;

  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  if (soloAdmin && usuario.rol !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
}
