import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function AdminProductos() {
  const [productos, setProductos] = useState([]);
  const [editId, setEditId] = useState(null);
  const [mensaje, setMensaje] = useState('');
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:10000';

  const [formEdit, setFormEdit] = useState({
    nombre: '', descripcion: '', precio: '', categoria: '', tipoProducto: '', imagen: '', colores: '', tallas: ''
  });

  const [formNew, setFormNew] = useState({
    nombre: '', descripcion: '', precio: '', precioOriginal: '', descuento: '',
    categoria: '', tipoProducto: '', imagen: '', marca: '', colores: '', tallas: ''
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
        showMessage('❌ Error al cargar productos');
      }
    };
    fetchProductos();
  }, [API_URL]);

  const showMessage = (msg) => {
    setMensaje(msg);
    setTimeout(() => setMensaje(''), 3000);
  };

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
      const nuevoProducto = {
        ...formNew,
        colores: (formNew.colores || '').split(',').map(c => c.trim()),
        tallas: (formNew.tallas || '').split(',').map(t => t.trim())
      };
      const res = await axios.post(`${API_URL}/api/productos`, nuevoProducto, config);
      setProductos(prev => [...prev, res.data]);
      setFormNew({
        nombre: '', descripcion: '', precio: '', precioOriginal: '', descuento: '',
        categoria: '', tipoProducto: '', imagen: '', marca: '', colores: '', tallas: ''
      });
      showMessage('✅ Producto creado con éxito');
    } catch (err) {
      console.error('Error al crear producto:', err);
      showMessage('❌ Error al crear producto');
    }
  };

  const handleEditClick = producto => {
    setEditId(producto._id);
    setFormEdit({
      ...producto,
      colores: Array.isArray(producto.colores) ? producto.colores.join(', ') : '',
      tallas: Array.isArray(producto.tallas) ? producto.tallas.join(', ') : ''
    });
  };

  const handleSave = async id => {
    try {
      const updatedProducto = {
        ...formEdit,
        colores: (formEdit.colores || '').split(',').map(c => c.trim()),
        tallas: (formEdit.tallas || '').split(',').map(t => t.trim())
      };
      const res = await axios.put(`${API_URL}/api/productos/${id}`, updatedProducto, config);
      setProductos(prev => prev.map(p => (p._id === id ? res.data : p)));
      setEditId(null);
      showMessage('✅ Producto actualizado');
    } catch (err) {
      console.error('Error guardando producto:', err);
      showMessage('❌ Error al guardar producto');
    }
  };

  const handleDelete = async id => {
    if (!window.confirm('¿Eliminar producto?')) return;
    try {
      await axios.delete(`${API_URL}/api/productos/${id}`, config);
      setProductos(prev => prev.filter(p => p._id !== id));
      if (editId === id) setEditId(null);
      showMessage('✅ Producto eliminado');
    } catch (err) {
      console.error('Error eliminando producto:', err);
      showMessage('❌ No se pudo eliminar');
    }
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4">🎯 Administración de Productos</h2>

      {mensaje && <div className="alert alert-info">{mensaje}</div>}

      {/* Formulario de nuevo producto */}
      <div className="card p-4 mb-5 shadow-sm">
        <h4 className="mb-3">➕ Nuevo producto</h4>
        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col-md-6">
            <input
              name="nombre"
              className="form-control"
              placeholder="Nombre"
              value={formNew.nombre}
              onChange={handleNewChange}
              required
            />
          </div>
          <div className="col-md-6">
            <input
              name="marca"
              className="form-control"
              placeholder="Marca"
              value={formNew.marca}
              onChange={handleNewChange}
            />
          </div>
          <div className="col-md-12">
            <textarea
              name="descripcion"
              className="form-control"
              placeholder="Descripción"
              value={formNew.descripcion}
              onChange={handleNewChange}
              required
            />
          </div>
          <div className="col-md-4">
            <input
              type="number"
              name="precio"
              className="form-control"
              placeholder="Precio"
              value={formNew.precio}
              onChange={handleNewChange}
              required
            />
          </div>
          <div className="col-md-4">
            <input
              type="number"
              name="precioOriginal"
              className="form-control"
              placeholder="Precio Original"
              value={formNew.precioOriginal}
              onChange={handleNewChange}
            />
          </div>
          <div className="col-md-4">
            <input
              type="number"
              name="descuento"
              className="form-control"
              placeholder="Descuento %"
              value={formNew.descuento}
              onChange={handleNewChange}
            />
          </div>
          <div className="col-md-4">
            <input
              name="categoria"
              className="form-control"
              placeholder="Categoría"
              value={formNew.categoria}
              onChange={handleNewChange}
              required
            />
          </div>
          <div className="col-md-4">
            <input
              name="tipoProducto"
              className="form-control"
              placeholder="Tipo de producto"
              value={formNew.tipoProducto}
              onChange={handleNewChange}
              required
            />
          </div>
          <div className="col-md-4">
            <input
              name="imagen"
              className="form-control"
              placeholder="URL imagen"
              value={formNew.imagen}
              onChange={handleNewChange}
            />
          </div>
          <div className="col-md-6">
            <input
              name="colores"
              className="form-control"
              placeholder="Colores (separados por coma)"
              value={formNew.colores}
              onChange={handleNewChange}
            />
          </div>
          <div className="col-md-6">
            <input
              name="tallas"
              className="form-control"
              placeholder="Tallas (separadas por coma)"
              value={formNew.tallas}
              onChange={handleNewChange}
            />
          </div>
          <div className="col-12 text-end">
            <button type="submit" className="btn btn-primary">Crear producto</button>
          </div>
        </form>
      </div>

      {/* Tabla de productos */}
      <h4>📦 Lista de productos</h4>
      <div className="table-responsive">
        <table className="table table-striped align-middle">
          <thead className="table-dark">
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Categoría</th>
              <th>Tipo</th>
              <th>Imagen</th>
              <th>Colores</th>
              <th>Tallas</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map(producto => (
              <tr key={producto._id}>
                {editId === producto._id ? (
                  <>
                    <td>
                      <input
                        className="form-control"
                        name="nombre"
                        value={formEdit.nombre}
                        onChange={handleEditChange}
                      />
                    </td>
                    <td>
                      <textarea
                        className="form-control"
                        name="descripcion"
                        value={formEdit.descripcion}
                        onChange={handleEditChange}
                      />
                    </td>
                    <td>
                      <input
                        className="form-control"
                        name="precio"
                        type="number"
                        value={formEdit.precio}
                        onChange={handleEditChange}
                      />
                    </td>
                    <td>
                      <input
                        className="form-control"
                        name="categoria"
                        value={formEdit.categoria}
                        onChange={handleEditChange}
                      />
                    </td>
                    <td>
                      <input
                        className="form-control"
                        name="tipoProducto"
                        value={formEdit.tipoProducto}
                        onChange={handleEditChange}
                      />
                    </td>
                    <td>
                      <input
                        className="form-control"
                        name="imagen"
                        value={formEdit.imagen}
                        onChange={handleEditChange}
                      />
                    </td>
                    <td>
                      <input
                        className="form-control"
                        name="colores"
                        value={formEdit.colores || ''}
                        onChange={handleEditChange}
                      />
                    </td>
                    <td>
                      <input
                        className="form-control"
                        name="tallas"
                        value={formEdit.tallas || ''}
                        onChange={handleEditChange}
                      />
                    </td>
                    <td>
                      <button
                        className="btn btn-success btn-sm me-1"
                        onClick={() => handleSave(producto._id)}
                      >
                        Guardar
                      </button>
                      <button
                        className="btn btn-secondary btn-sm me-1"
                        onClick={() => setEditId(null)}
                      >
                        Cancelar
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(producto._id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{producto.nombre}</td>
                    <td>{producto.descripcion}</td>
                    <td>${producto.precio}</td>
                    <td>{producto.categoria}</td>
                    <td>{producto.tipoProducto}</td>
                    <td>
                      {producto.imagen && (
                        <img
                          src={producto.imagen}
                          alt={producto.nombre}
                          style={{ maxWidth: '50px' }}
                        />
                      )}
                    </td>
                    <td>{producto.colores?.join(', ')}</td>
                    <td>{producto.tallas?.join(', ')}</td>
                    <td>
                      <button
                        className="btn btn-warning btn-sm me-1"
                        onClick={() => handleEditClick(producto)}
                      >
                        Editar
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(producto._id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminProductos;
