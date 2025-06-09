import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductoDetalle = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [configSeleccionada, setConfigSeleccionada] = useState(null);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/productos/${id}`)
      .then(res => {
        setProducto(res.data);
      })
      .catch(err => console.error(err));
  }, [id]);

  const handleConfigChange = (freno, tensor) => {
    const seleccion = producto.configuraciones.find(c =>
      c.tipoFreno === freno && c.tipoTensor === tensor
    );
    setConfigSeleccionada(seleccion);
  };

  if (!producto) return <p>Cargando producto...</p>;

  return (
    <div className="container py-4">
      <h2>{producto.nombre}</h2>

      {/* Galería de imágenes */}
      <div className="d-flex gap-3 mb-3">
        {producto.imagenes?.map((img, idx) => (
          <img
            key={idx}
            src={`${process.env.REACT_APP_API_URL}/${img}`}
            alt="Imagen"
            style={{ width: '120px', height: '120px', objectFit: 'cover' }}
          />
        ))}
      </div>

      {/* Descripción y configuración */}
      <p>{producto.descripcion}</p>

      <div className="row mb-3">
        <div className="col-md-4">
          <label className="form-label">Tipo de freno</label>
          <select
            className="form-select"
            onChange={e => handleConfigChange(e.target.value, configSeleccionada?.tipoTensor)}
          >
            <option>Selecciona...</option>
            {[...new Set(producto.configuraciones.map(c => c.tipoFreno))].map(f => (
              <option key={f}>{f}</option>
            ))}
          </select>
        </div>

        <div className="col-md-4">
          <label className="form-label">Tipo de tensor</label>
          <select
            className="form-select"
            onChange={e => handleConfigChange(configSeleccionada?.tipoFreno, e.target.value)}
          >
            <option>Selecciona...</option>
            {[...new Set(producto.configuraciones.map(c => c.tipoTensor))].map(t => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      <h4 className="text-success">
        Precio: ${configSeleccionada?.precio?.toFixed(2) || producto.precio.toFixed(2)}
      </h4>
    </div>
  );
};

export default ProductoDetalle;
