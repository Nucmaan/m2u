"use client";

import userAuth from "@/myStore/UserAuth";
import axios from "axios";
import moment from "moment";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function ContractListPage() {
  
  const [ownerContracts, setOwnerContracts] = useState([]);
  const user = userAuth((state) => state.user);

  const getOwnerContracts = async () => {
    try {
      const response = await axios.get(
        `/api/contracts/ownercontract/${user._id}`
      );
      setOwnerContracts(response.data.contracts);
    } catch (error) {
      console.error(error);
    }
  };
  

  const deleteContract = async (contractId) => {
    try {
      const response = await axios.delete(`/api/contracts/${contractId}`);
      setOwnerContracts(
        ownerContracts.filter((contract) => contract._id !== contractId)
      );

      if (response.status === 200) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (user && user._id) {
      getOwnerContracts();
    }
  }, [user._id]);

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#333333]">All Contracts</h1>
        <button className="px-4 py-2 bg-[#F47C48] text-white text-sm font-medium rounded-md hover:bg-opacity-90 transition">
          <Link href={"/agent/contract/addcontract"}>Add Contract</Link>
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {ownerContracts.map((contract) => (
          <div
            key={contract._id}
            className="relative bg-white rounded-lg shadow-md p-4 flex flex-col justify-between"
          >
            {/* Delete Button */}
            <button
              onClick={() => deleteContract(contract._id)}
              className="absolute top-2 right-2 bg-red-500 text-white text-sm rounded-full px-2 py-1 hover:bg-red-600 transition"
              title="Delete Contract"
            >
              Delete
            </button>

            <div>
              <h2 className="text-lg font-semibold text-[#1A3B5D]">
                {contract.property.title}
              </h2>
              <p className="text-sm text-[#7A7A7A] mt-1">
                User:{" "}
                <span className="font-medium text-[#333333]">
                  {contract.user.username}
                </span>
              </p>
              <p className="text-sm text-[#7A7A7A] mt-1">
                Email:{" "}
                <span className="font-medium text-[#333333]">
                  {contract.user.email}
                </span>
              </p>
              <p className="text-sm text-[#7A7A7A] mt-1">
                Start Date:{" "}
                <span className="font-medium text-[#333333]">
                  {moment(contract.startDate).format("D MMMM, YYYY")}
                </span>
              </p>
              <p className="text-sm text-[#7A7A7A] mt-1">
                End Date:{" "}
                <span className="font-medium text-[#333333]">
                  {moment(contract.endDate).format("D MMMM, YYYY")}
                </span>
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
              <button className="w-full px-3 py-2 bg-[#4C8492] text-white text-sm rounded hover:bg-opacity-90 transition">
                <Link href={`/agent/contract/${contract._id}`}>
                  Edit Contract
                </Link>
              </button>
            </div>
          </div>
        ))}
      </div>
      {ownerContracts.length === 0 && (
        <p className="text-[#7A7A7A] text-center mt-4">
          No contracts available.
        </p>
      )}
    </div>
  );
}
