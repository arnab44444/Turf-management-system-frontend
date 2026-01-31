import { useContext, useState, useEffect } from "react";
import { Link } from "react-router";
import { AuthContext } from "../../provider/AuthProvider";
import api from "../../api/axios";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = ["#22C55E", "#3B82F6", "#F59E0B", "#EF4444", "#8B5CF6", "#EC4899"];

export default function DashboardHome() {
  const { user } = useContext(AuthContext);
  const role = user?.role || "customer";
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/dashboard/stats")
      .then(({ data }) => setStats(data))
      .catch(() => setStats(null))
      .finally(() => setLoading(false));
  }, []);

  const actions = {
    customer: [
      { to: "/dashboard/my-bookings", label: "View My Bookings", desc: "Check upcoming and past bookings", icon: "📋", btn: "btn-primary" },
      { to: "/all-turfs", label: "Browse Turfs", desc: "Find and book a turf", icon: "🏟️", btn: "btn-secondary btn-outline" },
    ],
    owner: [
      { to: "/dashboard/my-turfs", label: "Manage My Turfs", desc: "Add or edit your turfs", icon: "🏟️", btn: "btn-primary" },
      { to: "/dashboard/earnings", label: "View Earnings", desc: "Track your revenue", icon: "💰", btn: "btn-secondary btn-outline" },
    ],
    admin: [
      { to: "/dashboard/users", label: "Manage Users", desc: "Approve owners, ban users", icon: "👥", btn: "btn-primary" },
      { to: "/dashboard/reports", label: "Reports", desc: "View analytics", icon: "📊", btn: "btn-secondary btn-outline" },
    ],
  };

  const items = actions[role] || actions.customer;

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-extrabold mb-2 text-base-content">
          Welcome back, <span className="text-primary">{user?.name || "User"}</span>!
        </h1>
        <p className="text-base-content/70">Quick overview and insights for your dashboard.</p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {role === "customer" && stats && (
          <>
            <StatCard title="Total Bookings" value={stats.totalBookings || 0} icon="📅" />
            <StatCard title="Upcoming" value={stats.upcomingCount || 0} icon="⏳" accent />
            <StatCard title="Completed" value={stats.completedCount || 0} icon="✅" />
            <StatCard title="Total Spent" value={`৳${(stats.totalSpent || 0).toLocaleString()}`} icon="💰" />
          </>
        )}
        {role === "owner" && stats && (
          <>
            <StatCard title="My Turfs" value={stats.turfCount || 0} icon="🏟️" />
            <StatCard title="Total Bookings" value={stats.paidBookings || 0} icon="📋" />
            <StatCard title="Today's Earnings" value={`৳${(stats.todayEarnings || 0).toLocaleString()}`} icon="📈" accent />
            <StatCard title="Total Earnings" value={`৳${(stats.totalEarnings || 0).toLocaleString()}`} icon="💰" />
          </>
        )}
        {role === "admin" && stats && (
          <>
            <StatCard title="Total Users" value={stats.users || 0} icon="👥" />
            <StatCard title="Turfs" value={stats.turfs || 0} icon="🏟️" />
            <StatCard title="Pending Owners" value={stats.pendingOwners || 0} icon="⏳" accent />
            <StatCard title="Total Revenue" value={`৳${(stats.totalRevenue || 0).toLocaleString()}`} icon="💰" />
          </>
        )}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {role === "customer" && stats?.bookingTrend?.length > 0 && (
          <div className="card bg-base-100 border border-base-200 shadow-lg overflow-hidden">
            <div className="card-body">
              <h3 className="card-title text-base-content">Booking Trend</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={stats.bookingTrend}>
                    <defs>
                      <linearGradient id="colorBookings" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#22C55E" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="name" tick={{ fill: "currentColor", fontSize: 12 }} />
                    <YAxis tick={{ fill: "currentColor", fontSize: 12 }} />
                    <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid var(--p)" }} />
                    <Area type="monotone" dataKey="bookings" stroke="#22C55E" fillOpacity={1} fill="url(#colorBookings)" strokeWidth={2} name="Bookings" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {role === "owner" && stats?.last7Days?.length > 0 && (
          <div className="card bg-base-100 border border-base-200 shadow-lg overflow-hidden">
            <div className="card-body">
              <h3 className="card-title text-base-content">Earnings (Last 7 Days)</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stats.last7Days}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="name" tick={{ fill: "currentColor", fontSize: 12 }} />
                    <YAxis tick={{ fill: "currentColor", fontSize: 12 }} tickFormatter={(v) => `৳${v}`} />
                    <Tooltip contentStyle={{ borderRadius: "8px" }} formatter={(v) => [`৳${v}`, "Earnings"]} />
                    <Bar dataKey="earnings" fill="#22C55E" radius={[4, 4, 0, 0]} name="Earnings" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {role === "owner" && stats?.earningsBySection?.length > 0 && (
          <div className="card bg-base-100 border border-base-200 shadow-lg overflow-hidden">
            <div className="card-body">
              <h3 className="card-title text-base-content">Earnings by Sport</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={stats.earningsBySection}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                      nameKey="name"
                    >
                      {stats.earningsBySection.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(v) => `৳${v}`} contentStyle={{ borderRadius: "8px" }} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {role === "admin" && stats?.bookingTrend?.length > 0 && (
          <div className="card bg-base-100 border border-base-200 shadow-lg overflow-hidden">
            <div className="card-body">
              <h3 className="card-title text-base-content">Revenue Trend</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stats.bookingTrend}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="name" tick={{ fill: "currentColor", fontSize: 12 }} />
                    <YAxis tick={{ fill: "currentColor", fontSize: 12 }} tickFormatter={(v) => `৳${v}`} />
                    <Tooltip contentStyle={{ borderRadius: "8px" }} formatter={(v) => [`৳${v}`, "Revenue"]} />
                    <Bar dataKey="revenue" fill="#3B82F6" radius={[4, 4, 0, 0]} name="Revenue" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {role === "admin" && stats?.usersByRole?.length > 0 && (
          <div className="card bg-base-100 border border-base-200 shadow-lg overflow-hidden">
            <div className="card-body">
              <h3 className="card-title text-base-content">Users by Role</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={stats.usersByRole}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                      nameKey="name"
                    >
                      {stats.usersByRole.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: "8px" }} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="text-xl font-bold mb-4 text-base-content">Quick Actions</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {items.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="card bg-base-100 shadow-lg hover:shadow-xl border border-base-200 transition-all hover:-translate-y-0.5 group"
            >
              <div className="card-body flex-row items-center gap-4">
                <div className="text-4xl">{item.icon}</div>
                <div className="flex-1">
                  <h3 className="card-title text-base-content group-hover:text-primary transition-colors">{item.label}</h3>
                  <p className="text-base-content/70 text-sm">{item.desc}</p>
                </div>
                <button className={`btn ${item.btn}`}>Go →</button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, accent }) {
  return (
    <div
      className={`card border shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5 ${
        accent ? "bg-primary/10 border-primary/30" : "bg-base-100 border-base-200"
      }`}
    >
      <div className="card-body p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-base-content/70">{title}</p>
            <p className={`text-2xl font-bold ${accent ? "text-primary" : "text-base-content"}`}>{value}</p>
          </div>
          <span className="text-3xl opacity-80">{icon}</span>
        </div>
      </div>
    </div>
  );
}
