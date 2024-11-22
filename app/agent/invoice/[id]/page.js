"use client";

import React, { useState } from "react";

export default function EditInvoice() {
  // Sample invoice data (you can replace with actual data from API or state)
  const [invoice, setInvoice] = useState({
    user: "John Doe",
    amount: 500,
    paymentType: "MasterCard",
    status: "Paid",
    dueDate: "2024-12-20",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInvoice({
      ...invoice,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Invoice updated successfully!");
    // You can make an API call here to update the invoice
  };

  return (
    <div className="p-6" style={{ backgroundColor: "#F7F7F9" }}>
      <h1
        className="text-3xl font-semibold"
        style={{ color: "#1A3B5D", marginBottom: "24px" }}
      >
        Edit Invoice
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-lg p-6"
        style={{ border: "1px solid #E0E0E0" }}
      >
        {/* User */}
        <div className="mb-4">
          <label
            htmlFor="user"
            className="block text-sm font-medium"
            style={{ color: "#333333" }}
          >
            User Name
          </label>
          <input
            type="text"
            id="user"
            name="user"
            value={invoice.user}
            onChange={handleChange}
            className="mt-2 p-2 w-full border border-[#E0E0E0] rounded-lg"
            style={{
              color: "#333333",
              backgroundColor: "#FFFFFF",
            }}
            disabled
          />
        </div>

        {/* Amount */}
        <div className="mb-4">
          <label
            htmlFor="amount"
            className="block text-sm font-medium"
            style={{ color: "#333333" }}
          >
            Amount
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={invoice.amount}
            onChange={handleChange}
            className="mt-2 p-2 w-full border border-[#E0E0E0] rounded-lg"
            style={{
              color: "#333333",
              backgroundColor: "#FFFFFF",
            }}
          />
        </div>

        {/* Payment Type */}
        <div className="mb-4">
          <label
            htmlFor="paymentType"
            className="block text-sm font-medium"
            style={{ color: "#333333" }}
          >
            Payment Type
          </label>
          <select
            id="paymentType"
            name="paymentType"
            value={invoice.paymentType}
            onChange={handleChange}
            className="mt-2 p-2 w-full border border-[#E0E0E0] rounded-lg"
            style={{
              color: "#333333",
              backgroundColor: "#FFFFFF",
            }}
          >
            <option value="MasterCard">MasterCard</option>
            <option value="Cash">Cash</option>
          </select>
        </div>

        {/* Status */}
        <div className="mb-4">
          <label
            htmlFor="status"
            className="block text-sm font-medium"
            style={{ color: "#333333" }}
          >
            Status
          </label>
          <select
            id="status"
            name="status"
            value={invoice.status}
            onChange={handleChange}
            className="mt-2 p-2 w-full border border-[#E0E0E0] rounded-lg"
            style={{
              color: "#333333",
              backgroundColor: "#FFFFFF",
            }}
          >
            <option value="Paid">Paid</option>
            <option value="Unpaid">Unpaid</option>
          </select>
        </div>

        {/* Due Date */}
        <div className="mb-4">
          <label
            htmlFor="dueDate"
            className="block text-sm font-medium"
            style={{ color: "#333333" }}
          >
            Due Date
          </label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={invoice.dueDate}
            onChange={handleChange}
            className="mt-2 p-2 w-full border border-[#E0E0E0] rounded-lg"
            style={{
              color: "#333333",
              backgroundColor: "#FFFFFF",
            }}
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 mt-4 rounded-lg"
            style={{
              backgroundColor: "#F47C48",  // Accent Color
              color: "white",
              transition: "background-color 0.3s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#D86F3A")}  // Hover effect
            onMouseOut={(e) => (e.target.style.backgroundColor = "#F47C48")}
          >
            Update Invoice
          </button>
        </div>
      </form>
    </div>
  );
}
