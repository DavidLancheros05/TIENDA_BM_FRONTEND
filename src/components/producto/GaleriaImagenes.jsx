import React from 'react';

export const GaleriaImagenes = ({ imagenes, imagenSeleccionada, onSeleccionar, apiUrl }) => (
  <div className="me-3">
    {imagenes.map((img, idx) => {
      const url = typeof img === 'string' ? img : img.url;
      return (
        <img
          key={idx}
          src={`${apiUrl.replace(/\/$/, '')}/${url.replace(/^\/+/, '')}`}
          alt={`Mini ${idx}`}
          onClick={() => onSeleccionar(url)}
          style={{ width: '60px', marginBottom: '8px', cursor: 'pointer' }}
        />
      );
    })}
  </div>
);
