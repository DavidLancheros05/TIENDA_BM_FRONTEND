

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4 text-center mt-auto border-top border-secondary">
      <div className="mb-3">
        <a
          href="https://web.facebook.com/ColBogBike?_rdc=1&_rdr"
          target="_blank"
          rel="noopener noreferrer"
          className="mx-3 text-white"
          style={{ transition: 'color 0.3s' }}
          onMouseEnter={(e) => (e.target.style.color = '#1877f2')}
          onMouseLeave={(e) => (e.target.style.color = 'white')}
        >
          <i className="fab fa-facebook fa-lg me-1"></i> Facebook
        </a>

        <a
          href="https://www.instagram.com/col_bog_bike/"
          target="_blank"
          rel="noopener noreferrer"
          className="mx-3 text-white"
          style={{ transition: 'color 0.3s' }}
          onMouseEnter={(e) => (e.target.style.color = '#e1306c')}
          onMouseLeave={(e) => (e.target.style.color = 'white')}
        >
          <i className="fab fa-instagram fa-lg me-1"></i> Instagram
        </a>

        <a
          href="https://www.youtube.com/channel/UCVhvGo3YgZwKmLPcIL9gSlw"
          target="_blank"
          rel="noopener noreferrer"
          className="mx-3 text-white"
          style={{ transition: 'color 0.3s' }}
          onMouseEnter={(e) => (e.target.style.color = '#ff0000')}
          onMouseLeave={(e) => (e.target.style.color = 'white')}
        >
          <i className="fab fa-youtube fa-lg me-1"></i> YouTube
        </a>
      </div>

      <small className="text-light" style={{ fontSize: '0.9rem' }}>
        © 2025 <span className="text-warning">Col_Bog_Bike</span>. Todos los derechos reservados.
      </small>
    </footer>
  );
};

export default Footer;
