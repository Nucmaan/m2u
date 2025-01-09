"use client";

import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function EditContractPage() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [monthlyRent, setMonthlyRent] = useState("");
  const [deposit, setDeposit] = useState("");
  const [status, setStatus] = useState("pending");
  const { id } = useParams();
  const router = useRouter();
  

  const fetchContract = async () => {
    try {
      const response = await axios.get(`/api/contracts/${id}`);
      setStartDate(response.data.existingContract.startDate.split("T")[0]);
      setEndDate(response.data.existingContract.endDate.split("T")[0]);
      setMonthlyRent(response.data.existingContract.monthlyRent);
      setDeposit(response.data.existingContract.deposit);
      setStatus(response.data.existingContract.status);
    } catch (error) {
      console.error("Error fetching contract:", error);
    }
  };

  useEffect(() => {
    fetchContract();
  }, []);

  const handleSubmit = async(e) => {
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
      setStartDate("");
      setEndDate("");
      setMonthlyRent("");
      setDeposit("");
      setStatus("pending");
      router.push("/agent/contract");
      
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="p-6 bg-[#F7F7F9] min-h-screen flex flex-col items-center">
      <h1 className="text-3xl font-bold text-[#1A3B5D] mb-8">Edit Contract</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-lg p-8 rounded-lg shadow-lg space-y-6"
      >
        {/* Start Date */}
        <div>
          <label
            htmlFor="startDate"
            className="block text-sm font-semibold text-[#333333] mb-1"
          >
            Start Date
          </label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full px-4 py-2 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4C8492] text-[#333333]"
          />
        </div>

        {/* End Date */}
        <div>
          <label
            htmlFor="endDate"
            className="block text-sm font-semibold text-[#333333] mb-1"
          >
            End Date
          </label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full px-4 py-2 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4C8492] text-[#333333]"
          />
        </div>

        {/* Monthly Rent */}
        <div>
          <label
            htmlFor="monthlyRent"
            className="block text-sm font-semibold text-[#333333] mb-1"
          >
            Monthly Rent ($)
          </label>
          <input
            type="number"
            id="monthlyRent"
            name="monthlyRent"
            value={monthlyRent}
            onChange={(e) => setMonthlyRent(e.target.value)}
            className="w-full px-4 py-2 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4C8492] text-[#333333]"
          />
        </div>

        {/* Deposit */}
        <div>
          <label
            htmlFor="deposit"
            className="block text-sm font-semibold text-[#333333] mb-1"
          >
            Deposit ($)
          </label>
          <input
            type="number"
            id="deposit"
            name="deposit"
            value={deposit}
            onChange={(e) => setDeposit(e.target.value)}
            className="w-full px-4 py-2 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4C8492] text-[#333333]"
          />
        </div>

        {/* Status */}
        <div>
          <label
            htmlFor="status"
            className="block text-sm font-semibold text-[#333333] mb-1"
          >
            Status
          </label>
          <select
            id="status"
            name="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-4 py-2 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4C8492] text-[#333333]"
          >
            <option value="Pending">Pending</option>
            <option value="Active">Active</option>
            <option value="Expired">Expired</option>
            <option value="Terminated">Terminated</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#F47C48] text-white px-4 py-3 rounded-lg text-lg font-semibold hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-[#F47C48] transition"
        >
          Update Contract
        </button>
      </form>
    </div>
  );
}
