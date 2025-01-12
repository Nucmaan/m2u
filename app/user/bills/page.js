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
    <div className="min-h-screen bg-gradient-to-b from-[#F7F7F9] to-[#E0E0E0] flex flex-col items-center py-12 px-6">
      <h1 className="text-3xl font-extrabold text-[#1A3B5D] mb-8">Manage Your Bills</h1>

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
        <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {userBill.map((bill) => (
            <div
              key={bill._id}
              className="bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transition-shadow duration-300 ease-in-out"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-[#1A3B5D]">{bill.property.title}</h2>
                <span
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    bill.status === "Overdue"
                      ? "bg-[#E74C3C] text-white"
                      : "bg-[#F47C48] text-white"
                  }`}
                >
                  {bill.status}
                </span>
              </div>
              <p className="text-[#7A7A7A] mb-3">
                <strong>Address:</strong> {bill.property.address}
              </p>
              <p className="text-[#333333] mb-3">
                <strong>Amount:</strong>{" "}
                <span className="text-[#F47C48] font-semibold">${bill.amount}</span>
              </p>
              <p className="text-[#333333] mb-4">
                <strong>Due Date:</strong>{" "}
                <span className="text-[#4C8492]">
                  {new Date(bill.dueDate).toLocaleDateString()}
                </span>
              </p>
              <div className="flex justify-end">
                <Link
                  href={`/user/bills/${bill._id}`}
                  className="w-full bg-[#1A3B5D] text-white pl-2 py-3 rounded-lg hover:bg-[#16324A] transition-colors duration-200"
                >
                  Pay Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
