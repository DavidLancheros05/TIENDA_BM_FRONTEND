import React from 'react';

export const GaleriaImagenes = ({ imagenes, imagenSeleccionada, onSeleccionar, getImagenUrl }) => (
  <div className="me-3">
    {imagenes.map((img, idx) => {
      const url = typeof img === 'string' ? img : img.url;
      const finalUrl = getImagenUrl(url); // ✅ Usa el helper que viene de ProductoDetalle

      return (
        <img
          key={idx}
          src={finalUrl}
          alt={`Mini ${idx}`}
          onClick={() => onSeleccionar(url)}
          style={{
            width: '60px',
            marginBottom: '8px',
            cursor: 'pointer',
            border: imagenSeleccionada === url ? '2px solid #007bff' : '2px solid transparent',
            borderRadius: '4px',
          }}
        />
      );
    })}
  </div>
);
