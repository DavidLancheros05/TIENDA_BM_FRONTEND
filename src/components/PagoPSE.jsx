import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ResumenPago from './ResumenPago';

function PagoPSE() {
  const [form, setForm] = useState({
    valor: '',
    descripcion: '',
    nombreComprador: '',
    emailComprador: ''
  });

  const [transaccion, setTransaccion] = useState(null);
  const [mostrandoResumen, setMostrandoResumen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${API_URL}/api/crear-pago-pse`, form);

      // Aquí asumo que la respuesta te devuelve el resumen de la transacción directamente
      // Si solo te da redirectUrl, entonces rediriges y obtienes la respuesta después
      if(res.data.transactionResponse) {
        setTransaccion(res.data);
        setMostrandoResumen(true);
      } else if(res.data.redirectUrl) {
        window.location.href = res.data.redirectUrl; // redirige a PSE
      }
    } catch (error) {
      alert('Error al iniciar pago PSE');
      console.error(error);
    }
  };

  if(mostrandoResumen && transaccion) {
    return <ResumenPago transaccion={transaccion} />;
  }

  return (
    <form onSubmit={handleSubmit} className="container mt-4" style={{ maxWidth: '400px' }}>
      <input 
        name="nombreComprador" 
        placeholder="Nombre completo" 
        value={form.nombreComprador} 
        onChange={handleChange} 
        required 
        className="form-control mb-3"
      />
      <input 
        name="emailComprador" 
        type="email" 
        placeholder="Email" 
        value={form.emailComprador} 
        onChange={handleChange} 
        required 
        className="form-control mb-3"
      />
      <input 
        name="valor" 
        type="number" 
        placeholder="Valor a pagar" 
        value={form.valor} 
        onChange={handleChange} 
        required 
        className="form-control mb-3"
      />
      <input 
        name="descripcion" 
        placeholder="Descripción del pago" 
        value={form.descripcion} 
        onChange={handleChange} 
        required 
        className="form-control mb-3"
      />
      <button type="submit" className="btn btn-primary w-100">Pagar con PSE</button>
    </form>
  );
}

export default PagoPSE;
