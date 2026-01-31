import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="footer footer-center p-10" style={{ backgroundColor: "#E8F5E9", color: "#14532D" }}>
      <aside className="max-w-md">
        <Link to="/" className="font-extrabold text-2xl tracking-tight hover:opacity-80 transition-opacity" style={{ color: "#14532D" }}>
          TurfHub
        </Link>
        <p className="mt-2 opacity-90">
          Book your perfect turf. Play your game. Your sports, your schedule.
        </p>
        <nav className="flex gap-6 mt-4">
          <Link to="/all-turfs" className="link link-hover font-medium" style={{ color: "#14532D" }}>
            Turfs
          </Link>
          <Link to="/about" className="link link-hover font-medium" style={{ color: "#14532D" }}>
            About
          </Link>
          <Link to="/contact" className="link link-hover font-medium" style={{ color: "#14532D" }}>
            Contact
          </Link>
        </nav>
        <p className="text-sm mt-6 opacity-70">
          Copyright © {new Date().getFullYear()} TurfHub. All rights reserved.
        </p>
      </aside>
    </footer>
  );
}
