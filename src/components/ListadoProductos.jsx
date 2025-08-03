import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ListadoProductos({ tipo }) {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        console.log("Consultando productos con tipo:", tipo);
        const response = await api.get(`/productos?tipoProducto=${tipo}`);
        console.log("Productos recibidos:", response.data);
        setProductos(response.data);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };

    obtenerProductos();
  }, [tipo]);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Productos tipo {tipo}</h2>
      <div className="row">
        {productos.map((producto) => (
          <div className="col-md-4 mb-4" key={producto._id}>
            <Link to={`/${tipo}/${producto._id}`} className="text-decoration-none text-dark">
              <div className="card h-100 shadow-sm hover-shadow" style={{ cursor: "pointer" }}>
                {/* Imagen del producto */}
                {producto.imagen ? (
                  <img
                    src={producto.imagen}
                    className="card-img-top"
                    alt={producto.nombre}
                    style={{ objectFit: "cover", height: "250px" }}
                  />
                ) : (
                  <div
                    className="d-flex align-items-center justify-content-center bg-secondary text-white"
                    style={{ height: "250px" }}
                  >
                    Sin imagen
                  </div>
                )}

                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{producto.nombre}</h5>

                  {/* Precios */}
                  <div className="mb-2">
                    {producto.descuento?.porcentaje ? (
                      <>
                        <span className="text-muted text-decoration-line-through me-2">
                          ${producto.precioOriginal?.toLocaleString()}
                        </span>
                        <span className="fw-bold text-success">
                          ${producto.precio?.toLocaleString()}
                        </span>
                        <div className="badge bg-danger mt-1">
                          -{producto.descuento.porcentaje}%
                        </div>
                      </>
                    ) : (
                      <span className="fw-bold text-dark">
                        ${producto.precio?.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}

        {productos.length === 0 && (
          <p className="text-center">No hay productos para este tipo.</p>
        )}
      </div>
    </div>
  );
}
