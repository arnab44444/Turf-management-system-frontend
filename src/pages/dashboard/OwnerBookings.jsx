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
      <h2 className="text-2xl font-bold mb-6">Bookings</h2>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Turf</th>
              <th>Customer</th>
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
              <tr key={b._id}>
                <td>
                  <span>{b.turfId?.name}</span>
                  {section && <span className="text-xs block opacity-70">{section.name}</span>}
                </td>
                <td>{b.userId?.name} ({b.userId?.email})</td>
                <td>{new Date(b.date).toLocaleDateString()}</td>
                <td>{b.startTime} - {b.endTime}</td>
                <td>৳{b.totalAmount}</td>
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
