import Link from "next/link";
import React from "react";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-[#F7F7F9] text-[#333333]">

      {/* Main Content */}
      <div className="p-6">
        <h2 className="text-xl font-semibold text-[#4C8492] mb-4">Welcome, Admin!</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white shadow-md rounded-lg p-4 border border-[#E0E0E0]">
            <h3 className="text-lg font-medium mb-2">Manage Users</h3>
            <p className="text-[#7A7A7A]">View and manage all registered users.</p>
            <button className="mt-4 bg-[#1A3B5D] hover:bg-[#16324A] text-white px-4 py-2 rounded">
              <Link href={"/admin/users"}>Manage Users</Link>
            </button>
          </div>

          {/* Card 2 */}
          <div className="bg-white shadow-md rounded-lg p-4 border border-[#E0E0E0]">
            <h3 className="text-lg font-medium mb-2">Property Listings</h3>
            <p className="text-[#7A7A7A]">Add, edit, or delete property listings.</p>
            <button className="mt-4 bg-[#1A3B5D] hover:bg-[#16324A] text-white px-4 py-2 rounded">
            <Link href={"/admin/listings"}>Manage listings</Link>
            </button>
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
