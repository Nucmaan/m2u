"use client";

import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function EditBookingPage() {
  const [BookingStatus, setBookingStatus] = useState("pending");
  const router = useRouter();
  const { id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`/api/booking/${id}`, {
        status: BookingStatus,
      });
      if (response.status === 200) {
        toast.success("Booking updated successfully.");
        router.push("/agent/booking"); 
      } else {
        toast.error("Failed to update booking. Please try again.");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };


  return (
    <div className="p-6 bg-gray-50 min-h-screen flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Edit Booking
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
        

          {/* Status */}
          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Status
            </label>
            <select
              id="status"
              name="status"
              value={BookingStatus}
              onChange={(e) => setBookingStatus(e.target.value)} // Ensure state is updated
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-orange-400 focus:outline-none"
            >
              <option value="pending">Pending</option>
              <option value="processing">processing</option>
              <option value="cancelled">Cancelled</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full bg-orange-500 text-white text-lg font-medium py-2 rounded-lg hover:bg-orange-600 transition focus:ring-2 focus:ring-orange-400 focus:outline-none"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
