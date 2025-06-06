// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// function AdminProductos() {
//   const [productos, setProductos] = useState([]);
//   const [editId, setEditId] = useState(null);

//   // Estado para editar producto con todos los campos
//   const [formEdit, setFormEdit] = useState({
//     nombre: '',
//     descripcion: '',
//     precio: '',
//     categoria: '',
//     imagen: ''
//   });

//   // Estado para crear nuevo producto
//   const [formNew, setFormNew] = useState({
//     nombre: '',
//     descripcion: '',
//     precio: '',
//     categoria: '',
//     imagen: ''
//   });

//   const [mensaje, setMensaje] = useState('');

//   const token = localStorage.getItem('token');

//   const config = {
//     headers: { Authorization: `Bearer ${token}` }
//   };

//   useEffect(() => {
//     const fetchProductos = async () => {
//       try {
//         const res = await `${import.meta.env.VITE_API_URL}/api/productos`;
//         setProductos(res.data);
//       } catch (error) {
//         console.error('Error al cargar productos:', error);
//       }
//     };
//     fetchProductos();
//   }, []);

//   // === EDITAR ===
//   const handleEditClick = (producto) => {
//     setEditId(producto._id);
//     setFormEdit({
//       nombre: producto.nombre || '',
//       descripcion: producto.descripcion || '',
//       precio: producto.precio || '',
//       categoria: producto.categoria || '',
//       imagen: producto.imagen || ''
//     });
//   };

//   const handleEditChange = (e) => {
//     const { name, value } = e.target;
//     setFormEdit(prev => ({ ...prev, [name]: value }));
//   };

//   const handleCancelEdit = () => {
//     setEditId(null);
//     setFormEdit({
//       nombre: '',
//       descripcion: '',
//       precio: '',
//       categoria: '',
//       imagen: ''
//     });
//   };

//   const handleSave = async (id) => {
//     try {
//       const res = await axios.put(`http://localhost:5000/api/productos/${id}`, formEdit, config);
//       setProductos(prev => prev.map(p => (p._id === id ? res.data : p)));
//       handleCancelEdit();
//       setMensaje('Producto actualizado con éxito!');
//       setTimeout(() => setMensaje(''), 3000);
//     } catch (error) {
//       alert('No se pudo guardar el producto');
//       console.error(error);
//     }
//   };

//   // === ELIMINAR ===
//   const handleDelete = async (id) => {
//     if (!window.confirm('¿Seguro que quieres eliminar este producto?')) return;
//     try {
//       await axios.delete(`http://localhost:5000/api/productos/${id}`, config);
//       setProductos(prev => prev.filter(p => p._id !== id));
//     } catch (error) {
//       alert('No se pudo eliminar el producto');
//       console.error(error);
//     }
//   };

//   // === CREAR NUEVO PRODUCTO ===
//   const handleNewChange = (e) => {
//     const { name, value } = e.target;
//     setFormNew(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post('http://localhost:5000/api/productos', formNew, config);
//       setProductos(prev => [...prev, res.data]);
//       setFormNew({
//         nombre: '',
//         descripcion: '',
//         precio: '',
//         categoria: '',
//         imagen: ''
//       });
//       setMensaje('Producto creado con éxito!');
//       setTimeout(() => setMensaje(''), 3000);
//     } catch (error) {
//       setMensaje('Error al crear producto.');
//       setTimeout(() => setMensaje(''), 3000);
//       console.error(error);
//     }
//   };

//   return (
//     <div style={{ maxWidth: '800px', margin: '2rem auto', fontFamily: 'Arial, sans-serif' }}>
//       <h2 style={{ textAlign: 'center' }}>Panel Admin - Productos</h2>

//       {mensaje && <p style={{ color: 'green', textAlign: 'center' }}>{mensaje}</p>}

//       <ul style={{ listStyle: 'none', padding: 0 }}>
//         {productos.map(producto => (
//           <li
//             key={producto._id}
//             style={{
//               border: '1px solid #ddd',
//               padding: '1rem',
//               marginBottom: '1rem',
//               borderRadius: '8px',
//               display: 'flex',
//               flexDirection: 'column',
//               gap: '0.5rem',
//               background: '#f9f9f9'
//             }}
//           >
//             {editId === producto._id ? (
//               <>
//                 <input
//                   type="text"
//                   name="nombre"
//                   placeholder="Nombre"
//                   value={formEdit.nombre}
//                   onChange={handleEditChange}
//                   style={{ padding: '0.5rem', fontSize: '1rem' }}
//                 />
//                 <textarea
//                   name="descripcion"
//                   placeholder="Descripción"
//                   value={formEdit.descripcion}
//                   onChange={handleEditChange}
//                   rows={3}
//                   style={{ padding: '0.5rem', fontSize: '1rem' }}
//                 />
//                 <input
//                   type="number"
//                   name="precio"
//                   placeholder="Precio"
//                   value={formEdit.precio}
//                   onChange={handleEditChange}
//                   style={{ padding: '0.5rem', fontSize: '1rem' }}
//                 />
//                 <input
//                   type="text"
//                   name="categoria"
//                   placeholder="Categoría"
//                   value={formEdit.categoria}
//                   onChange={handleEditChange}
//                   style={{ padding: '0.5rem', fontSize: '1rem' }}
//                 />
//                 <input
//                   type="text"
//                   name="imagen"
//                   placeholder="URL Imagen"
//                   value={formEdit.imagen}
//                   onChange={handleEditChange}
//                   style={{ padding: '0.5rem', fontSize: '1rem' }}
//                 />
//                 <div>
//                   <button
//                     onClick={() => handleSave(producto._id)}
//                     style={{
//                       marginRight: '1rem',
//                       padding: '0.5rem 1rem',
//                       backgroundColor: '#4CAF50',
//                       color: 'white',
//                       border: 'none',
//                       borderRadius: '4px',
//                       cursor: 'pointer'
//                     }}
//                   >
//                     Guardar
//                   </button>
//                   <button
//                     onClick={handleCancelEdit}
//                     style={{
//                       padding: '0.5rem 1rem',
//                       backgroundColor: '#f44336',
//                       color: 'white',
//                       border: 'none',
//                       borderRadius: '4px',
//                       cursor: 'pointer'
//                     }}
//                   >
//                     Cancelar
//                   </button>
//                 </div>
//               </>
//             ) : (
//               <>
//                 <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//                   <strong>{producto.nombre}</strong> - ${producto.precio}
//                 </div>
//                 <div>{producto.descripcion}</div>
//                 <div><em>Categoría: {producto.categoria}</em></div>
//                 {producto.imagen && (
//                   <img
//                     src={producto.imagen}
//                     alt={producto.nombre}
//                     style={{ maxWidth: '150px', borderRadius: '4px' }}
//                   />
//                 )}
//                 <div style={{ marginTop: '0.5rem' }}>
//                   <button
//                     onClick={() => handleEditClick(producto)}
//                     style={{
//                       marginRight: '1rem',
//                       padding: '0.3rem 0.8rem',
//                       cursor: 'pointer'
//                     }}
//                   >
//                     Editar
//                   </button>
//                   <button
//                     onClick={() => handleDelete(producto._id)}
//                     style={{
//                       padding: '0.3rem 0.8rem',
//                       cursor: 'pointer',
//                       color: 'white',
//                       backgroundColor: '#f44336',
//                       border: 'none',
//                       borderRadius: '4px'
//                     }}
//                   >
//                     Eliminar
//                   </button>
//                 </div>
//               </>
//             )}
//           </li>
//         ))}
//       </ul>

//       <div style={{ marginTop: '3rem' }}>
//         <h2>Agregar nuevo producto</h2>
//         <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
//           <input
//             type="text"
//             name="nombre"
//             placeholder="Nombre"
//             value={formNew.nombre}
//             onChange={handleNewChange}
//             required
//             style={{ padding: '0.5rem', fontSize: '1rem' }}
//           />
//           <textarea
//             name="descripcion"
//             placeholder="Descripción"
//             value={formNew.descripcion}
//             onChange={handleNewChange}
//             required
//             rows={3}
//             style={{ padding: '0.5rem', fontSize: '1rem' }}
//           />
//           <input
//             type="number"
//             name="precio"
//             placeholder="Precio"
//             value={formNew.precio}
//             onChange={handleNewChange}
//             required
//             style={{ padding: '0.5rem', fontSize: '1rem' }}
//           />
//           <input
//             type="text"
//             name="categoria"
//             placeholder="Categoría"
//             value={formNew.categoria}
//             onChange={handleNewChange}
//             required
//             style={{ padding: '0.5rem', fontSize: '1rem' }}
//           />
//           <input
//             type="text"
//             name="imagen"
//             placeholder="URL imagen"
//             value={formNew.imagen}
//             onChange={handleNewChange}
//             style={{ padding: '0.5rem', fontSize: '1rem' }}
//           />
//           <button
//             type="submit"
//             style={{
//               padding: '0.7rem',
//               backgroundColor: '#007bff',
//               color: 'white',
//               border: 'none',
//               borderRadius: '4px',
//               cursor: 'pointer'
//             }}
//           >
//             Crear producto
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default AdminProductos;
