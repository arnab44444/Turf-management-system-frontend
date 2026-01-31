import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import OwnerBookings from "./OwnerBookings";
import AdminBookings from "./AdminBookings";

export default function BookingsPage() {
  const { user } = useContext(AuthContext);
  return user?.role === "admin" ? <AdminBookings /> : <OwnerBookings />;
}
