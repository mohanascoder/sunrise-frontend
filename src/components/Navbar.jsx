"use client";

import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

export default function Navbar() {
  const { user, logoutUser } = useContext(AuthContext);

  return (
    <nav className="flex justify-between p-4 border-b border-gray-300">
      <Link href="/" className="text-xl font-bold text-green-600">
        SunRise Biding
      </Link>

      <div className="flex gap-4">
        {user ? (
          <>
            {user.role === "admin" && (
              <Link href="/add-property">Add Property</Link>
            )}
            {
              "Hello, " + (user.name || user.email)
            }
            <button
              onClick={logoutUser}
              className="bg-green-600 text-white px-4 py-1 rounded cursor-pointer"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            href="/auth/login"
            className="bg-green-600 text-white px-4 py-1 rounded"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
