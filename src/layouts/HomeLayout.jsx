import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function HomeLayout() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#F1F8F4" }}>
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
