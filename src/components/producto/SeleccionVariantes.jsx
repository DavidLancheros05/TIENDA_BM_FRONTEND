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
  // Si no hay variantes, muestra mensaje
  if (!variantes || variantes.length === 0) {
    return <p className="text-danger">No hay variantes disponibles.</p>;
  }

  // Filtra tallas disponibles según color seleccionado y stock > 0
  const tallasDisponibles = tallas.filter(talla =>
    variantes.some(v => v.color === colorSeleccionado && v.talla === talla && v.stock > 0)
  );

  // Filtra colores disponibles según talla seleccionada y stock > 0
  const coloresDisponibles = colores.filter(color =>
    variantes.some(v => v.talla === tallaSeleccionada && v.color === color && v.stock > 0)
  );

  // Ajusta selección si la combinación actual no tiene stock
  useEffect(() => {
    const varianteValida = variantes.find(v =>
      v.color === colorSeleccionado &&
      v.talla === tallaSeleccionada &&
      v.stock > 0
    );

    if (!varianteValida) {
      const disponible = variantes.find(v => v.stock > 0);
      if (
        disponible &&
        (disponible.color !== colorSeleccionado || disponible.talla !== tallaSeleccionada)
      ) {
        setColorSeleccionado(disponible.color);
        setTallaSeleccionada(disponible.talla);
      }
    }
  }, [colorSeleccionado, tallaSeleccionada, variantes]);

  return (
    <div>
      <div className="mb-3">
        <label><strong>Color:</strong></label>
        <select
          className="form-select"
          value={colorSeleccionado}
          onChange={(e) => setColorSeleccionado(e.target.value)}
        >
          {colores.map(color => {
            const stockColor = variantes
              .filter(v => v.color === color && v.talla === tallaSeleccionada)
              .reduce((sum, v) => sum + v.stock, 0);

            return (
              <option
                key={color}
                value={color}
                disabled={stockColor === 0}
              >
                {color} {stockColor === 0 ? '(Sin stock)' : `(Stock: ${stockColor})`}
              </option>
            );
          })}
        </select>
      </div>

      <div className="mb-3">
        <label><strong>Talla:</strong></label>
        <select
          className="form-select"
          value={tallaSeleccionada}
          onChange={(e) => setTallaSeleccionada(e.target.value)}
        >
          {tallas.map(talla => {
            const stockTalla = variantes
              .filter(v => v.talla === talla && v.color === colorSeleccionado)
              .reduce((sum, v) => sum + v.stock, 0);

            return (
              <option
                key={talla}
                value={talla}
                disabled={stockTalla === 0}
              >
                {talla} {stockTalla === 0 ? '(Sin stock)' : `(Stock: ${stockTalla})`}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

export default SeleccionVariantes;
