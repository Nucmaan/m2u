"use client";

import userAuth from "@/myStore/UserAuth";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FiDollarSign, FiCalendar, FiUser, FiHome } from "react-icons/fi";

export default function BillPage() {
  
  const [ownerContracts, setOwnerContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = userAuth((state) => state.user);
  

  const getOwnerContracts = async () => {
    try {
      const response = await axios.get(
        `/api/contracts/ownercontract/${user._id}`
      );
      const activeContracts = response.data.contracts
        .filter((contract) => contract.status === "Active")
        .map((contract) => ({
          _id: contract._id,
          user: contract.user.username,
          property: contract.property.title,
          startDate: new Date(contract.startDate).toLocaleDateString(),
          endDate: new Date(contract.endDate).toLocaleDateString(),
          monthlyRent: contract.monthlyRent,
          status: contract.status,
        }));
      setOwnerContracts(activeContracts);
    } catch (error) {
      console.error(error);
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
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 flex flex-col items-center py-10 px-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-10 text-center">
        Manage Bills & Contracts
      </h1>

      <div className="w-full max-w-6xl">
        {loading ? (
          <div className="text-center text-gray-600 font-medium">
            Loading active contracts...
          </div>
        ) : ownerContracts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ownerContracts.map((contract) => (
              <div
                key={contract._id}
                className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition transform hover:-translate-y-1"
              >
                <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center">
                  <FiHome className="mr-2 text-indigo-600" />
                  {contract.property}
                </h3>
                <p className="text-sm text-gray-500 flex items-center mb-2">
                  <FiUser className="mr-2 text-green-500" />
                  User: <span className="ml-1 text-gray-700">{contract.user}</span>
                </p>
                <p className="text-sm text-gray-500 flex items-center mb-2">
                  <FiDollarSign className="mr-2 text-yellow-500" />
                  Monthly Rent:{" "}
                  <span className="ml-1 text-gray-700 font-semibold">
                    ${contract.monthlyRent}
                  </span>
                </p>
                <p className="text-sm text-gray-500 flex items-center mb-2">
                  <FiCalendar className="mr-2 text-blue-500" />
                  Start: <span className="ml-1">{contract.startDate}</span>
                </p>
                <p className="text-sm text-gray-500 flex items-center mb-2">
                  <FiCalendar className="mr-2 text-red-500" />
                  End: <span className="ml-1">{contract.endDate}</span>
                </p>
                <p
                  className={`text-sm font-medium mt-3 ${
                    contract.status === "Active"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  Status: {contract.status}
                </p>
                <div className="mt-4">
                  <Link
                    href={`/agent/bills/addbill/${contract._id}`}
                    className="mt-4 bg-[#F47C48] text-white px-4 py-2 rounded-md hover:bg-[#D76A3A] transition"                  >
                    Add Money
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-600 font-medium">
            No active contracts available.
          </div>
        )}
      </div>
    </div>
  );
}
