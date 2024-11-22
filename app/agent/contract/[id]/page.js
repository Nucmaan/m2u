"use client";

import React, { useState } from "react";

export default function EditContractPage() {
  const [formData, setFormData] = useState({
    property: "Beachside Apartment", // Pre-filled with sample data
    user: "John Doe",
    startDate: "2024-11-01",
    endDate: "2025-11-01",
    monthlyRent: "1500",
    deposit: "3000",
    status: "Active",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Contract updated:\n${JSON.stringify(formData, null, 2)}`);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <h1 className="text-2xl font-bold text-[#1A3B5D] mb-6">Edit Contract</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-md p-6 rounded-lg shadow-md space-y-4"
      >
        {/* Property */}
        <div>
          <label
            htmlFor="property"
            className="block text-sm font-medium text-[#333333] mb-2"
          >
            Property
          </label>
          <input
            type="text"
            id="property"
            name="property"
            value={formData.property}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-[#E0E0E0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#4C8492]"
          />
        </div>

        {/* User */}
        <div>
          <label
            htmlFor="user"
            className="block text-sm font-medium text-[#333333] mb-2"
          >
            User
          </label>
          <input
            type="text"
            id="user"
            name="user"
            value={formData.user}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-[#E0E0E0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#4C8492]"
          />
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
            onChange={handleChange}
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
            onChange={handleChange}
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
            onChange={handleChange}
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
            onChange={handleChange}
            className="w-full px-4 py-2 border border-[#E0E0E0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#4C8492]"
          />
        </div>

        {/* Status */}
        <div>
          <label
            htmlFor="status"
            className="block text-sm font-medium text-[#333333] mb-2"
          >
            Status
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-[#E0E0E0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#4C8492]"
          >
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#F47C48] text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition"
        >
          Update Contract
        </button>
      </form>
    </div>
  );
}
