import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="footer footer-center p-12 text-white" style={{ backgroundColor: "#0D2818" }}>
      <aside className="max-w-md">
        <Link to="/" className="font-extrabold text-2xl tracking-tight hover:text-[#FFB703] transition-colors flex items-center gap-2 justify-center">
          <span className="text-2xl">⚽</span> Turf-Buddy
        </Link>
        <p className="mt-2 text-white/80">
          Premium turf booking. Book your perfect slot. Play your game.
        </p>
        <nav className="flex gap-6 mt-4">
          <Link to="/all-turfs" className="link link-hover font-medium text-white/90 hover:text-[#FFB703]">
            Turfs
          </Link>
          <Link to="/about" className="link link-hover font-medium text-white/90 hover:text-[#FFB703]">
            About
          </Link>
          <Link to="/contact" className="link link-hover font-medium text-white/90 hover:text-[#FFB703]">
            Contact
          </Link>
        </nav>
        <p className="text-sm mt-6 text-white/60">
          Copyright © {new Date().getFullYear()} Turf-Buddy. All rights reserved.
        </p>
      </aside>
    </footer>
  );
}
