import { useState, useEffect } from "react";
import { Link, useNavigate, useLoaderData } from "react-router";
import { getImageUrl } from "../utils/imageUrl";

const HERO_IMAGES = [
  "https://i.ibb.co/PZ44pVdf/indoor-soccer-football-field.jpg",
  "https://i.ibb.co/6cM97rN0/football-field-at-sunset.jpg",
  "https://i.ibb.co/DPVFVQvp/soccer-sport-environment-filed-23-2151891706.jpg",
];

const SPORTS = [
  { id: "all", name: "All Sports", icon: "🏆" },
  { id: "football", name: "Football / Futsal", icon: "⚽" },
  { id: "cricket", name: "Box Cricket", icon: "🏏" },
  { id: "badminton", name: "Badminton", icon: "🏸" },
  { id: "tennis", name: "Tennis", icon: "🎾" },
];

export default function Home() {
  const turfs = useLoaderData() || [];
  const navigate = useNavigate();
  const [slideIndex, setSlideIndex] = useState(0);

  // Search Bar State
  const [searchCity, setSearchCity] = useState("");
  const [searchSport, setSearchSport] = useState("");

  useEffect(() => {
    const t = setInterval(() => {
      setSlideIndex((i) => (i + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => clearInterval(t);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchCity) params.set("city", searchCity);
    if (searchSport && searchSport !== "all") params.set("sectionType", searchSport);
    navigate(`/all-turfs?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100 transition-colors">
      {/* Hero Section */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
        {/* Background Image Carousel */}
        {HERO_IMAGES.map((src, i) => (
          <div
            key={src}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out scale-105 ${
              i === slideIndex ? "opacity-100" : "opacity-0"
            }`}
            style={{ backgroundImage: `url(${src})` }}
          />
        ))}

        {/* Professional Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/80 to-slate-950/90 z-1" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(11,15,25,0.7)_100%)] z-1" />

        {/* Hero Content Container */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-24 text-center">
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm font-semibold mb-6 animate-fade-in backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            Premier Sports & Turf Arena Network
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight animate-slide-up">
            Elevate Your Game at <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
              World-Class Turfs
            </span>
          </h1>

          <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
            Discover, book, and play across premium floodlit football pitches, cricket arenas, and multi-sport courts with real-time slot confirmation.
          </p>

          {/* Interactive Search Widget Bar */}
          <form
            onSubmit={handleSearch}
            className="max-w-4xl mx-auto p-3 rounded-2xl bg-white/10 dark:bg-slate-900/80 border border-white/20 dark:border-slate-700/80 backdrop-blur-xl shadow-2xl flex flex-col md:flex-row items-center gap-3 text-left"
          >
            {/* City Search */}
            <div className="flex-1 w-full flex items-center gap-3 px-4 py-3 bg-white dark:bg-slate-800/90 rounded-xl border border-slate-200 dark:border-slate-700">
              <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <div className="flex-1">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">Location</label>
                <input
                  type="text"
                  placeholder="e.g. Dhaka, Chittagong..."
                  value={searchCity}
                  onChange={(e) => setSearchCity(e.target.value)}
                  className="w-full bg-transparent text-sm font-medium text-slate-800 dark:text-white placeholder-slate-400 focus:outline-hidden"
                />
              </div>
            </div>

            {/* Sport Selector */}
            <div className="flex-1 w-full flex items-center gap-3 px-4 py-3 bg-white dark:bg-slate-800/90 rounded-xl border border-slate-200 dark:border-slate-700">
              <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="flex-1">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">Sport Category</label>
                <select
                  value={searchSport}
                  onChange={(e) => setSearchSport(e.target.value)}
                  className="w-full bg-transparent text-sm font-medium text-slate-800 dark:text-white focus:outline-hidden cursor-pointer"
                >
                  {SPORTS.map((s) => (
                    <option key={s.id} value={s.id} className="text-slate-900 bg-white">
                      {s.icon} {s.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Search Submit Button */}
            <button
              type="submit"
              className="w-full md:w-auto px-8 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm tracking-wide shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] shrink-0"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span>Explore Available Slots</span>
            </button>
          </form>
        </div>

        {/* Carousel Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
          {HERO_IMAGES.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Slide ${i + 1}`}
              onClick={() => setSlideIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === slideIndex ? "w-8 bg-emerald-400" : "w-2 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Trust & Performance Metrics Bar */}
      <section className="relative z-20 -mt-10 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl">
          {[
            { value: "50+", label: "Verified Arenas", sub: "Nationwide Network" },
            { value: "15,000+", label: "Slots Booked", sub: "99.8% Reliability" },
            { value: "4.9/5", label: "Player Rating", sub: "From 2,400+ Reviews" },
            { value: "Instant", label: "Confirmation", sub: "Zero Waiting Time" },
          ].map((stat, i) => (
            <div key={i} className="text-center sm:text-left border-r last:border-0 border-slate-100 dark:border-slate-800/80 pr-2">
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 mt-0.5">
                {stat.label}
              </div>
              <div className="text-[11px] text-slate-600 dark:text-slate-300">{stat.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Arenas Grid */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
              Featured Venues
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Top Rated Sports Turfs
            </h2>
            <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 mt-1">
              Hand-picked venues equipped with FIFA-standard artificial grass and professional lighting.
            </p>
          </div>
          <Link
            to="/all-turfs"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
          >
            <span>Browse All Venues</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {turfs.slice(0, 6).map((turf, i) => {
            const minPrice = turf.sections?.length
              ? Math.min(...turf.sections.map((s) => s.pricePerHour || 1000))
              : 800;

            return (
              <Link
                key={turf._id}
                to={`/turfs/${turf._id}`}
                className="group flex flex-col rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden card-hover"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                {/* Image & Badges */}
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

                  {/* Rating Badge */}
                  <div className="absolute top-3.5 right-3.5 px-2.5 py-1 rounded-lg bg-slate-900/80 backdrop-blur-md border border-white/10 text-white text-xs font-bold flex items-center gap-1">
                    <span className="text-amber-400">★</span>
                    <span>{turf.rating ? Number(turf.rating).toFixed(1) : "4.8"}</span>
                  </div>

                  {/* Sport Categories Tag */}
                  <div className="absolute bottom-3.5 left-3.5 flex flex-wrap gap-1.5">
                    {turf.sections?.slice(0, 2).map((sec, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/90 text-white backdrop-blur-xs"
                      >
                        {sec.type || "Football"}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Content */}
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
                      <span className="truncate">{turf.location || turf.city || "Dhaka"}</span>
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] text-slate-400 block font-medium">Starts from</span>
                      <span className="text-base font-extrabold text-emerald-600 dark:text-emerald-400">
                        ৳{minPrice} <span className="text-xs font-normal text-slate-400">/hr</span>
                      </span>
                    </div>

                    <span className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                      Book Slot →
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {turfs.length === 0 && (
          <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
            <div className="text-4xl mb-3">🏟️</div>
            <h4 className="text-lg font-bold text-slate-800 dark:text-slate-200">No Turfs Found</h4>
            <p className="text-sm text-slate-500 mt-1">Be the first to list a premier sports arena.</p>
          </div>
        )}
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-white dark:bg-slate-900/60 border-y border-slate-200/80 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Seamless Process
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
              How Turf Booking Works
            </h2>
            <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 mt-2">
              Book your favorite sports arena in under 60 seconds with 3 simple steps.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Search & Filter",
                desc: "Choose your city, sport category, pitch size (5v5, 7v7), and check real-time availability.",
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                ),
              },
              {
                step: "02",
                title: "Pick Slot & Pay",
                desc: "Select available morning, evening, or floodlit night slots and checkout securely with Stripe.",
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                ),
              },
              {
                step: "03",
                title: "Play & Compete",
                desc: "Receive instant booking confirmation on your dashboard, invite your squad, and dominate the game.",
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                ),
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="relative p-8 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 hover:shadow-lg transition-all"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      {item.icon}
                    </svg>
                  </div>
                  <span className="text-3xl font-black text-slate-300 dark:text-slate-700">{item.step}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise Venue Owners Banner */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white p-8 sm:p-14 relative overflow-hidden border border-slate-700/60 shadow-2xl">
          <div className="max-w-2xl relative z-10">
            <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-4">
              Venue Partner Program
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
              Are you a Sports Turf or Arena Owner?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
              Maximize your court occupancy, automate slot management, and receive online payments directly into your account with our enterprise dashboard.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/auth/register"
                className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm shadow-lg shadow-emerald-500/30 transition-all hover:scale-[1.02]"
              >
                Register as Venue Partner
              </Link>
              <Link
                to="/contact"
                className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 transition-all"
              >
                Contact Business Team
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
