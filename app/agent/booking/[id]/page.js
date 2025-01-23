"use client";

import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function EditBookingPage() {
  const [bookingStatus, setBookingStatus] = useState("pending");
  const router = useRouter();
  const { id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`/api/booking/${id}`, {
        status: bookingStatus,
      });
      if (response.status === 200) {
        toast.success("Booking updated successfully.");
        router.push("/agent/booking");
      } else {
        toast.error("Failed to update booking. Please try again.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div className="p-6 bg-[#F7F7F9] min-h-screen flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg border border-[#E0E0E0] p-8 w-full max-w-lg">
        {/* Heading */}
        <h1 className="text-3xl font-bold text-[#1A3B5D] mb-6 text-center">
          Edit Booking
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Status Dropdown */}
          <div>
            <label
              htmlFor="status"
              className="block text-sm font-semibold text-[#1A3B5D] mb-2"
            >
              Status
            </label>
            <select
              id="status"
              name="status"
              value={bookingStatus}
              onChange={(e) => setBookingStatus(e.target.value)}
              className="w-full px-4 py-2 border border-[#E0E0E0] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#F47C48]"
            >
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="cancelled">Cancelled</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-[#1A3B5D] text-white font-semibold rounded-lg hover:bg-[#16324A] transition duration-200 focus:outline-none focus:ring-2 focus:ring-[#F47C48]"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}