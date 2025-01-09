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
      <h1 className="text-3xl font-bold text-[#1A3B5D] mb-6">Agent Payments</h1>

      {loading ? (
        <div className="text-[#7A7A7A]">Loading payments...</div>
      ) : ownerPayments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ownerPayments.map((payment) => (
            <div
              key={payment._id}
              className="bg-white border border-[#E0E0E0] p-6 rounded-lg shadow hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold text-[#1A3B5D]">
                {payment.property.title}
              </h2>
              <p className="text-[#7A7A7A] mb-2">{payment.property.address}</p>
              <p className="text-[#333333] font-medium">
                Amount: <span className="font-bold">${payment.amount}</span>
              </p>
              <p className="text-[#333333]">
                Due Date:{" "}
                <span className="text-[#4C8492] font-medium">
                  {new Date(payment.dueDate).toLocaleDateString()}
                </span>
              </p>
              <p className="text-[#333333]">
                Status:{" "}
                <span
                  className={`${
                    payment.status === "Pending"
                      ? "text-[#E74C3C]"
                      : "text-[#27AE60]"
                  } font-bold`}
                >
                  {payment.status}
                </span>
              </p>
              <p className="text-[#7A7A7A] italic mt-2">
                Comment: {payment.comment}
              </p>
              <p className="text-sm text-[#7A7A7A] mt-2">
                Created: {new Date(payment.createdAt).toLocaleDateString()}
              </p>
              <button className="mt-4 bg-[#F47C48] text-white px-4 py-2 rounded-md hover:bg-[#E76036] transition">
                <Link href={`/agent/payments/${payment._id}`}>
                  Edit Payment
                </Link>
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-[#7A7A7A]">No payments found for this owner.</div>
      )}
    </div>
  );
}
