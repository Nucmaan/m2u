"use client";

import React, { useState, useEffect } from "react";

const confirmedBookings = [
  { id: 1, property: "Beachside Apartment", user: "John Doe" },
  { id: 2, property: "Luxury Villa", user: "Jane Smith" },
]; // Sample data

export default function AddContractPage() {
  const [selectedBooking, setSelectedBooking] = useState("");
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    monthlyRent: "",
    deposit: "",
  });

  const handleBookingChange = (e) => {
    setSelectedBooking(e.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedBooking) {
      alert("Please select a booking.");
      return;
    }

    const contractData = {
      bookingId: selectedBooking,
      ...formData,
    };

    alert(`Contract Added:\n${JSON.stringify(contractData, null, 2)}`);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <h1 className="text-2xl font-bold text-[#1A3B5D] mb-6">Add Contract</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-md p-6 rounded-lg shadow-md space-y-4"
      >
        {/* Select Booking */}
        <div>
          <label
            htmlFor="booking"
            className="block text-sm font-medium text-[#333333] mb-2"
          >
            Select Booking (Confirmed)
          </label>
          <select
            id="booking"
            value={selectedBooking}
            onChange={handleBookingChange}
            className="w-full px-4 py-2 border border-[#E0E0E0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#4C8492]"
          >
            <option value="" disabled>
              -- Select a Booking --
            </option>
            {confirmedBookings.map((booking) => (
              <option key={booking.id} value={booking.id}>
                {`${booking.property} - ${booking.user}`}
              </option>
            ))}
          </select>
        </div>

        {/* Start Date */}
        <div>
          <label
            htmlFor="startDate"
            className="block text-sm font-medium text-[#333333] mb-2"
          >
            Start Date
          </label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-[#E0E0E0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#4C8492]"
          />
        </div>

        {/* End Date */}
        <div>
          <label
            htmlFor="endDate"
            className="block text-sm font-medium text-[#333333] mb-2"
          >
            End Date
          </label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={formData.endDate}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-[#E0E0E0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#4C8492]"
          />
        </div>

        {/* Monthly Rent */}
        <div>
          <label
            htmlFor="monthlyRent"
            className="block text-sm font-medium text-[#333333] mb-2"
          >
            Monthly Rent
          </label>
          <input
            type="number"
            id="monthlyRent"
            name="monthlyRent"
            value={formData.monthlyRent}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-[#E0E0E0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#4C8492]"
          />
        </div>

        {/* Deposit */}
        <div>
          <label
            htmlFor="deposit"
            className="block text-sm font-medium text-[#333333] mb-2"
          >
            Deposit
          </label>
          <input
            type="number"
            id="deposit"
            name="deposit"
            value={formData.deposit}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-[#E0E0E0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#4C8492]"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#F47C48] text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition"
        >
          Add Contract
        </button>
      </form>
    </div>
  );
}
