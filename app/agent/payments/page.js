"use client";

import userAuth from "@/myStore/UserAuth";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Page() {
  const [ownerPayments, setOwnerPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const owner = userAuth((state) => state.user);

  useEffect(() => {
    const fetchOwnerPayments = async () => {
      try {
        const response = await axios.get("/api/bill");
        const filteredPayments = response.data.data.filter(
          (payment) => payment.owner._id === owner._id
        );
        setOwnerPayments(filteredPayments);
      } catch (error) {
        console.error("Error fetching owner payments:", error);
      } finally {
        setLoading(false);
      }
    };

    if (owner && owner._id) {
      fetchOwnerPayments();
    }
  }, [owner]);

  return (
    <div className="min-h-screen bg-[#F7F7F9] p-6">
      {/* Heading */}
      <h1 className="text-3xl font-bold text-[#1A3B5D] mb-8">Agent Payments</h1>

      {/* Payment Cards */}
      {loading ? (
        <div className="text-center text-[#7A7A7A] font-medium">
          Loading payments...
        </div>
      ) : ownerPayments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ownerPayments.map((payment) => (
            <div
              key={payment._id}
              className="bg-white rounded-lg shadow-lg border border-[#E0E0E0] p-6 hover:shadow-xl transition duration-300"
            >
              {/* Property Title */}
              <h2 className="text-xl font-bold text-[#1A3B5D] mb-4">
                {payment.property.title}
              </h2>

              {/* Property Address */}
              <p className="text-sm text-[#7A7A7A] mb-2">
                {payment.property.address}
              </p>

              {/* Amount */}
              <p className="text-sm text-[#7A7A7A] mb-2">
                <span className="font-medium">Amount:</span>{" "}
                <span className="text-[#333333] font-semibold">
                  ${payment.amount}
                </span>
              </p>

              {/* Due Date */}
              <p className="text-sm text-[#7A7A7A] mb-2">
                <span className="font-medium">Due Date:</span>{" "}
                <span className="text-[#4C8492] font-medium">
                  {new Date(payment.dueDate).toLocaleDateString()}
                </span>
              </p>

              {/* Status */}
              <p className="text-sm text-[#7A7A7A] mb-2">
                <span className="font-medium">Status:</span>{" "}
                <span
                  className={`font-semibold ${
                    payment.status === "Pending"
                      ? "text-[#E74C3C]" // Warning Red
                      : "text-[#27AE60]" // Success Green
                  }`}
                >
                  {payment.status}
                </span>
              </p>

              {/* Comment */}
              <p className="text-sm text-[#7A7A7A] italic mb-2">
                <span className="font-medium">Comment:</span> {payment.comment}
              </p>

              {/* Created Date */}
              <p className="text-sm text-[#7A7A7A] mb-4">
                <span className="font-medium">Created:</span>{" "}
                {new Date(payment.createdAt).toLocaleDateString()}
              </p>

              {/* Edit Payment Button */}
              <button className="w-full py-2 bg-[#F47C48] text-white font-semibold rounded-lg hover:bg-[#e86d3f] transition duration-200">
                <Link href={`/agent/payments/${payment._id}`}>Edit Payment</Link>
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-[#7A7A7A] font-medium">
          No payments found for this owner.
        </div>
      )}
    </div>
  );
}