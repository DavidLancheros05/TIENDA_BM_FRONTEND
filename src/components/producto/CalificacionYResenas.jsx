// src/components/producto/CalificacionYResenas.jsx
import React from 'react';
import ResenasProducto from './ResenasProducto';

import { ResenaForm } from './ResenaForm';
const CalificacionYResenas = ({
  promedioEstrellas = 0,
  resenas = [],
  estrellas,
  comentario,
  setEstrellas,
  setComentario,
  enviarResena,
  token
}) => {
  const renderEstrellas = (num) =>
    '⭐'.repeat(Math.round(num)) + '☆'.repeat(5 - Math.round(num));

  return (
    <div className="mt-5">
      <p><strong>Calificación:</strong> {renderEstrellas(promedioEstrellas)}</p>
      <h4>📝 Opiniones y reseñas</h4>
      <ResenasProducto resenas={resenas} renderEstrellas={renderEstrellas} />
      <ResenaForm
        estrellas={estrellas}
        comentario={comentario}
        setEstrellas={setEstrellas}
        setComentario={setComentario}
        enviarResena={enviarResena}
        token={token}
      />
    </div>
  );
};

export default CalificacionYResenas;
