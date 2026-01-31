import { Outlet, Link, NavLink, useNavigate } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { useTheme } from "../provider/ThemeProvider";

export default function DashboardLayout() {
  const { user, signOutUser } = useContext(AuthContext);
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "turf-dark";
  const navigate = useNavigate();
  const role = user?.role || "customer";

  const handleLogout = () => {
    signOutUser();
    localStorage.removeItem("access-token");
    navigate("/");
  };

  const customerNav = [
    { to: "/dashboard", label: "Overview" },
    { to: "/dashboard/my-bookings", label: "My Bookings" },
    { to: "/dashboard/reviews", label: "My Reviews" },
    { to: "/dashboard/profile", label: "Profile" },
  ];

  const ownerNav = [
    { to: "/dashboard", label: "Overview" },
    { to: "/dashboard/my-turfs", label: "My Turfs" },
    { to: "/dashboard/bookings", label: "Bookings" },
    { to: "/dashboard/schedule", label: "Schedule" },
    { to: "/dashboard/customers", label: "Customers" },
    { to: "/dashboard/earnings", label: "Earnings" },
    { to: "/dashboard/profile", label: "Profile" },
  ];

  const adminNav = [
    { to: "/dashboard", label: "Overview" },
    { to: "/dashboard/users", label: "Users" },
    { to: "/dashboard/turfs", label: "Turfs" },
    { to: "/dashboard/bookings", label: "Bookings" },
    { to: "/dashboard/reports", label: "Reports" },
    { to: "/dashboard/profile", label: "Profile" },
  ];

  const navItems = role === "admin" ? adminNav : role === "owner" ? ownerNav : customerNav;

  return (
    <div className="drawer lg:drawer-open">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col min-h-screen bg-base-100">
        <div className="navbar shadow-sm lg:hidden bg-[#0D2818]">
          <label htmlFor="dashboard-drawer" className="btn btn-ghost drawer-button text-white">
            <span className="text-2xl">≡</span>
          </label>
          <span className="flex-1 font-bold text-white">Turf-Buddy</span>
        </div>
        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </div>
      <div className="drawer-side">
        <label htmlFor="dashboard-drawer" className="drawer-overlay" aria-label="close" />
        <aside className="dashboard-sidebar w-72 min-h-full border-r border-emerald-900/50">
          <div className="p-6">
            <Link to="/" className="text-xl font-extrabold hover:opacity-80 transition-opacity text-white">
              Turf-Buddy
            </Link>
            <p className="text-sm text-emerald-200/80 capitalize mt-1">{role} Dashboard</p>
          </div>
          <ul className="menu p-4 gap-2">
            <li>
              <Link to="/" className="font-medium rounded-lg hover:bg-emerald-500/20 text-emerald-50">
                ← Home
              </Link>
            </li>
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === "/dashboard"}
                  className={({ isActive }) =>
                    `font-medium rounded-lg ${isActive ? "bg-emerald-500 text-white" : "text-emerald-50 hover:bg-emerald-500/20"}`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-emerald-900/50 space-y-2">
            <button
              type="button"
              onClick={toggleTheme}
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-emerald-500/20 w-full text-left text-emerald-50"
            >
              <span className="text-sm font-medium">
                {isDark ? "🌙 Dark" : "☀️ Light"} mode
              </span>
            </button>
            <button
              className="btn btn-outline btn-sm w-full border-emerald-400/50 text-emerald-50 hover:bg-emerald-500/20 hover:border-emerald-400"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
