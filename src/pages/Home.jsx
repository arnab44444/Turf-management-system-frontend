import { useState, useEffect } from "react";
import { Link } from "react-router";
import { getImageUrl } from "../utils/imageUrl";
import { useLoaderData } from "react-router";

const HERO_IMAGES = [
  "https://i.ibb.co/PZ44pVdf/indoor-soccer-football-field.jpg",
  "https://i.ibb.co/6cM97rN0/football-field-at-sunset.jpg",
  "https://i.ibb.co/DPVFVQvp/soccer-sport-environment-filed-23-2151891706.jpg",
];

export default function Home() {
  const turfs = useLoaderData() || [];
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setSlideIndex((i) => (i + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <div>
      <section className="hero min-h-[90vh] relative overflow-hidden">
        {HERO_IMAGES.map((src, i) => (
          <div
            key={src}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ${
              i === slideIndex ? "opacity-100 z-0" : "opacity-0 z-0"
            }`}
            style={{ backgroundImage: `url(${src})` }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60 z-[1]" />
        <div className="hero-content text-center relative z-10 py-24 px-4">
          <div className="max-w-4xl animate-fade-in">
            <p className="text-[#FFB703] font-semibold tracking-widest uppercase mb-4">Premium Turf Booking</p>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-white">
              Book Your <span className="text-[#FFB703]">Perfect</span> Turf
            </h1>
            <p className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto leading-relaxed text-white/90">
              Find and book the best turfs in your city. Football, cricket, badminton and more — quick, easy, and premium.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/all-turfs"
                className="btn btn-lg font-bold shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300 bg-[#FFB703] text-[#0D2818] border-0 hover:bg-[#FFC933]"
              >
                Explore Turfs
              </Link>
              <Link
                to="/about"
                className="btn btn-outline btn-lg font-semibold border-2 border-white/60 text-white hover:bg-white/10 hover:border-white"
              >
                How It Works
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {HERO_IMAGES.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                i === slideIndex ? "bg-[#FFB703] scale-125" : "bg-white/60 hover:bg-white/80"
              }`}
              onClick={() => setSlideIndex(i)}
            />
          ))}
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-primary font-semibold tracking-wide mb-2">Discover</p>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-base-content">
              Popular <span className="text-primary">Turfs</span>
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
                className="group card bg-base-100 shadow-xl hover:shadow-2xl border border-base-200 overflow-hidden card-hover animate-slide-up rounded-2xl"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <figure className="overflow-hidden relative">
                  <img
                    src={getImageUrl(turf.images?.[0] || turf.sections?.[0]?.images?.[0]) || "https://placehold.co/400x240/166534/22c55e?text=Turf"}
                    alt={turf.name}
                    className="h-56 w-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute top-4 right-4 badge badge-lg bg-[#FFB703] text-[#0D2818] border-0 shadow-lg">
                    ⭐ {turf.rating || "—"}
                  </div>
                </figure>
                <div className="card-body p-5">
                  <h3 className="card-title text-xl text-base-content">{turf.name}</h3>
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
                className="btn btn-outline btn-primary font-semibold"
              >
                View All Turfs
              </Link>
            </div>
          )}
        </div>
      </section>

      <section className="py-20 bg-base-200">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-4xl font-extrabold text-center mb-14 text-base-content">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { step: 1, title: "Search", desc: "Find turfs by location, sport, and availability", icon: "🔍" },
              { step: 2, title: "Book", desc: "Select your date and time slot, pay securely online", icon: "📅" },
              { step: 3, title: "Play", desc: "Show up and enjoy your game with friends", icon: "⚽" },
            ].map((item) => (
              <div
                key={item.step}
                className="flex flex-col items-center text-center p-8 rounded-2xl bg-base-100 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1"
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <div className="text-4xl font-bold mb-2 text-primary">{item.step}</div>
                <h3 className="text-xl font-bold mb-2 text-base-content">{item.title}</h3>
                <p className="text-base-content/80">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
