

export const ResenasProducto = ({ resenas, renderEstrellas }) => (
  <>
    {resenas.length > 0 ? (
      resenas.map((resena, index) => (
        <div key={index} className="border rounded p-3 mb-3 bg-light">
          <strong>{resena.nombreUsuario || 'Anónimo'}</strong>
          <div>{renderEstrellas(resena.estrellas)}</div>
          <p>{resena.comentario}</p>
          <small className="text-muted">{new Date(resena.fecha).toLocaleDateString()}</small>
        </div>
      ))
    ) : (
      <p className="text-muted">Este producto aún no tiene reseñas.</p>
    )}
  </>
);
