import { useState, useEffect } from "react";
import api from "../../api/axios";

export default function MyReviews() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    api.get("/bookings/my").then(({ data }) => {
      const completed = data.filter((b) => b.status === "approved" || b.status === "completed");
      setReviews(completed.map((b) => ({ ...b, reviewed: false })));
    });
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">My Reviews</h2>
      <p className="text-base-content/60">Review turfs from your completed bookings. (Reviews feature - add form to submit)</p>
    </div>
  );
}
