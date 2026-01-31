import { useState } from "react";
import { useParams, useNavigate, useSearchParams, Link } from "react-router";
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
  const [selectedSection, setSelectedSection] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const allSections = turf?.sections || [];
  const sections = filterSport
    ? allSections.filter((s) => s.type === filterSport)
    : allSections;

  const fetchSlots = async () => {
    if (!selectedDate || !selectedSection) return;
    setLoading(true);
    try {
      const { data } = await api.get(
        `/bookings/slots/${turf._id}?date=${selectedDate}&sectionId=${selectedSection._id}`
      );
      setSlots(data);
    } catch (err) {
      setSlots([]);
    } finally {
      setLoading(false);
    }
  };

  const handleBook = () => {
    if (!user) {
      navigate("/auth/login");
      return;
    }
    if (!selectedDate || !selectedSlot || !selectedSection) return;
    const totalHours = 1;
    const totalAmount = selectedSection.pricePerHour * totalHours;
    navigate("/payment", {
      state: {
        turf,
        section: selectedSection,
        date: selectedDate,
        slot: selectedSlot,
        totalHours,
        totalAmount,
      },
    });
  };

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
        <h1 className="text-4xl md:text-5xl font-extrabold">{turf.name}</h1>
        <p className="text-lg text-base-content/70 mt-2">{turf.location}, {turf.city}</p>
        <div className="badge badge-lg mt-2" style={{ backgroundColor: "#2E7D32", color: "white", border: "none" }}>
          ⭐ {turf.rating || "—"} ({turf.totalReviews || 0} reviews)
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section) => (
            <div
              key={section._id}
              className={`card bg-white shadow-lg cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-xl rounded-xl ${
                selectedSection?._id === section._id ? "ring-2 ring-[#2E7D32] ring-offset-2" : ""
              }`}
              onClick={() => {
                setSelectedSection(section);
                setSelectedDate("");
                setSelectedSlot(null);
                setSlots([]);
              }}
            >
              <figure className="overflow-hidden">
                <img
                  src={section.images?.[0] || turf.images?.[0] || "https://placehold.co/400x200/166534/22c55e?text=Section"}
                  alt={section.name}
                  className="h-44 w-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </figure>
              <div className="card-body p-4">
                <h3 className="card-title text-lg" style={{ color: "#14532D" }}>{section.name}</h3>
                <span className={`badge badge-sm ${SPORT_BADGE_STYLES[section.type] || SPORT_BADGE_STYLES.other}`}>
                  {SECTION_LABELS[section.type] || section.type}
                </span>
                <span className="badge bg-[#38BDF8]/20 text-[#0c4a6e] border-none">৳{section.pricePerHour}/hr</span>
                {section.facilities?.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {section.facilities.slice(0, 3).map((f, i) => (
                      <span key={i} className="badge badge-outline badge-sm">{f}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {turf.description && (
        <div className="card bg-white p-6 mb-10 shadow-lg rounded-xl">
          <h3 className="font-bold text-lg mb-2">About</h3>
          <p className="text-base-content/80">{turf.description}</p>
        </div>
      )}

      {selectedSection && (
        <div className="card bg-white shadow-xl rounded-xl">
          <div className="card-body">
            <h2 className="card-title text-2xl">Book {selectedSection.name}</h2>
            {bookingSuccess && (
              <div className="alert alert-success shadow-md">
                <span>Booking confirmed! Check your dashboard.</span>
              </div>
            )}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Select Date</span>
              </label>
              <input
                type="date"
                className="input input-bordered w-full max-w-xs"
                value={selectedDate}
                onChange={(e) => {
                  setSelectedDate(e.target.value);
                  setSelectedSlot(null);
                  setSlots([]);
                }}
                min={new Date().toISOString().split("T")[0]}
              />
            </div>
            {selectedDate && (
              <>
                <button
                  className="btn btn-sm mt-4 w-fit"
                  style={{ backgroundColor: "#38BDF8", color: "#0c4a6e", border: "none" }}
                  onClick={fetchSlots}
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Check Availability"}
                </button>
                {slots.length > 0 && (
                  <div className="mt-6">
                    <label className="label">
                      <span className="label-text font-medium">Available Slots</span>
                    </label>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                      {slots.map((s, i) => (
                        <button
                          key={i}
                          className={`btn btn-sm ${
                            selectedSlot?.startTime === s.startTime
                              ? "border-2 bg-[#FFB703] text-[#14532D] border-[#FFB703] ring-2 ring-[#FFB703] ring-offset-1"
                              : "border-2 border-[#22C55E] bg-[#f0fdf4] text-[#14532D] hover:bg-[#22C55E]/20"
                          }`}
                          onClick={() => setSelectedSlot(s)}
                        >
                          {s.startTime}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {!loading && slots.length === 0 && selectedDate && (
                  <p className="text-base-content/70 mt-4">No slots available. Try another date.</p>
                )}
                {selectedSlot && (
                  <div className="mt-6 p-6 rounded-xl" style={{ backgroundColor: "#E8F5E9" }}>
                    <p className="font-medium">Selected: {selectedDate} at {selectedSlot.startTime} - {selectedSlot.endTime}</p>
                    <p className="text-xl font-bold mt-2">Total: ৳{selectedSection.pricePerHour} (1 hr)</p>
                    <button className="btn btn-lg mt-4 font-semibold shadow-lg" style={{ backgroundColor: "#FFB703", color: "#14532D", border: "none" }} onClick={handleBook}>
                      Proceed to Payment
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
