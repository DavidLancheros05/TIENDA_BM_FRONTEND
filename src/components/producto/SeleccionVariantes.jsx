// src/components/producto/SeleccionVariantes.jsx
import React, { useEffect } from 'react';

const SeleccionVariantes = ({
  colores,
  tallas,
  colorSeleccionado,
  tallaSeleccionada,
  setColorSeleccionado,
  setTallaSeleccionada,
  variantes
}) => {
  // Filtra las tallas disponibles para el color actual
  const tallasDisponibles = tallas.filter(talla =>
    variantes.some(v => v.color === colorSeleccionado && v.talla === talla && v.stock > 0)
  );

  // Filtra los colores disponibles para la talla actual
  const coloresDisponibles = colores.filter(color =>
    variantes.some(v => v.talla === tallaSeleccionada && v.color === color && v.stock > 0)
  );

  // Si la combinación seleccionada no tiene stock, ajustar automáticamente
  useEffect(() => {
    const variante = variantes.find(v =>
      v.color === colorSeleccionado &&
      v.talla === tallaSeleccionada &&
      v.stock > 0
    );

    if (!variante) {
      // buscar una combinación válida y ajustarla
      const disponible = variantes.find(v => v.stock > 0);
      if (disponible) {
        setColorSeleccionado(disponible.color);
        setTallaSeleccionada(disponible.talla);
      }
    }
  }, [colorSeleccionado, tallaSeleccionada, variantes, setColorSeleccionado, setTallaSeleccionada]);

  return (
    <div>
      <div className="mb-3">
        <label><strong>Color:</strong></label>
        <select
          className="form-select"
          value={colorSeleccionado}
          onChange={(e) => setColorSeleccionado(e.target.value)}
        >
          {colores.map(color => (
            <option
              key={color}
              value={color}
              disabled={!coloresDisponibles.includes(color)}
            >
              {color} {!coloresDisponibles.includes(color) ? '(Sin stock)' : ''}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label><strong>Talla:</strong></label>
        <select
          className="form-select"
          value={tallaSeleccionada}
          onChange={(e) => setTallaSeleccionada(e.target.value)}
        >
          {tallas.map(talla => (
            <option
              key={talla}
              value={talla}
              disabled={!tallasDisponibles.includes(talla)}
            >
              {talla} {!tallasDisponibles.includes(talla) ? '(Sin stock)' : ''}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SeleccionVariantes;
