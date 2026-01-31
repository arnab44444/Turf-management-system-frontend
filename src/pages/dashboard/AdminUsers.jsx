import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import api from "../../api/axios";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/users").then(({ data }) => setUsers(data)).finally(() => setLoading(false));
  }, []);

  const updateStatus = async (id, status) => {
    const action = status === "banned" ? "ban" : "unban";
    const { isConfirmed } = await Swal.fire({
      title: `${action.charAt(0).toUpperCase() + action.slice(1)} this user?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: status === "banned" ? "#dc2626" : "#16a34a",
      cancelButtonColor: "#6b7280",
      confirmButtonText: `Yes, ${action}`,
    });
    if (!isConfirmed) return;
    try {
      await api.patch(`/users/${id}`, { status });
      setUsers((u) => u.map((x) => (x._id === id ? { ...x, status } : x)));
      toast.success(`User ${action}ned successfully`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed");
    }
  };

  const approveOwner = async (id) => {
    const { isConfirmed } = await Swal.fire({
      title: "Approve this owner?",
      text: "They will be able to add and manage turfs.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, approve",
    });
    if (!isConfirmed) return;
    try {
      await api.patch(`/users/${id}/approve`);
      setUsers((u) => u.map((x) => (x._id === id ? { ...x, status: "approved" } : x)));
      toast.success("Owner approved successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed");
    }
  };

  if (loading) return <span className="loading loading-spinner loading-lg" />;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Users</h2>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>
                  <span className={`badge badge-${u.status === "approved" ? "success" : u.status === "pending" ? "warning" : "error"}`}>
                    {u.status}
                  </span>
                </td>
                <td>
                  {u.status === "pending" && u.role === "owner" && (
                    <button className="btn btn-xs btn-success" onClick={() => approveOwner(u._id)}>
                      Approve
                    </button>
                  )}
                  {u.status === "approved" && (
                    <button className="btn btn-xs btn-error" onClick={() => updateStatus(u._id, "banned")}>
                      Ban
                    </button>
                  )}
                  {u.status === "banned" && (
                    <button className="btn btn-xs" onClick={() => updateStatus(u._id, "approved")}>
                      Unban
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
