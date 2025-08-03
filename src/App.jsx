
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Inicio from './pages/Inicio';
import Footer from './components/Footer';
import Header from './components/Header';
import LoginAdmin from './pages/auth/Login';
import Carrito from './pages/carrito/Carrito';
import Checkout from './pages/carrito/Checkout';
import PagoExitoso from './components/PagoExitoso';
import PagoCancelado from './pages/cliente/pagos/PagoCancelado';
import EditarImagenesProducto from "./components/EditarImagenesProducto";
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminVentas from './pages/admin/AdminVentas';
import Register from './pages/auth/Register';
import SobreNosotros from './pages/SobreNosotros';
import MisCompras from "./components/MisCompras";
import BotonWhatsApp from './components/BotonWhatsApp'; // ✅ Asegúrate de importar correctamente
import BurbujaCarrito from './components/BurbujaCarrito';
import ForgotPassword from './pages/auth/ForgotPassword'; // importa al inicio
import ResetPassword from './pages/auth/ResetPassword';
import AdminAsignarVariantes from './pages/admin/AdminAsignarVariantes';

import AdminProductos from './pages/admin/AdminProductos';
import ListadoProductos from './components/ListadoProductos';

import ProductoDetalle from './pages/productos/ProductoDetalle';

import Bicicletas from './pages/productos/Bicicletas';
import Accesorios from './pages/productos/Accesorios';
import BicicletasElectrica from './pages/productos/BicicletasElectrica';


const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>

        
        <Route path="/" element={<Inicio />} />
        <Route path="/login" element={<LoginAdmin />} />
        <Route path="/producto/:id" element={<ProductoDetalle />} />

<Route path="/bicicletas" element={<Bicicletas />} />
<Route path="/accesorios" element={<Accesorios />} />
<Route path="/bicicletaselectrica" element={<BicicletasElectrica />} />

        <Route path="/carrito" element={<Carrito />} />
        <Route path="/checkout" element={<Checkout />} />

        <Route path="/pago-exitoso/*" element={<PagoExitoso />} />
        <Route path="/pago-cancelado/*" element={<PagoCancelado />} />
        <Route path="/admin/productos/:id/imagenes" element={<EditarImagenesProducto />} />
        <Route path="/adminDashboard" element={<AdminDashboard />} />
        <Route path="/admin/productos" element={<AdminProductos />} />
        <Route path="/admin/ventas" element={<AdminVentas />} />
        <Route path="/register" element={<Register />} />
        <Route path="/sobrenosotros" element={<SobreNosotros />} />
         <Route path="/MisCompras" element={<MisCompras />} />
         <Route path="/forgot-password" element={<ForgotPassword />} />
         <Route path="/restablecer-password/:token" element={<ResetPassword />} />
         <Route path="/admin/productos/:id/variantes" element={<AdminAsignarVariantes />} />
      </Routes>
      <Footer />
      <BotonWhatsApp /> {/* ✅ Aquí se renderiza en todas las páginas */}
      <BurbujaCarrito /> {/* ✅ Aquí se renderiza en todas las páginas */}
      
    </BrowserRouter>
  );
};

export default App;
