import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import api from "../../services/api";

export default function AdminAsignarVariantes() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const esNuevo = location.state?.nuevo;

  const [producto, setProducto] = useState(null);
  const [variantes, setVariantes] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const res = await api.get(`/productos/${id}`);
        setProducto(res.data);

        if (res.data.variantes && res.data.variantes.length > 0) {
          setVariantes(res.data.variantes); // ✅ usa variantes ya existentes
        } else {
          generarCombinaciones(res.data.colores, res.data.tallas); // 🆕 si es nuevo
        }
      } catch (error) {
        console.error("Error al cargar el producto:", error);
      } finally {
        setCargando(false);
      }
    };

    fetchProducto();
  }, [id]);

  const generarCombinaciones = (colores = [], tallas = []) => {
    const combinaciones = [];
    colores.forEach((color) => {
      tallas.forEach((talla) => {
        combinaciones.push({ color, talla, stock: 0 });
      });
    });
    setVariantes(combinaciones);
  };

  const handleStockChange = (index, value) => {
    const nuevasVariantes = [...variantes];
    nuevasVariantes[index].stock = parseInt(value) || 0;
    setVariantes(nuevasVariantes);
  };

  const guardarVariantes = async () => {
    try {
      await api.post(`/productos/${id}/variantes`, { variantes });
      alert("Variantes guardadas correctamente.");
      if (esNuevo) {
        navigate(`/admin/productos/${id}/imagenes`);
      } else {
        navigate("/admin/productos");
      }
    } catch (error) {
      console.error("Error al guardar variantes:", error);
      alert("Error al guardar variantes.");
    }
  };

  const volverSinGuardar = () => {
    if (
      window.confirm("¿Seguro que deseas volver sin guardar los cambios?")
    ) {
      navigate("/admin/productos");
    }
  };

  if (cargando) return <div>Cargando producto...</div>;

  return (
    <div className="container mt-4">
      <h2>Asignar stock: {producto?.nombre}</h2>
      <div className="mt-3">
        {variantes.length === 0 ? (
          <p>No hay combinaciones de color y talla.</p>
        ) : (
          variantes.map((v, idx) => (
            <div className="row mb-2" key={idx}>
              <div className="col-md-3">{v.color}</div>
              <div className="col-md-3">{v.talla}</div>
              <div className="col-md-3">
                <input
                  type="number"
                  className="form-control"
                  min={0}
                  value={v.stock}
                  onChange={(e) => handleStockChange(idx, e.target.value)}
                />
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-4 d-flex gap-2">
        <button className="btn btn-success" onClick={guardarVariantes}>
          Guardar stock
        </button>
        <button className="btn btn-secondary" onClick={volverSinGuardar}>
          Volver sin guardar
        </button>
      </div>
    </div>
  );
}
