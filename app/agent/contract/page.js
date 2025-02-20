"use client";

import RaadiLoading from "@/components/RaadiLoading";
import userAuth from "@/myStore/UserAuth";
import axios from "axios";
import moment from "moment";
import Link from "next/link";
import React, { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";

export default function ContractListPage() {
  const user = userAuth((state) => state.user);
  const [ownerContracts, setOwnerContracts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const getOwnerContracts = useCallback(async () => {
    if (!user || !user._id) return;
    setLoading(true);
    try {
      const response = await axios.get(`/api/contracts/ownercontract/${user._id}`);
      setOwnerContracts(response.status === 404 ? [] : response.data.contracts);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch contracts.");
    } finally {
      setLoading(false);
    }
  }, [user]);

  const deleteContract = async (contractId) => {
    try {
      const response = await axios.delete(`/api/contracts/${contractId}`);
      if (response.status === 200) {
        setOwnerContracts((prev) => prev.filter((contract) => contract._id !== contractId));
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete contract.");
    }
  };

  useEffect(() => {
    getOwnerContracts();
  }, [getOwnerContracts]);

  if (loading) return <RaadiLoading />;

  return (
    <div className="p-6 bg-[#F7F7F9] min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[#1A3B5D]">All Contracts</h1>
        <Link href="/agent/contract/addcontract">
          <button className="px-6 py-2 bg-[#F47C48] text-white font-semibold rounded-lg hover:bg-[#e86d3f] transition duration-200">
            Add Contract
          </button>
        </Link>
      </div>

      {/* Contract Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {ownerContracts.length > 0 ? (
          ownerContracts.map((contract) => (
            <div
              key={contract._id}
              className="relative bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition duration-300"
            >
              {/* Delete Button */}
              <button
                onClick={() => deleteContract(contract._id)}
                className="absolute top-4 right-4 bg-[#E74C3C] text-white text-sm px-3 py-1 rounded-full hover:bg-[#C0392B] transition duration-200"
                title="Delete Contract"
              >
                ✖
              </button>

              {/* Property Title */}
              <h2 className="text-xl font-semibold text-[#1A3B5D] mb-3">{contract.property.title}</h2>

              {/* Contract Details */}
              <div className="text-gray-700 text-sm space-y-2">
                <p><span className="font-medium">User Name :</span> {contract.user.username}</p>
                <p><span className="font-medium">Email:</span> {contract.user.email}</p>
                <p><span className="font-medium">Moile:</span> {contract.user.mobile}</p>

                <p>
                  <span className="font-medium">Contract Date:</span> {moment(contract.startDate).format("D MMM, YYYY")}
                </p>
                {contract.property.status === "Rented" && contract.endDate && (
                  <p>
                    <span className="font-medium">End Date:</span> {moment(contract.endDate).format("D MMM, YYYY")}
                  </p>
                )}
              </div>

              {/* Status Badge */}
              <p className="mt-4">
                <span
                  className={`inline-block px-4 py-1 text-sm font-medium rounded-full text-white ${
                    contract.status === "Active"
                      ? "bg-[#27AE60]"
                      : contract.status === "Pending"
                      ? "bg-[#F47C48]"
                      : contract.status === "Expired"
                      ? "bg-[#E67E22]"
                      : contract.status === "Terminated"
                      ? "bg-[#8E44AD]"
                      : contract.status === "Completed"
                      ? "bg-[#2C3E50]"
                      : "bg-[#E74C3C]"
                  }`}
                >
                  {contract.status}
                </span>
              </p>

              {/* Edit Button */}
              <Link href={`/agent/contract/${contract._id}`}>
                <button className="mt-6 w-full py-2 bg-[#4C8492] text-white font-semibold rounded-lg hover:bg-[#3b6d78] transition duration-200">
                  Edit Contract
                </button>
              </Link>
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-lg col-span-full ">No contracts available.</p>
        )}
      </div>
    </div>
  );
}
