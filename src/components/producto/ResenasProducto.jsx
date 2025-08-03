// src/components/producto/ResenasProducto.jsx

const ResenasProducto = ({ resenas, renderEstrellas }) => (
  <div className="mb-4">
    {resenas.length === 0 ? (
      <p className="text-muted">Aún no hay reseñas para este producto.</p>
    ) : (
      resenas.map((resena, index) => (
        <div key={index} className="mb-3 border-bottom pb-2">
          <p className="mb-1">{renderEstrellas(resena.estrellas)}</p>
          <p className="mb-1"><strong>Comentario:</strong> {resena.comentario}</p>
          <p className="text-muted small">Usuario: {resena.usuario?.nombre || 'Anónimo'}</p>
        </div>
      ))
    )}
  </div>
);

export default ResenasProducto;
