"use client";
import userAuth from "@/myStore/UserAuth";
import axios from "axios";
import Link from "next/link";
import React, { useState, useEffect, useCallback } from "react";

export default function BookingPage() {
  const user = userAuth((state) => state.user);
  const [ownerBookings, setOwnerBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchOwnerBookings = useCallback(async () => {
    try {
      if (!user?._id) {
        console.log("User ID missing!");
        return;
      }

      const response = await axios.get(`/api/booking/ownerBooking/${user._id}`);

      if (response.status === 200) {
        setOwnerBookings(response.data.bookings);
        setError(""); // Clear errors
      } else {
        setOwnerBookings([]);
      }
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch bookings.");
    } finally {
      setLoading(false);
    }
  }, [user?._id]);

  useEffect(() => {
    if (user?._id) fetchOwnerBookings();
  }, [user?._id, fetchOwnerBookings]);

  return (
    <div className="p-6 bg-[#F7F7F9] min-h-screen">
      {/* Heading */}
      <h1 className="text-3xl font-bold text-[#1A3B5D] mb-8 text-center">
        My Bookings
      </h1>

      {/* Loading State */}
      {loading ? (
        <p className="text-center text-lg text-[#7A7A7A]">Loading bookings...</p>
      ) : error ? (
        <p className="text-center text-lg text-red-500">{error}</p>
      ) : ownerBookings.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ownerBookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white rounded-lg shadow-lg border border-[#E0E0E0] p-6 hover:shadow-xl transition duration-300"
            >
              <h2 className="text-xl font-bold text-[#1A3B5D] mb-4">
                {booking.listing?.title || "No title available"}
              </h2>
              <p className="text-sm text-[#7A7A7A] mb-2">
                <span className="font-medium">Address:</span>{" "}
                {booking.listing?.address || "N/A"}
              </p>
              <p className="text-sm text-[#7A7A7A] mb-2">
                <span className="font-medium">City:</span>{" "}
                {booking.listing?.city || "N/A"}
              </p>
              <p className="text-sm text-[#7A7A7A] mb-2">
                <span className="font-medium">Price:</span> $
                {booking.listing?.price || "N/A"}
              </p>
              <p className="text-sm text-[#7A7A7A] mb-2">
                <span className="font-medium">User Email:</span>{" "}
                {booking.user?.email ? booking.user.email : "User not assigned"}
              </p>
              <p className="text-sm text-[#7A7A7A] mb-4">
                <span className="font-medium">Visiting Date:</span>{" "}
                {booking.visitingDate
                  ? new Date(booking.visitingDate).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "N/A"}
              </p>
              <p className="mt-2">
                <span
                  className={`inline-block px-4 py-1 text-sm font-medium rounded-full text-white ${
                    booking.status === "completed"
                      ? "bg-green-600"
                      : booking.status === "cancelled"
                      ? "bg-red-500"
                      : booking.status === "processing"
                      ? "bg-blue-500"
                      : booking.status === "pending"
                      ? "bg-orange-500"
                      : "bg-gray-500"
                  }`}
                >
                  {booking.status}
                </span>
              </p>
              <button className="mt-4 w-full py-2 bg-[#1A3B5D] text-white font-semibold rounded-lg hover:bg-[#16324A] transition duration-200">
                <Link href={`/agent/booking/${booking._id}`}>Edit Booking</Link>
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-lg text-[#7A7A7A]">
          You don’t have any bookings at the moment.
        </p>
      )}
    </div>
  );
}
