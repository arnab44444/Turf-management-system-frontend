import { useState, useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { useNavigate } from "react-router";
import api from "../../api/axios";

const SECTION_LABELS = {
  football: "Football",
  cricket: "Cricket",
  badminton: "Badminton",
  basketball: "Basketball",
  volleyball: "Volleyball",
  other: "Other",
};

const ALL_SLOTS = [];
for (let h = 6; h <= 23; h++) {
  ALL_SLOTS.push({
    startTime: `${h.toString().padStart(2, "0")}:00`,
    endTime: `${(h + 1).toString().padStart(2, "0")}:00`,
  });
}

export default function Schedule() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [turfs, setTurfs] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [selectedTurf, setSelectedTurf] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [turfsLoading, setTurfsLoading] = useState(true);

  const turf = turfs.find((t) => t._id === selectedTurf);

  const bookedSlots = ALL_SLOTS.filter(
    (s) => !availableSlots.some((a) => a.startTime === s.startTime)
  );

  const getBookingForSlot = (startTime) => {
    const dateObj = selectedDate ? new Date(selectedDate + "T00:00:00.000Z") : null;
    if (!dateObj) return null;
    return bookings.find((b) => {
      const bDate = new Date(b.date).toISOString().split("T")[0];
      return (
        bDate === selectedDate &&
        String(b.turfId?._id || b.turfId) === selectedTurf &&
        String(b.sectionId) === selectedSection &&
        b.startTime === startTime &&
        !["rejected", "cancelled"].includes(b.status)
      );
    });
  };

  useEffect(() => {
    if (user?.role !== "owner" && user?.role !== "admin") {
      navigate("/dashboard");
      return;
    }
    api
      .get("/turfs/owner")
      .then(({ data }) => setTurfs(data))
      .catch(() => setTurfs([]))
      .finally(() => setTurfsLoading(false));
  }, [user, navigate]);

  useEffect(() => {
    if (user?.role === "owner") {
      api.get("/bookings/owner").then(({ data }) => setBookings(data)).catch(() => setBookings([]));
    }
  }, [user?.role]);

  useEffect(() => {
    setSelectedSection("");
    setAvailableSlots([]);
  }, [selectedTurf]);

  useEffect(() => {
    setAvailableSlots([]);
  }, [selectedDate]);

  useEffect(() => {
    if (!selectedTurf || !selectedSection || !selectedDate) {
      setAvailableSlots([]);
      return;
    }
    setLoading(true);
    api
      .get(
        `/bookings/slots/${selectedTurf}?date=${selectedDate}&sectionId=${selectedSection}`
      )
      .then(({ data }) => setAvailableSlots(Array.isArray(data) ? data : []))
      .catch(() => setAvailableSlots([]))
      .finally(() => setLoading(false));
  }, [selectedTurf, selectedSection, selectedDate]);

  if (turfsLoading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );
  }

  if (turfs.length === 0) {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-6 text-base-content">Schedule</h2>
        <div className="card bg-base-100 border border-base-200 p-8 text-center">
          <p className="text-base-content/70">Add a turf and sections to view the schedule.</p>
        </div>
      </div>
    );
  }

  const showSchedule = selectedTurf && selectedSection && selectedDate;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2 text-base-content">Schedule</h2>
      <p className="text-base-content/70 mb-6">
        Compare available and booked slots side by side to manage scheduling efficiently
      </p>

      <div className="card bg-base-100 shadow-xl rounded-2xl border border-base-200 p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium text-base-content">Turf</span>
            </label>
            <select
              className="select select-bordered w-full"
              value={selectedTurf}
              onChange={(e) => setSelectedTurf(e.target.value)}
            >
              <option value="">Select turf</option>
              {turfs.map((t) => (
                <option key={t._id} value={t._id}>{t.name}</option>
              ))}
            </select>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium text-base-content">Section</span>
            </label>
            <select
              className="select select-bordered w-full"
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              disabled={!selectedTurf || !turf?.sections?.length}
            >
              <option value="">Select section</option>
              {turf?.sections?.map((s) => (
                <option key={s._id} value={s._id}>
                  {s.name} ({SECTION_LABELS[s.type] || s.type})
                </option>
              ))}
            </select>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium text-base-content">Date</span>
            </label>
            <input
              type="date"
              className="input input-bordered w-full"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>
        </div>
      </div>

      {showSchedule && (
        <>
          <div className="flex flex-wrap gap-4 mb-4 text-sm">
            <span className="badge badge-success gap-1">
              <span className="w-2 h-2 rounded-full bg-current opacity-80" />
              {loading ? "—" : availableSlots.length} Available
            </span>
            <span className="badge badge-error gap-1">
              <span className="w-2 h-2 rounded-full bg-current opacity-80" />
              {loading ? "—" : bookedSlots.length} Booked
            </span>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card bg-base-100 shadow-xl rounded-2xl border border-base-200 overflow-hidden border-l-4 border-l-success">
              <div className="card-body">
                <h3 className="card-title text-lg text-base-content flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-success shrink-0" />
                  Available Slots
                </h3>
                {loading ? (
                  <div className="flex justify-center py-8">
                    <span className="loading loading-spinner loading-md text-success" />
                  </div>
                ) : (
                  <div className="grid grid-cols-4 gap-2">
                    {availableSlots.map((s, i) => (
                      <div
                        key={i}
                        className="py-2 px-3 rounded-lg bg-success/20 text-success border border-success/40 text-center font-medium"
                      >
                        {s.startTime}–{s.endTime}
                      </div>
                    ))}
                  </div>
                )}
                {!loading && availableSlots.length === 0 && (
                  <p className="text-base-content/60 py-4">No available slots this day</p>
                )}
              </div>
            </div>

            <div className="card bg-base-100 shadow-xl rounded-2xl border border-base-200 overflow-hidden border-l-4 border-l-error">
              <div className="card-body">
                <h3 className="card-title text-lg text-base-content flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-error shrink-0" />
                  Booked Slots
                </h3>
                {loading ? (
                  <div className="flex justify-center py-8">
                    <span className="loading loading-spinner loading-md text-error" />
                  </div>
                ) : (
                  <div className="grid grid-cols-4 gap-2">
                    {bookedSlots.map((s, i) => {
                      const booking = getBookingForSlot(s.startTime);
                      return (
                        <div
                          key={i}
                          className="py-2 px-3 rounded-lg bg-error/20 text-error border border-error/40 text-center"
                        >
                          <span className="font-medium block">{s.startTime}–{s.endTime}</span>
                          {booking?.userId?.name && (
                            <span className="text-xs block mt-1 text-base-content/70 truncate" title={booking.userId.name}>
                              {booking.userId.name}
                            </span>
                          )}
                          {booking?.userId?.phone && (
                            <span className="text-xs block text-base-content/60 truncate" title={booking.userId.phone}>
                              {booking.userId.phone}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
                {!loading && bookedSlots.length === 0 && (
                  <p className="text-base-content/60 py-4">All slots are free this day</p>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {!showSchedule && (
        <div className="card bg-base-100 border border-base-200 p-12 text-center">
          <p className="text-base-content/60">Select turf, section, and date to view the schedule</p>
          <p className="text-sm text-base-content/50 mt-1">Free and booked slots will appear side by side</p>
        </div>
      )}
    </div>
  );
}
