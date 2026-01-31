import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import api from "../api/axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data } = await api.post("/auth/login", { email, password });
      localStorage.setItem("access-token", data.token);
      setUser({ ...data.user, _id: data.user.id || data.user._id });
      navigate("/dashboard");
    } catch (err) {
      const msg = err.response?.data?.message || "Login failed";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card bg-white shadow-2xl border border-[#C8E6C9]/50 rounded-xl w-full">
      <div className="card-body p-8 md:p-10">
        <h2 className="text-3xl font-extrabold text-center mb-2" style={{ color: "#14532D" }}>Login</h2>
        <p className="text-center text-sm mb-6" style={{ color: "#1F2937", opacity: 0.8 }}>Welcome back to TurfHub</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {error && (
            <div className="alert alert-error text-sm">
              <span>{error}</span>
            </div>
          )}
          <div className="form-control w-full">
            <label className="label py-1">
              <span className="label-text font-medium" style={{ color: "#14532D" }}>Email</span>
            </label>
            <input
              type="email"
              placeholder="email@example.com"
              className="input input-bordered w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-control w-full">
            <label className="label py-1">
              <span className="label-text font-medium" style={{ color: "#14532D" }}>Password</span>
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="input input-bordered w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-lg font-semibold w-full mt-2"
            style={{ backgroundColor: "#FFB703", color: "#14532D", border: "none" }}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="text-center text-sm mt-6" style={{ color: "#1F2937", opacity: 0.8 }}>
          Don&apos;t have an account?{" "}
          <Link to="/auth/register" className="link font-medium" style={{ color: "#2E7D32" }}>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
