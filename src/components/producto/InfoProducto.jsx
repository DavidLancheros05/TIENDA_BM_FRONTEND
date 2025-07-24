import React from 'react';

export const InfoProducto = ({ producto, renderEstrellas }) => (
  <div className="col-md-6">
    <h3>{producto.nombre}</h3>
    <p><strong>Marca:</strong> {producto.marca || 'Sin especificar'}</p>
    {producto.color && <p><strong>Color:</strong> {producto.color}</p>}
    {producto.talla && <p><strong>Talla:</strong> {producto.talla}</p>}

    {producto.descripcion && (
      <div className="mt-3">
        <h5>Descripción:</h5>
        <p>{producto.descripcion}</p>
      </div>
    )}

    <div className="mt-4">
      <h5>Puntaje promedio:</h5>
      {renderEstrellas(producto.promedioEstrellas || 0)}
    </div>
  </div>
);
