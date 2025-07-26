import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
import { CarritoProvider } from './context/CarritoContext';
import Carrito from './pages/carrito/Carrito';
import Checkout from './pages/carrito/Checkout';
import Header from './components/Header';
import Footer from './components/Footer';
import BicicletasElectrica from './pages/productos/BicicletasElectrica';
import EditarImagenesProducto from "./pages/admin/EditarImagenesProducto";
import Inicio from './pages/Inicio';
import ProductoDetalle from './pages/productos/ProductoDetalle';
import ListadoProductos from './components/ListadoProductos';
import PagoPSE from './pages/cliente/pagos/PagoPSE';
import PagoExitoso from './pages/cliente/pagos/PagoExitoso';
import PagoCancelado from './pages/cliente/pagos/PagoCancelado';

import AdminProductos from './pages/admin/AdminProductos';

import LoginAdmin from './pages/auth/Login';
import Register from './pages/auth/Register';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminVentas from './pages/admin/AdminVentas';


import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  return (
    <AuthProvider>
      <CarritoProvider>
        <BrowserRouter>
          <div className="flex flex-col min-h-screen">
            <Header />

            <main className="flex-grow px-4 py-6 container mx-auto">
              <Routes>
                <Route path="/" element={<Inicio />} />
                <Route path="/producto/:id" element={<ProductoDetalle />} />
<Route path="/bicicletaselectrica" element={<BicicletasElectrica />} />
                <Route path="/bicicletas" element={<ListadoProductos tipo="bicicleta" />} />
                <Route path="/accesorios" element={<ListadoProductos tipo="accesorios" />} />
<Route path="/carrito" element={<Carrito />} />
<Route path="/Checkout" element={<Checkout />} />
                <Route path="/pse" element={<PagoPSE />} />
                <Route path="/pago-exitoso/*" element={<PagoExitoso />} />
                <Route path="/pago-cancelado/*" element={<PagoCancelado />} />
<Route path="/admin/productos/:id/imagenes" element={<EditarImagenesProducto />} />
                <Route path="/adminDashboard" element={<AdminDashboard />} />
                <Route path="/admin/productos" element={<AdminProductos />} />
                <Route path="/admin/ventas" element={<AdminVentas />} />
                <Route path="/login" element={<LoginAdmin />} />
                <Route path="/register" element={<Register />} />
              </Routes>
            </main>

            <Footer />
          </div>
        </BrowserRouter>
      </CarritoProvider>
    </AuthProvider>
  );
}

export default App;
