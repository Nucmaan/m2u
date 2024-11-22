"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";

// Sample contract data for demonstration
const contractData = [
  {
    id: 1,
    property: "Beachside Apartment",
    user: "John Doe",
    startDate: "2024-11-01",
    endDate: "2025-11-01",
    status: "Active",
  },
  {
    id: 2,
    property: "Luxury Villa",
    user: "Jane Smith",
    startDate: "2024-10-15",
    endDate: "2025-10-15",
    status: "Pending",
  },
];

export default function ContractListPage() {
  const [contracts, setContracts] = useState([]);

  useEffect(() => {
    // Simulate fetching contracts
    setContracts(contractData);
  }, []);

  const handleAddContract = () => {
    alert("Add Contract button clicked!");
  };

  const handleEditContract = (id) => {
    alert(`Edit contract ID: ${id}`);
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#333333]">All Contracts</h1>
        <button
          onClick={handleAddContract}
          className="px-4 py-2 bg-[#F47C48] text-white text-sm font-medium rounded-md hover:bg-opacity-90 transition"
        >
          <Link href={"/agent/contract/addcontract"}>Add Contract</Link>
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {contracts.map((contract) => (
          <div
            key={contract.id}
            className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between"
          >
            <div>
              <h2 className="text-lg font-semibold text-[#1A3B5D]">
                {contract.property}
              </h2>
              <p className="text-sm text-[#7A7A7A] mt-1">
                User: <span className="font-medium text-[#333333]">{contract.user}</span>
              </p>
              <p className="text-sm text-[#7A7A7A] mt-1">
                Start Date:{" "}
                <span className="font-medium text-[#333333]">{contract.startDate}</span>
              </p>
              <p className="text-sm text-[#7A7A7A] mt-1">
                End Date:{" "}
                <span className="font-medium text-[#333333]">{contract.endDate}</span>
              </p>
              <p className="text-sm mt-2">
                <span
                  className={`px-2 py-1 rounded text-white text-sm ${
                    contract.status === "Active"
                      ? "bg-[#27AE60]"
                      : contract.status === "Pending"
                      ? "bg-[#F47C48]"
                      : "bg-[#E74C3C]"
                  }`}
                >
                  {contract.status}
                </span>
              </p>
            </div>
            <div className="mt-4">
              <button
                onClick={() => handleEditContract(contract.id)}
                className="w-full px-3 py-2 bg-[#4C8492] text-white text-sm rounded hover:bg-opacity-90 transition"
              >
                <Link href={`/agent/contract/${contract.id}`}>Edit Contract</Link>
              </button>
            </div>
          </div>
        ))}
      </div>
      {contracts.length === 0 && (
        <p className="text-[#7A7A7A] text-center mt-4">No contracts available.</p>
      )}
    </div>
  );
}
