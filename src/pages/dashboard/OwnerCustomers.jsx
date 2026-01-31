import { useState, useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { useNavigate } from "react-router";
import api from "../../api/axios";

export default function OwnerCustomers() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.role !== "owner") {
      navigate("/dashboard");
      return;
    }
    api
      .get("/bookings/owner-customers")
      .then(({ data }) => setCustomers(data))
      .catch(() => setCustomers([]))
      .finally(() => setLoading(false));
  }, [user, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2 text-base-content">Customers</h2>
      <p className="text-base-content/70 mb-6">
        Users who have booked your turfs, with their contact details and booking history
      </p>

      {customers.length === 0 ? (
        <div className="card bg-base-100 border border-base-200 p-12 text-center">
          <p className="text-base-content/60">No customers yet. Users who book your turfs will appear here.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr className="text-base-content">
                <th>Name</th>
                <th>Mobile</th>
                <th>Email</th>
                <th>Total Bookings</th>
                <th>Booking History</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => (
                <tr key={c.user?._id}>
                  <td className="font-medium text-base-content">{c.user?.name || "—"}</td>
                  <td className="text-base-content">{c.user?.phone || "—"}</td>
                  <td className="text-base-content">{c.user?.email || "—"}</td>
                  <td>
                    <span className="badge badge-primary">{c.totalBookings}</span>
                  </td>
                  <td>
                    <div className="max-w-md">
                      {c.bookings?.slice(0, 5).map((b, i) => (
                        <div key={i} className="text-sm text-base-content/80 py-0.5">
                          {new Date(b.date).toLocaleDateString()} · {b.startTime}–{b.endTime} · {b.turfName} ({b.sectionName})
                        </div>
                      ))}
                      {c.bookings?.length > 5 && (
                        <span className="text-xs text-base-content/60">+{c.bookings.length - 5} more</span>
                      )}
                      {(!c.bookings || c.bookings.length === 0) && <span className="text-base-content/50">—</span>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
