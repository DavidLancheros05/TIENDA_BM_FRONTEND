import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ImageUploader from "./ImageUploader";
import api from "../services/api";

const API_URL = import.meta.env.VITE_API_URL || "";

export default function EditarImagenesProducto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [imagenes, setImagenes] = useState([]);

  useEffect(() => {
    const fetchProducto = async () => {
      const res = await api.get(`/productos/${id}`);
      setImagenes(res.data.imagenes || []);
    };
    fetchProducto();
  }, [id]);

  const handleGuardar = async () => {
    await api.put(`/productos/${id}`, { imagenes });
    alert("Imágenes actualizadas!");
    navigate("/admin/productos");
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Editar Imágenes</h2>

      <div className="row g-3">
        {imagenes.map((img, i) => (
          <div key={i} className="col-auto position-relative">
            <img
              src={img.url.startsWith("http") ? img.url : `${API_URL}${img.url}`}
              alt=""
              className="img-thumbnail"
              style={{ width: "200px", height: "200px", objectFit: "cover" }}
            />
            <button
              type="button"
              className="btn btn-sm btn-danger position-absolute top-0 end-0"
              onClick={() => {
                const nuevas = [...imagenes];
                nuevas.splice(i, 1);
                setImagenes(nuevas);
              }}
            >
              ×
            </button>
          </div>
        ))}

        {/* Subidor de imágenes */}
        <div className="col-auto">
          <div
            className="border rounded d-flex align-items-center justify-content-center bg-light"
            style={{ width: "100px", height: "100px" }}
          >
            <ImageUploader
              imagenes={imagenes}
              setImagenes={(nuevas) => setImagenes([...imagenes, ...nuevas])}
            />
          </div>
        </div>
      </div>

      <button
        onClick={handleGuardar}
        className="btn btn-success mt-4"
      >
        Guardar Cambios
      </button>
    </div>
  );
}
