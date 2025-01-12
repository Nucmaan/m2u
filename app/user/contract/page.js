"use client";

import userAuth from "@/myStore/UserAuth";
import axios from "axios";
import React, { useEffect, useState } from "react";

function ContractPage() {
  const [userContracts, setUserContracts] = useState([]);
  const user = userAuth((state) => state.user);

  const getOwnerContracts = async () => {
    try {
      const response = await axios.get(`/api/contracts/usercontract/${user._id}`);
      setUserContracts(response.data.contracts);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (user && user._id) {
      getOwnerContracts();
    }
  }, [user._id]);

  return (
    <div className="p-6 md:p-12 bg-[#F7F7F9] min-h-screen">
      <h1 className="text-3xl font-extrabold text-[#1A3B5D] mb-6">Your Contracts</h1>

      <div className="space-y-8">
        {userContracts.map((contract) => (
          <div
            key={contract._id}
            className="bg-white shadow-lg rounded-lg p-6 md:flex md:justify-between md:items-center hover:shadow-xl transition-shadow duration-300"
          >
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-[#1A3B5D]">{contract.property.title}</h3>
              <p className="text-sm text-gray-600">
                Contract Period:{" "}
                <span className="font-medium text-[#1A3B5D]">
                  {new Date(contract.startDate).toDateString()} - {new Date(contract.endDate).toDateString()}
                </span>
              </p>
              <p className="text-sm text-gray-600">
                Monthly Rent:{" "}
                <span className="font-medium text-[#1A3B5D]">${contract.monthlyRent}</span>
              </p>
              <p className="text-sm text-gray-600">
                Deposit:{" "}
                <span className="font-medium text-[#1A3B5D]">${contract.deposit}</span>
              </p>

              <div className="text-sm text-gray-700 mt-4">
                <p><strong>Owner:</strong> {contract.owner.username}</p>
                <p>
                  <strong>Phone:</strong>{" "}
                  <a
                    href={`tel:${contract.owner.phone || "N/A"}`}
                    className="text-blue-600 hover:underline"
                  >
                    {contract.owner.phone || "Not Available"}
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

            <div className="mt-4 md:mt-0 flex items-center space-x-4">
              <div
                className={`px-4 py-2 text-sm font-medium rounded-full ${
                  contract.status === "Active"
                    ? "bg-green-100 text-green-700"
                    : contract.status === "Pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : contract.status === "Completed"
                    ? "bg-blue-100 text-blue-700"
                    : contract.status === "Cancelled"
                    ? "bg-red-100 text-red-700"
                    : contract.status === "Expired"
                    ? "bg-gray-100 text-gray-700"
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
