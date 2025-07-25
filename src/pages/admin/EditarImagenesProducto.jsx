import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import ImageUploader from "./ImageUploader";

export default function EditarImagenesProducto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [imagenes, setImagenes] = useState([]);
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchProducto = async () => {
      const res = await axios.get(`${API_URL}/api/productos/${id}`);
      setImagenes(res.data.imagenes || []);
    };
    fetchProducto();
  }, [id, API_URL]);

  const handleGuardar = async () => {
    await axios.put(`${API_URL}/api/productos/${id}`, { imagenes });
    alert("Imágenes actualizadas!");
    navigate("/admin/productos"); // Redirige a la tabla
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Editar Imágenes</h2>
      <div className="flex flex-wrap gap-2">
        {imagenes.map((img, i) => (
          <div
            key={i}
            className="relative w-24 h-24 border rounded overflow-hidden bg-white"
          >
            <img
              src={img.url.startsWith("http") ? img.url : `${API_URL}${img.url}`}
              alt=""
              className="block w-full h-full object-cover"
            />
            <button
              onClick={() => {
                const nuevas = [...imagenes];
                nuevas.splice(i, 1);
                setImagenes(nuevas);
              }}
              className="absolute top-0 right-0 bg-red-600 text-white text-xs p-1"
            >
              ✖
            </button>
          </div>
        ))}
        <div className="relative w-24 h-24 border rounded overflow-hidden bg-gray-100 flex items-center justify-center">
          <ImageUploader
            imagenes={imagenes}
            setImagenes={(nuevas) => setImagenes([...imagenes, ...nuevas])}
          />
        </div>
      </div>
      <button
        onClick={handleGuardar}
        className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
      >
        Guardar Cambios
      </button>
    </div>
  );
}
