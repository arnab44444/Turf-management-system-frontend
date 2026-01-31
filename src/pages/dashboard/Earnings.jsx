import { useState, useEffect } from "react";
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

const COLORS = ["#22C55E", "#3B82F6", "#F59E0B", "#EF4444", "#8B5CF6", "#EC4899", "#06B6D4", "#84CC16"];

export default function Earnings() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    api
      .get("/dashboard/stats")
      .then(({ data }) => setStats(data))
      .catch(() => setStats(null))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  const last7Days = stats?.last7Days || [];
  const earningsBySection = stats?.earningsBySection || [];
  const earningsByTurf = stats?.earningsByTurf || [];
  const totalEarnings = stats?.totalEarnings || 0;
  const todayEarnings = stats?.todayEarnings || 0;
  const paidBookings = stats?.paidBookings || 0;

  const chartData = last7Days;

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-base-content">Earnings Overview</h2>
          <p className="text-base-content/70 mt-1">Track your revenue and performance</p>
        </div>
      </div>

      {/* Stat cards with animations */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Today's Earnings"
          value={`৳${todayEarnings.toLocaleString()}`}
          icon="📈"
          accent
          trend={totalEarnings > 0 ? ((todayEarnings / totalEarnings) * 100).toFixed(1) : 0}
        />
        <StatCard title="Total Earnings" value={`৳${totalEarnings.toLocaleString()}`} icon="💰" />
        <StatCard title="Paid Bookings" value={paidBookings} icon="📋" />
        <StatCard
          title="Avg per Booking"
          value={paidBookings > 0 ? `৳${Math.round(totalEarnings / paidBookings).toLocaleString()}` : "৳0"}
          icon="📊"
        />
      </div>

      {/* Main earnings chart */}
      <div className="card bg-base-100 border border-base-200 shadow-xl overflow-hidden">
        <div className="card-body">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-2">
            <h3 className="text-xl font-bold text-base-content">Earnings Over Time</h3>
            <span className="badge badge-outline badge-sm">Last 7 days</span>
          </div>
          <div className="h-80">
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22C55E" stopOpacity={0.5} />
                      <stop offset="95%" stopColor="#22C55E" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-20" stroke="currentColor" />
                  <XAxis dataKey="name" tick={{ fill: "currentColor", fontSize: 12 }} />
                  <YAxis tick={{ fill: "currentColor", fontSize: 12 }} tickFormatter={(v) => `৳${v}`} />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "12px",
                      border: "1px solid var(--bc)",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                    }}
                    formatter={(value) => [`৳${value.toLocaleString()}`, "Earnings"]}
                    labelFormatter={(label, payload) => payload?.[0]?.payload?.date || label}
                  />
                  <Area
                    type="monotone"
                    dataKey="earnings"
                    stroke="#22C55E"
                    strokeWidth={3}
                    fill="url(#colorEarnings)"
                    name="Earnings"
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-base-content/50">
                <span className="text-6xl mb-2">📊</span>
                <p className="font-medium">No earnings data yet</p>
                <p className="text-sm">Complete bookings to see your earnings here</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Pie charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card bg-base-100 border border-base-200 shadow-xl overflow-hidden">
          <div className="card-body">
            <h3 className="card-title text-base-content">Earnings by Sport Type</h3>
            <div className="h-72">
              {earningsBySection.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={earningsBySection}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={3}
                      dataKey="value"
                      nameKey="name"
                    >
                      {earningsBySection.map((entry, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} stroke="transparent" strokeWidth={0} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(v) => [`৳${Number(v).toLocaleString()}`, ""]}
                      contentStyle={{ borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-base-content/50">
                  <span className="text-5xl mb-2">⚽</span>
                  <p>No section data yet</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="card bg-base-100 border border-base-200 shadow-xl overflow-hidden">
          <div className="card-body">
            <h3 className="card-title text-base-content">Earnings by Turf</h3>
            <div className="h-72">
              {earningsByTurf.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={earningsByTurf} layout="vertical" margin={{ left: 20, right: 30 }}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-20" />
                    <XAxis type="number" tickFormatter={(v) => `৳${v}`} tick={{ fill: "currentColor", fontSize: 11 }} />
                    <YAxis type="category" dataKey="name" width={80} tick={{ fill: "currentColor", fontSize: 11 }} />
                    <Tooltip
                      formatter={(v) => [`৳${Number(v).toLocaleString()}`, "Earnings"]}
                      contentStyle={{ borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}
                    />
                    <Bar dataKey="value" fill="#3B82F6" radius={[0, 4, 4, 0]} name="Earnings" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-base-content/50">
                  <span className="text-5xl mb-2">🏟️</span>
                  <p>No turf data yet</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Summary table */}
      {earningsBySection.length > 0 && (
        <div className="card bg-base-100 border border-base-200 shadow-lg">
          <div className="card-body">
            <h3 className="card-title text-base-content">Breakdown by Sport</h3>
            <div className="overflow-x-auto">
              <table className="table table-zebra">
                <thead>
                  <tr className="text-base-content">
                    <th>Sport</th>
                    <th className="text-right">Earnings</th>
                    <th className="text-right">Share</th>
                  </tr>
                </thead>
                <tbody>
                  {earningsBySection.map((row, i) => (
                    <tr key={i} className="text-base-content">
                      <td>
                        <span
                          className="badge"
                          style={{ backgroundColor: `${COLORS[i % COLORS.length]}30`, color: COLORS[i % COLORS.length] }}
                        >
                          {row.name}
                        </span>
                      </td>
                      <td className="text-right font-semibold">৳{Number(row.value).toLocaleString()}</td>
                      <td className="text-right">
                        {totalEarnings > 0 ? ((row.value / totalEarnings) * 100).toFixed(1) : 0}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ title, value, icon, accent, trend }) {
  return (
    <div
      className={`card border shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
        accent ? "bg-gradient-to-br from-primary/15 to-primary/5 border-primary/30" : "bg-base-100 border-base-200"
      }`}
    >
      <div className="card-body p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-base-content/70 uppercase tracking-wide">{title}</p>
            <p className={`text-2xl font-bold mt-1 ${accent ? "text-primary" : "text-base-content"}`}>{value}</p>
            {trend !== undefined && trend > 0 && (
              <p className="text-xs text-success mt-2">~{trend}% of total today</p>
            )}
          </div>
          <div
            className={`text-4xl p-3 rounded-xl ${accent ? "bg-primary/20" : "bg-base-200"}`}
          >
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
}
