import React from 'react';

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: '#222',
        color: 'white',
        padding: '1rem 1rem',
        textAlign: 'center',
        marginTop: '2rem',
      }}
    >
      <div style={{ marginBottom: '0.5rem' }}>
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'white', margin: '0 8px' }}
        >
          Facebook
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'white', margin: '0 8px' }}
        >
          Twitter
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'white', margin: '0 8px' }}
        >
          Instagram
        </a>
      </div>
      <small>© 2025 BiciShop. Todos los derechos reservados.</small>
    </footer>
  );
};

export default Footer;
