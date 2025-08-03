// src/components/producto/AgregarAlCarrito.jsx
import React from 'react';

const AgregarAlCarrito = ({
  precio,
  cantidad,
  setCantidad,
  handleAgregar,
  handleComprarAhora,
  stockDisponible,
  deshabilitado
}) => {
  return (
    <div>
      <p className="mb-2 fw-bold">Precio: ${precio.toLocaleString()}</p>
      <div className="mb-3">
        <label className="form-label">Cantidad:</label>
        <input
          type="number"
          className="form-control"
          min="1"
          max={stockDisponible}
          value={cantidad}
          onChange={(e) => setCantidad(Number(e.target.value))}
          disabled={deshabilitado}
        />
        {stockDisponible === 0 && (
          <small className="text-danger">Sin stock disponible para esta combinación.</small>
        )}
      </div>
      <div className="d-grid gap-2">
        <button
          className={`btn ${deshabilitado ? 'btn-secondary disabled' : 'btn-primary'}`}
          onClick={handleAgregar}
          disabled={deshabilitado}
        >
          Agregar al carrito
        </button>
        <button
          className={`btn ${deshabilitado ? 'btn-secondary disabled' : 'btn-success'}`}
          onClick={handleComprarAhora}
          disabled={deshabilitado}
        >
          Comprar ahora
        </button>
      </div>
    </div>
  );
};

export default AgregarAlCarrito;
