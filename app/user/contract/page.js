"use client"; // Add this to make the component interactive

import userAuth from "@/myStore/UserAuth";
import axios from "axios";
import React, { useEffect, useState } from "react";

function ContractPage() {
 
  const [userContracts, setUserContracts] = useState([]);
  const user = userAuth((state) => state.user);

  const getOwnerContracts = async () => {
    try {
      const response = await axios.get(
        `/api/contracts/usercontract/${user._id}`
      );
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
    <div className="p-4 md:p-8 bg-[#F7F7F9] min-h-screen">
      <h1 className="text-2xl font-bold text-[#1A3B5D] mb-4">All Contracts</h1>

      <div className="space-y-6">
        {userContracts.map((contract) => (
          <div
            key={contract._id}
            className="bg-white shadow-md rounded-lg p-4 md:flex md:justify-between md:items-center"
          >
            <div>
              <h3 className="text-lg font-medium text-gray-800">
                {contract.property.title}
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
                  <strong>Owner:</strong> {contract.owner.username}
                </p>
                <p>
                  <strong>Phone:</strong>{" "}
                  <a
                    href={`tel:${contract.owner.phone || "N/A"}`}
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
