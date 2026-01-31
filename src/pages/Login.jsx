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
    <div className="card auth-card shadow-2xl w-full max-w-md mx-auto">
      <div className="card-body p-8 md:p-10">
        <h2 className="text-3xl font-extrabold text-center mb-2 text-base-content">Login</h2>
        <p className="text-center text-sm mb-6 text-base-content/80">Welcome back to Turf-Buddy</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {error && (
            <div className="alert alert-error text-sm">
              <span>{error}</span>
            </div>
          )}
          <div className="form-control w-full">
            <label className="label py-1">
              <span className="label-text font-medium text-base-content">Email</span>
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
              <span className="label-text font-medium text-base-content">Password</span>
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
            className="btn btn-lg font-semibold w-full mt-2 !bg-[#22C55E] !text-white !border-0 rounded-xl"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="text-center text-sm mt-6 text-base-content/80">
          Don&apos;t have an account?{" "}
          <Link to="/auth/register" className="link font-medium text-primary">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
