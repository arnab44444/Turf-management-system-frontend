import { Link } from "react-router";

const FEATURES = [
  {
    icon: "🏟️",
    title: "Multi-Turf Platform",
    desc: "Book football, cricket, badminton, and more from a single platform.",
  },
  {
    icon: "⚡",
    title: "Instant Booking",
    desc: "Check availability in real-time and secure your slot with online payment.",
  },
  {
    icon: "👥",
    title: "For Everyone",
    desc: "Players book turfs easily. Owners list and manage their arenas effortlessly.",
  },
  {
    icon: "⭐",
    title: "Trusted Reviews",
    desc: "Read and leave reviews to help the community choose the best turfs.",
  },
];

const STATS = [
  { value: "100+", label: "Turfs Listed" },
  { value: "50K+", label: "Bookings" },
  { value: "4.8", label: "Avg Rating" },
];

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary/20 via-base-100 to-secondary/20 border-b border-base-200">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(34,197,94,0.08)_0%,transparent_50%)]" />
        <div className="relative max-w-5xl mx-auto px-4 py-16 md:py-24">
          <p className="text-primary font-semibold tracking-wide mb-2">About Us</p>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-base-content">
            About <span className="text-primary">Turf-Buddy</span>
          </h1>
          <p className="text-xl text-base-content/80 max-w-2xl leading-relaxed">
            Turf-Buddy is a multi-turf booking platform that connects turf owners with players.
            Whether you want to book a turf for a friendly match or list your turf for others to book,
            we make it simple and convenient.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-5xl mx-auto px-4 -mt-8 relative z-10">
        <div className="grid grid-cols-3 gap-4">
          {STATS.map((s, i) => (
            <div
              key={i}
              className="card bg-base-100 shadow-xl border border-base-200 overflow-hidden"
            >
              <div className="card-body py-6 text-center">
                <p className="text-3xl font-extrabold text-primary">{s.value}</p>
                <p className="text-sm font-medium text-base-content/70">{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mission */}
      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="card bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 shadow-xl overflow-hidden">
          <div className="card-body p-8 md:p-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl">🎯</span>
              <h2 className="text-2xl md:text-3xl font-bold text-base-content">Our Mission</h2>
            </div>
            <p className="text-lg text-base-content/80 leading-relaxed max-w-3xl">
              To make turf booking easy, transparent, and accessible for everyone.
              We believe every player deserves a great field to play on.
            </p>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-5xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold mb-8 text-base-content text-center">Why Choose Us</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((f, i) => (
            <div
              key={i}
              className="card bg-base-100 border border-base-200 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 group"
            >
              <div className="card-body">
                <span className="text-3xl mb-2 block group-hover:scale-110 transition-transform">{f.icon}</span>
                <h3 className="font-bold text-base-content">{f.title}</h3>
                <p className="text-sm text-base-content/70">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-5xl mx-auto px-4 pb-20">
        <div className="card bg-primary text-primary-content shadow-xl">
          <div className="card-body p-8 md:p-12 text-center">
            <h2 className="text-2xl font-bold mb-2">Ready to play?</h2>
            <p className="text-primary-content/90 mb-6">Find your perfect turf and book in minutes.</p>
            <Link to="/all-turfs" className="btn bg-white text-primary border-0 hover:bg-base-200 w-fit mx-auto">
              Browse Turfs
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
