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
        formData.append("upload_preset", "tienda_unsigned"); // tu preset unsigned

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
    <label className="relative inline-block w-6 h-6 border rounded bg-gray-200 cursor-pointer overflow-hidden">
      <span className="absolute inset-0 flex items-center justify-center text-xs">➕</span>
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleUpload}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
      {subiendo && (
        <span className="absolute inset-0 flex items-center justify-center text-[8px] bg-white bg-opacity-80">
          ⏳
        </span>
      )}
    </label>
  );
}
