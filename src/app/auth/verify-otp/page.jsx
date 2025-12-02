"use client";

import { useState } from "react";
import { verifyOtp } from "@/lib/api/auth";

export default function VerifyOtpPage() {
  const [form, setForm] = useState({
    email: "",
    otp: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await verifyOtp({ email: form.email, otp: form.otp });

      if (res.error) {
        setError(res.error);
        setLoading(false);
        return;
      }

      alert("OTP Verified Successfully!");
      window.location.href = "/auth/login";
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 border rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-4">Verify OTP</h1>

      <p className="text-gray-600 mb-6">
        Enter the OTP sent to your email / phone.
      </p>

      {error && (
        <div className="bg-red-100 text-red-600 p-2 mb-4 rounded">{error}</div>
      )}
      <input
        type="email"
        name="email"
        placeholder="Email"
        className="border p-2 w-full mb-3 tracking-widest text-center text-lg"
        onChange={handleChange}
      />

      <input
        type="text"
        name="otp"
        placeholder="Enter OTP"
        className="border p-2 w-full mb-3 tracking-widest text-center text-lg"
        onChange={handleChange}
      />

      <button
        onClick={submit}
        disabled={loading}
        className="bg-green-600 text-white px-4 py-2 rounded w-full disabled:opacity-50"
      >
        {loading ? "Verifying..." : "Verify OTP"}
      </button>

      <p className="mt-4 text-center text-gray-700">
        Didn't receive OTP? <span className="text-green-600">Request again</span>
      </p>
    </div>
  );
}
