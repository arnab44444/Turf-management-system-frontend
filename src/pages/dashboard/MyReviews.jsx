import { useState, useEffect } from "react";
import { Link } from "react-router";
import api from "../../api/axios";

export default function MyReviews() {
  const [bookings, setBookings] = useState([]);
  const [userReviews, setUserReviews] = useState([]);

  useEffect(() => {
    api.get("/bookings/my").then(({ data }) => {
      const completed = data.filter((b) => b.status === "approved" || b.status === "completed");
      setBookings(completed);
    });
    api.get("/reviews/my").then(({ data }) => setUserReviews(data)).catch(() => setUserReviews([]));
  }, []);

  const reviewedTurfIds = new Set(userReviews.map((r) => String(r.turfId?._id || r.turfId)));

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-base-content">My Reviews</h2>
      <p className="text-base-content/60 mb-6">Review turfs from your completed bookings.</p>
      {bookings.length === 0 ? (
        <p className="text-base-content/60">No completed bookings yet. Book a turf and come back to leave a review!</p>
      ) : (
        <div className="space-y-4">
          {bookings.map((b) => {
            const turf = b.turfId;
            const reviewed = turf && reviewedTurfIds.has(String(turf._id));
            return (
              <div key={b._id} className="card bg-base-100 shadow-lg border border-base-200">
                <div className="card-body flex-row flex-wrap items-center justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-lg text-base-content">{turf?.name}</h3>
                    <p className="text-sm text-base-content/60">{turf?.location}</p>
                  </div>
                  <Link
                    to={`/turfs/${turf?._id}`}
                    className={`btn btn-sm font-medium ${reviewed ? "btn-primary" : "btn-warning"}`}
                  >
                    {reviewed ? "View / Edit Review" : "Write Review"}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
