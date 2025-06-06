import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginAdmin({ setToken }) {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.msg || 'Error en login');

      setToken(data.token);
      localStorage.setItem('token', data.token);
      navigate('/adminDashboard');  // redirigir a dashboard admin
    } catch (err) {
      setError(err.message);
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
