// src/pages/Checkout.jsx
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { CarritoContext } from '../../context/CarritoContext';
import { AuthContext } from '../../context/AuthContext.jsx';
import axios from 'axios';

const BASE_FRONTEND_URL = window.location.origin;

const schema = Yup.object().shape({
  nombreCompleto: Yup.string().required('Nombre es obligatorio'),
  correo: Yup.string().email('Correo inválido').required('Correo es obligatorio'),
  telefono: Yup.string().required('Teléfono es obligatorio'),
  direccionLinea1: Yup.string().required('Dirección es obligatoria'),
  ciudad: Yup.string().required('Ciudad es obligatoria'),
  departamento: Yup.string().required('Departamento es obligatorio'),
  pais: Yup.string().required('País es obligatorio'),
});

const Checkout = () => {
  const { carrito, limpiarCarrito } = useContext(CarritoContext);
  const { usuario } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      nombreCompleto: usuario?.nombre || '',
      correo: usuario?.correo || '',
      pais: 'Colombia', // ✅ Valor por defecto
    },
  });

  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  const onSubmit = async (data) => {
    if (!usuario?._id && !usuario?.id) {
      alert("Debes iniciar sesión para pagar.");
      return;
    }

    if (carrito.length === 0) {
      alert("Carrito vacío.");
      return;
    }

    const ventaYLink = {
      usuarioId: usuario._id || usuario.id,
      productos: carrito.map(item => ({
        producto: item._id,
        cantidad: item.cantidad
      })),
      total,
      metodoPago: "PSE",
      direccionEnvio: {
        ...data
      },
      name: "Compra en Col_Bog_Bike",
      description: "Pago con PSE (sandbox)",
      currency: "COP",
      amount_in_cents: total * 100,
      redirect_url: `${BASE_FRONTEND_URL}/pago-exitoso`,
      cancel_url: `${BASE_FRONTEND_URL}/pago-cancelado`,
    };

    try {
      const API_URL = process.env.REACT_APP_API_URL;
      console.log('📦 Venta enviada:', ventaYLink);
      const response = await axios.post(`${API_URL}/api/pagos/crear-link-pago`, ventaYLink);
      const link = response.data?.link_pago;
      if (link) {
        limpiarCarrito();
        window.location.href = link;
      } else {
        alert("No se pudo obtener el link de pago.");
      }
    } catch (error) {
      console.error("Error creando link:", error);
      alert("Error al crear el link de pago.");
    }
  };

  return (
    <div className="container" style={{ padding: '2rem', maxWidth: '600px', margin: 'auto' }}>
      <h2>📝 Finaliza tu Compra</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label>Nombre completo</label>
          <input type="text" className="form-control" {...register('nombreCompleto')} />
          {errors.nombreCompleto && <p className="text-danger">{errors.nombreCompleto.message}</p>}
        </div>

        <div className="mb-3">
          <label>Correo electrónico</label>
          <input type="email" className="form-control" {...register('correo')} />
          {errors.correo && <p className="text-danger">{errors.correo.message}</p>}
        </div>

        <div className="mb-3">
          <label>Teléfono de contacto</label>
          <input type="text" className="form-control" {...register('telefono')} />
          {errors.telefono && <p className="text-danger">{errors.telefono.message}</p>}
        </div>

        <div className="mb-3">
          <label>Dirección</label>
          <input type="text" className="form-control" {...register('direccionLinea1')} />
          {errors.direccionLinea1 && <p className="text-danger">{errors.direccionLinea1.message}</p>}
        </div>

        <div className="mb-3">
          <label>Ciudad</label>
          <input type="text" className="form-control" {...register('ciudad')} />
          {errors.ciudad && <p className="text-danger">{errors.ciudad.message}</p>}
        </div>

        <div className="mb-3">
          <label>Departamento / Estado</label>
          <input type="text" className="form-control" {...register('departamento')} />
          {errors.departamento && <p className="text-danger">{errors.departamento.message}</p>}
        </div>

 <div className="mb-3">
  <label>País</label>
  <input
    type="text"
    className="form-control"
    value="Colombia"   // 🔑 Muestra fijo
    readOnly          // 🔒 No editable
    {...register('pais')}
  />
  {errors.pais && <p className="text-danger">{errors.pais.message}</p>}
</div>

        <h4 className="mt-4">Total a pagar: ${total.toFixed(2)}</h4>

        <button type="submit" className="btn btn-success mt-3 w-100">
          💳 Pagar con PSE
        </button>
      </form>
    </div>
  );
};

export default Checkout;
