import { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams, Link } from "react-router";
import { toast } from "react-toastify";
import { useLoaderData } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import api from "../api/axios";

const SECTION_LABELS = {
  football: "Football",
  cricket: "Cricket",
  badminton: "Badminton",
  basketball: "Basketball",
  volleyball: "Volleyball",
  other: "Other",
};

const SPORT_BADGE_STYLES = {
  football: "bg-[#22C55E] text-white border-none",
  cricket: "bg-[#38BDF8] text-[#0c4a6e] border-none",
  badminton: "bg-[#F97316] text-white border-none",
  basketball: "bg-[#8B5CF6] text-white border-none",
  volleyball: "bg-[#EC4899] text-white border-none",
  other: "bg-[#64748b] text-white border-none",
};

export default function TurfDetails() {
  const turf = useLoaderData();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const filterSport = searchParams.get("sport");
  const [reviews, setReviews] = useState([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: "" });
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [turfData, setTurfData] = useState(turf);
  const [canReview, setCanReview] = useState(false);

  useEffect(() => {
    setTurfData(turf);
  }, [turf]);

  useEffect(() => {
    if (user && turf?._id) {
      api.get("/bookings/my")
        .then(({ data }) => {
          const paidForThisTurf = data.some(
            (b) => String(b.turfId?._id || b.turfId) === String(turf._id) &&
              b.paymentStatus === "paid" &&
              !["rejected", "cancelled"].includes(b.status)
          );
          setCanReview(paidForThisTurf);
        })
        .catch(() => setCanReview(false));
    } else {
      setCanReview(false);
    }
  }, [user, turf?._id]);

  useEffect(() => {
    if (turf?._id) {
      api.get(`/turfs/${turf._id}/reviews`)
        .then(({ data }) => setReviews(data))
        .catch(() => setReviews([]));
    }
  }, [turf?._id]);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate("/auth/login");
      return;
    }
    setReviewSubmitting(true);
    try {
      await api.post("/reviews", {
        turfId: turf._id,
        rating: reviewForm.rating,
        comment: reviewForm.comment.trim() || undefined,
      });
      const { data } = await api.get(`/turfs/${turf._id}/reviews`);
      setReviews(data);
      const { data: turfRes } = await api.get(`/turfs/${turf._id}`);
      setTurfData(turfRes);
      setReviewForm({ rating: 5, comment: "" });
      setShowReviewForm(false);
      toast.success("Review submitted successfully");
    } catch (err) {
      const msg = err?.response?.data?.message || "Failed to submit review.";
      toast.error(msg);
      if (err?.response?.status === 403) setShowReviewForm(false);
    } finally {
      setReviewSubmitting(false);
    }
  };

  const allSections = turfData?.sections || turf?.sections || [];
  const sections = filterSport
    ? allSections.filter((s) => s.type === filterSport)
    : allSections;

  if (!turf) return <div className="text-center py-20 text-xl">Turf not found</div>;
  if (sections.length === 0) {
    if (filterSport) {
      return (
        <div className="text-center py-20">
          <p className="text-xl">No {SECTION_LABELS[filterSport] || filterSport} sections in this turf.</p>
          <Link to={`/turfs/${turf._id}`} className="btn btn-primary mt-4">View all sections</Link>
        </div>
      );
    }
    return <div className="text-center py-20 text-xl">No sections available. Turf is being updated.</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-base-content">{turf.name}</h1>
        <p className="text-lg text-base-content/70 mt-2">{turf.location}, {turf.city}</p>
        <div className="badge badge-lg mt-2 bg-primary text-primary-content border-0">
          ⭐ {(turfData || turf).rating ?? "—"} ({(turfData || turf).totalReviews ?? 0} reviews)
        </div>
      </div>

      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">
            {filterSport ? `${SECTION_LABELS[filterSport] || filterSport} Sections` : "Sports Sections"}
          </h2>
          {filterSport && (
            <Link to={`/turfs/${turf._id}`} className="btn btn-ghost btn-sm">View all sports</Link>
          )}
        </div>
        <p className="text-base-content/70 mb-4">Select a section to view slots and book</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section) => (
            <Link
              key={section._id}
              to={`/turfs/${turf._id}/book/${section._id}`}
              className="card bg-base-100 shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl rounded-2xl border border-base-200 hover:-translate-y-1"
            >
              <figure className="overflow-hidden">
                <img
                  src={section.images?.[0] || turf.images?.[0] || "https://placehold.co/400x200/166534/22c55e?text=Section"}
                  alt={section.name}
                  className="h-44 w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </figure>
              <div className="card-body p-4">
                <h3 className="card-title text-lg text-base-content">{section.name}</h3>
                <span className={`badge badge-sm w-fit ${SPORT_BADGE_STYLES[section.type] || SPORT_BADGE_STYLES.other}`}>
                  {SECTION_LABELS[section.type] || section.type}
                </span>
                <span className="badge bg-base-200 text-base-content border-none w-fit font-medium">৳{section.pricePerHour}/hr</span>
                {section.facilities?.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {section.facilities.slice(0, 3).map((f, i) => (
                      <span key={i} className="badge badge-outline badge-sm">{f}</span>
                    ))}
                  </div>
                )}
                <span className="text-sm text-primary font-medium mt-2">Book this section →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {turf.description && (
        <div className="card bg-base-100 p-6 mb-10 shadow-xl rounded-2xl border border-base-200">
          <h3 className="font-bold text-lg mb-2 text-base-content">About</h3>
          <p className="text-base-content/80">{turf.description}</p>
        </div>
      )}

      <div className="card bg-base-100 shadow-xl rounded-2xl mb-10 border border-base-200">
        <div className="card-body">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <h2 className="text-2xl font-bold">Reviews</h2>
            {user && canReview && (
              <button
                type="button"
                className="btn btn-sm font-medium"
                style={{ backgroundColor: "#FFB703", color: "#14532D", border: "none" }}
                onClick={() => setShowReviewForm(!showReviewForm)}
              >
                {showReviewForm ? "Cancel" : "Write a Review"}
              </button>
            )}
            {user && !canReview && (
              <p className="text-sm text-base-content/60">Book and pay for a slot to leave a review</p>
            )}
            {!user && (
              <p className="text-sm text-base-content/60">
                <Link to="/auth/login" className="link" style={{ color: "#2E7D32" }}>Log in</Link> to write a review
              </p>
            )}
          </div>
          {showReviewForm && (
            <form onSubmit={handleSubmitReview} className="mb-6 p-4 rounded-xl bg-base-200">
              <div className="form-control mb-3">
                <label className="label py-1">
                  <span className="label-text font-medium">Rating</span>
                </label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className="text-2xl focus:outline-none"
                      onClick={() => setReviewForm((f) => ({ ...f, rating: star }))}
                      aria-label={`${star} star${star > 1 ? "s" : ""}`}
                    >
                      {star <= reviewForm.rating ? "⭐" : "☆"}
                    </button>
                  ))}
                </div>
              </div>
              <div className="form-control mb-3">
                <label className="label py-1">
                  <span className="label-text font-medium">Comment (optional)</span>
                </label>
                <textarea
                  className="textarea textarea-bordered w-full"
                  rows={3}
                  placeholder="Share your experience..."
                  value={reviewForm.comment}
                  onChange={(e) => setReviewForm((f) => ({ ...f, comment: e.target.value }))}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary font-medium"
                disabled={reviewSubmitting}
              >
                {reviewSubmitting ? "Submitting..." : "Submit Review"}
              </button>
            </form>
          )}
          {reviews.length > 0 ? (
            <div className="space-y-4">
              {reviews.map((r) => (
                <div key={r._id} className="p-4 rounded-lg border border-base-200">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-base-content">{r.userId?.name || "Anonymous"}</span>
                    <span className="text-yellow-500">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</span>
                  </div>
                  {r.comment && <p className="text-base-content/80 text-sm">{r.comment}</p>}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-base-content/60">No reviews yet. Be the first to review!</p>
          )}
        </div>
      </div>
    </div>
  );
}
