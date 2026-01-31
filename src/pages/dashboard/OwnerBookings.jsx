import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import api from "../../api/axios";

export default function OwnerBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/bookings/owner")
      .then(({ data }) => setBookings(data))
      .finally(() => setLoading(false));
  }, []);

  const updateStatus = async (id, status) => {
    const action = status === "approved" ? "approve" : "reject";
    const { isConfirmed } = await Swal.fire({
      title: `${action.charAt(0).toUpperCase() + action.slice(1)} booking?`,
      icon: status === "approved" ? "question" : "warning",
      showCancelButton: true,
      confirmButtonColor: status === "approved" ? "#16a34a" : "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: `Yes, ${action}`,
    });
    if (!isConfirmed) return;
    try {
      await api.patch(`/bookings/${id}/status`, { status });
      setBookings((b) => b.map((x) => (x._id === id ? { ...x, status } : x)));
      toast.success(`Booking ${action}d successfully`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed");
    }
  };

  if (loading) return <span className="loading loading-spinner loading-lg" />;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-base-content">Bookings</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr className="text-base-content">
              <th>Turf</th>
              <th>Customer</th>
              <th>Mobile</th>
              <th>Date</th>
              <th>Time</th>
              <th>Amount</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => {
              const section = b.turfId?.sections?.find((s) => String(s._id) === String(b.sectionId));
              return (
              <tr key={b._id} className="text-base-content">
                <td>
                  <span>{b.turfId?.name}</span>
                  {section && <span className="text-xs block text-base-content/70">{section.name}</span>}
                </td>
                <td>
                  <span>{b.userId?.name}</span>
                  <span className="text-xs block text-base-content/70">{b.userId?.email}</span>
                </td>
                <td className="text-base-content">{b.userId?.phone || "—"}</td>
                <td className="text-base-content">{new Date(b.date).toLocaleDateString()}</td>
                <td className="text-base-content">{b.startTime} - {b.endTime}</td>
                <td className="text-base-content">৳{b.totalAmount}</td>
                <td>
                  <span className={`badge badge-${b.status === "approved" ? "success" : b.status === "pending" ? "warning" : "neutral"}`}>
                    {b.status}
                  </span>
                </td>
                <td>
                  {b.status === "pending" && (
                    <div className="flex gap-1">
                      <button className="btn btn-xs btn-success" onClick={() => updateStatus(b._id, "approved")}>
                        Approve
                      </button>
                      <button className="btn btn-xs btn-error" onClick={() => updateStatus(b._id, "rejected")}>
                        Reject
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            );
            })}
          </tbody>
        </table>
      </div>
      {bookings.length === 0 && <p className="text-base-content/60">No bookings yet.</p>}
    </div>
  );
}
