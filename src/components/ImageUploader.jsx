import { useState } from "react";
import axios from "axios";

export default function ImageUploader({ imagenes, setImagenes }) {
  const [subiendo, setSubiendo] = useState(false);

  const handleUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setSubiendo(true);

    try {
      const nuevasImagenes = [];

      for (const file of files) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "tienda_unsigned");

        const res = await axios.post(
          "https://api.cloudinary.com/v1_1/dmynykmea/image/upload",
          formData
        );

        nuevasImagenes.push({ url: res.data.secure_url });
      }

      setImagenes([...imagenes, ...nuevasImagenes]);
    } catch (error) {
      console.error("🚨 Error subiendo imagen:", error);
      if (error.response) {
        console.log("➡️ Detalle:", error.response.data);
      }
    } finally {
      setSubiendo(false);
    }
  };

  return (
<div className="position-relative d-inline-block" style={{ width: '62px', height: '62px' }}>
  <label
    className="btn btn-light btn-sm p-0 border rounded-circle w-100 h-100 d-flex align-items-center justify-content-center"
    style={{ fontSize: '20px' }}
  >
    {subiendo ? "⏳" : "➕"}
    <input
      type="file"
      multiple
      accept="image/*"
      onChange={handleUpload}
      className="position-absolute top-0 start-0 w-100 h-100 opacity-0"
      style={{ cursor: "pointer" }}
    />
  </label>
</div>
  );
}
