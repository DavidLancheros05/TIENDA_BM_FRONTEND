import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

export default function Login() {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const API_URL = process.env.REACT_APP_API_URL;

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, { correo, password });

      // Asumiendo backend devuelve { token, user: { rol, ... } }
      const { token, user } = res.data;
      const rol = user.rol;

      login(token, rol);

      if (rol === 'admin') {
        navigate('/adminDashboard');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.msg || 'Error en login');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto' }}>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input
          type="email"
          placeholder="Correo"
          value={correo}
          onChange={e => setCorreo(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit" style={{ padding: '8px', cursor: 'pointer' }}>Ingresar</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <p style={{ marginTop: '15px' }}>
        ¿No tienes cuenta?{' '}
        <Link to="/register" style={{ color: 'blue', textDecoration: 'underline' }}>
          Registrar
        </Link>
      </p>
    </div>
  );
}
