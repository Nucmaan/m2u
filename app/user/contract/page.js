"use client";

import RaadiLoading from "@/components/RaadiLoading";
import userAuth from "@/myStore/UserAuth";
import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";

function ContractPage() {
  const [userContracts, setUserContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = userAuth((state) => state.user);

  const getOwnerContracts = useCallback(async () => {
    if (!user || !user._id) return;
    try {
      const response = await axios.get(
        `/api/contracts/usercontract/${user._id}`
      );
     // console.log("API Response:", response.data); // Debugging
      setUserContracts(response.data.contracts);
    } catch (error) {
      //console.error(error);
      setUserContracts([]); // Handle errors
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    getOwnerContracts();
  }, [getOwnerContracts]);

  return (
    <div className="p-6 md:p-12 bg-[#F7F7F9] min-h-screen">
      <h1 className="text-3xl font-extrabold text-[#1A3B5D] mb-8">
        Your Contracts
      </h1>

      {loading ? (
        <RaadiLoading />
      ) : userContracts.length === 0 ? (
        <p className="text-lg text-[#7A7A7A]">
          You don&apos;t have any contracts.
        </p>
      ) : (
        <div className="space-y-6">
          {userContracts.map((contract) => {
            const {
              property,
              startDate,
              endDate,
              monthlyRent,
              deposit,
              status,
              owner,
            } = contract;

            return (
              <div
                key={contract._id}
                className="bg-white rounded-lg shadow-md border border-[#E0E0E0] p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-[#1A3B5D]">
                    {property.title}
                  </h3>

                  {/* ✅ Contract Period (Always Show) */}

                  <p className="text-sm text-[#7A7A7A]">
                    Contract Period:{" "}
                    <span className="font-medium text-[#1A3B5D]">
                      {contract.property.status === "Sold"
                        ? new Date(contract.startDate).toDateString()
                        : `${new Date(
                            contract.startDate
                          ).toDateString()} - ${new Date(
                            contract.endDate
                          ).toDateString()}`}
                    </span>
                  </p>

                  {/* ✅ If it's a "Buy" contract, show only Price & Owner */}
                  {property.houseType === "Buy" ? (
                    <>
                      <p className="text-sm text-[#7A7A7A]">
                        Price:{" "}
                        <span className="font-medium text-[#1A3B5D]">
                          ${property.price}
                        </span>
                      </p>
                      <p className="text-sm text-[#7A7A7A]">
                        Status :{" "}
                        <span className="font-medium text-[#1A3B5D]">
                          {property.status}
                        </span>
                      </p>
                    </>
                  ) : (
                    <>
                      {/* ✅ If it's "Rent", show full details */}
                      <p className="text-sm text-[#7A7A7A]">
                        Monthly Rent:{" "}
                        <span className="font-medium text-[#1A3B5D]">
                          ${monthlyRent}
                        </span>
                      </p>
                      <p className="text-sm text-[#7A7A7A]">
                        Deposit:{" "}
                        <span className="font-medium text-[#1A3B5D]">
                          ${deposit}
                        </span>
                      </p>
                    </>
                  )}

                  {/* ✅ Owner Information (Always Show) */}
                  <div className="text-sm text-[#7A7A7A] mt-4">
                    <p>
                      <strong>Owner:</strong> {owner?.username || "N/A"}
                    </p>
                    <p>
                      <strong>Phone:</strong> {owner?.mobile || "N/A"}
                    </p>
                    <p>
                      <strong>Email:</strong>{" "}
                      <a
                        href={`mailto:${owner.email || "N/A"}`}
                        className="text-[#4C8492] hover:underline"
                      >
                        {owner.email || "N/A"}
                      </a>
                    </p>
                  </div>
                </div>

                {/* ✅ Status Badge (Always Show) */}
                <div className="mt-6 flex items-center space-x-4">
                  <div
                    className={`px-4 py-2 text-sm font-medium rounded-full ${
                      status === "Active"
                        ? "bg-[#27AE60] text-white"
                        : status === "Pending"
                        ? "bg-[#F47C48] text-white"
                        : status === "Completed"
                        ? "bg-[#4C8492] text-white"
                        : status === "Cancelled"
                        ? "bg-[#E74C3C] text-white"
                        : status === "Expired"
                        ? "bg-[#7A7A7A] text-white"
                        : "bg-[#E0E0E0] text-[#333333]"
                    }`}
                  >
                    {status}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ContractPage;
