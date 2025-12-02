"use client";

import { useEffect, useState, useContext } from "react";
import { getProperty, placeBid } from "@/lib/api/property";
import { AuthContext } from "@/context/AuthContext";
import { useParams } from "next/navigation";
import Countdown from "@/components/Countdown";
import { apiFetch } from "@/lib/api/fetcher";

export default function PropertyDetail() {
  const params = useParams(); // ← FIX HERE
  const { user } = useContext(AuthContext);
  const [property, setProperty] = useState(null);
  const [amount, setAmount] = useState("");

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const data = await getProperty(params.id);
    setProperty(data);
    const owner = await apiFetch(`/users/name/${data.user_id}`);
    setProperty((prev) => ({ ...prev, owner: owner.name }));
  };

  const bid = async () => {
    if (!user) {
      alert("Please login first!");
      return (window.location.href = "/auth/login");
    }
    await placeBid(params.id, {
      user_id: user.id,
      name: user.name,
      amount: parseFloat(amount),
    });

    alert("Bid placed!");
    load();
  };

  if (!property) return <p>Loading...</p>;

  return (
    <div className="flex justify-between gap-12 px-20 py-6">
      <div>
        <div className=" bg-green-600 rounded px-2 py-1 w-fit mb-4 text-white">
          ⏳ <Countdown color={"home"} endsAt={property.ends_at} />
        </div>
        <div className="text-3xl font-bold text-gray-700">{property.title}</div>
        <div className="text-gray-700">{property.description}</div>
        <div className="mt-4 font-bold text-2xl text-gray-800">
          Current Price: ₹{property.current_price || property.starting_price}
        </div>

        <div className="mt-6 p-4 border rounded bg-gray-50 text-gray-600">
          <div className="text-xl font-semibold mb-3">Bids History</div>

          {property.bids?.length === 0 && (
            <p className="text-gray-500">No bids yet.</p>
          )}

          {property.bids
            ?.slice() // copy array
            .reverse() // latest first
            .map((b, i) => (
              <div key={i} className="border-b border-gray-300 py-2">
                <div className="font-medium">
                  ₹{b.amount} - {b.username || "User"}
                </div>
              </div>
            ))}
          <div className="py-2">
            <div className="font-medium">
              ₹{property.starting_price} - {property.owner || "User"} (Initial)
            </div>
          </div>
        </div>
        {/* PLACE BID */}
        <div className="mt-6">
          <div className="mb-2 text-gray-700">Your Bid: ₹{amount}</div>
          <input
            type="range"
            className="border p-2 w-full my-2"
            placeholder="Bid Amount"
            min={
              property.current_price
                ? property.current_price + property.bid_increment
                : property.starting_price
            }
            step={property.bid_increment}
            max={
              property.current_price
                ? property.current_price + property.bid_increment * 10
                : property.starting_price + property.bid_increment * 10
            }
            onChange={(e) => setAmount(e.target.value)}
          />

          <button
            onClick={bid}
            className="bg-green-600 text-white px-4 py-2 rounded w-full"
          >
            Place Bid
          </button>
        </div>
      </div>
      <div className="Image">
        <img className="rounded" src={property.image_url} alt="" />
      </div>
    </div>
  );
}
