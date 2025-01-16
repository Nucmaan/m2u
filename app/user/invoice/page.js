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
    <div className="p-6 md:p-12 bg-[#F7F7F9] min-h-screen">
      <h1 className="text-3xl font-extrabold text-[#1A3B5D] mb-8">All Invoices</h1>

      <div className="space-y-6">
        {ownerPayments.length === 0 ? (
          <div className="text-center">
            <p className="text-[#7A7A7A] text-lg">No invoices found.</p>
          </div>
        ) : (
          ownerPayments.map((invoice) => (
            <div
              key={invoice._id}
              className="bg-white rounded-lg shadow-md border border-[#E0E0E0] p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-[#1A3B5D]">
                    {invoice.property.title}
                  </h3>
                  <p className="text-sm text-[#7A7A7A]">
                    <strong>Address:</strong> {invoice.property.address}
                  </p>
                  <p className="text-sm text-[#7A7A7A]">
                    <strong>Amount:</strong>{" "}
                    <span className="text-[#F47C48] font-semibold">${invoice.amount}</span>
                  </p>
                  <p className="text-sm text-[#7A7A7A]">
                    <strong>Payment Date:</strong>{" "}
                    {new Date(invoice.paymentDate).toDateString()}
                  </p>
                  <p className="text-sm text-[#7A7A7A]">
                    <strong>Invoice Number:</strong> {invoice._id}
                  </p>
                </div>

                <Link
                  href={`/user/invoice/${invoice._id}`}
                  className="mt-6 md:mt-0 px-6 py-2 bg-[#1A3B5D] text-white rounded-md hover:bg-[#16324A] transition-colors duration-200 text-center"
                >
                  View Invoice
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AllInvoicesPage;