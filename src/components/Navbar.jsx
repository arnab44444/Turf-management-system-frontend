import { Link } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { useTheme } from "../provider/ThemeProvider";

export default function Navbar() {
  const { user } = useContext(AuthContext);
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      className="navbar sticky top-0 z-50 shadow-sm border-b border-[#C8E6C9]/50"
      style={{ backgroundColor: "#E8F5E9" }}
    >
      <div className="navbar-start">
        <Link
          to="/"
          className="btn btn-ghost gap-2 text-xl font-extrabold tracking-tight"
          style={{ color: "#14532D" }}
        >
          TurfHub
        </Link>
      </div>
      <div className="navbar-center hidden md:flex">
        <ul className="menu menu-horizontal gap-1 px-1">
          {["Home", "All Turfs", "About", "Contact"].map((label) => (
            <li key={label}>
              <Link
                to={label === "Home" ? "/" : `/${label.toLowerCase().replace(" ", "-")}`}
                className="rounded-lg font-medium hover:bg-[#C8E6C9]/50"
                style={{ color: "#14532D" }}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="navbar-end gap-2">
        <button
          type="button"
          onClick={toggleTheme}
          className="btn btn-ghost btn-circle"
          aria-label="Toggle theme"
        >
          {theme === "turf-dark" ? (
            <svg className="h-5 w-5" style={{ color: "#14532D" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21.64 13a1 1 0 0 0-1.05-.14 8.05 8.05 0 0 1-3.37.73 8.15 8.15 0 0 1-8.14-8.1 8.59 8.59 0 0 1 .25-2A1 1 0 0 0 8 2.36a10.14 10.14 0 1 0 14 11.69 1 1 0 0 0-.36-1.05z" />
            </svg>
          ) : (
            <svg className="h-5 w-5" style={{ color: "#14532D" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" />
            </svg>
          )}
        </button>
        {user ? (
          <Link
            to="/dashboard"
            className="btn font-semibold shadow-md"
            style={{ backgroundColor: "#FFB703", color: "#14532D", border: "none" }}
          >
            Dashboard
          </Link>
        ) : (
          <>
            <Link to="/auth/login" className="btn btn-ghost font-medium" style={{ color: "#14532D" }}>
              Login
            </Link>
            <Link
              to="/auth/register"
              className="btn font-semibold shadow-md"
              style={{ backgroundColor: "#FFB703", color: "#14532D", border: "none" }}
            >
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
