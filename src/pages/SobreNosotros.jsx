import React from 'react';

const SobreNosotros = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center text-yellow-500 mb-10">Sobre Nosotros</h1>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-16">
        <div>
          
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Nuestra Historia</h2>
          <p className="text-gray-700 leading-relaxed">
            En <strong>Col_Bog_Bike</strong> nacimos con la misión de impulsar la movilidad sostenible
            en Colombia. Comenzamos como un pequeño grupo de apasionados por las bicicletas y
            hoy somos una comunidad que cree en transformar ciudades a través del pedaleo.
          </p>
        </div>
      </section>

      <section className="bg-gray-100 rounded-2xl p-10 shadow-inner mb-16">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">¿Por qué elegirnos?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div>
            <i className="fas fa-bicycle text-yellow-500 text-4xl mb-2"></i>
            <h3 className="font-semibold text-lg">Variedad de productos</h3>
            <p className="text-gray-600 text-sm">Desde bicicletas eléctricas hasta accesorios únicos.</p>
          </div>
          <div>
            <i className="fas fa-tools text-yellow-500 text-4xl mb-2"></i>
            <h3 className="font-semibold text-lg">Calidad garantizada</h3>
            <p className="text-gray-600 text-sm">Solo trabajamos con marcas confiables.</p>
          </div>
          <div>
            <i className="fas fa-shipping-fast text-yellow-500 text-4xl mb-2"></i>
            <h3 className="font-semibold text-lg">Envíos a todo el país</h3>
            <p className="text-gray-600 text-sm">Rápidos, seguros y confiables.</p>
          </div>
          <div>
            <i className="fas fa-users text-yellow-500 text-4xl mb-2"></i>
            <h3 className="font-semibold text-lg">Atención personalizada</h3>
            <p className="text-gray-600 text-sm">Te acompañamos en todo el proceso de compra.</p>
          </div>
        </div>
      </section>

      <section className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Visítanos o contáctanos</h2>
        <p className="text-gray-700 mb-4">
          Estamos ubicados en Bogotá, pero llegamos a toda Colombia.
        </p>
        <a
          href="/"
          className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-6 rounded-xl shadow transition duration-300"
        >
          Ir al Inicio
        </a>
      </section>
    </div>
  );
};

export default SobreNosotros;
