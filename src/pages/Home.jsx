import { Link } from "react-router";
import { useLoaderData } from "react-router";

export default function Home() {
  const turfs = useLoaderData() || [];

  return (
    <div>
      <section className="hero min-h-[85vh] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#2E7D32]/20 via-[#F1F8F4] to-[#38BDF8]/20" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%232E7D32\' fill-opacity=\'0.06\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50" />
        <div className="hero-content text-center relative z-10 py-20">
          <div className="max-w-4xl animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6" style={{ color: "#14532D" }}>
              Book Your Perfect <span style={{ color: "#2E7D32" }}>Turf</span>
            </h1>
            <p className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto leading-relaxed" style={{ color: "#1F2937" }}>
              Find and book the best turfs in your city. Football, cricket, badminton and more — quick, easy, and affordable.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/all-turfs"
                className="btn btn-lg font-bold shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300"
                style={{ backgroundColor: "#FFB703", color: "#14532D", border: "none" }}
              >
                Explore Turfs
              </Link>
              <Link
                to="/about"
                className="btn btn-outline btn-lg font-semibold border-2 hover:bg-[#E8F5E9]"
                style={{ borderColor: "#2E7D32", color: "#14532D" }}
              >
                How It Works
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4" style={{ color: "#14532D" }}>
              Popular <span style={{ color: "#2E7D32" }}>Turfs</span>
            </h2>
            <p className="text-lg text-base-content/70 max-w-xl mx-auto">
              Each turf is an arena. Click to see its sports sections and book your slot.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {turfs.slice(0, 6).map((turf, i) => (
              <Link
                key={turf._id}
                to={`/turfs/${turf._id}`}
                className="group card bg-white shadow-lg hover:shadow-2xl border border-[#C8E6C9]/50 overflow-hidden card-hover animate-slide-up rounded-xl"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <figure className="overflow-hidden">
                  <img
                    src={turf.images?.[0] || turf.sections?.[0]?.images?.[0] || "https://placehold.co/400x240/166534/22c55e?text=Turf"}
                    alt={turf.name}
                    className="h-52 w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 badge badge-primary badge-lg shadow-md">
                    ⭐ {turf.rating || "—"}
                  </div>
                </figure>
                <div className="card-body">
                  <h3 className="card-title text-xl transition-colors" style={{ color: "#14532D" }}>{turf.name}</h3>
                  <p className="text-base-content/70">{turf.location}</p>
                </div>
              </Link>
            ))}
          </div>
          {turfs.length === 0 && (
            <p className="text-center text-base-content/60 py-16 text-lg">
              No turfs yet. Be the first to add one!
            </p>
          )}
          {turfs.length > 0 && (
            <div className="text-center mt-12">
              <Link
                to="/all-turfs"
                className="btn btn-outline font-semibold"
                style={{ borderColor: "#2E7D32", color: "#14532D" }}
              >
                View All Turfs
              </Link>
            </div>
          )}
        </div>
      </section>

      <section className="py-20" style={{ backgroundColor: "#E8F5E9" }}>
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-4xl font-extrabold text-center mb-14">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { step: 1, title: "Search", desc: "Find turfs by location, sport, and availability", icon: "🔍" },
              { step: 2, title: "Book", desc: "Select your date and time slot, pay securely online", icon: "📅" },
              { step: 3, title: "Play", desc: "Show up and enjoy your game with friends", icon: "⚽" },
            ].map((item) => (
              <div
                key={item.step}
                className="flex flex-col items-center text-center p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <div className="text-4xl font-bold mb-2" style={{ color: "#2E7D32" }}>{item.step}</div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p style={{ color: "#1F2937" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
