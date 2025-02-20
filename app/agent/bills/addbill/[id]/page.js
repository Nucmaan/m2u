"use client";

import userAuth from "@/myStore/UserAuth";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";

export default function AddBillPage() {
  const [amount, setAmount] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [user, setUser] = useState("");
  const [comment, setComment] = useState("");
  const [property, setProperty] = useState("");
  const [housePrice, setHousePrice] = useState("");

  const owner = userAuth((state) => state.user);
  const { id } = useParams();
  const router = useRouter();

  const fetchContract = useCallback(async () => {
    try {
      const response = await axios.get(`/api/contracts/${id}`);
      setUser(response.data.existingContract.user);
      setProperty(response.data.existingContract.property);
      setHousePrice(response.data.existingContract.property.price);
    } catch (error) {
      console.error("Error fetching contract:", error);
      toast.error("Failed to fetch contract details. Please try again." );
    }
  }, [id]);

  useEffect(() => {
    fetchContract();
  }, [fetchContract]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!dueDate) {
      toast.error("due date is missing");
      return;
    }

    if (!user) {
      toast.error("user is missing");
      return;
    }

    if (!comment) {
      toast.error("comment is missing.");
      return;
    }

    if (!amount ) {
      toast.error("Amount is missing.");
      return;
    }

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
      toast.error(error.response?.data?.message || "Failed to add bill. Please try again.");
    } finally {
      setAmount("");
      setDueDate("");
      setComment("");
    }
  };

  return (
    <div className="p-6 bg-[#F7F7F9] min-h-screen flex flex-col items-center">
      <div className="bg-white w-full  p-8 rounded-lg shadow-lg border border-[#E0E0E0]">
        <form onSubmit={handleSubmit} className="space-y-6">
          
        {property && property.status === "Sold" ? (
          <div>
            <label
              htmlFor="amount"
              className="block text-sm font-semibold text-[#1A3B5D] mb-2"
            >
              House Price ($)
            </label>
            <input
              id="amount"
              type="number"
              value={housePrice}
              className="w-full px-4 py-2 border border-[#E0E0E0] rounded-lg text-[#333333] bg-gray-200 cursor-not-allowed"
              placeholder="Sold"
              disabled
            />
          </div>
        ) : (
          <div>
            <label
              htmlFor="amount"
              className="block text-sm font-semibold text-[#1A3B5D] mb-2"
            >
              amount ($)
            </label>
            <input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-2 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F47C48] text-[#333333]"
              placeholder="Enter amount"
              required
            />
          </div>
        )}
        

          <div>
            <label
              htmlFor="dueDate"
              className="block text-sm font-semibold text-[#1A3B5D] mb-2"
            >
              Due Date
            </label>
            <input
              id="dueDate"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-4 py-2 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F47C48] text-[#333333]"
              required
            />
          </div>

          <div>
            <label
              htmlFor="comment"
              className="block text-sm font-semibold text-[#1A3B5D] mb-2"
            >
              Comment
            </label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full px-4 py-2 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F47C48] text-[#333333]"
              placeholder="Enter any comments or notes"
              rows="3"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#1A3B5D] text-white font-semibold rounded-lg hover:bg-[#16324A] transition duration-200 focus:outline-none focus:ring-2 focus:ring-[#F47C48]"
          >
            Add Money
          </button>
        </form>
      </div>
    </div>
  );
}
