

export const ResenaForm = ({
  estrellas,
  comentario,
  setEstrellas,
  setComentario,
  enviarResena,
  token
}) => (
  <div className="mt-5">
    <h5>¿Qué opinas de este producto?</h5>
    <div className="mb-2">
      <label>Estrellas:</label>
      <select
        className="form-select"
        value={estrellas}
        onChange={(e) => setEstrellas(Number(e.target.value))}
      >
        {[1, 2, 3, 4, 5].map((n) => (
          <option key={n} value={n}>{n} estrella{n > 1 ? 's' : ''}</option>
        ))}
      </select>
    </div>

    <div className="mb-2">
      <label>Comentario:</label>
      <textarea
        className="form-control"
        rows="3"
        value={comentario}
        onChange={(e) => setComentario(e.target.value)}
      />
    </div>

    {token ? (
      <button className="btn btn-outline-primary" onClick={enviarResena}>
        Enviar reseña
      </button>
    ) : (
      <p className="text-danger">Debes iniciar sesión para dejar una reseña.</p>
    )}
  </div>
);
