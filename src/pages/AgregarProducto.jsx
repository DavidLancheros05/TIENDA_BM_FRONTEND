import React, { useState } from 'react';
import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;

const AgregarProducto = ({ token }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    categoria: '',
    imagen: ''
  });
  const [mensaje, setMensaje] = useState('');

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const res = await axios.post(`${API_URL}/api/productos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`  // TOKEN para admin
        },
        body: JSON.stringify({
          ...formData,
          precio: Number(formData.precio)
        })
      });

      if (!res.ok) {
        const errorData = await res.json();
        setMensaje(`Error: ${errorData.msg}`);
        return;
      }

      const data = await res.json();
      setMensaje(`Producto "${data.nombre}" creado con éxito!`);
      setFormData({ nombre: '', descripcion: '', precio: '', categoria: '', imagen: '' });
    } catch (error) {
      setMensaje('Error al conectar con el servidor');
    }
  };

  return (
    <div>
      <h2>Agregar nuevo producto</h2>
      {mensaje && <p>{mensaje}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
        /><br/>
        <textarea
          name="descripcion"
          placeholder="Descripción"
          value={formData.descripcion}
          onChange={handleChange}
          required
        ></textarea><br/>
        <input
          type="number"
          name="precio"
          placeholder="Precio"
          value={formData.precio}
          onChange={handleChange}
          required
        /><br/>
        <input
          type="text"
          name="categoria"
          placeholder="Categoría"
          value={formData.categoria}
          onChange={handleChange}
          required
        /><br/>
        <input
          type="text"
          name="imagen"
          placeholder="URL imagen"
          value={formData.imagen}
          onChange={handleChange}
        /><br/>
        <button type="submit">Crear producto</button>
      </form>
    </div>
  );
};

export default AgregarProducto;
