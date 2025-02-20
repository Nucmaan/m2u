"use client";

import RaadiLoading from "@/components/RaadiLoading";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";

export default function EditContractPage() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [monthlyRent, setMonthlyRent] = useState("");
  const [deposit, setDeposit] = useState("");
  const [status, setStatus] = useState("Pending");
  const [houseStatus, setHouseStatus] = useState("Available");
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const fetchContract = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/contracts/${id}`);
      const contract = response.data.existingContract;
      setStartDate(contract?.startDate.split("T")[0]);
      setEndDate(contract.endDate ? contract.endDate.split("T")[0] : "");
      setMonthlyRent(contract?.monthlyRent || 0);
      setDeposit(contract?.deposit || 0);
      setStatus(contract.status);
      setHouseStatus(contract.property.status);
    } catch (error) {
      console.error("Error fetching contract:", error);
      toast.error("Failed to fetch contract details. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchContract();
  }, [fetchContract]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/api/contracts/${id}`, {
        startDate,
        endDate,
        monthlyRent,
        deposit,
        status,
      });

      toast.success(response.data.message);
      router.push("/agent/contract");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to update contract. Please try again."
      );
    }
  };

  if (loading) {
    return <RaadiLoading />;
  }

  return (
    <div className="p-6 bg-[#F7F7F9] min-h-screen flex flex-col items-center">
      {/* Heading */}

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full  p-8 rounded-lg shadow-lg border border-[#E0E0E0] space-y-4"
      >
        {houseStatus === "Sold" ? (
          <>
            <div>
              <label
                htmlFor="startDate"
                className="block text-sm font-semibold text-[#1A3B5D] mb-2"
              >
                contract Date
              </label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-4 py-2 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F47C48] text-[#333333]"
              />
            </div>


            {/* Monthly Rent */}
            <div>
              <label
                htmlFor="monthlyRent"
                className="block text-sm font-semibold text-[#1A3B5D] mb-2"
              >
              Price ($)
              </label>
              <input
                type="number"
                id="monthlyRent"
                name="monthlyRent"
                value={monthlyRent}
                onChange={(e) => setMonthlyRent(e.target.value)}
                className="w-full px-4 py-2 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F47C48] text-[#333333]"
              />
            </div>

            {/* Status */}
            <div>
              <label
                htmlFor="status"
                className="block text-sm font-semibold text-[#1A3B5D] mb-2"
              >
                Status
              </label>
              <select
                id="status"
                name="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-4 py-2 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F47C48] text-[#333333]"
              >
                <option value="Pending">Pending</option>
                <option value="Active">Active</option>
                <option value="Expired">Expired</option>
                <option value="Terminated">Terminated</option>
                <option value="Completed">Deal Done</option>
              </select>
            </div>
          </>
        ) : (
          <>
            {/* Start Date */}
            <div>
              <label
                htmlFor="startDate"
                className="block text-sm font-semibold text-[#1A3B5D] mb-2"
              >
                Start Date
              </label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-4 py-2 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F47C48] text-[#333333]"
              />
            </div>

            {/* End Date */}
            <div>
              <label
                htmlFor="endDate"
                className="block text-sm font-semibold text-[#1A3B5D] mb-2"
              >
                End Date
              </label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-4 py-2 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F47C48] text-[#333333]"
              />
            </div>

            {/* Monthly Rent */}
            <div>
              <label
                htmlFor="monthlyRent"
                className="block text-sm font-semibold text-[#1A3B5D] mb-2"
              >
                Monthly Rent ($)
              </label>
              <input
                type="number"
                id="monthlyRent"
                name="monthlyRent"
                value={monthlyRent}
                onChange={(e) => setMonthlyRent(e.target.value)}
                className="w-full px-4 py-2 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F47C48] text-[#333333]"
              />
            </div>

            {/* Deposit */}
            <div>
              <label
                htmlFor="deposit"
                className="block text-sm font-semibold text-[#1A3B5D] mb-2"
              >
                Deposit ($)
              </label>
              <input
                type="number"
                id="deposit"
                name="deposit"
                value={deposit}
                onChange={(e) => setDeposit(e.target.value)}
                className="w-full px-4 py-2 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F47C48] text-[#333333]"
              />
            </div>

            {/* Status */}
            <div>
              <label
                htmlFor="status"
                className="block text-sm font-semibold text-[#1A3B5D] mb-2"
              >
                Status
              </label>
              <select
                id="status"
                name="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-4 py-2 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F47C48] text-[#333333]"
              >
                <option value="Pending">Pending</option>
                <option value="Active">Active</option>
                <option value="Expired">Expired</option>
                <option value="Terminated">Terminated</option>
                <option value="Completed">Deal Done</option>
              </select>
            </div>
          </>
        )}

        <button
          type="submit"
          className="w-full py-3 bg-[#1A3B5D] text-white font-semibold rounded-lg hover:bg-[#16324A] transition duration-200 focus:outline-none focus:ring-2 focus:ring-[#F47C48]"
        >
          Update Contract
        </button>
      </form>
    </div>
  );
}
