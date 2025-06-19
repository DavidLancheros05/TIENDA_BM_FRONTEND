import React from 'react';
import { Link } from 'react-router-dom';

const Inicio = () => {
  return (
    <div className="container text-center" style={{ padding: '4rem 1rem' }}>
      <h1 className="mb-4" style={{ fontWeight: 'bold', fontSize: '3rem', color: '#0d6efd' }}>
        Bienvenido a Col_Bog_Bike 🚴‍♂️
      </h1>

      <p style={{ fontSize: '1.2rem', color: '#555', maxWidth: '800px', margin: 'auto' }}>
        Somos una tienda especializada en bicicletas y accesorios en Bogotá. Amamos la movilidad sostenible,
        el ciclismo urbano y la aventura. Descubre nuestras bicicletas, repuestos y equipamiento de alta calidad.
      </p>

      <div className="my-5">
        <Link to="/bicicletas" className="btn btn-primary btn-lg">
          Explorar productos
        </Link>
      </div>

      <div className="mt-5">
        <h4>Síguenos en nuestras redes sociales:</h4>
        <div className="d-flex justify-content-center gap-4 mt-3">
          <a href="https://www.instagram.com/col_bog_bike/" target="_blank" rel="noreferrer">
            <i className="fab fa-instagram fa-2x text-danger"></i>
          </a>
          <a href="https://www.youtube.com/channel/UCVhvGo3YgZwKmLPcIL9gSlw" target="_blank" rel="noreferrer">
            <i className="fab fa-youtube fa-2x text-danger"></i>
          </a>
          <a href="https://web.facebook.com/ColBogBike?_rdc=1&_rdr" target="_blank" rel="noreferrer">
            <i className="fab fa-facebook fa-2x text-primary"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Inicio;
