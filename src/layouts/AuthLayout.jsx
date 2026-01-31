import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <div className="auth-page-bg min-h-screen flex items-center justify-center p-4 py-8">
      <div className="w-full max-w-2xl">
        <Outlet />
      </div>
    </div>
  );
}
