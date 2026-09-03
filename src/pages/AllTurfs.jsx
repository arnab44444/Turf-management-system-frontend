import { Link, useSearchParams, Form, useNavigate } from "react-router";
import { getImageUrl } from "../utils/imageUrl";
import { useLoaderData } from "react-router";

const SPORT_FILTERS = [
  { id: "", label: "All Sports" },
  { id: "football", label: "Football" },
  { id: "cricket", label: "Cricket" },
  { id: "badminton", label: "Badminton" },
  { id: "basketball", label: "Basketball" },
  { id: "volleyball", label: "Volleyball" },
];

export default function AllTurfs() {
  const turfs = useLoaderData() || [];
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const city = searchParams.get("city") || "";
  const sectionType = searchParams.get("sectionType") || "";
  const paymentCancelled = searchParams.get("payment_cancelled");

  const handleSportFilterClick = (sportId) => {
    const params = new URLSearchParams(searchParams);
    if (sportId) {
      params.set("sectionType", sportId);
    } else {
      params.delete("sectionType");
    }
    navigate(`/all-turfs?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
            Venues Directory
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Explore Sports Arenas
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base mt-1">
            Book verified floodlit pitches, box cricket arenas, and indoor courts with live slot booking.
          </p>
        </div>

        {paymentCancelled && (
          <div className="p-4 mb-8 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-500 text-sm flex items-center gap-3">
            <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>Payment checkout was cancelled. You can pick another slot or try again anytime.</span>
          </div>
        )}

        {/* Filter Bar */}
        <div className="p-5 sm:p-6 mb-10 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <Form method="get" action="/all-turfs" className="flex flex-col md:flex-row gap-4 items-stretch md:items-end">
            <div className="flex-1">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                Location / City
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by city or area (e.g. Dhaka, GEC, Dhanmondi...)"
                  name="city"
                  defaultValue={city}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-medium focus:outline-hidden focus:border-emerald-500 transition-colors"
                />
              </div>
            </div>

            <input type="hidden" name="sectionType" value={sectionType} />

            <div className="flex gap-2">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm shadow-md shadow-emerald-500/20 transition-all cursor-pointer"
              >
                Apply
              </button>
              {(city || sectionType) && (
                <Link
                  to="/all-turfs"
                  className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold text-sm hover:bg-slate-200 transition-colors flex items-center justify-center"
                >
                  Reset
                </Link>
              )}
            </div>
          </Form>

          {/* Quick Sport Category Pills */}
          <div className="flex items-center gap-2 mt-5 pt-4 border-t border-slate-100 dark:border-slate-800/80 overflow-x-auto pb-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1">
              Category:
            </span>
            {SPORT_FILTERS.map((s) => {
              const isActive = (sectionType || "") === s.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => handleSportFilterClick(s.id)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold tracking-wide transition-all shrink-0 cursor-pointer ${
                    isActive
                      ? "bg-emerald-500 text-white shadow-xs"
                      : "bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                  }`}
                >
                  {s.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Arenas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {turfs.map((turf) => {
            const minPrice = turf.sections?.length
              ? Math.min(...turf.sections.map((s) => s.pricePerHour || 1000))
              : 800;

            return (
              <Link
                key={turf._id}
                to={sectionType ? `/turfs/${turf._id}?sport=${sectionType}` : `/turfs/${turf._id}`}
                className="group flex flex-col rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden card-hover"
              >
                {/* Turf Image */}
                <div className="relative aspect-16/10 overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <img
                    src={
                      getImageUrl(turf.images?.[0] || turf.sections?.[0]?.images?.[0]) ||
                      "https://placehold.co/600x380/0f172a/10b981?text=Sports+Turf"
                    }
                    alt={turf.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60" />

                  {/* Rating */}
                  <div className="absolute top-3.5 right-3.5 px-2.5 py-1 rounded-lg bg-slate-900/80 backdrop-blur-md border border-white/10 text-white text-xs font-bold flex items-center gap-1">
                    <span className="text-amber-400">★</span>
                    <span>{turf.rating ? Number(turf.rating).toFixed(1) : "4.8"}</span>
                    <span className="text-[10px] text-slate-400 font-normal">({turf.totalReviews || 0})</span>
                  </div>

                  {/* Sport Badges */}
                  <div className="absolute bottom-3.5 left-3.5 flex flex-wrap gap-1.5">
                    {turf.sections?.slice(0, 3).map((sec, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/90 text-white backdrop-blur-xs capitalize"
                      >
                        {sec.type || "Football"}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors">
                      {turf.name}
                    </h3>
                    <p className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mt-1.5">
                      <svg className="w-3.5 h-3.5 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="truncate">{turf.location || turf.city}</span>
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] text-slate-400 block font-medium">Pricing</span>
                      <span className="text-base font-extrabold text-emerald-600 dark:text-emerald-400">
                        ৳{minPrice} <span className="text-xs font-normal text-slate-400">/hr</span>
                      </span>
                    </div>

                    <span className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                      View Details →
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Empty State */}
        {turfs.length === 0 && (
          <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
            <div className="text-4xl mb-3">🔍</div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">No Arenas Match Your Criteria</h3>
            <p className="text-sm text-slate-500 mt-1 max-w-md mx-auto">
              Try adjusting your city search or clearing sport category filters to view other sports venues.
            </p>
            <Link
              to="/all-turfs"
              className="mt-4 inline-block px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold"
            >
              Clear All Filters
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
