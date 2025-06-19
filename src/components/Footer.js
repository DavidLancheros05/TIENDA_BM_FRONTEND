import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-4 text-center mt-auto">
      <div className="mb-2">
        <a
          href="https://web.facebook.com/ColBogBike?_rdc=1&_rdr"
          target="_blank"
          rel="noopener noreferrer"
          className="mx-2 hover:text-blue-400"
        >
          Facebook
        </a>
        <a
          href="https://www.instagram.com/col_bog_bike/"
          target="_blank"
          rel="noopener noreferrer"
          className="mx-2 hover:text-pink-400"
        >
          Instagram
        </a>
        <a
          href="https://www.youtube.com/channel/UCVhvGo3YgZwKmLPcIL9gSlw"
          target="_blank"
          rel="noopener noreferrer"
          className="mx-2 hover:text-red-500"
        >
          YouTube
        </a>
      </div>
      <small className="text-sm text-gray-400">© 2025 Col_Bog_Bike. Todos los derechos reservados.</small>
    </footer>
  );
};

export default Footer;
