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
        const res = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/upload`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        nuevasImagenes.push({ url: res.data.url });
      }
      setImagenes([...imagenes, ...nuevasImagenes]);
    } catch (error) {
      console.error("🚨 Error subiendo imagen:", error);
    } finally {
      setSubiendo(false);
    }
  };

  return (
    <label className="absolute inset-0 flex items-center justify-center cursor-pointer">
      <span className="text-xl">➕</span>
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleUpload}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
      {subiendo && (
        <span className="absolute inset-0 flex items-center justify-center text-[10px] bg-white bg-opacity-80">
          ⏳
        </span>
      )}
    </label>
  );
}
