import { useState, useEffect } from "react";
import { Link } from "react-router";
import api from "../../api/axios";

export default function MyTurfs() {
  const [turfs, setTurfs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/turfs/owner")
      .then(({ data }) => setTurfs(data))
      .catch(() => setTurfs([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <span className="loading loading-spinner loading-lg text-primary" />;

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-extrabold">My Turfs</h2>
          <p className="text-base-content/70 mt-1">Each turf is one arena. Edit to manage its sports sections.</p>
        </div>
        <Link to="/dashboard/add-turf" className="btn font-semibold shadow-lg" style={{ backgroundColor: "#FFB703", color: "#14532D", border: "none" }}>
          Add Turf
        </Link>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {turfs.map((t) => (
          <div
            key={t._id}
            className="card bg-base-100 shadow-lg border border-base-200 overflow-hidden hover:shadow-xl transition-shadow"
          >
            <figure className="overflow-hidden">
              <img
                src={t.images?.[0] || t.sections?.[0]?.images?.[0] || "https://placehold.co/400x220/166534/22c55e?text=Turf"}
                alt={t.name}
                className="h-44 w-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </figure>
            <div className="card-body">
              <h3 className="card-title text-base-content">{t.name}</h3>
              <p className="text-base-content/70 text-sm">{t.location}</p>
              <Link
                to={`/dashboard/edit-turf/${t._id}`}
                className="btn btn-sm btn-outline mt-2 w-fit"
              >
                Edit
              </Link>
            </div>
          </div>
        ))}
      </div>
      {turfs.length === 0 && (
        <div className="text-center py-16 bg-white rounded-xl border border-[#C8E6C9]/50">
          <p className="text-lg text-base-content">No turfs yet.</p>
          <Link to="/dashboard/add-turf" className="btn mt-4" style={{ backgroundColor: "#FFB703", color: "#14532D", border: "none" }}>Add one</Link>
        </div>
      )}
    </div>
  );
}
