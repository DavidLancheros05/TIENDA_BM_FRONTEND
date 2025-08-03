// src/components/producto/DescripcionProducto.jsx
import React from 'react';

const DescripcionProducto = ({ descripcion }) => {
  return (
    <div className="p-3 bg-light border rounded shadow-sm" style={{ minWidth: '280px', maxWidth: '400px', flex: '1' }}>
      <h5 className="mb-3"><strong>Descripción:</strong></h5>
      <ul className="list-unstyled">
        {descripcion.split('-').map((item, index) => {
          const texto = item.trim();
          const capitalizado = texto.charAt(0).toUpperCase() + texto.slice(1);
          return texto ? (
            <li key={index} className="mb-2">
              <span style={{ color: 'red', marginRight: '0.5rem' }}>&#x2022;</span>
              {capitalizado}
            </li>
          ) : null;
        })}
      </ul>
    </div>
  );
};

export default DescripcionProducto;