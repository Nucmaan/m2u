"use client";

import React from "react";

const AllInvoicesPage = () => {
  // Sample data for invoices
  const invoices = [
    {
      id: 1,
      property: "Luxury Apartment",
      type: "Rent",
      amount: 1200,
      date: "2024-11-01",
      invoiceNumber: "INV-001",
    },
    {
      id: 2,
      property: "Cozy Villa",
      type: "Buy",
      amount: 400000,
      date: "2024-10-15",
      invoiceNumber: "INV-002",
    },
    {
      id: 3,
      property: "Modern Townhouse",
      type: "Rent",
      amount: 1500,
      date: "2024-10-01",
      invoiceNumber: "INV-003",
    },
  ];

  // Function to handle downloading an invoice
  const handleDownload = (invoiceNumber) => {
    alert(`Downloading invoice: ${invoiceNumber}`);
    // Real download logic can be implemented here
  };

  return (
    <div className="p-4 md:p-8 bg-[#F7F7F9] min-h-screen">
      <h1 className="text-2xl font-bold text-[#1A3B5D] mb-6">All Invoices</h1>

      {/* Invoice List */}
      <div className="space-y-6">
        {invoices.map((invoice) => (
          <div
            key={invoice.id}
            className="bg-white shadow-md rounded-lg p-4 flex flex-col md:flex-row md:justify-between items-start md:items-center"
          >
            {/* Invoice Details */}
            <div>
              <h3 className="text-lg font-medium text-gray-800">
                {invoice.property}
              </h3>
              <p className="text-sm text-gray-500">Type: {invoice.type}</p>
              <p className="text-sm text-gray-500">Amount: ${invoice.amount}</p>
              <p className="text-sm text-gray-500">
                Payment Date: {new Date(invoice.date).toDateString()}
              </p>
              <p className="text-sm text-gray-500">
                Invoice Number: {invoice.invoiceNumber}
              </p>
            </div>

            {/* Download Button */}
            <button
              onClick={() => handleDownload(invoice.invoiceNumber)}
              className="mt-4 md:mt-0 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Download Invoice
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllInvoicesPage;
