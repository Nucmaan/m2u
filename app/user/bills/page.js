"use client";

import userAuth from "@/myStore/UserAuth";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function BillPage() {
  const [userBill, setUserBill] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const user = userAuth((state) => state.user);

  const getOwnerContracts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/bill`);
      const unpaidBill = response.data.data.filter((bill) => bill.status !== "Paid");
      setUserBill(unpaidBill);
    } catch (error) {
      setError("Failed to fetch bills. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && user._id) {
      getOwnerContracts();
    }
  }, [user._id]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F7F7F9] to-[#E0E0E0] flex flex-col items-center py-10 px-4">
      <h1 className="text-3xl font-bold text-[#1A3B5D] mb-8">Manage Your Bills</h1>
      {loading ? (
        <div className="text-center">
          <p className="text-[#7A7A7A] text-lg">Loading your bills...</p>
        </div>
      ) : error ? (
        <div className="text-center">
          <p className="text-[#E74C3C] text-lg">{error}</p>
        </div>
      ) : userBill.length === 0 ? (
        <div className="text-center">
          <p className="text-[#7A7A7A] text-lg">No unpaid bills found.</p>
        </div>
      ) : (
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userBill.map((bill) => (
            <div
              key={bill._id}
              className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-[#1A3B5D]">
                  {bill.property.title}
                </h2>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    bill.status === "Overdue"
                      ? "bg-[#E74C3C] text-white"
                      : "bg-[#F47C48] text-white"
                  }`}
                >
                  {bill.status}
                </span>
              </div>
              <p className="text-[#7A7A7A] mb-2">
                <strong>Address:</strong> {bill.property.address}
              </p>
              <p className="text-[#333333] mb-2">
                <strong>Amount:</strong>{" "}
                <span className="text-[#F47C48] font-semibold">${bill.amount}</span>
              </p>
              <p className="text-[#333333] mb-4">
                <strong>Due Date:</strong>{" "}
                <span className="text-[#4C8492]">
                  {new Date(bill.dueDate).toLocaleDateString()}
                </span>
              </p>
              <button
                className="w-full bg-[#1A3B5D] text-white py-3 rounded-lg hover:bg-[#16324A] transition-all"
              >
                <Link href={`/user/bills/${bill._id}`} >Pay now</Link>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
