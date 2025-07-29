
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Inicio from './pages/Inicio';
import Footer from './components/Footer';
import Header from './components/Header';
import LoginAdmin from './pages/auth/Login';
import ProductoDetalle from './pages/productos/ProductoDetalle';
import ListadoProductos from './components/ListadoProductos';
import Carrito from './pages/carrito/Carrito';
import BicicletasElectrica from './pages/productos/BicicletasElectrica';
import Checkout from './pages/carrito/Checkout';
import PagoPSE from './pages/cliente/pagos/PagoPSE';
import PagoExitoso from './components/PagoExitoso';
import PagoCancelado from './pages/cliente/pagos/PagoCancelado';
import EditarImagenesProducto from "./components/EditarImagenesProducto";
import AdminProductos from './pages/admin/AdminProductos';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminVentas from './pages/admin/AdminVentas';
import Register from './pages/auth/Register';
import SobreNosotros from './pages/SobreNosotros';
import MisCompras from "./components/MisCompras";
const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/login" element={<LoginAdmin />} />
        <Route path="/producto/:id" element={<ProductoDetalle />} />
        <Route path="/bicicletaselectrica" element={<BicicletasElectrica />} />
        <Route path="/bicicletas" element={<ListadoProductos tipo="bicicleta" />} />
        <Route path="/accesorios" element={<ListadoProductos tipo="accesorios" />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/pse" element={<PagoPSE />} />
        <Route path="/pago-exitoso/*" element={<PagoExitoso />} />
        <Route path="/pago-cancelado/*" element={<PagoCancelado />} />
        <Route path="/admin/productos/:id/imagenes" element={<EditarImagenesProducto />} />
        <Route path="/adminDashboard" element={<AdminDashboard />} />
        <Route path="/admin/productos" element={<AdminProductos />} />
        <Route path="/admin/ventas" element={<AdminVentas />} />
        <Route path="/register" element={<Register />} />
        <Route path="/sobrenosotros" element={<SobreNosotros />} />
         <Route path="/MisCompras" element={<MisCompras />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
