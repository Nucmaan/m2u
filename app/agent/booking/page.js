"use client";
import userAuth from "@/myStore/UserAuth";
import axios from "axios";
import Link from "next/link";
import React, { useState, useEffect } from "react";

export default function BookingPage() {
  const [ownerBookings, setOwnerBookings] = useState([]);
  const user = userAuth((state) => state.user);

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
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-6 text-center">
        My Bookings
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {ownerBookings.length > 0 ? (
          ownerBookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white border border-gray-200 rounded-lg shadow-lg p-5 transition hover:scale-105 hover:shadow-xl"
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                {booking.listing.title}
              </h2>
              <p className="text-sm text-gray-600 mb-1">
                <span className="font-medium">Address:</span> {booking.listing.address}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <span className="font-medium">City:</span> {booking.listing.city}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <span className="font-medium">Price:</span> ${booking.listing.price}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <span className="font-medium">User Email:</span> {booking.user.email}
              </p>
              <p className="text-sm text-gray-600 mb-4">
                <span className="font-medium">Visiting Date:</span>{" "}
                {new Date(booking.visitingDate).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p className="mt-2">
                <span
                  className={`inline-block px-4 py-1 text-sm font-medium rounded-full text-white ${
                    booking.status === "completed"
                      ? "bg-green-500"
                      : booking.status === "cancelled"
                      ? "bg-red-500"
                      : booking.status === "processing"
                      ? "bg-blue-500"
                      : booking.status === "pending"
                      ? "bg-yellow-500"
                      : "bg-gray-500"
                  }`}
                >
                  {booking.status}
                </span>
              </p>
              <button
                className="mt-4 w-full bg-indigo-600 text-white text-sm font-medium py-2 rounded-lg hover:bg-indigo-700 transition"
              >
                <Link href={`/agent/booking/${booking._id}`}>Edit Booking</Link>
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-lg text-center col-span-full">
            No bookings available.
          </p>
        )}
      </div>
    </div>
  );
}
