"use client";

import userAuth from "@/myStore/UserAuth";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function UserBookingPage() {
  const [userBookings, setUserBookings] = useState([]);
  const user = userAuth((state) => state.user);

  const fetchUserBookings = async () => {
    try {
      const response = await axios.get(`/api/booking/userBooking/${user._id}`);
      setUserBookings(response.data.bookings);
    } catch (error) {
      console.error("Error fetching user bookings:", error);
    }
  };

  useEffect(() => {
    if (user?._id) {
      fetchUserBookings();
    }
  }, [user?._id]);

  const handleCancelBooking  = async (id) => {
    try {
      const response = await axios.delete(`/api/booking/cancel/${id}`);
      toast.success(response.data.message);
      setUserBookings((prevBookings) =>
        prevBookings.filter((booking) => booking._id !== id)
      );
    } catch (error) {
      console.error("Error fetching user bookings:", error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="p-4 md:p-8 bg-[#F7F7F9] min-h-screen">
      <h1 className="text-2xl font-bold text-[#1A3B5D] mb-4">All Bookings</h1>

      {["pending", "processing", "completed", "cancelled"].map((status) => (
        <div key={status} className="mb-6">
          <h2 className="text-xl font-semibold text-[#1A3B5D] mb-2 capitalize">
            {status} Bookings
          </h2>
          <div className="space-y-4">

            {userBookings
              .filter((booking) => booking.status === status)
              .map((booking) => (
                <div
                  key={booking._id || "unknown-id"}
                  className="bg-white shadow-md rounded-lg p-4 md:flex md:justify-between md:items-center"
                >
                  <div>
                    <h3 className="text-lg font-medium text-gray-800">
                      {booking.listing?.title || "Not Available"}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Visiting Date:{" "}
                      {booking.visitingDate
                        ? new Date(booking.visitingDate).toDateString()
                        : "Not Available"}
                    </p>
                    <div className="mt-2 text-sm text-gray-700">
                      <p>
                        <strong>Owner Email:</strong>{" "}
                        {booking.owner?.email || "Not Available"}
                      </p>
                      <p>
                        <strong>Address:</strong>{" "}
                        {booking.listing?.address || "Not Available"}
                      </p>
                      <p>
                        <strong>Price:</strong>{" "}
                        {booking.listing?.price
                          ? `$${booking.listing.price}`
                          : "Not Available"}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 md:mt-0 flex items-center space-x-4">
                    <div
                      className={`px-3 py-1 text-sm font-medium rounded-full ${
                        status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : status === "completed"
                          ? "bg-green-100 text-green-700"
                          : status === "processing"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {status}
                    </div>

                    {status === "pending" && (
                      <button
                        onClick={() => handleCancelBooking(booking._id)}
                        className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserBookingPage;
