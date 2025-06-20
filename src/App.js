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
import ListadoProductos from './components/ListadoProductos';
import PagoPSE from './pages/PagoPSE';
import PagoExitoso from './pages/PagoExitoso';
import PagoCancelado from './pages/PagoCancelado';

import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  return (
    <AuthProvider>
      <CarritoProvider>
        <BrowserRouter>
          {/* Layout principal con altura completa y columnas */}
          <div className="flex flex-col min-h-screen">
            <Header />

            {/* Main crece y empuja el footer */}
            <main className="flex-grow px-4 py-6 container mx-auto">
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

                <Route path="/pse" element={<PagoPSE />} />
                <Route path="/pago-exitoso/*" element={<PagoExitoso />} />
                <Route path="/pago-cancelado/*" element={<PagoCancelado />} />
              </Routes>
            </main>

            {/* Footer siempre abajo */}
            <Footer />
          </div>
        </BrowserRouter>
      </CarritoProvider>
    </AuthProvider>
  );
}

export default App;
