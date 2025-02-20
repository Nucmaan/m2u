"use client";

import RaadiLoading from "@/components/RaadiLoading";
import userAuth from "@/myStore/UserAuth";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Page() {
  
  const [ownerPayments, setOwnerPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const owner = userAuth((state) => state.user);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchOwnerPayments = async () => {
      try {
        const response = await axios.get("/api/bill");
        const filteredPayments = response.data.data.filter(
          (payment) => payment.owner?._id === owner?._id && payment.status === "Paid"
        );
        setOwnerPayments(filteredPayments);
      } catch (error) {
        setError(error.response.data.message);
      } finally {
        setLoading(false);
      }
    };

    if (owner && owner._id) {
      fetchOwnerPayments();
    }
  }, [owner]);

  return (
    <div className="p-6 bg-[#F7F7F9] min-h-screen">
      <div className="mx-auto">
        <h1 className="text-4xl font-bold text-[#1A3B5D] mb-8 ">
          Agent Invoice
        </h1>


        {loading ? (
          <RaadiLoading />
        ) : ownerPayments.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {ownerPayments.map((payment) => (
              <div
                key={payment._id}
                className="bg-white border border-[#E0E0E0] p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300"
              >
                <h2 className="text-2xl font-semibold text-[#1A3B5D] mb-2">
                  {payment.user.username}
                </h2>
                <p className="text-[#7A7A7A] mb-4">User Name : {payment.user.username}</p>

                <p className="text-[#7A7A7A] mb-4">User Email : {payment.user.email}</p>
                <p className="text-[#7A7A7A] mb-4">User Mobile : {payment.user.mobile}</p>

                <p className="text-[#333333] font-medium mb-2">
                  Amount:{" "}
                  <span className="font-bold text-[#F47C48]">
                    ${payment.amount}
                  </span>
                </p>
                <p className="text-[#333333] mb-2">
                  Payment Date:{" "}
                  <span className="text-[#4C8492] font-medium">
                    {new Date(payment.paymentDate).toLocaleDateString()}
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

                <Link href={`/agent/invoice/${payment._id}`}>
                  <button className="mt-6 w-full bg-[#F47C48] text-white px-4 py-2 rounded-md hover:bg-[#E76036] transition duration-200">
                    View Invoice
                  </button>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-[#7A7A7A] ">
            No Bills found for this owner.
          </div>
        )}
      </div>
    </div>
  );
}
