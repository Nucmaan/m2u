"use client";
import userAuth from "@/myStore/UserAuth";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function AdminDashboard() {
  const { user, hasHydrated } = userAuth();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Ensure it's a client-side component
  }, []);

  // Show a loading state until Zustand hydrates
  if (!isClient || !hasHydrated) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-[#F7F7F9] text-[#333333]">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-[#4C8492] mb-4">
          Welcome, {user ? user.name : "Admin"}!
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white shadow-md rounded-lg p-4 border border-[#E0E0E0]">
            <h3 className="text-lg font-medium mb-2">Manage Users</h3>
            <p className="text-[#7A7A7A]">View and manage all registered users.</p>
            <Link href="/admin/users">
              <button className="mt-4 bg-[#1A3B5D] hover:bg-[#16324A] text-white px-4 py-2 rounded">
                Manage Users
              </button>
            </Link>
          </div>

          {/* Card 2 */}
          <div className="bg-white shadow-md rounded-lg p-4 border border-[#E0E0E0]">
            <h3 className="text-lg font-medium mb-2">Property Listings</h3>
            <p className="text-[#7A7A7A]">Add, edit, or delete property listings.</p>
            <Link href="/admin/listings">
              <button className="mt-4 bg-[#1A3B5D] hover:bg-[#16324A] text-white px-4 py-2 rounded">
                Manage Listings
              </button>
            </Link>
          </div>

          {/* Card 3 */}
          <div className="bg-white shadow-md rounded-lg p-4 border border-[#E0E0E0]">
            <h3 className="text-lg font-medium mb-2">Reports</h3>
            <p className="text-[#7A7A7A]">Generate reports on user activity and sales.</p>
            <button className="mt-4 bg-[#1A3B5D] hover:bg-[#16324A] text-white px-4 py-2 rounded">
              View Reports
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
