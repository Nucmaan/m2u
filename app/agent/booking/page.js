"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const bookingsData = [
  {
    id: 1,
    property: "Beachside Apartment",
    user: "John Doe",
    visitingDate: "2024-11-25",
    status: "Pending",
  },
  {
    id: 2,
    property: "Luxury Villa",
    user: "Jane Smith",
    visitingDate: "2024-11-27",
    status: "Confirmed",
  },
];

export default function BookingPage() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    setBookings(bookingsData);
  }, []);

  const handleEditStatus = (id) => {
    alert(`Edit status for booking ID: ${id}`);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-[#333333] mb-8">Bookings List</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <h2 className="text-lg font-semibold text-[#1A3B5D] mb-2">
                {booking.property}
              </h2>
              <p className="text-sm text-[#7A7A7A]">
                <span className="font-medium">User:</span> {booking.user}
              </p>
              <p className="text-sm text-[#7A7A7A]">
                <span className="font-medium">Visiting Date:</span>{" "}
                {booking.visitingDate}
              </p>
              <p className="mt-2">
                <span
                  className={`inline-block px-3 py-1 text-sm font-semibold rounded-full text-white ${
                    booking.status === "Confirmed"
                      ? "bg-[#27AE60]"
                      : booking.status === "Cancelled"
                      ? "bg-[#E74C3C]"
                      : "bg-[#4C8492]"
                  }`}
                >
                  {booking.status}
                </span>
              </p>
              <button
                onClick={() => handleEditStatus(booking.id)}
                className="mt-4 w-full bg-[#F47C48] text-white text-sm font-medium py-2 rounded-md hover:bg-opacity-90 transition"
              >
                <Link href={`/agent/booking/${booking.id}`}>Edit Booking </Link>
              </button>
            </div>
          ))
        ) : (
          <p className="text-[#7A7A7A] text-center col-span-full">
            No bookings available.
          </p>
        )}
      </div>
    </div>
  );
}
