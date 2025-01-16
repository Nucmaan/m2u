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
    <div className="p-6 md:p-12 bg-[#F7F7F9] min-h-screen">
      <h1 className="text-3xl font-extrabold text-[#1A3B5D] mb-8">My Bookings</h1>

      {["pending", "processing", "completed", "cancelled"].map((status) => (
        <div key={status} className="mb-8">
          <h2 className="text-2xl font-semibold text-[#1A3B5D] mb-6 capitalize">
            {status} Bookings
          </h2>
          <div className="space-y-6">
            {userBookings
              .filter((booking) => booking.status === status)
              .map((booking) => (
                <div
                  key={booking._id || "unknown-id"}
                  className="bg-white rounded-lg shadow-md border border-[#E0E0E0] p-6 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-[#1A3B5D]">
                      {booking.listing?.title || "Not Available"}
                    </h3>
                    <p className="text-sm text-[#7A7A7A]">
                      Visiting Date:{" "}
                      {booking.visitingDate
                        ? new Date(booking.visitingDate).toDateString()
                        : "Not Available"}
                    </p>
                    <div className="text-sm text-[#7A7A7A]">
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

                  <div className="mt-6 flex items-center justify-between">
                    <div
                      className={`px-4 py-2 text-sm font-medium rounded-full ${
                        status === "pending"
                          ? "bg-[#F47C48] text-white"
                          : status === "completed"
                          ? "bg-[#27AE60] text-white"
                          : status === "processing"
                          ? "bg-[#4C8492] text-white"
                          : "bg-[#E74C3C] text-white"
                      } transition-all duration-300`}
                    >
                      {status}
                    </div>

                    {status === "pending" && (
                      <button
                        onClick={() => handleCancelBooking(booking._id)}
                        className="px-5 py-2 text-sm font-medium text-white bg-[#E74C3C] rounded-md hover:bg-[#C0392B] transition-all duration-300"
                      >
                        Cancel Booking
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