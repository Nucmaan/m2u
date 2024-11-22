"use client";

import React, { useState } from "react";

export default function EditBookingPage() {
  const [booking, setBooking] = useState({
    property: "Luxury Villa",
    user: "Jane Smith",
    visitingDate: "2024-11-27",
    status: "Confirmed",
  });

  const handleChange = (e) => {
    setBooking({ ...booking, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Booking updated: ${JSON.stringify(booking, null, 2)}`);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-lg">
        <h1 className="text-2xl font-bold text-[#333333] mb-6">Edit Booking</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Property Name */}
          <div>
            <label
              htmlFor="property"
              className="block text-sm font-medium text-[#7A7A7A] mb-1"
            >
              Property Name
            </label>
            <input
              type="text"
              id="property"
              name="property"
              value={booking.property}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-[#E0E0E0] rounded-md text-[#333333]"
              disabled
            />
          </div>

          {/* User */}
          <div>
            <label
              htmlFor="user"
              className="block text-sm font-medium text-[#7A7A7A] mb-1"
            >
              User
            </label>
            <input
              type="text"
              id="user"
              name="user"
              value={booking.user}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-[#E0E0E0] rounded-md text-[#333333]"
              disabled
            />
          </div>

          {/* Visiting Date */}
          <div>
            <label
              htmlFor="visitingDate"
              className="block text-sm font-medium text-[#7A7A7A] mb-1"
            >
              Visiting Date
            </label>
            <input
              type="date"
              id="visitingDate"
              name="visitingDate"
              value={booking.visitingDate}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-[#E0E0E0] rounded-md text-[#333333]"
            />
          </div>

          {/* Status */}
          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-[#7A7A7A] mb-1"
            >
              Status
            </label>
            <select
              id="status"
              name="status"
              value={booking.status}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-[#E0E0E0] rounded-md text-[#333333] bg-white"
            >
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#F47C48] text-white text-sm font-medium py-2 rounded-md hover:bg-opacity-90 transition"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
