"use client";

import userAuth from "@/myStore/UserAuth";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const AllInvoicesPage = () => {
  const [ownerPayments, setOwnerPayments] = useState([]);
  const user = userAuth((state) => state.user);

  useEffect(() => {
    const fetchOwnerPayments = async () => {
      try {
        const response = await axios.get("/api/bill");
        const filteredPayments = response.data.data.filter(
          (payment) =>
            payment.user._id === user._id && payment.status === "Paid"
        );
        setOwnerPayments(filteredPayments);
      } catch (error) {
        console.error("Error fetching user payments:", error);
      } 
    };

    if (user && user._id) {
      fetchOwnerPayments();
    }
  }, [user]);

  return (
    <div className="p-4 md:p-8 bg-[#F7F7F9] min-h-screen">
      <h1 className="text-2xl font-bold text-[#1A3B5D] mb-6">All Invoices</h1>

      <div className="space-y-6">
        {ownerPayments.map((invoice) => (
          <div
            key={invoice._id}
            className="bg-white shadow-md rounded-lg p-4 flex flex-col md:flex-row md:justify-between items-start md:items-center"
          >
            <div>
              <h3 className="text-lg font-medium text-gray-800">
                {invoice.property.title}
              </h3>
              <p className="text-sm text-gray-500">
              Address: {invoice.property.address}
              </p>
              <p className="text-sm text-gray-500">Amount: ${invoice.amount}</p>
              <p className="text-sm text-gray-500">
                Payment Date: {new Date(invoice.paymentDate).toDateString()}
              </p>
              <p className="text-sm text-gray-500">
                Invoice Number: {invoice._id}
              </p>
            </div>

            <button className="mt-4 md:mt-0 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
              <Link href={`/user/invoice/${invoice._id}`}>View Invoice</Link>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllInvoicesPage;
