import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';

import Header from './components/Header';
import Footer from './components/Footer';

// Páginas Cliente
import Inicio from './pages/cliente/Inicio';
import Productos from './pages/cliente/productos/Productos';
import ProductoDetalle from './pages/cliente/productos/ProductoDetalle';
import ListadoProductos from './components/ListadoProductos';

// Páginas de Pago
import PagoPSE from './pages/cliente/pagos/PagoPSE';
import PagoExitoso from './pages/cliente/pagos/PagoExitoso';
import PagoCancelado from './pages/cliente/pagos/PagoCancelado';

// Admin
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProductos from './pages/admin/AdminProductos';

// Auth
import LoginAdmin from './pages/auth/Login';
import Register from './pages/auth/Register';

import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  return (
    <AuthProvider>
     
        <BrowserRouter>
          <div className="flex flex-col min-h-screen">
            <Header />

            <main className="flex-grow px-4 py-6 container mx-auto">
              <Routes>
                {/* Cliente */}
                <Route path="/" element={<Inicio />} />
                <Route path="/productos" element={<Productos />} />
                <Route path="/producto/:id" element={<ProductoDetalle />} />
                
                <Route path="/bicicletas" element={<ListadoProductos tipo="bicicleta" />} />
                <Route path="/accesorios" element={<ListadoProductos tipo="accesorios" />} />

                {/* Pagos */}
                <Route path="/pse" element={<PagoPSE />} />
                <Route path="/pago-exitoso/*" element={<PagoExitoso />} />
                <Route path="/pago-cancelado/*" element={<PagoCancelado />} />

                {/* Admin */}
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/productos" element={<AdminProductos />} />

                {/* Auth */}
                <Route path="/login" element={<LoginAdmin />} />
                <Route path="/register" element={<Register />} />
              </Routes>
            </main>

            <Footer />
          </div>
        </BrowserRouter>
     
    </AuthProvider>
  );
}

export default App;
