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

  const handleCancelBooking = async (id) => {
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
    <div className="p-6 md:p-8 bg-[#F7F7F9] min-h-screen">
      <h1 className="text-3xl font-bold text-[#1A3B5D] mb-6">My Bookings</h1>

      {["pending", "processing", "completed", "cancelled"].map((status) => (
        <div key={status} className="mb-8">
          <h2 className="text-2xl font-semibold text-[#1A3B5D] mb-4 capitalize">
            {status} Bookings
          </h2>
          <div className="space-y-6">
            {userBookings
              .filter((booking) => booking.status === status)
              .map((booking) => (
                <div
                  key={booking._id || "unknown-id"}
                  className="bg-white shadow-lg rounded-xl p-5 md:flex md:justify-between md:items-center transition-transform transform hover:scale-105 duration-300"
                >
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">
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

                  <div className="mt-4 md:mt-0 flex items-center space-x-4">
                    <div
                      className={`px-3 py-1 text-sm font-medium rounded-full ${
                        status === "pending"
                          ? "bg-yellow-200 text-yellow-800"
                          : status === "completed"
                          ? "bg-green-200 text-green-800"
                          : status === "processing"
                          ? "bg-blue-200 text-blue-800"
                          : "bg-red-200 text-red-800"
                      } transition-all duration-300`}
                    >
                      {status}
                    </div>

                    {status === "pending" && (
                      <button
                        onClick={() => handleCancelBooking(booking._id)}
                        className="px-5 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-all duration-300"
                      >
                        Cancel
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
