import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import ForgotPassword from './ForgotPassword'; // importa al inicio

export default function Login() {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async e => {
    e.preventDefault();
    console.log('Enviando login:', { correo, password });
    try {
      const res = await axios.post(`${API_URL}/auth/login`, { correo, password });
      const { token, user } = res.data;

      const usuario = { ...user, token };

      console.log("✅ Usuario logueado con éxito:", usuario);
      login(usuario);

      if (usuario.rol === 'admin') {
        navigate('/adminDashboard');
      } else {
        navigate('/');
      }
    } catch (err) {
  console.error('Error en login:', err.response?.data);
  setError(err.response?.data?.msg || 'Error en login');
}
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-4" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 className="text-center mb-4">Iniciar Sesión</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="correo" className="form-label">Correo electrónico</label>
            <input
              type="email"
              className="form-control"
              id="correo"
              placeholder="correo@ejemplo.com"
              value={correo}
              onChange={e => setCorreo(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">Ingresar</button>
        </form>

        {error && <div className="alert alert-danger mt-3">{error}</div>}

        <p className="mt-3 text-center">
          ¿No tienes cuenta?{' '}
          <Link to="/register" className="text-decoration-none">
            Regístrate aquí
          </Link>
        </p>

        <p className="text-center mt-2">
          <Link to="/forgot-password" className="text-decoration-none text-primary">
            ¿Olvidaste tu contraseña?
          </Link>
        </p>
      </div>
    </div>
  );
}
