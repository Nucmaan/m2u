"use client";

import Link from "next/link";
import React, { useState } from "react";

const contractData = [
  // Sample contract data with status "active"
  {
    id: 1,
    user: "John Doe",
    property: "Beachside Apartment",
    amountDue: 1200,
    dueDate: "2024-12-01",
    status: "Active",
  },
  {
    id: 2,
    user: "Jane Smith",
    property: "Luxury Villa",
    amountDue: 1500,
    dueDate: "2024-12-10",
    status: "Active",
  },
  {
    id: 3,
    user: "Emily Davis",
    property: "Mountain Retreat",
    amountDue: 950,
    dueDate: "2024-11-30",
    status: "Expired",
  },
];

export default function BillPage() {
  const [contracts, setContracts] = useState(contractData);

  const handleAddMoneyClick = (userId) => {
    alert(`Add money to user with contract ID: ${userId}`);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <h1 className="text-2xl font-bold text-[#1A3B5D] mb-6">User Contracts & Bill Management</h1>
      
      {/* Bill List */}
      <div className="bg-white w-full max-w-4xl p-6 rounded-lg shadow-md space-y-4">
        {contracts.filter(contract => contract.status === "Active").length > 0 ? (
          contracts
            .filter(contract => contract.status === "Active") // Filter only active contracts
            .map((contract) => (
              <div
                key={contract.id}
                className="flex justify-between items-center bg-gray-50 p-4 rounded-lg mb-4 shadow-sm hover:bg-gray-100 transition"
              >
                <div className="text-[#333333] font-medium">
                  <p>{contract.user}</p>
                  <p className="text-sm text-secondary-text">{contract.property}</p>
                </div>
                <div className="text-[#1A3B5D] font-semibold">${contract.amountDue}</div>
                <div className="text-sm text-secondary-text">{contract.dueDate}</div>

                {/* Add Money Button */}
                <button
                  onClick={() => handleAddMoneyClick(contract.id)}
                  className="ml-4 bg-[#F47C48] text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition"
                >
                  <Link href={`/agent/bills/addbill`}>Add Money</Link>
                </button>
              </div>
            ))
        ) : (
          <p className="text-secondary-text">No active contracts available.</p>
        )}
      </div>
    </div>
  );
}
