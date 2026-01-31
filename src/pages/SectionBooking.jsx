import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { getImageUrl } from "../utils/imageUrl";
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

export default function SectionBooking() {
  const turf = useLoaderData();
  const { sectionId } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const section = turf?.sections?.find(
    (s) => String(s._id) === String(sectionId)
  );

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasCheckedSlots, setHasCheckedSlots] = useState(false);

  const todayStr = new Date().toISOString().split("T")[0];
  const now = new Date();
  const currentTime = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
  const displaySlots =
    selectedDate === todayStr ? slots.filter((s) => s.startTime > currentTime) : slots;

  const fetchSlots = async () => {
    if (!selectedDate || !section) return;
    setLoading(true);
    try {
      const sid = section._id?.toString?.() || String(section._id);
      const { data } = await api.get(
        `/bookings/slots/${turf._id}?date=${selectedDate}&sectionId=${sid}`
      );
      setSlots(Array.isArray(data) ? data : []);
    } catch (err) {
      setSlots([]);
    } finally {
      setLoading(false);
      setHasCheckedSlots(true);
    }
  };

  const handleBook = () => {
    if (!user) {
      navigate("/auth/login");
      return;
    }
    if (!selectedDate || !selectedSlot || !section) return;
    const totalHours = 1;
    const totalAmount = section.pricePerHour * totalHours;
    navigate("/payment", {
      state: {
        turf,
        section,
        date: selectedDate,
        slot: selectedSlot,
        totalHours,
        totalAmount,
      },
    });
  };

  if (!turf || !section) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <p className="text-xl text-base-content/70">Section not found</p>
        {turf?._id && (
          <Link to={`/turfs/${turf._id}`} className="btn btn-primary mt-4">
            Back to {turf.name}
          </Link>
        )}
        {!turf?._id && <Link to="/all-turfs" className="btn btn-primary mt-4">Browse Turfs</Link>}
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <Link
        to={`/turfs/${turf._id}`}
        className="inline-flex items-center gap-2 text-primary hover:underline mb-6"
      >
        ← Back to {turf.name}
      </Link>

      <div className="card bg-base-100 shadow-xl rounded-2xl border border-base-200 overflow-hidden mb-6">
        <figure className="h-48 md:h-56">
          <img
            src={getImageUrl(section.images?.[0] || turf.images?.[0]) || "https://placehold.co/800x300/166534/22c55e?text=Section"}
            alt={section.name}
            className="w-full object-cover"
          />
        </figure>
        <div className="card-body p-6">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <h1 className="text-2xl md:text-3xl font-extrabold text-base-content">{section.name}</h1>
            <span className={`badge badge-lg ${SPORT_BADGE_STYLES[section.type] || SPORT_BADGE_STYLES.other}`}>
              {SECTION_LABELS[section.type] || section.type}
            </span>
          </div>
          <p className="text-base-content/70">{turf.location}, {turf.city}</p>
          <p className="text-lg font-semibold text-primary">৳{section.pricePerHour}/hr</p>
          {section.facilities?.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {section.facilities.map((f, i) => (
                <span key={i} className="badge badge-outline badge-sm">{f}</span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="card bg-base-100 shadow-xl rounded-2xl border border-base-200">
        <div className="card-body p-6">
          <h2 className="text-xl font-bold mb-4 text-base-content">Select Date & Time</h2>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text font-medium text-base-content">Date</span>
            </label>
            <input
              type="date"
              className="input input-bordered w-full max-w-xs"
              value={selectedDate}
              onChange={(e) => {
                setSelectedDate(e.target.value);
                setSelectedSlot(null);
                setSlots([]);
                setHasCheckedSlots(false);
              }}
              min={todayStr}
            />
          </div>
          {selectedDate && (
            <>
              <button
                className="btn w-fit mb-4"
                style={{ backgroundColor: "#38BDF8", color: "#0c4a6e", border: "none" }}
                onClick={fetchSlots}
                disabled={loading}
              >
                {loading ? "Loading..." : "Check Availability"}
              </button>
              {displaySlots.length > 0 && (
                <div className="mb-6">
                  <label className="label">
                    <span className="label-text font-medium text-base-content">Available Slots</span>
                  </label>
                  <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                    {displaySlots.map((s, i) => (
                      <button
                        key={i}
                        type="button"
                        className={`btn btn-sm ${
                          selectedSlot?.startTime === s.startTime
                            ? "bg-primary text-primary-content border-primary ring-2 ring-primary ring-offset-2 ring-offset-base-100"
                            : "border-2 border-primary bg-base-200 text-base-content hover:bg-primary/20"
                        }`}
                        onClick={() => setSelectedSlot(s)}
                      >
                        {s.startTime}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {!loading && hasCheckedSlots && displaySlots.length === 0 && (
                <p className="text-base-content/70 mb-4">No slots available. Try another date.</p>
              )}
              {selectedSlot && (
                <div className="p-6 rounded-xl bg-base-200">
                  <p className="font-medium text-base-content">Selected: {selectedDate} at {selectedSlot.startTime} - {selectedSlot.endTime}</p>
                  <p className="text-xl font-bold mt-2 text-base-content">Total: ৳{section.pricePerHour} (1 hr)</p>
                  <button
                    className="btn btn-lg mt-4 w-full sm:w-auto font-semibold"
                    style={{ backgroundColor: "#FFB703", color: "#14532D", border: "none" }}
                    onClick={handleBook}
                  >
                    Proceed to Payment
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
