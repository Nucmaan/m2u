"use client";
import userAuth from "@/myStore/UserAuth";
import axios from "axios";
import Link from "next/link";
import React, { useState, useEffect } from "react";

export default function BookingPage() {
  const user = userAuth((state) => state.user);
  const [ownerBookings, setOwnerBookings] = useState([]);

  const fetchOwnerBookings = async () => {
    try {
      const response = await axios.get(`/api/booking/ownerBooking/${user._id}`);
      setOwnerBookings(response.data.bookings);
    } catch (error) {
      console.error("Error fetching owner bookings:", error);
    }
  };

  useEffect(() => {
    if (user?._id) {
      fetchOwnerBookings();
    }
  }, [user?._id]);

  return (
    <div className="p-6 bg-[#F7F7F9] min-h-screen">
      {/* Heading */}
      <h1 className="text-3xl font-bold text-[#1A3B5D] mb-8 text-center">
        My Bookings
      </h1>

      {/* Booking Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {ownerBookings.length > 0 ? (
          ownerBookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white rounded-lg shadow-lg border border-[#E0E0E0] p-6 hover:shadow-xl transition duration-300"
            >
              {/* Booking Details */}
              <h2 className="text-xl font-bold text-[#1A3B5D] mb-4">
                {booking.listing.title}
              </h2>
              <p className="text-sm text-[#7A7A7A] mb-2">
                <span className="font-medium">Address:</span> {booking.listing.address}
              </p>
              <p className="text-sm text-[#7A7A7A] mb-2">
                <span className="font-medium">City:</span> {booking.listing.city}
              </p>
              <p className="text-sm text-[#7A7A7A] mb-2">
                <span className="font-medium">Price:</span> ${booking.listing.price}
              </p>
              <p className="text-sm text-[#7A7A7A] mb-2">
                <span className="font-medium">User Email:</span> {booking.user.email}
              </p>
              <p className="text-sm text-[#7A7A7A] mb-4">
                <span className="font-medium">Visiting Date:</span>{" "}
                {new Date(booking.visitingDate).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>

              {/* Status Badge */}
              <p className="mt-2">
                <span
                  className={`inline-block px-4 py-1 text-sm font-medium rounded-full text-white ${
                    booking.status === "completed"
                      ? "bg-[#27AE60]" // Success Green
                      : booking.status === "cancelled"
                      ? "bg-[#E74C3C]" // Warning Red
                      : booking.status === "processing"
                      ? "bg-[#4C8492]" // Secondary Color
                      : booking.status === "pending"
                      ? "bg-[#F47C48]" // Accent Color
                      : "bg-[#7A7A7A]" // Secondary Text
                  }`}
                >
                  {booking.status}
                </span>
              </p>

              {/* Edit Booking Button */}
              <button className="mt-4 w-full py-2 bg-[#1A3B5D] text-white font-semibold rounded-lg hover:bg-[#16324A] transition duration-200">
                <Link href={`/agent/booking/${booking._id}`}>Edit Booking</Link>
              </button>
            </div>
          ))
        ) : (
          <p className="text-[#7A7A7A] text-lg text-center col-span-full">
            No bookings available.
          </p>
        )}
      </div>
    </div>
  );
}