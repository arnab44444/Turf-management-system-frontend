import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
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

const toFormSection = (s) => ({
  _id: s._id,
  name: s.name || "",
  type: s.type || "football",
  pricePerHour: s.pricePerHour || "",
  images: s.images || [],
  facilities: (s.facilities || []).join(", "),
});

export default function EditTurf() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api
      .get(`/turfs/${id}`)
      .then(({ data }) =>
        setForm({
          name: data.name,
          location: data.location,
          city: data.city,
          description: data.description || "",
          facilities: (data.facilities || []).join(", "),
          images: data.images || [],
          sections: (data.sections || []).length ? data.sections.map(toFormSection) : [toFormSection({})],
        })
      )
      .catch(() => setForm(null))
      .finally(() => setLoading(false));
  }, [id]);

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

  const addSection = () =>
    setForm((f) => ({ ...f, sections: [...f.sections, toFormSection({})] }));
  const removeSection = (index) =>
    setForm((f) => ({ ...f, sections: f.sections.filter((_, i) => i !== index) }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const sections = form.sections
        .filter((s) => s.name && s.pricePerHour)
        .map((s) => {
          const sec = {
            name: s.name,
            type: s.type,
            pricePerHour: Number(s.pricePerHour),
            images: Array.isArray(s.images) ? s.images : [],
            facilities: s.facilities ? s.facilities.split(",").map((x) => x.trim()) : [],
          };
          if (s._id) sec._id = s._id;
          return sec;
        });
      const payload = {
        name: form.name,
        location: form.location,
        city: form.city,
        description: form.description,
        facilities: form.facilities ? form.facilities.split(",").map((x) => x.trim()) : [],
        images: Array.isArray(form.images) ? form.images : [],
        sections: sections.length ? sections : form.sections,
      };
      await api.patch(`/turfs/${id}`, payload);
      toast.success("Turf updated successfully");
      navigate("/dashboard/my-turfs");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <span className="loading loading-spinner loading-lg text-primary" />;
  if (!form) return <p className="text-center py-12">Turf not found</p>;

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold">Edit Turf</h2>
        <p className="text-base-content/70 mt-1">Update your turf and its sports sections.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Info */}
        <div className="card bg-white shadow-lg border border-[#C8E6C9]/50 overflow-hidden rounded-xl">
          <div className="card-body">
            <h3 className="text-lg font-bold mb-4">Basic Info</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="form-control sm:col-span-2 lg:col-span-1">
                <label className="label py-1">
                  <span className="label-text font-medium">Name</span>
                </label>
                <input
                  type="text"
                  name="name"
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
                className="input input-bordered w-full"
                value={form.facilities}
                onChange={handleChange}
                placeholder="e.g. free water, parking, changing room"
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
            <h3 className="text-lg font-bold">Sports Sections</h3>
            <button type="button" className="btn btn-sm btn-outline btn-primary" onClick={addSection}>
              + Add Section
            </button>
          </div>
          <div className="space-y-6">
            {form.sections.map((section, i) => (
              <div key={i} className="card bg-white shadow-md border border-[#C8E6C9]/50 overflow-hidden rounded-xl">
                <div className="card-body">
                  <div className="flex flex-wrap justify-between items-center gap-2 mb-4">
                    <h4 className="font-semibold">Section {i + 1}</h4>
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
                        className="input input-bordered w-full"
                        value={section.name}
                        onChange={(e) => updateSection(i, "name", e.target.value)}
                        placeholder="e.g. 5-a-side Football"
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
                        className="input input-bordered w-full"
                        value={section.pricePerHour}
                        onChange={(e) => updateSection(i, "pricePerHour", e.target.value)}
                        min={1}
                        placeholder="500"
                      />
                    </div>
                    <div className="form-control sm:col-span-2">
                      <label className="label py-1">
                        <span className="label-text font-medium">Facilities</span>
                      </label>
                      <input
                        type="text"
                        className="input input-bordered w-full"
                        value={section.facilities}
                        onChange={(e) => updateSection(i, "facilities", e.target.value)}
                        placeholder="e.g. lights, changing room"
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
          <button type="submit" className="btn font-semibold" style={{ backgroundColor: "#2E7D32", color: "white", border: "none" }} disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </button>
          <button type="button" className="btn btn-ghost" onClick={() => navigate("/dashboard/my-turfs")}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
