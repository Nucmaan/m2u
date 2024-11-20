"use client"; // Add this to make the component interactive

import React from "react";

function ContractPage() {
  const contracts = [
    // Sample contract data for illustration
    {
      id: 1,
      property: "Luxury Apartment",
      startDate: "2024-01-01",
      endDate: "2025-01-01",
      monthlyRent: "$1,200",
      deposit: "$2,400",
      status: "Active",
      owner: {
        name: "John Doe",
        phone: "+123 456 7890",
        email: "john.doe@example.com",
      },
    },
    {
      id: 2,
      property: "Cozy Villa",
      startDate: "2023-05-01",
      endDate: "2024-05-01",
      monthlyRent: "$2,000",
      deposit: "$4,000",
      status: "Expired",
      owner: {
        name: "Jane Smith",
        phone: "+987 654 3210",
        email: "jane.smith@example.com",
      },
    },
  ];

  return (
    <div className="p-4 md:p-8 bg-[#F7F7F9] min-h-screen">
      <h1 className="text-2xl font-bold text-[#1A3B5D] mb-4">All Contracts</h1>

      {/* Loop through contract data */}
      <div className="space-y-6">
        {contracts.map((contract) => (
          <div
            key={contract.id}
            className="bg-white shadow-md rounded-lg p-4 md:flex md:justify-between md:items-center"
          >
            <div>
              <h3 className="text-lg font-medium text-gray-800">
                {contract.property}
              </h3>
              <p className="text-sm text-gray-500">
                Contract Period: {new Date(contract.startDate).toDateString()} -{" "}
                {new Date(contract.endDate).toDateString()}
              </p>
              <p className="text-sm text-gray-500">
                Monthly Rent: {contract.monthlyRent}
              </p>
              <p className="text-sm text-gray-500">Deposit: {contract.deposit}</p>
              <div className="mt-2 text-sm text-gray-700">
                <p>
                  <strong>Owner:</strong> {contract.owner.name}
                </p>
                <p>
                  <strong>Phone:</strong>{" "}
                  <a
                    href={`tel:${contract.owner.phone}`}
                    className="text-blue-600 hover:underline"
                  >
                    {contract.owner.phone}
                  </a>
                </p>
                <p>
                  <strong>Email:</strong>{" "}
                  <a
                    href={`mailto:${contract.owner.email}`}
                    className="text-blue-600 hover:underline"
                  >
                    {contract.owner.email}
                  </a>
                </p>
              </div>
            </div>
            <div className="mt-2 md:mt-0 flex items-center">
              <div
                className={`px-3 py-1 text-sm font-medium rounded-full ${
                  contract.status === "Active"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {contract.status}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ContractPage;
