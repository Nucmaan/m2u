"use client";

import RaadiLoading from "@/components/RaadiLoading";
import userAuth from "@/myStore/UserAuth";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState, useCallback } from "react";

export default function BillPage() {
  const [userBill, setUserBill] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const user = userAuth((state) => state.user);

  const getOwnerContracts = useCallback(async () => {
    if (!user || !user._id) return;

    try {
      setLoading(true);
      const response = await axios.get(`/api/bill`);

const unpaidBill = response.data.data.filter(
  (bill) => 
    bill.status !== "Paid" && 
    bill.user && 
    bill.user._id === user._id // Ensure bill.user exists before accessing _id
);

setUserBill(unpaidBill);


    } catch (error) {
      console.error("Error fetching bills:", error.response ? error.response.data : error.message);
      setError("Failed to fetch bills. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    getOwnerContracts();
  }, [getOwnerContracts]);

  return (
    <div className="min-h-screen bg-[#F7F7F9] flex flex-col  py-12 px-6">
      <h1 className="text-3xl font-extrabold text-[#1A3B5D] mb-8">Manage Your Bills</h1>

      {loading ? (
       <RaadiLoading />
      ) : error ? (
        <div className="text-center">
          <p className="text-[#E74C3C] text-lg">{error}</p>
        </div>
      ) : userBill.length === 0 ? (
        <div className="">
          <p className="text-[#7A7A7A] text-lg">No unpaid bills found.</p>
        </div>
      ) : (
        <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {userBill.map((bill) => (
            <div
              key={bill._id}
              className="bg-white rounded-lg shadow-md border border-[#E0E0E0] p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-[#1A3B5D]">
                  {bill.property.title}
                </h2>
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

              <div className="space-y-4">
                <p className="text-sm text-[#7A7A7A]">
                  <strong>Address:</strong> {bill.property.address}
                </p>
                <p className="text-sm text-[#7A7A7A]">
                  <strong>Amount:</strong>{" "}
                  <span className="text-[#F47C48] font-semibold">${bill.amount}</span>
                </p>
                <p className="text-sm text-[#7A7A7A]">
                  <strong>Due Date:</strong>{" "}
                  <span className="text-[#4C8492]">
                    {new Date(bill.dueDate).toLocaleDateString()}
                  </span>
                </p>
              </div>

              <div className="mt-6">
                <Link
                  href={`/user/bills/${bill._id}`}
                  className="w-full block text-center bg-[#1A3B5D] text-white px-4 py-2 rounded-md hover:bg-[#16324A] transition-colors duration-200"
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
