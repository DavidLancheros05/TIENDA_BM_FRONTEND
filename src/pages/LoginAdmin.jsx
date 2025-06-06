import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';  // IMPORTAR AXIOS

export default function LoginAdmin({ setToken }) {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, {
        correo,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const data = res.data; // axios ya parsea el JSON

      if (!res.status === 200) throw new Error(data.msg || 'Error en login');

      setToken(data.token);
      localStorage.setItem('token', data.token);
      navigate('/adminDashboard');
    } catch (err) {
      setError(err.response?.data?.msg || err.message);
    }
  };

  return (
    <div>
      <h2>Login Admin</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Ingresar</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
