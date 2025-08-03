import React, { useState } from 'react';

export const GaleriaImagenes = ({ imagenes = [], getImagenUrl }) => {
  // Convertimos a URLs válidas
  const imagenesUnicas = Array.from(
    new Set(
      imagenes
        .filter(Boolean)
        .map(img => (typeof img === 'string' ? img : img?.url))
        .filter(Boolean)
    )
  );

  const [imagenSeleccionada, setImagenSeleccionada] = useState(imagenesUnicas[0] || '');
  const [backgroundSize, setBackgroundSize] = useState('100% 125%');
  const [backgroundPos, setBackgroundPos] = useState('center');

  const imagenUrlFinal = imagenSeleccionada ? getImagenUrl(imagenSeleccionada) : null;

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setBackgroundPos(`${x}% ${y}%`);
    setBackgroundSize('200%');
  };

  const handleMouseLeave = () => {
    setBackgroundPos('center');
    setBackgroundSize('100% 125%');
  };

  return (
    <div className="d-flex">
      {/* Miniaturas solo si hay imágenes */}
      {imagenesUnicas.length > 0 && (
        <div className="me-3 d-flex flex-column" style={{ maxHeight: '500px', overflowY: 'auto' }}>
          {imagenesUnicas.map((url, idx) => {
            const finalUrl = getImagenUrl(url);
            return (
              <img
                key={idx}
                src={finalUrl}
                alt={`Mini ${idx}`}
                onClick={() => setImagenSeleccionada(url)}
                style={{
                  width: '80px',
                  height: 'auto',
                  marginBottom: '10px',
                  cursor: 'pointer',
                  border: imagenSeleccionada === url ? '2px solid #007bff' : '2px solid transparent',
                  borderRadius: '6px',
                }}
              />
            );
          })}
        </div>
      )}

      {/* Cuadro de imagen principal (aunque no haya imagen seleccionada) */}
      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          width: '100%',
          maxWidth: '600px',
          aspectRatio: '4 / 3',
          overflow: 'hidden',
          borderRadius: '8px',
          backgroundImage: imagenUrlFinal ? `url(${imagenUrlFinal})` : 'none',
          backgroundSize: backgroundSize,
          backgroundPosition: backgroundPos,
          backgroundRepeat: 'no-repeat',
          backgroundColor: '#f8f9fa',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {!imagenUrlFinal && (
          <span style={{ color: '#ccc', fontSize: '1.2rem' }}>Sin imagen</span>
        )}
      </div>
    </div>
  );
};
