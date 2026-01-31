import { useContext } from "react";
import { Link } from "react-router";
import { AuthContext } from "../../provider/AuthProvider";

export default function DashboardHome() {
  const { user } = useContext(AuthContext);
  const role = user?.role || "customer";

  const actions = {
    customer: [
      { to: "/dashboard/my-bookings", label: "View My Bookings", desc: "Check upcoming and past bookings", btn: "btn-primary" },
      { to: "/all-turfs", label: "Browse Turfs", desc: "Find and book a turf", btn: "btn-secondary btn-outline" },
    ],
    owner: [
      { to: "/dashboard/my-turfs", label: "Manage My Turfs", desc: "Add or edit your turfs", btn: "btn-primary" },
      { to: "/dashboard/bookings", label: "View Bookings", desc: "See and manage booking requests", btn: "btn-secondary btn-outline" },
    ],
    admin: [
      { to: "/dashboard/users", label: "Manage Users", desc: "Approve owners, ban users", btn: "btn-primary" },
      { to: "/dashboard/turfs", label: "Manage Turfs", desc: "View and moderate all turfs", btn: "btn-secondary btn-outline" },
    ],
  };

  const items = actions[role] || actions.customer;

  return (
    <div>
      <h1 className="text-4xl font-extrabold mb-2 text-base-content">
        Welcome back, <span className="text-primary">{user?.name || "User"}</span>!
      </h1>
      <p className="text-base-content/70 mb-10">Quick access to your dashboard.</p>
      <div className="grid sm:grid-cols-2 gap-6">
        {items.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={`card bg-base-100 shadow-lg hover:shadow-xl border border-base-200 transition-all hover:-translate-y-0.5`}
          >
            <div className="card-body">
              <h3 className="card-title text-base-content">{item.label}</h3>
              <p className="text-base-content/70 text-sm">{item.desc}</p>
              <div className="card-actions mt-4">
                <button className={`btn ${item.btn}`}>Go →</button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
