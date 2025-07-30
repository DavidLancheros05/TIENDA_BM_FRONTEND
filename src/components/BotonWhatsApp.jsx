import React from 'react';

const BotonWhatsApp = () => {
  // --- ¡CORRECCIÓN AQUÍ! Cambiado de REACT_APP_ a VITE_ ---
  const numero = import.meta.env.VITE_NUMERO_WHATSAPP;
  // --- FIN DE LA CORRECCIÓN ---

  const enlace = `https://wa.me/${numero}`;
  console.log("Número de WhatsApp:", numero); // Verifica que el número se muestre correctamente en la consola

  return (
    <a
      href={enlace}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        backgroundColor: '#25D366',
        color: 'white',
        borderRadius: '50%',
        padding: '15px',
        fontSize: '24px',
        zIndex: 1000,
        boxShadow: '0 4px 6px rgba(0,0,0,0.2)'
      }}
    >
      <i className="fab fa-whatsapp"></i>
    </a>
  );
};

export default BotonWhatsApp;
