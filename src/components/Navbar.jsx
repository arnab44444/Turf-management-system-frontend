import { Link } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { useTheme } from "../provider/ThemeProvider";

export default function Navbar() {
  const { user } = useContext(AuthContext);
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "turf-dark";

  return (
    <nav
      className="navbar sticky top-0 z-50 min-h-16 px-4 md:px-8 transition-colors duration-300"
      style={{
        backgroundColor: isDark ? "rgba(15, 23, 42, 0.95)" : "rgba(13, 40, 24, 0.97)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div className="navbar-start">
        <Link to="/" className="flex items-center gap-2 font-extrabold text-xl tracking-tight text-white hover:text-[#FFB703] transition-colors">
          <span className="text-2xl">⚽</span>
          MYturf
        </Link>
      </div>
      <div className="navbar-center hidden md:flex">
        <ul className="menu menu-horizontal gap-1 px-1">
          {["Home", "All Turfs", "About", "Contact"].map((label) => (
            <li key={label}>
              <Link
                to={label === "Home" ? "/" : `/${label.toLowerCase().replace(" ", "-")}`}
                className="text-white/90 hover:text-white hover:bg-white/10 rounded-lg font-medium px-4 py-2 transition-colors"
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
          className="btn btn-ghost btn-circle text-white/80 hover:text-white hover:bg-white/10"
          aria-label="Toggle theme"
        >
          {isDark ? (
            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21.64 13a1 1 0 0 0-1.05-.14 8.05 8.05 0 0 1-3.37.73 8.15 8.15 0 0 1-8.14-8.1 8.59 8.59 0 0 1 .25-2A1 1 0 0 0 8 2.36a10.14 10.14 0 1 0 14 11.69 1 1 0 0 0-.36-1.05z" />
            </svg>
          ) : (
            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" />
            </svg>
          )}
        </button>
        {user ? (
          <Link
            to="/dashboard"
            className="btn font-semibold bg-[#FFB703] text-[#0D2818] border-0 hover:bg-[#FFC933] hover:-translate-y-0.5 transition-all shadow-lg"
          >
            Dashboard
          </Link>
        ) : (
          <>
            <Link to="/auth/login" className="btn btn-ghost text-white/90 hover:text-white hover:bg-white/10 font-medium">
              Login
            </Link>
            <Link
              to="/auth/register"
              className="btn font-semibold bg-[#FFB703] text-[#0D2818] border-0 hover:bg-[#FFC933] hover:-translate-y-0.5 transition-all shadow-lg"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
