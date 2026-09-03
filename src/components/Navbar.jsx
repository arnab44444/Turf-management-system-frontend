import { Link, NavLink } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { useTheme } from "../provider/ThemeProvider";

export default function Navbar() {
  const { user } = useContext(AuthContext);
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "turf-dark";

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/all-turfs", label: "Explore Turfs" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <nav className="glass-nav sticky top-0 z-50 min-h-16 px-4 md:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between w-full">
        {/* Brand Logo */}
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2.5 font-bold text-xl tracking-tight text-white group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-extrabold tracking-tight leading-none text-white">
                Turf<span className="text-emerald-400">Hub</span>
              </span>
              <span className="text-[10px] font-medium tracking-widest uppercase text-slate-400">Arena & Sports</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1 ml-4">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? "text-white bg-white/10 shadow-xs"
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={toggleTheme}
            className="btn btn-ghost btn-circle btn-sm text-slate-300 hover:text-white hover:bg-white/10"
            aria-label="Toggle theme"
          >
            {isDark ? (
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

          {/* User Auth State */}
          {user ? (
            <div className="flex items-center gap-3">
              <Link
                to="/dashboard"
                className="btn btn-sm bg-emerald-500 hover:bg-emerald-600 text-white font-semibold border-0 shadow-md shadow-emerald-500/20 px-4 rounded-lg flex items-center gap-1.5 transition-all hover:scale-[1.02]"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                Dashboard
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/auth/login"
                className="btn btn-ghost btn-sm text-slate-200 hover:text-white hover:bg-white/10 font-medium px-3.5"
              >
                Sign In
              </Link>
              <Link
                to="/auth/register"
                className="btn btn-sm bg-emerald-500 hover:bg-emerald-600 text-white font-semibold border-0 shadow-md shadow-emerald-500/20 px-4 rounded-lg transition-all hover:scale-[1.02]"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
