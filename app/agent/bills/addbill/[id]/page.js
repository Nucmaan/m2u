"use client";

import userAuth from "@/myStore/UserAuth";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function AddBillPage() {
  const [amount, setAmount] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [user, setUser] = useState("");
  const [comment, setComment] = useState("");
  const [property, setProperty] = useState("");

  const owner = userAuth((state) => state.user);
  const { id } = useParams();
  const router = useRouter();

  const fetchContract = async () => {
    try {
      const response = await axios.get(`/api/contracts/${id}`);
      setUser(response.data.existingContract.user);
      setProperty(response.data.existingContract.property);
    } catch (error) {
      console.error("Error fetching contract:", error);
    }
  };

  useEffect(() => {
    fetchContract();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!amount || !dueDate || !user || !comment) {
      toast.error("All fields are required.");
      return;
    }
    setAmount("");
    setDueDate("");
    setUser("");
    setComment("");
    setProperty("");

    try {
      const response = await axios.post(`/api/bill/addbill`, {
        user,
        owner: owner._id,
        property,
        amount,
        dueDate,
        comment,
      });

      if (response.status === 201) {
        toast.success(response.data.message);
        router.replace("/agent/bills");
        
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <h1 className="text-2xl font-bold text-[#1A3B5D] mb-6">Add Bill</h1>

      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="amount"
              className="block text-[#333333] font-medium"
            >
              Amount{" "}
            </label>
            <input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-2 border border-[#E0E0E0] rounded-md"
              placeholder="Enter amount"
              required
            />
          </div>

          <div>
            <label
              htmlFor="dueDate"
              className="block text-[#333333] font-medium"
            >
              Due Date
            </label>
            <input
              id="dueDate"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-4 py-2 border border-[#E0E0E0] rounded-md"
              required
            />
          </div>

          <div>
            <label
              htmlFor="comment"
              className="block text-[#333333] font-medium"
            >
              Comment
            </label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full px-4 py-2 border border-[#E0E0E0] rounded-md"
              placeholder="Enter any comments or notes"
              rows="3"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#F47C48] text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition"
          >
            Add Bill
          </button>
        </form>
      </div>
    </div>
  );
}
