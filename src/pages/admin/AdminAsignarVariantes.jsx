import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function AdminAsignarVariantes() {
  const { id } = useParams(); // ID del producto
  const navigate = useNavigate();

  const [producto, setProducto] = useState(null);
  const [variantes, setVariantes] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const res = await api.get(`/productos/${id}`);
        setProducto(res.data);
        generarCombinaciones(res.data.colores, res.data.tallas);
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
      navigate(`/admin/productos/${id}/imagenes`);
    } catch (error) {
      console.error("Error al guardar variantes:", error);
      alert("Error al guardar variantes.");
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
      <button className="btn btn-success mt-4" onClick={guardarVariantes}>
        Guardar stock
      </button>
    </div>
  );
}
