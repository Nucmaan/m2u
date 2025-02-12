"use client";

import userAuth from "@/myStore/UserAuth";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";

export default function AddContractPage() {
  const [confirmedBookings, setConfirmedBookings] = useState([]);
  const [bookingId, setBookingId] = useState("");
  const [userId, setUserId] = useState("");
  const ownerId = userAuth((state) => state.user);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [monthlyRent, setMonthlyRent] = useState("");
  const [deposit, setDeposit] = useState("");
  const [termsAndConditions, setTermsAndConditions] = useState("");
  const [PropertyId, setPropertyId] = useState("");
  const router = useRouter();
  const [houseStatus, setHouseStatus] = useState("Available");

  const fetchConfirmedBookings = useCallback(async () => {
    try {
      const response = await axios.get(`/api/booking/ownerBooking/${ownerId._id}`);
      const completedBookings = response.data.bookings.filter(
        (booking) => booking.status === "completed"
      );
      setConfirmedBookings(completedBookings);
    } catch (error) {
      console.error("Error fetching confirmed bookings:", error);
    }
  }, [ownerId._id]);

  useEffect(() => {
    if (ownerId?._id) {
      fetchConfirmedBookings();
    }
  }, [ownerId._id, fetchConfirmedBookings]);

  const handleBookingSelection = (selectedBookingId) => {
    const selectedBooking = confirmedBookings.find(
      (booking) => booking._id === selectedBookingId
    );
    if (selectedBooking) {
      setBookingId(selectedBooking._id);
      setPropertyId(selectedBooking.listing._id);
      setUserId(selectedBooking.user._id);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!bookingId || !startDate || !endDate || !monthlyRent || !deposit) {
      toast.error("All fields are required!");
      return;
    }

    const contractData = {
      bookingId,
      propertyId: PropertyId,
      userId,
      ownerId: ownerId._id,
      startDate,
      endDate,
      monthlyRent,
      deposit,
      termsAndConditions,
      houseStatus,
    };

    try {
      const response = await axios.post("/api/contracts/addcontract", contractData);
      if (response.status === 201) {
        toast.success(response.data.message);
        router.push("/agent/contract");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error adding contract:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  
    return (
      <div className="p-8 bg-[#F7F7F9] min-h-screen flex flex-col items-center">
        <h1 className="text-3xl font-bold text-[#1A3B5D] mb-6">Add Contract</h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white w-full max-w-2xl p-8 rounded-2xl shadow-lg space-y-6 border border-[#E0E0E0]"
        >
          {/* Select Booking */}
          <div>
            <label htmlFor="booking" className="block text-sm font-semibold text-[#333333] mb-2">
              Select Booking (Confirmed)
            </label>
            <select
              id="booking"
              value={bookingId}
              onChange={(e) => handleBookingSelection(e.target.value)}
              className="w-full px-4 py-2 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4C8492] bg-white"
            >
              <option value="" disabled>-- Select a Booking --</option>
              {confirmedBookings.map((booking) => (
                <option key={booking._id} value={booking._id}>
                  {`${booking.user.email} (${booking.listing.title})`}
                </option>
              ))}
            </select>
          </div>
  
          {/* Date Range Row */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label htmlFor="startDate" className="block text-sm font-semibold text-[#333333] mb-2">
                Start Date
              </label>
              <input
                type="date"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-4 py-2 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4C8492] bg-white"
              />
            </div>
            <div className="flex-1">
              <label htmlFor="endDate" className="block text-sm font-semibold text-[#333333] mb-2">
                End Date
              </label>
              <input
                type="date"
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-4 py-2 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4C8492] bg-white"
              />
            </div>
          </div>
  
          {/* Payment Details Row */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label htmlFor="monthlyRent" className="block text-sm font-semibold text-[#333333] mb-2">
                Monthly Rent
              </label>
              <input
                type="number"
                id="monthlyRent"
                value={monthlyRent}
                onChange={(e) => setMonthlyRent(e.target.value)}
                className="w-full px-4 py-2 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4C8492] bg-white"
              />
            </div>
            <div className="flex-1">
              <label htmlFor="deposit" className="block text-sm font-semibold text-[#333333] mb-2">
                Deposit
              </label>
              <input
                type="number"
                id="deposit"
                value={deposit}
                onChange={(e) => setDeposit(e.target.value)}
                className="w-full px-4 py-2 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4C8492] bg-white"
              />
            </div>
          </div>
  
          {/* Terms and Conditions */}
          <div>
            <label htmlFor="termsAndConditions" className="block text-sm font-semibold text-[#333333] mb-2">
              Terms and Conditions
            </label>
            <textarea
              id="termsAndConditions"
              value={termsAndConditions}
              onChange={(e) => setTermsAndConditions(e.target.value)}
              className="w-full px-4 py-2 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4C8492] bg-white h-32"
              placeholder="Enter contract terms..."
            />
          </div>
  
          {/* House Status */}
          <div>
            <label htmlFor="status" className="block text-sm font-semibold text-[#333333] mb-2">
              House Status
            </label>
            <select
              id="status"
              value={houseStatus}
              onChange={(e) => setHouseStatus(e.target.value)}
              className="w-full px-4 py-2 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4C8492] bg-white"
            >
              <option value="Available">Available</option>
              <option value="Sold">Sold</option>
              <option value="Rented">Rented</option>
            </select>
          </div>
  
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#F47C48] text-white px-5 py-3 rounded-xl hover:bg-[#E76430] transition font-semibold text-lg"
          >
            Add Contract
          </button>
        </form>
      </div>
    );

}
