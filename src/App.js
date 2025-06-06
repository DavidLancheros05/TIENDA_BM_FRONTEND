import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { CarritoProvider } from './context/CarritoContext';
import Productos from './pages/Productos';
import Carrito from './components/Carrito';
import AgregarProducto from './pages/AgregarProducto';
import AdminDashboard from './pages/AdminDashboard';
import LoginAdmin from './pages/LoginAdmin';
import AdminProductos from './pages/AdminProductos';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  return (
    <CarritoProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Productos />
                <Carrito />
              </>
            }
          />
          <Route path="/login" element={<LoginAdmin setToken={setToken} />} />
          <Route path="/adminDashboard" element={<AdminDashboard />} />
          <Route path="/admin/productos" element={<AdminProductos />} />
          <Route path="/admin/agregar-producto" element={<AgregarProducto token={token} />} />
        </Routes>
      </BrowserRouter>
    </CarritoProvider>
  );
}

export default App;
