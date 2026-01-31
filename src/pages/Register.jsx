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
        toast.success(data.message || "Registration successful. Awaiting admin approval.");
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
    <div className="card auth-card shadow-2xl w-full max-w-2xl mx-auto">
      <div className="card-body p-5 md:p-6">
        <h2 className="text-2xl font-extrabold text-center mb-1 text-base-content">Register</h2>
        <p className="text-center text-sm mb-4 text-base-content/80">Create your Turf-Buddy account</p>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {error && (
            <div className="alert alert-error text-sm sm:col-span-2">
              <span>{error}</span>
            </div>
          )}
          <div className="form-control">
            <label className="label py-0">
              <span className="label-text font-medium text-base-content">Name</span>
            </label>
            <input
              type="text"
              placeholder="Your name"
              className="input input-bordered input-sm w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-control">
            <label className="label py-0">
              <span className="label-text font-medium text-base-content">Email</span>
            </label>
            <input
              type="email"
              placeholder="email@example.com"
              className="input input-bordered input-sm w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-control">
            <label className="label py-0">
              <span className="label-text font-medium text-base-content">Mobile Number</span>
            </label>
            <input
              type="tel"
              placeholder="e.g. 01XXXXXXXXX"
              className="input input-bordered input-sm w-full"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required={role === "customer"}
            />
            {role === "customer" && (
              <span className="label-text-alt text-base-content/60">Required for customers</span>
            )}
          </div>
          <div className="form-control">
            <label className="label py-0">
              <span className="label-text font-medium text-base-content">Password</span>
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="input input-bordered input-sm w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
              required
            />
          </div>
          <div className="form-control sm:col-span-2">
            <label className="label py-0">
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
              <p className="text-xs mt-0.5 text-warning">Owner accounts need admin approval</p>
            )}
          </div>
          <div className="sm:col-span-2">
            <button
              type="submit"
              className="btn btn-sm font-semibold w-full !bg-[#22C55E] !text-white !border-0 rounded-xl"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </div>
        </form>
        <p className="text-center text-sm mt-4 text-base-content/80">
          Already have an account?{" "}
          <Link to="/auth/login" className="link font-medium text-primary">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
