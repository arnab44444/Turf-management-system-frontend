import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import api from "../../api/axios";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/bookings/my")
      .then(({ data }) => setBookings(data))
      .finally(() => setLoading(false));
  }, []);

  const handleCancel = async (id) => {
    const { isConfirmed } = await Swal.fire({
      title: "Cancel booking?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, cancel it",
    });
    if (!isConfirmed) return;
    try {
      await api.patch(`/bookings/${id}/cancel`);
      setBookings((b) => b.map((x) => (x._id === id ? { ...x, status: "cancelled" } : x)));
      toast.success("Booking cancelled successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to cancel");
    }
  };

  if (loading) return <span className="loading loading-spinner loading-lg" />;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-base-content">My Bookings</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr className="text-base-content">
              <th>Turf</th>
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
                  {section && <span className="text-xs block text-base-content/70">{section.name}</span>}
                </td>
                <td className="text-base-content">{new Date(b.date).toLocaleDateString()}</td>
                <td className="text-base-content">{b.startTime} - {b.endTime}</td>
                <td className="text-base-content">৳{b.totalAmount}</td>
                <td>
                  <span className={`badge badge-${b.status === "approved" ? "success" : b.status === "pending" ? "warning" : "neutral"}`}>
                    {b.status}
                  </span>
                </td>
                <td>
                  {["pending", "approved"].includes(b.status) && (
                    <button
                      className="btn btn-xs btn-error"
                      onClick={() => handleCancel(b._id)}
                    >
                      Cancel
                    </button>
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
