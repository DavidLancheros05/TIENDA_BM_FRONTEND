import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const imagenes = [
  '/img/bike1.jpg',
  '/img/bike2.jpg',
  '/img/bike3.jpg',
];

const Inicio = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <div className="text-white" style={{ fontFamily: 'sans-serif' }}>
      {/* Hero */}
      <div
        className="text-center d-flex align-items-center justify-content-center"
        style={{
          height: '90vh',
          backgroundImage: 'url(/img/hero-bike.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
        }}
      >
        <div style={{ backgroundColor: 'rgba(0,0,0,0.6)', padding: '2rem', borderRadius: '10px' }}>
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mb-3"
            style={{ fontSize: '3rem', fontWeight: 'bold' }}
          >
            Bienvenido a Col_Bog_Bike 🚴‍♂️
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mb-4"
            style={{ fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto' }}
          >
            Bicicletas, aventuras y movilidad sostenible en Bogotá.
          </motion.p>
          <Link to="/bicicletas" className="btn btn-lg btn-warning px-4">
            Explorar productos
          </Link>
        </div>
      </div>

      {/* Carrusel */}
      <div className="container my-5">
        <h2 className="text-center text-dark mb-4">Lo mejor en bicicletas</h2>
        <Slider {...settings}>
          {imagenes.map((src, idx) => (
            <div key={idx}>
              <img
                src={src}
                alt={`bike-${idx}`}
                style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: '10px' }}
              />
            </div>
          ))}
        </Slider>
      </div>

      {/* Redes Sociales */}
      <div className="text-center bg-dark py-5 mt-5">
        <h4>Síguenos en redes</h4>
        <div className="d-flex justify-content-center gap-4 mt-3">
          <a href="https://www.instagram.com/col_bog_bike/" target="_blank" rel="noreferrer">
            <i className="fab fa-instagram fa-2x text-white"></i>
          </a>
          <a href="https://www.youtube.com/channel/UCVhvGo3YgZwKmLPcIL9gSlw" target="_blank" rel="noreferrer">
            <i className="fab fa-youtube fa-2x text-danger"></i>
          </a>
          <a href="https://web.facebook.com/ColBogBike?_rdc=1&_rdr" target="_blank" rel="noreferrer">
            <i className="fab fa-facebook fa-2x text-white"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Inicio;
