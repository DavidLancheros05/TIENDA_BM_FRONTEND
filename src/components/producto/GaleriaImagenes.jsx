// src/components/producto/GaleriaImagenes.jsx
import React, { useState } from 'react';

export const GaleriaImagenes = ({ imagenes, getImagenUrl }) => {
  const [imagenSeleccionada, setImagenSeleccionada] = useState(
    imagenes && imagenes[0]?.url ? imagenes[0].url : ''
  );

  const imagenUrlFinal = getImagenUrl(imagenSeleccionada);

  return (
    <div className="d-flex">
      {/* Miniaturas */}
      <div className="me-3">
        {imagenes.map((img, idx) => {
          const url = typeof img === 'string' ? img : img.url;
          const finalUrl = getImagenUrl(url);

          return (
            <img
              key={idx}
              src={finalUrl}
              alt={`Mini ${idx}`}
              onClick={() => setImagenSeleccionada(url)}
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

      {/* Imagen principal */}
      <div className="flex-grow-1 d-flex align-items-center justify-content-center">
        <img
          src={imagenUrlFinal}
          alt="Imagen principal"
          className="img-fluid rounded shadow"
          style={{ maxHeight: '400px', objectFit: 'contain' }}
        />
      </div>
    </div>
  );
};
