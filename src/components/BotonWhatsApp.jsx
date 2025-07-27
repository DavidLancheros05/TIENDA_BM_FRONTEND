// src/components/BotonWhatsApp.jsx
import React from 'react';

const BotonWhatsApp = () => {
  const numero = '573001112233'; // <-- Cambia este número al de Col_Bog_Bike
  const mensaje = '¡Hola! Estoy interesado en una bicicleta. ¿Me puedes ayudar?';

  return (
    <a
      href={`https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`}
      className="whatsapp-button"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contáctanos por WhatsApp"
    >
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
        alt="WhatsApp"
        style={{
          width: '55px',
          height: '55px',
          position: 'fixed',
          bottom: '25px',
          right: '25px',
          zIndex: '1000',
          cursor: 'pointer',
          borderRadius: '50%',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
        }}
      />
    </a>
  );
};

export default BotonWhatsApp;
