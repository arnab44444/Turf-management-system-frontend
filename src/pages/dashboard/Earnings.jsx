import { useState, useEffect } from "react";
import api from "../../api/axios";

export default function Earnings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    api.get("/bookings/owner").then(({ data }) => setBookings(data));
  }, []);

  const approved = bookings.filter((b) => b.status === "approved" || b.status === "completed");
  const total = approved.reduce((s, b) => s + b.totalAmount, 0);
  const today = new Date().toISOString().split("T")[0];
  const todayEarnings = approved
    .filter((b) => new Date(b.date).toISOString().split("T")[0] === today)
    .reduce((s, b) => s + b.totalAmount, 0);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-base-content">Earnings</h2>
      <div className="stats stats-vertical lg:stats-horizontal shadow">
        <div className="stat">
          <div className="stat-title">Today</div>
          <div className="stat-value">৳{todayEarnings}</div>
        </div>
        <div className="stat">
          <div className="stat-title">Total Earnings</div>
          <div className="stat-value">৳{total}</div>
        </div>
        <div className="stat">
          <div className="stat-title">Completed Bookings</div>
          <div className="stat-value">{approved.length}</div>
        </div>
      </div>
    </div>
  );
}
