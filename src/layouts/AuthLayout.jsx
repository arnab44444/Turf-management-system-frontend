import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 py-8 bg-base-100">
      <div className="w-full max-w-md">
        <Outlet />
      </div>
    </div>
  );
}
