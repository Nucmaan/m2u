"use client";

import RaadiLoading from "@/components/RaadiLoading";
import userAuth from "@/myStore/UserAuth";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState, useCallback } from "react";
import { FiDollarSign, FiCalendar, FiUser, FiHome } from "react-icons/fi";

export default function BillPage() {
  const [ownerContracts, setOwnerContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const user = userAuth((state) => state.user);

  const getOwnerContracts = useCallback(async () => {
    if (!user || !user._id) return;

    try {
      const response = await axios.get(`/api/contracts/ownercontract/${user._id}`);
      const activeContracts = response.data.contracts
        .filter((contract) => contract.status === "Active" || contract.status === "Completed")
        .map((contract) => ({
          _id: contract._id,
          user: contract.user.username,
          email: contract.user.email,
          mobile: contract.user.mobile,
          property: contract.property.title,
          propertyStatus: contract.property.status, // Ensure status is included
          price : contract.property.price,
          startDate: new Date(contract.startDate).toLocaleDateString(),
          endDate: new Date(contract.endDate).toLocaleDateString(),
          monthlyRent: contract.monthlyRent,
          status: contract.status,
        }));

      setOwnerContracts(activeContracts);
    } catch (error) {
      setError(`Failed to fetch contracts. Please try again. ${error.message}`);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    getOwnerContracts();
  }, [getOwnerContracts]);

  return (
    <div className="min-h-screen bg-[#F7F7F9] flex flex-col py-10 px-4">
      <h1 className="text-3xl font-bold text-[#1A3B5D] mb-8">
        Manage Bills & Contracts
      </h1>

      <div className="w-full max-w-6xl">
        {loading ? (
          <RaadiLoading />
        ) : ownerContracts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ownerContracts.map((contract) => (
              <div
                key={contract._id}
                className="bg-white rounded-lg shadow-lg border border-[#E0E0E0] p-6 hover:shadow-xl transition duration-300"
              >
                <h3 className="text-xl font-bold text-[#1A3B5D] mb-4 flex items-center">
                  <FiHome className="mr-2 text-[#4C8492]" />
                  {contract.property}
                </h3>

                <p className="text-sm text-[#7A7A7A] flex items-center mb-2">
                  <FiUser className="mr-2 text-[#4C8492]" />
                  User Name : <span className="ml-1 text-[#333333]">{contract.user}</span>
                </p>

                <p className="text-sm text-[#7A7A7A] flex items-center mb-2">
                  <FiUser className="mr-2 text-[#4C8492]" />
                  User Email : <span className="ml-1 text-[#333333]">{contract.email}</span>
                </p>

                <p className="text-sm text-[#7A7A7A] flex items-center mb-2">
                  <FiUser className="mr-2 text-[#4C8492]" />
                  User Mobile : <span className="ml-1 text-[#333333]">{contract.mobile}</span>
                </p>

                <p className="text-sm text-[#7A7A7A] flex items-center mb-2">
                  <FiDollarSign className="mr-2 text-[#4C8492]" />
                  Price:{" "}
                  <span className="ml-1 text-[#333333] font-semibold">
                    ${contract.price}
                  </span>
                </p>

                <p className="text-sm text-[#7A7A7A] flex items-center mb-2">
                  <FiCalendar className="mr-2 text-[#4C8492]" />
                  Contract Date : <span className="ml-1">{contract.startDate}</span>
                </p>

                {/* End Date (only if property status is "Rented") */}
                {contract.propertyStatus === "Rented" && contract.endDate && (
                  <p className="text-sm text-[#7A7A7A] flex items-center mb-2">
                    <FiCalendar className="mr-2 text-[#4C8492]" />
                    Contract End Date : <span className="ml-1">{contract.endDate}</span>
                  </p>
                )}

                <p className="mt-2">
                  <span
                    className={`inline-block px-4 py-1 text-sm font-medium rounded-full text-white ${
                      contract.status === "Active"
                        ? "bg-[#27AE60]" // Success Green
                        : contract.status === "Completed"
                        ? "bg-[#1A3B5D]" // Primary Blue
                        : "bg-[#E74C3C]" // Warning Red
                    }`}
                  >
                    {contract.status}
                  </span>
                </p>

                <div className="mt-6">
                  <Link
                    href={`/agent/bills/addbill/${contract._id}`}
                    className="w-full py-2 bg-[#F47C48] text-white font-semibold rounded-lg hover:bg-[#e86d3f] transition duration-200 text-center block"
                  >
                    Add Money
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-[#7A7A7A] font-medium">
            No active contracts available.
          </div>
        )}
      </div>
    </div>
  );
}
