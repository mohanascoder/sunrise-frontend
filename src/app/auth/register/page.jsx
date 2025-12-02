"use client";

import { useState } from "react";
import { register } from "@/lib/api/auth";

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await register(form);

      if (res.error) {
        setError(res.error);
        setLoading(false);
        return;
      }

      alert("OTP sent to your email!");
      window.location.href = "/auth/verify-otp";

    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 border rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-4">Register</h1>

      {error && (
        <div className="bg-red-100 text-red-600 p-2 mb-4 rounded">
          {error}
        </div>
      )}

      <input
        type="text"
        name="name"
        placeholder="Full Name"
        className="border p-2 w-full mb-3"
        onChange={handleChange}
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        className="border p-2 w-full mb-3"
        onChange={handleChange}
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        className="border p-2 w-full mb-3"
        onChange={handleChange}
      />

      <button
        onClick={submit}
        disabled={loading}
        className="bg-green-600 text-white px-4 py-2 rounded w-full mt-2 disabled:opacity-50"
      >
        {loading ? "Registering..." : "Register"}
      </button>

      <p className="mt-4 text-center">
        Already have an account?{" "}
        <a href="/auth/login" className="text-green-600 underline">
          Login
        </a>
      </p>
    </div>
  );
}
