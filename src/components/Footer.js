import React from 'react';

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <div style={{ marginBottom: '0.5rem' }}>
        <a
          href="https://web.facebook.com/ColBogBike?_rdc=1&_rdr"
          target="_blank"
          rel="noopener noreferrer"
          style={linkStyle}
        >
          Facebook
        </a>
        <a
          href="https://www.instagram.com/col_bog_bike/"
          target="_blank"
          rel="noopener noreferrer"
          style={linkStyle}
        >
          Instagram
        </a>
        <a
          href="https://www.youtube.com/channel/UCVhvGo3YgZwKmLPcIL9gSlw"
          target="_blank"
          rel="noopener noreferrer"
          style={linkStyle}
        >
          YouTube
        </a>
      </div>
      <small>© 2025 Col_Bog_Bike. Todos los derechos reservados.</small>
    </footer>
  );
};

const footerStyle = {
  backgroundColor: '#222',
  color: 'white',
  padding: '1rem',
  textAlign: 'center',
  marginTop: 'auto', // empuja el footer al final
};

const linkStyle = {
  color: 'white',
  margin: '0 10px',
  textDecoration: 'none',
};

export default Footer;
