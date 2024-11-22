"use client";

import React, { useState } from "react";

export default function AddBillPage() {
  const [amount, setAmount] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [user, setUser] = useState("");
  const [comment, setComment] = useState("");  // New comment field
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!amount || !dueDate || !user || !comment) {
      setMessage("All fields are required.");
      return;
    }

    // Here you can send the bill details to your backend
    // For now, we'll just log it
    console.log("Bill details submitted:", { user, amount, dueDate, comment });

    setMessage("Bill added successfully!");

    // Reset form fields after submission
    setAmount("");
    setDueDate("");
    setUser("");
    setComment(""); // Reset comment field
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <h1 className="text-2xl font-bold text-[#1A3B5D] mb-6">Add Bill</h1>
      
      {/* Add Bill Form */}
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="user" className="block text-[#333333] font-medium">User</label>
            <input
              id="user"
              type="text"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              className="w-full px-4 py-2 border border-[#E0E0E0] rounded-md"
              placeholder="Enter user's name"
              required
            />
          </div>

          <div>
            <label htmlFor="amount" className="block text-[#333333] font-medium">Amount Due</label>
            <input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-2 border border-[#E0E0E0] rounded-md"
              placeholder="Enter amount"
              required
            />
          </div>

          <div>
            <label htmlFor="dueDate" className="block text-[#333333] font-medium">Due Date</label>
            <input
              id="dueDate"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-4 py-2 border border-[#E0E0E0] rounded-md"
              required
            />
          </div>

          {/* New Comment Field */}
          <div>
            <label htmlFor="comment" className="block text-[#333333] font-medium">Comment</label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full px-4 py-2 border border-[#E0E0E0] rounded-md"
              placeholder="Enter any comments or notes"
              rows="3"
            />
          </div>

          <div className="text-red-500">{message && <p>{message}</p>}</div>

          <button
            type="submit"
            className="w-full bg-[#F47C48] text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition"
          >
            Add Bill
          </button>
        </form>
      </div>
    </div>
  );
}
