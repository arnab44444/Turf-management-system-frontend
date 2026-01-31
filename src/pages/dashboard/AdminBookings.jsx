import { useState, useEffect } from "react";
import api from "../../api/axios";

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    api.get("/bookings/all").then(({ data }) => setBookings(data)).catch(() => setBookings([]));
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-base-content">All Bookings</h2>
      <p className="text-base-content/60">Admin view - shows owner bookings. Expand to show all.</p>
      <div className="overflow-x-auto mt-4">
        <table className="table table-zebra">
          <thead>
            <tr className="text-base-content">
              <th>Turf</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b._id} className="text-base-content">
                <td>{b.turfId?.name}</td>
                <td>{b.userId?.name}</td>
                <td>{new Date(b.date).toLocaleDateString()}</td>
                <td>{b.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
