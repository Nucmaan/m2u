"use client";

import userAuth from "@/myStore/UserAuth";
import axios from "axios";
import React, { useEffect, useState } from "react";

function ContractPage() {
  const [userContracts, setUserContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = userAuth((state) => state.user);

  const getOwnerContracts = async () => {
    try {
      const response = await axios.get(`/api/contracts/usercontract/${user._id}`);
      setUserContracts(response.data.contracts);
    } catch (error) {
      console.error(error);
      setUserContracts([]); // Set empty array if error occurs (e.g., 404)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && user._id) {
      getOwnerContracts();
    }
  }, [user._id]);

  return (
    <div className="p-6 md:p-12 bg-[#F7F7F9] min-h-screen">
      <h1 className="text-3xl font-extrabold text-[#1A3B5D] mb-8">Your Contracts</h1>

      {loading ? (
        <p className="text-lg text-[#7A7A7A]">Loading...</p>
      ) : userContracts.length === 0 ? (
        <p className="text-lg text-[#7A7A7A]">You don't have any contracts.</p>
      ) : (
        <div className="space-y-6">
          {userContracts.map((contract) => (
            <div
              key={contract._id}
              className="bg-white rounded-lg shadow-md border border-[#E0E0E0] p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-[#1A3B5D]">{contract.property.title}</h3>
                <p className="text-sm text-[#7A7A7A]">
                  Contract Period:{" "}
                  <span className="font-medium text-[#1A3B5D]">
                    {new Date(contract.startDate).toDateString()} - {new Date(contract.endDate).toDateString()}
                  </span>
                </p>
                <p className="text-sm text-[#7A7A7A]">
                  Monthly Rent: <span className="font-medium text-[#1A3B5D]">${contract.monthlyRent}</span>
                </p>
                <p className="text-sm text-[#7A7A7A]">
                  Deposit: <span className="font-medium text-[#1A3B5D]">${contract.deposit}</span>
                </p>

                <div className="text-sm text-[#7A7A7A] mt-4">
                  <p><strong>Owner:</strong> {contract.owner.username}</p>
                  <p>
                    <strong>Phone:</strong>{" "}
                    <a href={`tel:${contract.owner.phone || "N/A"}`} className="text-[#4C8492] hover:underline">
                      {contract.owner.phone || "Not Available"}
                    </a>
                  </p>
                  <p>
                    <strong>Email:</strong>{" "}
                    <a href={`mailto:${contract.owner.email}`} className="text-[#4C8492] hover:underline">
                      {contract.owner.email}
                    </a>
                  </p>
                </div>
              </div>

              <div className="mt-6 flex items-center space-x-4">
                <div
                  className={`px-4 py-2 text-sm font-medium rounded-full ${
                    contract.status === "Active"
                      ? "bg-[#27AE60] text-white"
                      : contract.status === "Pending"
                      ? "bg-[#F47C48] text-white"
                      : contract.status === "Completed"
                      ? "bg-[#4C8492] text-white"
                      : contract.status === "Cancelled"
                      ? "bg-[#E74C3C] text-white"
                      : contract.status === "Expired"
                      ? "bg-[#7A7A7A] text-white"
                      : "bg-[#E0E0E0] text-[#333333]"
                  }`}
                >
                  {contract.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ContractPage;
