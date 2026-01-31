import { createBrowserRouter } from "react-router";
import HomeLayout from "../layouts/HomeLayout";
import Home from "../pages/Home";
import AuthLayout from "../layouts/Authlayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AllPlant from "../pages/AllPlant";
import AddPlants from "../pages/AddPlants";
import MyPlants from "../pages/MyPlants";
import PrivateRoute from "../provider/PrivateRoute";
import PlantDetails from "../pages/PlantDetails";
import UpdatePlant from "../components/UpdatePlant";
import ErrorPage from "../pages/ErrorPage";
import DashboardLayout from "../layouts/DashboardLayout";
import DashboardHome from "../pages/DashboardHome";
import AboutUs from "../pages/AboutUs";
import ContactUs from "../pages/ContactUs";
import Blog from "../pages/Blog";
import UpdateProfile from "../components/UpdateProfile";
import AllPlantDash from "../pages/AllPlantDash";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout></HomeLayout>,

    children: [
      {
        //path: '',
        index: true,

        // new plants sectioner jnno

        loader: () =>
          fetch("https://plant-tracker-server.vercel.app/new_plants"),
        hydrateFallbackElement: (
          <span className="loading loading-bars loading-xl"></span>
        ),
        element: <Home></Home>,
      },
    ],
  },

  {
    path: "/auth",
    element: <AuthLayout></AuthLayout>,
    children: [
      {
        path: "/auth/login",
        element: <Login></Login>,
      },

      {
        path: "/auth/register",
        element: <Register></Register>,
      },
    ],
  },

  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        index: true, // Default route for /dashboard
        element: <DashboardHome></DashboardHome>,
      },
      {
        path: "add-plants",
        element: <AddPlants></AddPlants>,
      },
      {
        path: "update-profile",
        element: <UpdateProfile></UpdateProfile>,
      },

      {
        path: "my-plants/:email",
        loader: ({ params }) =>
          fetch(
            `https://plant-tracker-server.vercel.app/plants/${params.email}`
          ),
        hydrateFallbackElement: (
          <span className="loading loading-bars loading-xl"></span>
        ),
        element: <MyPlants />,
      },

      {
        path: "all-plants",
        loader: () => fetch("https://plant-tracker-server.vercel.app/plants"),
        hydrateFallbackElement: (
          <span className="loading loading-bars loading-xl"></span>
        ),
        element: <AllPlantDash></AllPlantDash>,
      },
    ],
  },

  {
    path: "/all-plants",
    loader: () => fetch("https://plant-tracker-server.vercel.app/plants"),
    hydrateFallbackElement: (
      <span className="loading loading-bars loading-xl"></span>
    ),
    element: <AllPlant></AllPlant>,
  },

  {
    path: "aboutUs",
    element: <AboutUs></AboutUs>,
  },

  {
    path: "contactUs",
    element: <ContactUs></ContactUs>,
  },

  {
    path: "blog",
    element: <Blog></Blog>,
  },

  // {
  //   path: "/add-plants",
  //   element: (
  //     <PrivateRoute>
  //       <AddPlants></AddPlants>
  //     </PrivateRoute>
  //   ),
  // },

  // {
  //   path: "/my-plants/:email",
  //   loader: ({ params }) =>
  //     fetch(`https://plant-tracker-server.vercel.app/plants/${params.email}`),
  //   hydrateFallbackElement: (
  //     <span className="loading loading-bars loading-xl"></span>
  //   ),
  //   element: (
  //     <PrivateRoute>
  //       <MyPlants />
  //     </PrivateRoute>
  //   ),
  // },

  {
    path: "/plant-details/:id",
    loader: () => fetch("https://plant-tracker-server.vercel.app/plants"),
    hydrateFallbackElement: (
      <span className="loading loading-bars loading-xl"></span>
    ),
    element: (
      <PrivateRoute>
        <PlantDetails></PlantDetails>
      </PrivateRoute>
    ),
  },

  {
    path: "/updatePlant/:id",
    loader: ({ params }) =>
      fetch(`https://plant-tracker-server.vercel.app/updatePlant/${params.id}`),
    hydrateFallbackElement: (
      <span className="loading loading-bars loading-xl"></span>
    ),
    element: <UpdatePlant></UpdatePlant>,
  },

  {
    path: "/*",
    element: <ErrorPage></ErrorPage>,
  },
]);

export default router;

// https://plant-tracker-server.vercel.app

// Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass

// {
//   path: "my-plants/:email",
//   loader: async ({ params }) => {
//     const res = await fetch(
//       `https://plant-tracker-server.vercel.app/plants/${params.email}`
//     );
//     if (!res.ok) throw new Error("Failed to load plants");
//     return res.json();
//   },
//   hydrateFallbackElement: (
//     <span className="loading loading-bars loading-xl"></span>
//   ),
//   element: (
//     <PrivateRoute>
//       <MyPlants />
//     </PrivateRoute>
//   ),
// },
