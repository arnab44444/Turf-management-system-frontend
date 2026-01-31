import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import api from "../api/axios";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      const { data } = await api.post("/auth/register", { name, email, password, role });
      localStorage.setItem("access-token", data.token);
      setUser({ ...data.user, _id: data.user.id || data.user._id });
      navigate(role === "owner" ? "/dashboard" : "/dashboard");
    } catch (err) {
      const msg = err.response?.data?.message || "Registration failed";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card bg-base-100 shadow-2xl border border-base-200 rounded-2xl w-full">
      <div className="card-body p-8 md:p-10">
        <h2 className="text-3xl font-extrabold text-center mb-2 text-base-content">Register</h2>
        <p className="text-center text-sm mb-6 text-base-content/80">Create your MYturf account</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {error && (
            <div className="alert alert-error text-sm">
              <span>{error}</span>
            </div>
          )}
          <div className="form-control w-full">
            <label className="label py-1">
              <span className="label-text font-medium text-base-content">Name</span>
            </label>
            <input
              type="text"
              placeholder="Your name"
              className="input input-bordered w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
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
              minLength={6}
              required
            />
          </div>
          <div className="form-control w-full">
            <label className="label py-1">
              <span className="label-text font-medium text-base-content">Register as</span>
            </label>
            <select
              className="select select-bordered w-full"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="customer">Customer (Book turfs)</option>
              <option value="owner">Turf Owner</option>
            </select>
            {role === "owner" && (
              <p className="text-xs mt-1 text-warning">Owner accounts need admin approval</p>
            )}
          </div>
          <button
            type="submit"
            className="btn btn-lg font-semibold w-full mt-2"
            style={{ backgroundColor: "#FFB703", color: "#14532D", border: "none" }}
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <p className="text-center text-sm mt-6 text-base-content/80">
          Already have an account?{" "}
          <Link to="/auth/login" className="link font-medium text-primary">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
