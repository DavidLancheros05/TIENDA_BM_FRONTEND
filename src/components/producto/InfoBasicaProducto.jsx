// src/components/producto/InfoBasicaProducto.jsx
import React from 'react';

const InfoBasicaProducto = ({ producto, agotado }) => {
  return (
    <>
      <p><strong>Marca:</strong> {producto.marca}</p>
      <p><strong>Categoría:</strong> {producto.categoria}</p>
      <p><strong>Estado:</strong> {agotado ? 'Agotado' : 'Disponible'}</p>
      
      {producto.precioOriginal && producto.precioOriginal > producto.precio && (
        <p>
          <span className="text-muted text-decoration-line-through">
            ${producto.precioOriginal.toLocaleString('es-CO')}
          </span>{' '}
          {producto.descuento?.porcentaje && (
            <span className="badge bg-danger ms-2">
              -{producto.descuento.porcentaje}%
            </span>
          )}
        </p>
      )}

      <h4 className={`fw-bold ${agotado ? 'text-secondary' : 'text-success'}`}>
        ${producto.precio.toLocaleString('es-CO')}
      </h4>
    </>
  );
};

export default InfoBasicaProducto;
