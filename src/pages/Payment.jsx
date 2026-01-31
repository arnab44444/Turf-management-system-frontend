import { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import api from "../api/axios";

export default function Payment() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const submittedRef = useRef(false);

  if (!state?.turf || !state?.section || !state?.date || !state?.slot) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <p className="text-error text-lg">Invalid booking data. Please start from the turf page.</p>
        <button
          className="btn btn-primary mt-6"
          onClick={() => navigate("/all-turfs")}
        >
          Browse Turfs
        </button>
      </div>
    );
  }

  const { turf, section, date, slot, totalHours, totalAmount } = state;

  const handleStripePayment = async () => {
    if (submittedRef.current || processing) return;
    submittedRef.current = true;
    setError("");
    setProcessing(true);
    try {
      const { data } = await api.post("/payments/create-checkout-session", {
        turfId: turf._id,
        sectionId: section._id?.toString?.() || section._id,
        date,
        startTime: slot.startTime,
        endTime: slot.endTime,
        totalHours,
        totalAmount,
      });
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError("Could not create payment session");
      }
    } catch (err) {
      submittedRef.current = false;
      const msg = err.response?.data?.message || err.message || "Payment failed";
      setError(msg);
      toast.error(msg);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto px-4 py-12">
      <h1 className="text-4xl font-extrabold mb-8">
        <span className="text-primary">Payment</span>
      </h1>
      <div className="card bg-white shadow-xl border border-[#C8E6C9]/50 rounded-xl">
        <div className="card-body">
          <h2 className="card-title text-xl">{turf.name}</h2>
          <p className="text-base-content/70">{section.name}</p>
          <div className="divider" />
          <div className="space-y-2">
            <p><span className="font-medium">Date:</span> {date}</p>
            <p><span className="font-medium">Time:</span> {slot.startTime} - {slot.endTime}</p>
            <p><span className="font-medium">Duration:</span> {totalHours} hour(s)</p>
            <p className="text-2xl font-bold mt-4">Total: ৳{totalAmount}</p>
          </div>
          <div className="divider" />
          <p className="text-sm text-base-content/70">Pay securely with Stripe (card, Apple Pay, Google Pay)</p>
          {error && <div className="alert alert-error">{error}</div>}
          <button
            className="btn btn-lg font-semibold mt-4"
            style={{ backgroundColor: "#FFB703", color: "#14532D", border: "none" }}
            onClick={handleStripePayment}
            disabled={processing}
          >
            {processing ? "Redirecting to Stripe..." : "Pay with Stripe ৳" + totalAmount}
          </button>
        </div>
      </div>
    </div>
  );
}
