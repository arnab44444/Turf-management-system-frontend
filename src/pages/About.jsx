export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <h1 className="text-5xl font-extrabold mb-4">
        About <span className="text-primary">TurfHub</span>
      </h1>
      <p className="text-xl text-base-content/80 leading-relaxed mb-10">
        TurfHub is a multi-turf booking platform that connects turf owners with players.
        Whether you want to book a turf for a friendly match or list your turf for others to book,
        we make it simple and convenient.
      </p>
      <div className="card bg-base-200 shadow-xl">
        <div className="card-body">
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg text-base-content/80 leading-relaxed">
            To make turf booking easy, transparent, and accessible for everyone.
            We believe every player deserves a great field to play on.
          </p>
        </div>
      </div>
    </div>
  );
}
