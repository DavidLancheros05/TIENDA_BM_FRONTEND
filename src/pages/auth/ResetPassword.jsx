import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const ResetPassword = () => {
  const { token } = useParams();
  const [nuevaPassword, setNuevaPassword] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:5000/api/auth/reset-password/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nuevaPassword }),
      });

      const data = await res.json();
      setMensaje(data.msg || '✅ Contraseña actualizada');
    } catch (error) {
      setMensaje('❌ Error al conectar con el servidor');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Restablecer Contraseña</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Nueva contraseña:</label>
          <input
            type="password"
            className="form-control"
            value={nuevaPassword}
            onChange={(e) => setNuevaPassword(e.target.value)}
            required
          />
        </div>
        <button className="btn btn-success" type="submit">Cambiar contraseña</button>
      </form>
      {mensaje && <div className="alert alert-info mt-3">{mensaje}</div>}
    </div>
  );
};

export default ResetPassword;
