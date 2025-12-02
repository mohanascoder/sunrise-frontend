"use client";

import { useEffect, useState } from "react";

export default function Countdown({ endsAt, color }) {
  const [timeLeft, setTimeLeft] = useState({});

  const calculate = () => {
    const end = new Date(endsAt).getTime();
    const now = Date.now();

    const diff = end - now;

    if (diff <= 0) {
      setTimeLeft({ ended: true });
      return;
    }

    setTimeLeft({
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    });
  };

  useEffect(() => {
    calculate(); // initial call
    const timer = setInterval(calculate, 1000);
    return () => clearInterval(timer);
  }, [endsAt]);

  if (timeLeft.ended) {
    return <span className="text-red-600 font-semibold">Auction Ended</span>;
  }

  return (
    <span
      className={`${color == "home" ? "text-white font-semibold" : "text-green-600 font-semibold"}`}
    >
      {timeLeft.hours}h : {timeLeft.minutes}m : {timeLeft.seconds}s
    </span>
  );
}
