import React, { useState } from 'react';

const ForgotPassword = () => {
  const [correo , setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo  }),
      });

      const data = await res.json();
      if (res.ok) {
        setMensaje('📧 Revisa tu correo para restablecer la contraseña.');
      } else {
        setMensaje(data.mensaje || '❌ Error al enviar correo.');
      }
    } catch (error) {
      setMensaje('❌ Error al conectar con el servidor.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>¿Olvidaste tu contraseña?</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Correo electrónico:</label>
          <input
            type="email"
            className="form-control"
            value={correo }
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button className="btn btn-primary" type="submit">Enviar enlace</button>
      </form>
      {mensaje && <div className="alert alert-info mt-3">{mensaje}</div>}
    </div>
  );
};

export default ForgotPassword;
