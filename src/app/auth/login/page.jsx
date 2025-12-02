"use client";

import { useState, useContext } from "react";
import { login } from "@/lib/api/auth";
import { AuthContext } from "@/context/AuthContext";

export default function LoginPage() {
  const { loginUser } = useContext(AuthContext);
  const [form, setForm] = useState({ email: "", password: "" });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await login(form);
      loginUser(res.user);
      window.location.href = "/";
    } catch (err) {
      setError("Login failed. Please check your credentials and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 border rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-4">Login</h1>

      {error && (
        <div className="bg-red-100 text-red-600 p-2 mb-4 rounded">{error}</div>
      )}

      <input
        type="email"
        name="email"
        placeholder="Email"
        className="border p-2 w-full mb-3"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        className="border p-2 w-full mb-3"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <button
        onClick={submit}
        disabled={loading}
        className="bg-green-600 text-white px-4 py-2 rounded w-full mt-2 disabled:opacity-50"
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      <p className="mt-4 text-center">
        Don't have an account?{" "}
        <a href="/auth/register" className="text-green-600 underline">
          Register
        </a>
      </p>
    </div>
  );
}
