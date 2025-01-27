"use client";

import userAuth from "@/myStore/UserAuth";
import axios from "axios";
import moment from "moment";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function ContractListPage() {
  const user = userAuth((state) => state.user);
  const [ownerContracts, setOwnerContracts] = useState([]);

  const getOwnerContracts = async () => {
    try {
      const response = await axios.get(`/api/contracts/ownercontract/${user._id}`);
      setOwnerContracts(response.data.contracts);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch contracts. Please try again.");
    }
  };

  const deleteContract = async (contractId) => {
    try {
      const response = await axios.delete(`/api/contracts/${contractId}`);
      setOwnerContracts(ownerContracts.filter((contract) => contract._id !== contractId));

      if (response.status === 200) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete contract.");
    }
  };

  useEffect(() => {
    if (user && user._id) {
      getOwnerContracts();
    }
  }, [user._id]);

  return (
    <div className="p-6 bg-[#F7F7F9] min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[#1A3B5D]">All Contracts</h1>
        <button className="px-6 py-2 bg-[#F47C48] text-white font-semibold rounded-lg hover:bg-[#e86d3f] transition duration-200">
          <Link href="/agent/contract/addcontract">Add Contract</Link>
        </button>
      </div>

      {/* Contract Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {ownerContracts.length > 0 ? (
          ownerContracts.map((contract) => (
            <div
              key={contract._id}
              className="bg-white rounded-lg shadow-lg border border-[#E0E0E0] p-6 hover:shadow-xl transition duration-300 relative"
            >
              {/* Delete Button */}
              <button
                onClick={() => deleteContract(contract._id)}
                className="absolute top-4 right-4 bg-[#E74C3C] text-white text-sm px-2 py-1 rounded-full hover:bg-[#C0392B] transition duration-200"
                title="Delete Contract"
              >
                &times;
              </button>

              {/* Contract Details */}
              <h2 className="text-xl font-bold text-[#1A3B5D] mb-4">
                {contract.property.title}
              </h2>
              <p className="text-sm text-[#7A7A7A] mb-2">
                <span className="font-medium">User:</span> {contract.user.username}
              </p>
              <p className="text-sm text-[#7A7A7A] mb-2">
                <span className="font-medium">Email:</span> {contract.user.email}
              </p>
              <p className="text-sm text-[#7A7A7A] mb-2">
                <span className="font-medium">Start Date:</span>{" "}
                {moment(contract.startDate).format("D MMMM, YYYY")}
              </p>
              <p className="text-sm text-[#7A7A7A] mb-4">
                <span className="font-medium">End Date:</span>{" "}
                {moment(contract.endDate).format("D MMMM, YYYY")}
              </p>

              {/* Status Badge */}
              <p className="mt-2">
                <span
                  className={`inline-block px-4 py-1 text-sm font-medium rounded-full text-white ${
                    contract.status === "Active"
                      ? "bg-[#27AE60]" // Success Green
                      : contract.status === "Pending"
                      ? "bg-[#F47C48]" // Accent Color
                      : "bg-[#E74C3C]" // Warning Red
                  }`}
                >
                  {contract.status}
                </span>
              </p>

              {/* Edit Contract Button */}
              <button className="mt-6 w-full py-2 bg-[#4C8492] text-white font-semibold rounded-lg hover:bg-[#3b6d78] transition duration-200">
                <Link href={`/agent/contract/${contract._id}`}>Edit Contract</Link>
              </button>
            </div>
          ))
        ) : (
          <p className="text-[#7A7A7A] text-lg text-center col-span-full">
            No contracts available.
          </p>
        )}
      </div>
    </div>
  );
}