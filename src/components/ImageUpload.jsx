import { useState } from "react";
import { toast } from "react-toastify";
import api from "../api/axios";
import { getImageUrl } from "../utils/imageUrl";

export default function ImageUpload({ value = [], onChange, maxCount = 5 }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const images = Array.isArray(value) ? value : [];

  const handleFileSelect = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    if (images.length + files.length > maxCount) {
      const msg = `Max ${maxCount} images allowed`;
      setError(msg);
      toast.warning(msg);
      return;
    }

    setError("");
    setUploading(true);

    const formData = new FormData();
    files.forEach((f) => formData.append("images", f));

    try {
      const { data } = await api.post("/upload/images", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      onChange([...images, ...(data.urls || [])]);
    } catch (err) {
      const msg = err.response?.data?.message || "Upload failed";
      setError(msg);
      toast.error(msg);
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const removeImage = (index) => {
    const next = images.filter((_, i) => i !== index);
    onChange(next);
  };

  return (
    <div className="space-y-3">
      <label className="label py-0">
        <span className="label-text font-medium">Images</span>
        <span className="label-text-alt text-base-content/60">Max {maxCount}</span>
      </label>
      <div className="flex flex-wrap gap-4 items-start">
        {images.map((url, i) => (
          <div key={i} className="relative group">
            <div className="w-28 h-28 rounded-xl overflow-hidden border-2 border-base-200 shadow-sm bg-base-200">
              <img src={getImageUrl(url, { width: 400 }) || url} alt="" className="w-full h-full object-cover" />
            </div>
            <button
              type="button"
              onClick={() => removeImage(i)}
              className="absolute -top-1.5 -right-1.5 btn btn-circle btn-xs btn-error shadow-md"
              aria-label="Remove"
            >
              ×
            </button>
          </div>
        ))}
        {images.length < maxCount && (
          <label className="w-28 h-28 rounded-xl border-2 border-dashed border-base-300 flex items-center justify-center cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all">
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              multiple
              className="hidden"
              onChange={handleFileSelect}
              disabled={uploading}
            />
            {uploading ? (
              <span className="loading loading-spinner loading-md text-primary" />
            ) : (
              <span className="text-4xl text-base-content/40 font-light">+</span>
            )}
          </label>
        )}
      </div>
      {error && <p className="text-sm text-error">{error}</p>}
    </div>
  );
}
