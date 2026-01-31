import { createBrowserRouter } from "react-router";
import HomeLayout from "../layouts/HomeLayout";
import Home from "../pages/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AllTurfs from "../pages/AllTurfs";
import TurfDetails from "../pages/TurfDetails";
import SectionBooking from "../pages/SectionBooking";
import PrivateRoute from "../provider/PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import DashboardHome from "../pages/dashboard/DashboardHome";
import MyBookings from "../pages/dashboard/MyBookings";
import MyTurfs from "../pages/dashboard/MyTurfs";
import AddTurf from "../pages/dashboard/AddTurf";
import EditTurf from "../pages/dashboard/EditTurf";
import BookingsPage from "../pages/dashboard/BookingsPage";
import Earnings from "../pages/dashboard/Earnings";
import MyReviews from "../pages/dashboard/MyReviews";
import Profile from "../pages/dashboard/Profile";
import AdminUsers from "../pages/dashboard/AdminUsers";
import AdminTurfs from "../pages/dashboard/AdminTurfs";
import Reports from "../pages/dashboard/Reports";
import Schedule from "../pages/dashboard/Schedule";
import OwnerCustomers from "../pages/dashboard/OwnerCustomers";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Payment from "../pages/Payment";
import PaymentSuccess from "../pages/PaymentSuccess";
import ErrorPage from "../pages/ErrorPage";
import api from "../api/axios";

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        index: true,
        loader: () => fetch(`${apiUrl}/turfs/top-rated`).then((r) => r.json()).catch(() => []),
        element: <Home />,
      },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      {
        path: "all-turfs",
        loader: async ({ request }) => {
          const url = new URL(request.url);
          const params = new URLSearchParams();
          const city = url.searchParams.get("city");
          const sectionType = url.searchParams.get("sectionType");
          if (city) params.set("city", city);
          if (sectionType) params.set("sectionType", sectionType);
          const q = params.toString() ? `?${params}` : "";
          return fetch(`${apiUrl}/turfs${q}`).then((r) => r.json()).catch(() => []);
        },
        element: <AllTurfs />,
      },
      {
        path: "turfs/:id",
        loader: ({ params }) =>
          fetch(`${apiUrl}/turfs/${params.id}`).then((r) => (r.ok ? r.json() : null)).catch(() => null),
        element: <TurfDetails />,
      },
      {
        path: "turfs/:id/book/:sectionId",
        loader: ({ params }) =>
          fetch(`${apiUrl}/turfs/${params.id}`).then((r) => (r.ok ? r.json() : null)).catch(() => null),
        element: <SectionBooking />,
      },
      {
        path: "payment",
        element: (
          <PrivateRoute>
            <Payment />
          </PrivateRoute>
        ),
      },
      {
        path: "payment/success",
        element: (
          <PrivateRoute>
            <PaymentSuccess />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <DashboardHome /> },
      { path: "my-bookings", element: <MyBookings /> },
      { path: "my-turfs", element: <MyTurfs /> },
      { path: "add-turf", element: <AddTurf /> },
      { path: "edit-turf/:id", element: <EditTurf /> },
      { path: "bookings", element: <BookingsPage /> },
      { path: "schedule", element: <Schedule /> },
      { path: "customers", element: <OwnerCustomers /> },
      { path: "earnings", element: <Earnings /> },
      { path: "reviews", element: <MyReviews /> },
      { path: "profile", element: <Profile /> },
      { path: "users", element: <AdminUsers /> },
      {
        path: "turfs",
        loader: () => api.get("/turfs").then((r) => r.data).catch(() => []),
        element: <AdminTurfs />,
      },
      { path: "reports", element: <Reports /> },
    ],
  },
  { path: "*", element: <ErrorPage /> },
]);

export default router;
