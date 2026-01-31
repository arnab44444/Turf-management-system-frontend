import { useState, useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import api from "../../api/axios";

export default function Profile() {
  const { user, setUser } = useContext(AuthContext);
  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    try {
      const { data } = await api.patch(`/users/${user._id}`, { name, phone });
      setUser(data);
      setMsg("Profile updated");
    } catch (err) {
      setMsg(err.response?.data?.message || "Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Profile</h2>
      <form onSubmit={handleSubmit} className="max-w-md space-y-4">
        <div className="form-control">
          <label className="label">Name</label>
          <input
            type="text"
            className="input input-bordered"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label className="label">Email</label>
          <input type="email" className="input input-bordered" value={user?.email || ""} disabled />
        </div>
        <div className="form-control">
          <label className="label">Phone</label>
          <input
            type="text"
            className="input input-bordered"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        {msg && <p className="text-sm">{msg}</p>}
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
}
