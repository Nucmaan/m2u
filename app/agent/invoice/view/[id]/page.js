"use client";

import React, { useState, useEffect } from "react";

export default function InvoiceDetails({ invoiceId }) {
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Sample data for invoice (hardcoded)
  const sampleInvoice = {
    invoiceNumber: "INV123456",
    user: "John Doe",
    amount: 250.00,
    paymentType: "Credit Card",
    status: "Paid",
    dueDate: "2024-12-15",
    description: "Rent for the month of November 2024.",
  };

  // Simulate fetching data (replacing actual fetch/axios call)
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setInvoice(sampleInvoice);  // Assigning sample data after delay
      setLoading(false);
    }, 1000);  // Simulate network delay
  }, [invoiceId]); // Simulate effect on invoiceId change

  const handleDownload = () => {
    // Placeholder for download action (you can use a library to generate a PDF)
    alert("Invoice downloaded!");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-6">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!invoice) {
    return (
      <div className="text-center mt-6">
        <p>No invoice found.</p>
      </div>
    );
  }

  return (
    <div className="p-6" style={{ backgroundColor: "#F7F7F9" }}>
      <h1
        className="text-3xl font-semibold"
        style={{ color: "#1A3B5D", marginBottom: "24px" }}
      >
        Invoice Details
      </h1>

      <div
        className="bg-white rounded-lg shadow-lg p-6"
        style={{ border: "1px solid #E0E0E0" }}
      >
        {/* Invoice Number */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold" style={{ color: "#333333" }}>
            Invoice Number
          </h2>
          <p style={{ color: "#7A7A7A" }}>{invoice.invoiceNumber}</p>
        </div>

        {/* User */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold" style={{ color: "#333333" }}>
            User Name
          </h2>
          <p style={{ color: "#7A7A7A" }}>{invoice.user}</p>
        </div>

        {/* Amount */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold" style={{ color: "#333333" }}>
            Amount
          </h2>
          <p style={{ color: "#7A7A7A" }}>${invoice.amount}</p>
        </div>

        {/* Payment Type */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold" style={{ color: "#333333" }}>
            Payment Type
          </h2>
          <p style={{ color: "#7A7A7A" }}>{invoice.paymentType}</p>
        </div>

        {/* Status */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold" style={{ color: "#333333" }}>
            Status
          </h2>
          <p
            className={`text-lg font-semibold ${
              invoice.status === "Paid" ? "text-[#27AE60]" : "text-[#E74C3C]"
            }`}
          >
            {invoice.status}
          </p>
        </div>

        {/* Due Date */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold" style={{ color: "#333333" }}>
            Due Date
          </h2>
          <p style={{ color: "#7A7A7A" }}>{invoice.dueDate}</p>
        </div>

        {/* Description */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold" style={{ color: "#333333" }}>
            Description
          </h2>
          <p style={{ color: "#7A7A7A" }}>{invoice.description}</p>
        </div>

        {/* Download Button */}
        <div className="flex justify-end mt-6">
          <button
            onClick={handleDownload}
            className="px-6 py-2 rounded-lg"
            style={{
              backgroundColor: "#F47C48",  // Accent Color
              color: "white",
              transition: "background-color 0.3s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#D86F3A")}  // Hover effect
            onMouseOut={(e) => (e.target.style.backgroundColor = "#F47C48")}
          >
            Download Invoice
          </button>
        </div>
      </div>
    </div>
  );
}
