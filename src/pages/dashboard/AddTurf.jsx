import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import api from "../../api/axios";
import ImageUpload from "../../components/ImageUpload";

const SECTION_TYPES = [
  { value: "football", label: "Football" },
  { value: "cricket", label: "Cricket" },
  { value: "badminton", label: "Badminton" },
  { value: "basketball", label: "Basketball" },
  { value: "volleyball", label: "Volleyball" },
  { value: "other", label: "Other" },
];

const emptySection = () => ({
  name: "",
  type: "football",
  pricePerHour: "",
  images: [],
  facilities: "",
});

export default function AddTurf() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    location: "",
    city: "",
    description: "",
    facilities: "",
    images: [],
    sections: [emptySection()],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const updateSection = (index, field, value) => {
    setForm((f) => ({
      ...f,
      sections: f.sections.map((s, i) => (i === index ? { ...s, [field]: value } : s)),
    }));
  };

  const addSection = () => setForm((f) => ({ ...f, sections: [...f.sections, emptySection()] }));
  const removeSection = (index) =>
    setForm((f) => ({ ...f, sections: f.sections.filter((_, i) => i !== index) }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const sections = form.sections
        .filter((s) => s.name && s.pricePerHour)
        .map((s) => ({
          name: s.name,
          type: s.type,
          pricePerHour: Number(s.pricePerHour),
          images: Array.isArray(s.images) ? s.images : [],
          facilities: s.facilities ? s.facilities.split(",").map((x) => x.trim()) : [],
        }));
      if (sections.length === 0) {
        setError("Add at least one section with name and price");
        setLoading(false);
        return;
      }
      const payload = {
        name: form.name,
        location: form.location,
        city: form.city,
        description: form.description,
        facilities: form.facilities ? form.facilities.split(",").map((x) => x.trim()) : [],
        images: Array.isArray(form.images) ? form.images : [],
        sections,
      };
      await api.post("/turfs", payload);
      toast.success("Turf added successfully");
      navigate("/dashboard/my-turfs");
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to add turf";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-base-content">Add New Turf</h2>
        <p className="text-base-content/70 mt-1">One turf = one arena. Add sports sections inside it.</p>
      </div>

      <div className="alert alert-info mb-8 shadow-sm">
        <div>
          <p className="font-semibold">Turf vs Sections</p>
          <p className="text-sm text-base-content/90">Add your turf (e.g., GEC Arena) as a single entity. Then add the sports sections (Football, Cricket, etc.) with their own price and images.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {error && <div className="alert alert-error">{error}</div>}

        {/* Turf Info */}
        <div className="card bg-base-100 shadow-lg border border-base-200 overflow-hidden rounded-xl">
          <div className="card-body">
            <h3 className="text-lg font-bold mb-4 text-base-content">Turf / Arena Info</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="form-control sm:col-span-2 lg:col-span-1">
                <label className="label py-1">
                  <span className="label-text font-medium">Turf Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="e.g. GEC Arena, Oxygen Arena"
                  className="input input-bordered w-full"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text font-medium">Location</span>
                </label>
                <input
                  type="text"
                  name="location"
                  className="input input-bordered w-full"
                  value={form.location}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text font-medium">City</span>
                </label>
                <input
                  type="text"
                  name="city"
                  className="input input-bordered w-full"
                  value={form.city}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="form-control mt-2">
              <label className="label py-1">
                <span className="label-text font-medium">Description</span>
              </label>
              <textarea
                name="description"
                className="textarea textarea-bordered w-full min-h-[100px] resize-y"
                value={form.description}
                onChange={handleChange}
                placeholder="Describe your turf..."
              />
            </div>
            <div className="form-control mt-2">
              <label className="label py-1">
                <span className="label-text font-medium">General Facilities</span>
              </label>
              <input
                type="text"
                name="facilities"
                placeholder="e.g. free water, parking, changing room"
                className="input input-bordered w-full"
                value={form.facilities}
                onChange={handleChange}
              />
            </div>
            <div className="mt-4">
              <ImageUpload value={form.images} onChange={(urls) => setForm((f) => ({ ...f, images: urls }))} maxCount={5} />
            </div>
          </div>
        </div>

        {/* Sports Sections */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-base-content">Sports Sections</h3>
            <button type="button" className="btn btn-sm btn-outline btn-primary" onClick={addSection}>
              + Add Section
            </button>
          </div>
          <p className="text-sm text-base-content/70 mb-4">Add each sport/playing area with its own price and details.</p>
          <div className="space-y-6">
            {form.sections.map((section, i) => (
              <div key={i} className="card bg-base-100 shadow-md border border-base-200 overflow-hidden rounded-xl">
                <div className="card-body">
                  <div className="flex flex-wrap justify-between items-center gap-2 mb-4">
                    <h4 className="font-semibold text-base-content">Section {i + 1}</h4>
                    {form.sections.length > 1 && (
                      <button type="button" className="btn btn-sm btn-ghost text-error" onClick={() => removeSection(i)}>
                        Remove
                      </button>
                    )}
                  </div>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="form-control">
                      <label className="label py-1">
                        <span className="label-text font-medium">Section Name</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 5-a-side Football"
                        className="input input-bordered w-full"
                        value={section.name}
                        onChange={(e) => updateSection(i, "name", e.target.value)}
                      />
                    </div>
                    <div className="form-control">
                      <label className="label py-1">
                        <span className="label-text font-medium">Sport Type</span>
                      </label>
                      <select
                        className="select select-bordered w-full"
                        value={section.type}
                        onChange={(e) => updateSection(i, "type", e.target.value)}
                      >
                        {SECTION_TYPES.map((t) => (
                          <option key={t.value} value={t.value}>{t.label}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-control">
                      <label className="label py-1">
                        <span className="label-text font-medium">Price per hour (৳)</span>
                      </label>
                      <input
                        type="number"
                        placeholder="500"
                        className="input input-bordered w-full"
                        value={section.pricePerHour}
                        onChange={(e) => updateSection(i, "pricePerHour", e.target.value)}
                        min={1}
                      />
                    </div>
                    <div className="form-control sm:col-span-2">
                      <label className="label py-1">
                        <span className="label-text font-medium">Facilities</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. lights, changing room"
                        className="input input-bordered w-full"
                        value={section.facilities}
                        onChange={(e) => updateSection(i, "facilities", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <ImageUpload
                      value={section.images || []}
                      onChange={(urls) => updateSection(i, "images", urls)}
                      maxCount={3}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3 pt-4">
          <button type="submit" className="btn font-semibold" style={{ backgroundColor: "#FFB703", color: "#14532D", border: "none" }} disabled={loading}>
            {loading ? "Adding..." : "Create Turf"}
          </button>
          <button type="button" className="btn btn-ghost" onClick={() => navigate("/dashboard/my-turfs")}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
