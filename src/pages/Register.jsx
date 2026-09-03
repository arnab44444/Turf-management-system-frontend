import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { AuthContext } from "../provider/AuthProvider";
import api from "../api/axios";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("customer");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data } = await api.post("/auth/register", { name, email, password, phone, role });
      if (role === "owner" && !data.token) {
        toast.success(data.message || "Registration submitted for admin review.");
        navigate("/auth/login");
        return;
      }
      const userData = { ...data.user, _id: data.user.id || data.user._id };
      localStorage.setItem("access-token", data.token);
      setUser(userData);
      navigate("/dashboard");
    } catch (err) {
      const msg = err.response?.data?.message || "Registration failed";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl animate-fade-in">
      {/* Header */}
      <div className="text-center mb-6">
        <Link to="/" className="inline-flex items-center gap-2 mb-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="text-xl font-extrabold text-slate-900 dark:text-white">
            Turf<span className="text-emerald-500">Hub</span>
          </span>
        </Link>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
          Create an Account
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Join thousands of players and premium venue operators
        </p>
      </div>

      {/* Role Selection Tabs */}
      <div className="grid grid-cols-2 gap-3 mb-6 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800">
        <button
          type="button"
          onClick={() => setRole("customer")}
          className={`py-2.5 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
            role === "customer"
              ? "bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm"
              : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <span>⚽ Player / Team</span>
        </button>
        <button
          type="button"
          onClick={() => setRole("owner")}
          className={`py-2.5 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
            role === "owner"
              ? "bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm"
              : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <span>🏟️ Venue Partner</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 text-xs font-medium flex items-center gap-2">
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
              Full Name
            </label>
            <input
              type="text"
              placeholder="e.g. Shakib Al Hasan"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-900 dark:text-white focus:outline-hidden focus:border-emerald-500 transition-colors"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              placeholder="name@example.com"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-900 dark:text-white focus:outline-hidden focus:border-emerald-500 transition-colors"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
              Mobile Number
            </label>
            <input
              type="tel"
              placeholder="017XXXXXXXX"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-900 dark:text-white focus:outline-hidden focus:border-emerald-500 transition-colors"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required={role === "customer"}
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
              Password
            </label>
            <input
              type="password"
              placeholder="Min 6 characters"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-900 dark:text-white focus:outline-hidden focus:border-emerald-500 transition-colors"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
              required
            />
          </div>
        </div>

        {role === "owner" && (
          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-500 text-xs leading-relaxed">
            ℹ️ <strong>Venue Partner Notice:</strong> To ensure high-quality sports venues, venue partner registrations are audited and approved by our operations team within 24 hours.
          </div>
        )}

        <button
          type="submit"
          className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm tracking-wide shadow-lg shadow-emerald-500/25 transition-all hover:scale-[1.01] cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2 mt-4"
          disabled={loading}
        >
          {loading && <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>}
          <span>{loading ? "Creating Account..." : "Complete Registration"}</span>
        </button>
      </form>

      <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 text-center">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Already have an account?{" "}
          <Link to="/auth/login" className="font-bold text-emerald-600 dark:text-emerald-400 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
