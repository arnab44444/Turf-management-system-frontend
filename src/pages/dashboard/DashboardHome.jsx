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

const COLORS = ["#10B981", "#38BDF8", "#F59E0B", "#EF4444", "#8B5CF6", "#EC4899"];

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
      {
        to: "/dashboard/my-bookings",
        label: "My Bookings",
        desc: "Review your upcoming slots and past matches",
        icon: (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        ),
      },
      {
        to: "/all-turfs",
        label: "Book New Arena",
        desc: "Find available football, cricket, and sports turfs",
        icon: (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        ),
      },
    ],
    owner: [
      {
        to: "/dashboard/my-turfs",
        label: "Manage Venues",
        desc: "Add new arenas, update slots, or edit sports sections",
        icon: (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        ),
      },
      {
        to: "/dashboard/earnings",
        label: "Financial Reports",
        desc: "Track daily, weekly, and monthly venue revenue",
        icon: (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        ),
      },
    ],
    admin: [
      {
        to: "/dashboard/users",
        label: "User Moderation",
        desc: "Approve venue owners and manage platform permissions",
        icon: (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        ),
      },
      {
        to: "/dashboard/reports",
        label: "Analytics & Logs",
        desc: "View platform booking volume and financial metrics",
        icon: (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        ),
      },
    ],
  };

  const items = actions[role] || actions.customer;

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[350px]">
        <div className="flex flex-col items-center gap-3">
          <span className="w-8 h-8 border-3 border-emerald-500 border-t-transparent rounded-full animate-spin"></span>
          <p className="text-xs font-semibold text-slate-400">Loading Dashboard Metrics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 text-white border border-slate-700/60 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2">
            Active Workspace
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome back, {user?.name || "Player"}! 👋
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm mt-1">
            {role === "owner"
              ? "Here is your real-time arena utilization and revenue summary."
              : role === "admin"
              ? "Platform administration, venue audits, and system analytics."
              : "Review your upcoming matches, reservations, and arena receipts."}
          </p>
        </div>

        <div className="shrink-0">
          <Link
            to={role === "owner" ? "/dashboard/my-turfs" : "/all-turfs"}
            className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow-md shadow-emerald-500/20 transition-all inline-flex items-center gap-2"
          >
            <span>{role === "owner" ? "+ Add Arena" : "Browse Arenas"}</span>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {role === "customer" && stats && (
          <>
            <StatCard
              title="Total Bookings"
              value={stats.totalBookings || 0}
              trend="+2 this month"
              icon={
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              }
            />
            <StatCard
              title="Upcoming Matches"
              value={stats.upcomingCount || 0}
              trend="Active Schedule"
              highlight
              icon={
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              }
            />
            <StatCard
              title="Completed Slots"
              value={stats.completedCount || 0}
              trend="Match History"
              icon={
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              }
            />
            <StatCard
              title="Total Spent"
              value={`৳${(stats.totalSpent || 0).toLocaleString()}`}
              trend="All-time spend"
              icon={
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              }
            />
          </>
        )}

        {role === "owner" && stats && (
          <>
            <StatCard
              title="Managed Arenas"
              value={stats.turfCount || 0}
              trend="Active venues"
              icon={
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              }
            />
            <StatCard
              title="Paid Bookings"
              value={stats.paidBookings || 0}
              trend="Total reservations"
              icon={
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              }
            />
            <StatCard
              title="Today's Revenue"
              value={`৳${(stats.todayEarnings || 0).toLocaleString()}`}
              trend="Daily cashflow"
              highlight
              icon={
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              }
            />
            <StatCard
              title="Total Revenue"
              value={`৳${(stats.totalEarnings || 0).toLocaleString()}`}
              trend="All-time earnings"
              icon={
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              }
            />
          </>
        )}

        {role === "admin" && stats && (
          <>
            <StatCard
              title="Platform Users"
              value={stats.users || 0}
              trend="Registered accounts"
              icon={
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              }
            />
            <StatCard
              title="Total Turfs"
              value={stats.turfs || 0}
              trend="Listed arenas"
              icon={
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5" />
              }
            />
            <StatCard
              title="Pending Owners"
              value={stats.pendingOwners || 0}
              trend="Requires review"
              highlight
              icon={
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              }
            />
            <StatCard
              title="Gross Volume"
              value={`৳${(stats.totalRevenue || 0).toLocaleString()}`}
              trend="Platform total"
              icon={
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              }
            />
          </>
        )}
      </div>

      {/* Analytics Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {role === "customer" && stats?.bookingTrend?.length > 0 && (
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-6">
              Match Booking Activity
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={stats.bookingTrend}>
                  <defs>
                    <linearGradient id="colorBookings" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
                  <XAxis dataKey="name" stroke="#64748B" fontSize={11} />
                  <YAxis stroke="#64748B" fontSize={11} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0F172A",
                      border: "1px solid #334155",
                      borderRadius: "10px",
                      color: "#FFFFFF",
                      fontSize: "12px",
                    }}
                  />
                  <Area type="monotone" dataKey="bookings" stroke="#10B981" strokeWidth={2.5} fill="url(#colorBookings)" name="Bookings" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {role === "owner" && stats?.last7Days?.length > 0 && (
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-6">
              Revenue (Last 7 Days)
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.last7Days}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
                  <XAxis dataKey="name" stroke="#64748B" fontSize={11} />
                  <YAxis stroke="#64748B" fontSize={11} tickFormatter={(v) => `৳${v}`} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0F172A",
                      border: "1px solid #334155",
                      borderRadius: "10px",
                      color: "#FFFFFF",
                      fontSize: "12px",
                    }}
                    formatter={(v) => [`৳${v}`, "Earnings"]}
                  />
                  <Bar dataKey="earnings" fill="#10B981" radius={[6, 6, 0, 0]} name="Earnings" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {role === "owner" && stats?.earningsBySection?.length > 0 && (
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-6">
              Earnings By Sport Type
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stats.earningsBySection}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={3}
                    dataKey="value"
                    nameKey="name"
                  >
                    {stats.earningsBySection.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0F172A",
                      border: "1px solid #334155",
                      borderRadius: "10px",
                      color: "#FFFFFF",
                      fontSize: "12px",
                    }}
                    formatter={(v) => `৳${v}`}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {role === "admin" && stats?.bookingTrend?.length > 0 && (
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-6">
              Platform Gross Revenue Trend
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.bookingTrend}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
                  <XAxis dataKey="name" stroke="#64748B" fontSize={11} />
                  <YAxis stroke="#64748B" fontSize={11} tickFormatter={(v) => `৳${v}`} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0F172A",
                      border: "1px solid #334155",
                      borderRadius: "10px",
                      color: "#FFFFFF",
                      fontSize: "12px",
                    }}
                    formatter={(v) => [`৳${v}`, "Revenue"]}
                  />
                  <Bar dataKey="revenue" fill="#38BDF8" radius={[6, 6, 0, 0]} name="Revenue" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>

      {/* Quick Action Cards */}
      <div>
        <h2 className="text-base font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
          Quick Operations
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {items.map((item, idx) => (
            <Link
              key={idx}
              to={item.to}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-md transition-all flex items-center justify-between gap-4 group"
            >
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {item.icon}
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors">
                    {item.label}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{item.desc}</p>
                </div>
              </div>

              <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-colors shrink-0">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, trend, icon, highlight }) {
  return (
    <div
      className={`p-5 rounded-2xl border transition-all ${
        highlight
          ? "bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-500/30 shadow-sm"
          : "bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 shadow-xs"
      }`}
    >
      <div className="flex items-start justify-between">
        <div>
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">{title}</span>
          <h3 className={`text-2xl font-extrabold mt-1 tracking-tight ${highlight ? "text-emerald-600 dark:text-emerald-400" : "text-slate-900 dark:text-white"}`}>
            {value}
          </h3>
          {trend && (
            <span className="text-[11px] font-medium text-slate-400 mt-1 block">
              {trend}
            </span>
          )}
        </div>
        <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center shrink-0">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {icon}
          </svg>
        </div>
      </div>
    </div>
  );
}
