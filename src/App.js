import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { CarritoProvider } from './context/CarritoContext';
import { AuthProvider } from './context/AuthContext';

import Header from './components/Header';
import Footer from './components/Footer';
import Register from './pages/Register';
import Productos from './pages/Productos';
import Carrito from './pages/Carrito';
import Inicio from './pages/Inicio'; // 👈 Asegúrate de importar esta nueva página

import AdminDashboard from './pages/AdminDashboard';
import LoginAdmin from './pages/Login';
import AdminProductos from './pages/AdminProductos';
import Bicicletas from './pages/Bicicletas';
import ProductoDetalle from './pages/ProductoDetalle';
import Accesorios from './pages/Accesorios';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  return (
    <AuthProvider>
      <CarritoProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Inicio />} /> {/* 👈 ahora muestra Inicio en "/" */}
            <Route path="/productos" element={<Productos />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/login" element={<LoginAdmin />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/productos" element={<AdminProductos />} />
            <Route path="/bicicletas" element={<Bicicletas />} />
            <Route path="/producto/:id" element={<ProductoDetalle />} />
            <Route path="/register" element={<Register />} />
            <Route path="/accesorios" element={<Accesorios />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </CarritoProvider>
    </AuthProvider>
  );
}

export default App;
