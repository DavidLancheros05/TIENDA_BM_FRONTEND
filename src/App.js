import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { CarritoProvider } from './context/CarritoContext';
import { AuthProvider } from './context/AuthContext';

import Header from './components/Header';
import Footer from './components/Footer';
import Register from './pages/Register';
import Productos from './pages/Productos';
import Carrito from './pages/Carrito';
import Inicio from './pages/Inicio';

import AdminDashboard from './pages/AdminDashboard';
import LoginAdmin from './pages/Login';
import AdminProductos from './pages/AdminProductos';
import ProductoDetalle from './pages/ProductoDetalle';

import ListadoProductos from './components/ListadoProductos'; // ✅ Nuevo componente reutilizable

import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  return (
    <AuthProvider>
      <CarritoProvider>
        <BrowserRouter>
          <Header />
          <main style={{ flex: 1, padding: '1rem' }}>
            <Routes>
              <Route path="/" element={<Inicio />} />
              <Route path="/productos" element={<Productos />} />
              <Route path="/carrito" element={<Carrito />} />
              <Route path="/login" element={<LoginAdmin />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/productos" element={<AdminProductos />} />
              <Route path="/bicicletas" element={<ListadoProductos tipo="bicicleta" />} />
              <Route path="/accesorios" element={<ListadoProductos tipo="accesorios" />} />
              <Route path="/producto/:id" element={<ProductoDetalle />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </main>
          <Footer />
        </BrowserRouter>
      </CarritoProvider>
    </AuthProvider>
  );
}

export default App;
