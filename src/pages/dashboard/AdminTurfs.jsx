import { useLoaderData } from "react-router";

export default function AdminTurfs() {
  const turfs = useLoaderData() || [];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-base-content">All Turfs</h2>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Location</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {turfs.map((t) => (
              <tr key={t._id}>
                <td>{t.name}</td>
                <td>{t.location}, {t.city}</td>
                <td>৳{t.minPrice || t.sections?.[0]?.pricePerHour || "—"}/hr</td>
                <td>{t.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
