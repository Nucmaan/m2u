"use client";

import Link from "next/link";
import React, { useState } from "react";

// Sample data with additional fields: paymentType, paid/unpaid status, dueDate
const invoicesData = [
  {
    id: 1,
    user: "John Doe",
    amount: 500,
    paymentType: "MasterCard",
    status: "Paid",
    invoiceDate: "2024-11-20",
    dueDate: "2024-12-20",
  },
  {
    id: 2,
    user: "Jane Smith",
    amount: 400,
    paymentType: "Cash",
    status: "Unpaid",
    invoiceDate: "2024-11-18",
    dueDate: "2024-12-18",
  },
];

export default function AgentInvoiceList() {
  const [invoices, setInvoices] = useState(invoicesData);

  const handleDownloadInvoice = (id) => {
    alert(`Downloading invoice for user ID: ${id}`);
  };

  const handleEditInvoice = (id) => {
    alert(`Editing invoice for user ID: ${id}`);
  };

  return (
    <div className="p-6" style={{ backgroundColor: "#F7F7F9" }}>
      <h1
        className="text-3xl font-semibold"
        style={{ color: "#1A3B5D", marginBottom: "24px" }}
      >
        Agent Invoice List
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {invoices.map((invoice) => (
          <div
            key={invoice.id}
            className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-300 ease-in-out"
            style={{ border: "1px solid #E0E0E0" }}
          >
            <h2
              className="text-xl font-semibold"
              style={{ color: "#333333", marginBottom: "16px" }}
            >
              {invoice.user}
            </h2>
            <div
              className="text-sm"
              style={{ color: "#7A7A7A", marginBottom: "4px" }}
            >
              Invoice Date: {invoice.invoiceDate}
            </div>
            <div
              className="text-sm"
              style={{ color: "#7A7A7A", marginBottom: "4px" }}
            >
              Due Date: {invoice.dueDate}
            </div>

            <div
              className="text-lg font-medium"
              style={{ color: "#333333", marginBottom: "16px" }}
            >
              Amount: ${invoice.amount}
            </div>

            <div className="flex justify-between items-center mb-4">
              <span
                className={`px-4 py-2 rounded-full text-white ${
                  invoice.status === "Paid"
                    ? "bg-[#27AE60]"  // Success Green for paid invoices
                    : invoice.status === "Unpaid"
                    ? "bg-[#E74C3C]"  // Warning Red for unpaid invoices
                    : "bg-gray-500"
                }`}
              >
                {invoice.status}
              </span>
              <span
                className={`px-4 py-2 rounded-full text-white ${
                  invoice.paymentType === "MasterCard"
                    ? "bg-[#4C8492]"  // Secondary Color for MasterCard
                    : "bg-[#F47C48]"  // Accent Color for Cash
                }`}
              >
                {invoice.paymentType}
              </span>
            </div>

            <div className="flex justify-between gap-4">
              {/* Edit Button */}
              <button
                onClick={() => handleEditInvoice(invoice.id)}
                className="px-4 py-2"
                style={{
                  backgroundColor: "#1A3B5D",  // Primary Color for Edit button
                  color: "white",
                  borderRadius: "8px",
                  transition: "background-color 0.3s",
                }}
                onMouseOver={(e) => (e.target.style.backgroundColor = "#16324A")}  // Button Hover color
                onMouseOut={(e) => (e.target.style.backgroundColor = "#1A3B5D")}
              >
                <Link href={`/agent/invoice/${invoice.id}`}>Edit</Link>
              </button>

              {/* Download Invoice Button */}
              <button
                onClick={() => handleDownloadInvoice(invoice.id)}
                className="px-4 py-2"
                style={{
                  backgroundColor: "#F47C48",  // Accent Color for Download button
                  color: "white",
                  borderRadius: "8px",
                  transition: "background-color 0.3s",
                }}
                onMouseOver={(e) => (e.target.style.backgroundColor = "#D86F3A")}  // Hover effect for Download button
                onMouseOut={(e) => (e.target.style.backgroundColor = "#F47C48")}
              >
                <Link href={`/agent/invoice/view/${invoice.id}`}>view Invoice</Link>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
