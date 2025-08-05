import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import BotonWhatsApp from './components/BotonWhatsApp';
import BurbujaCarrito from './components/BurbujaCarrito';

import Inicio from './pages/Inicio';
import LoginAdmin from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';

import Carrito from './pages/carrito/Carrito';
import Checkout from './pages/carrito/Checkout';

import PagoExitoso from './components/PagoExitoso';
import PagoCancelado from './pages/cliente/pagos/PagoCancelado';
import MisCompras from './components/MisCompras';
import SobreNosotros from './pages/SobreNosotros';

import ProductoDetalle from './pages/productos/ProductoDetalle';
import Bicicletas from './pages/productos/Bicicletas';
import Accesorios from './pages/productos/Accesorios';
import BicicletasElectrica from './pages/productos/BicicletasElectrica';

import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProductos from './pages/admin/AdminProductos';
import AdminVentas from './pages/admin/AdminVentas';
import AdminAsignarVariantes from './pages/admin/AdminAsignarVariantes';
import EditarImagenesProducto from './components/EditarImagenesProducto';

import RutaProtegida from './components/RutaProtegida';

const App = () => {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        {/* 🌐 Públicas */}
        <Route path="/" element={<Inicio />} />
        <Route path="/login" element={<LoginAdmin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/restablecer-password/:token" element={<ResetPassword />} />
        <Route path="/sobrenosotros" element={<SobreNosotros />} />
        <Route path="/producto/:id" element={<ProductoDetalle />} />
        <Route path="/bicicletas" element={<Bicicletas />} />
        <Route path="/accesorios" element={<Accesorios />} />
        <Route path="/bicicletaselectrica" element={<BicicletasElectrica />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/pago-exitoso/*" element={<PagoExitoso />} />
        <Route path="/pago-cancelado/*" element={<PagoCancelado />} />
        <Route path="/MisCompras" element={<MisCompras />} />

        {/* 🔐 Protegidas solo para ADMIN */}
        <Route
          path="/adminDashboard"
          element={
            <RutaProtegida soloAdmin={true}>
              <AdminDashboard />
            </RutaProtegida>
          }
        />

        <Route
          path="/admin/productos"
          element={
            <RutaProtegida soloAdmin={true}>
              <AdminProductos />
            </RutaProtegida>
          }
        />

        <Route
          path="/admin/ventas"
          element={
            <RutaProtegida soloAdmin={true}>
              <AdminVentas />
            </RutaProtegida>
          }
        />

        <Route
          path="/admin/productos/:id/variantes"
          element={
            <RutaProtegida soloAdmin={true}>
              <AdminAsignarVariantes />
            </RutaProtegida>
          }
        />

        <Route
          path="/admin/productos/:id/imagenes"
          element={
            <RutaProtegida soloAdmin={true}>
              <EditarImagenesProducto />
            </RutaProtegida>
          }
        />
      </Routes>

      <Footer />
      <BotonWhatsApp />
      <BurbujaCarrito />
    </BrowserRouter>
  );
};

export default App;
