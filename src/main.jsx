import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import router from "./router/router";
import AuthProvider from "./provider/AuthProvider";
import { ThemeProvider } from "./provider/ThemeProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={router} />
        <ToastContainer position="top-right" autoClose={3000} theme="colored" />
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);