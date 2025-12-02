"use client";

import { useState, useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { addProperty } from "@/lib/api/property";

export default function AddPropertyPage() {
  const { user } = useContext(AuthContext);

  const [form, setForm] = useState({
    title: "",
    description: "",
    address: "",
    image_url: "",
    starting_price: "",
    bid_increment: 1000,
    ends_at: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async () => {
    if (!user) {
      alert("Please login first!");
      return;
    }

    try {
      setLoading(true);

      const body = {
        ...form,
        user_id: user.id,
        starting_price: parseFloat(form.starting_price),
        bid_increment: parseFloat(form.bid_increment),
      };

      const res = await addProperty(body);

      alert("Property created successfully!");
      window.location.href = "/";
    } catch (err) {
      console.error(err);
      alert("Error creating property");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Add New Property</h1>

      <div className="space-y-4">
        <input
          name="title"
          placeholder="Title"
          className="border p-3 w-full rounded"
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Description"
          className="border p-3 w-full rounded"
          rows={4}
          onChange={handleChange}
        />

        <input
          name="address"
          placeholder="Address"
          className="border p-3 w-full rounded"
          onChange={handleChange}
        />

        <input
          name="image_url"
          placeholder="Image URL"
          className="border p-3 w-full rounded"
          onChange={handleChange}
        />

        <input
          type="number"
          name="starting_price"
          placeholder="Starting Price"
          className="border p-3 w-full rounded"
          onChange={handleChange}
        />

        <input
          type="number"
          name="bid_increment"
          placeholder="Bid Increment"
          className="border p-3 w-full rounded"
          defaultValue={1000}
          onChange={handleChange}
        />

        <input
          type="datetime-local"
          name="ends_at"
          className="border p-3 w-full rounded"
          onChange={handleChange}
        />

        <button
          onClick={submit}
          disabled={loading}
          className="bg-green-600 text-white px-4 py-2 rounded w-full disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Property"}
        </button>
      </div>
    </div>
  );
}
