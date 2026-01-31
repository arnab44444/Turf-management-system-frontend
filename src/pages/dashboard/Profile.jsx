import { useState, useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import api from "../../api/axios";
import { toast } from "react-toastify";

const ROLE_LABELS = {
  customer: { label: "Customer", icon: "👤", desc: "Book turfs and enjoy the game" },
  owner: { label: "Turf Owner", icon: "🏟️", desc: "Manage your turfs and bookings" },
  admin: { label: "Admin", icon: "⚙️", desc: "Platform administrator" },
};

export default function Profile() {
  const { user, setUser } = useContext(AuthContext);
  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [loading, setLoading] = useState(false);

  const roleInfo = ROLE_LABELS[user?.role] || ROLE_LABELS.customer;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userId = user?._id || user?.id;
      const { data } = await api.patch(`/users/${userId}`, { name, phone });
      setUser(data);
      toast.success("Profile updated successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const initials = (user?.name || "U")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="space-y-8">
      {/* Profile header card */}
      <div className="card bg-gradient-to-br from-primary/20 via-base-100 to-base-200 border border-base-200 shadow-xl overflow-hidden">
        <div className="card-body p-8 md:p-10">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="avatar placeholder shrink-0">
              <div className="bg-primary/30 text-primary-content rounded-2xl w-24 h-24 md:w-28 md:h-28 text-3xl md:text-4xl font-bold shadow-lg ring-4 ring-primary/20">
                {user?.photo ? (
                  <img src={user.photo} alt={user.name} className="rounded-2xl object-cover" />
                ) : (
                  <span>{initials}</span>
                )}
              </div>
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-3xl md:text-4xl font-extrabold text-base-content mb-1">
                {user?.name || "User"}
              </h1>
              <p className="text-base-content/70 mb-3">{user?.email}</p>
              <div className="inline-flex items-center gap-2 badge badge-lg badge-primary/20 text-primary border border-primary/30 px-4 py-2">
                <span>{roleInfo.icon}</span>
                <span>{roleInfo.label}</span>
              </div>
              <p className="text-sm text-base-content/60 mt-3 max-w-md">
                {roleInfo.desc}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Edit profile form */}
      <div className="card bg-base-100 border border-base-200 shadow-lg">
        <div className="card-body">
          <h2 className="card-title text-xl text-base-content mb-2">
            <span className="text-2xl">✏️</span> Edit Profile
          </h2>
          <p className="text-base-content/70 text-sm mb-6">
            Update your name and contact details. Email cannot be changed.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-base-content">Name</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-base-content">Email</span>
              </label>
              <input
                type="email"
                className="input input-bordered w-full input-disabled bg-base-200"
                value={user?.email || ""}
                disabled
                readOnly
              />
              <label className="label">
                <span className="label-text-alt text-base-content/50">Email is linked to your account and cannot be changed</span>
              </label>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-base-content">Phone</span>
              </label>
              <input
                type="tel"
                className="input input-bordered w-full"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. 01XXXXXXXXX"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="btn btn-primary btn-lg font-semibold px-8"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="loading loading-spinner loading-sm" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Account info card */}
      <div className="card bg-base-100 border border-base-200">
        <div className="card-body py-6">
          <h3 className="font-semibold text-base-content mb-3">Account Info</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div className="flex justify-between sm:block gap-2 py-2 border-b border-base-200">
              <span className="text-base-content/60">Role</span>
              <span className="font-medium text-base-content">{roleInfo.label}</span>
            </div>
            <div className="flex justify-between sm:block gap-2 py-2 border-b border-base-200">
              <span className="text-base-content/60">Status</span>
              <span className={`font-medium badge badge-sm ${user?.status === "approved" ? "badge-success" : user?.status === "pending" ? "badge-warning" : "badge-error"}`}>
                {user?.status || "—"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
