import { useEffect, useState, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router";
import { toast } from "react-toastify";
import api from "../api/axios";

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("verifying");
  const verifiedRef = useRef(false);

  useEffect(() => {
    if (verifiedRef.current) return;
    const sessionId = searchParams.get("session_id");
    if (!sessionId) {
      setStatus("error");
      return;
    }
    verifiedRef.current = true;
    api
      .post("/payments/verify", { session_id: sessionId })
      .then(() => {
        setStatus("success");
        toast.success("Payment confirmed! Redirecting to your bookings...");
        setTimeout(() => navigate("/dashboard/my-bookings", { state: { bookingSuccess: true } }), 2000);
      })
      .catch(() => {
        setStatus("error");
        toast.error("Payment verification failed");
      });
  }, [searchParams, navigate]);

  if (status === "verifying") {
    return (
      <div className="max-w-md mx-auto px-4 py-24 text-center">
        <span className="loading loading-spinner loading-lg text-primary" />
        <p className="mt-6 text-lg font-medium">Verifying your payment...</p>
      </div>
    );
  }
  if (status === "error") {
    return (
      <div className="max-w-md mx-auto px-4 py-24 text-center">
        <div className="alert alert-error mb-6">Payment verification failed.</div>
        <button
          className="btn btn-primary"
          onClick={() => navigate("/dashboard/my-bookings")}
        >
          View My Bookings
        </button>
      </div>
    );
  }
  return (
    <div className="max-w-md mx-auto px-4 py-24 text-center">
      <div className="alert alert-success shadow-lg">
        <span className="font-medium">Payment successful! Redirecting to your bookings...</span>
      </div>
    </div>
  );
}
