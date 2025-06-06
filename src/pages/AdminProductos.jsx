import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminProductos() {
  const [productos, setProductos] = useState([]);
  const [editId, setEditId] = useState(null);
  const [mensaje, setMensaje] = useState('');
  const API_URL = process.env.REACT_APP_API_URL;

  const [formEdit, setFormEdit] = useState({
    nombre: '', descripcion: '', precio: '', categoria: '', imagen: ''
  });

  const [formNew, setFormNew] = useState({
    nombre: '', descripcion: '', precio: '', categoria: '', imagen: ''
  });

  const token = localStorage.getItem('token');
  const config = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    if (!API_URL) return;
    const fetchProductos = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/productos`);
        setProductos(res.data);
      } catch (error) {
        console.error('Error al cargar productos:', error);
      }
    };
    fetchProductos();
  }, [API_URL]);

  const handleNewChange = e => {
    const { name, value } = e.target;
    setFormNew(prev => ({ ...prev, [name]: value }));
  };

  const handleEditChange = e => {
    const { name, value } = e.target;
    setFormEdit(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/api/productos`, formNew, config);
      setProductos(prev => [...prev, res.data]);
      setFormNew({ nombre: '', descripcion: '', precio: '', categoria: '', imagen: '' });
      showMessage('Producto creado con éxito');
    } catch (err) {
      showMessage('Error al crear producto');
    }
  };

  const handleEditClick = (producto) => {
    setEditId(producto._id);
    setFormEdit(producto);
  };

  const handleSave = async (id) => {
    try {
      const res = await axios.put(`${API_URL}/api/productos/${id}`, formEdit, config);
      setProductos(prev => prev.map(p => (p._id === id ? res.data : p)));
      setEditId(null);
      showMessage('Producto actualizado');
    } catch (err) {
      showMessage('Error al guardar producto');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar producto?')) return;
    try {
      await axios.delete(`${API_URL}/api/productos/${id}`, config);
      setProductos(prev => prev.filter(p => p._id !== id));
    } catch (err) {
      showMessage('No se pudo eliminar');
    }
  };

  const showMessage = (msg) => {
    setMensaje(msg);
    setTimeout(() => setMensaje(''), 3000);
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h2>Agregar nuevo producto</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem', display: 'grid', gap: '1rem', maxWidth: '600px' }}>
        <input name="nombre" placeholder="Nombre" value={formNew.nombre} onChange={handleNewChange} required />
        <textarea name="descripcion" placeholder="Descripción" value={formNew.descripcion} onChange={handleNewChange} required />
        <input type="number" name="precio" placeholder="Precio" value={formNew.precio} onChange={handleNewChange} required />
        <input name="categoria" placeholder="Categoría" value={formNew.categoria} onChange={handleNewChange} required />
        <input name="imagen" placeholder="URL Imagen" value={formNew.imagen} onChange={handleNewChange} />
        <button type="submit">Crear producto</button>
      </form>

      {mensaje && <p style={{ color: 'green' }}>{mensaje}</p>}

      <h2>Lista de productos</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#f0f0f0' }}>
            <th>Nombre</th><th>Descripción</th><th>Precio</th><th>Categoría</th><th>Imagen</th><th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map(producto => (
            <tr key={producto._id} style={{ borderBottom: '1px solid #ccc' }}>
              {editId === producto._id ? (
                <>
                  <td><input name="nombre" value={formEdit.nombre} onChange={handleEditChange} /></td>
                  <td><textarea name="descripcion" value={formEdit.descripcion} onChange={handleEditChange} /></td>
                  <td><input name="precio" type="number" value={formEdit.precio} onChange={handleEditChange} /></td>
                  <td><input name="categoria" value={formEdit.categoria} onChange={handleEditChange} /></td>
                  <td><input name="imagen" value={formEdit.imagen} onChange={handleEditChange} /></td>
                  <td>
                    <button onClick={() => handleSave(producto._id)}>Guardar</button>
                    <button onClick={() => setEditId(null)}>Cancelar</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{producto.nombre}</td>
                  <td>{producto.descripcion}</td>
                  <td>${producto.precio}</td>
                  <td>{producto.categoria}</td>
                  <td>{producto.imagen && <img src={producto.imagen} alt={producto.nombre} style={{ maxWidth: '60px' }} />}</td>
                  <td>
                    <button onClick={() => handleEditClick(producto)}>Editar</button>
                    <button onClick={() => handleDelete(producto._id)} style={{ color: 'red' }}>Eliminar</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminProductos;
