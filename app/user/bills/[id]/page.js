"use client";

import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import Image from "next/image";
import { FaSpinner } from "react-icons/fa";
import userAuth from "@/myStore/UserAuth";

function BillPaymentPage() {
  const { id } = useParams();
  const [billInfo, setBillInfo] = useState({});
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const user = userAuth((state) => state.user);

  // Fetch bill information
  const fetchBillInfo = useCallback(async () => {
    try {
      const { data } = await axios.get(`/api/bill/${id}`);
      setBillInfo(data.data);
    } catch (error) {
      //console.error("Error fetching bill info:", error);
      toast.error("Failed to fetch bill details.", error);
    }
  }, [id]);

  useEffect(() => {
    fetchBillInfo();
  }, [fetchBillInfo]);

  // Handle bill payment
  const handlePayBill = async () => {
    try {
      setLoading(true);
      const response = await axios.put(`/api/bill/paynow/${id}`, {
        amount: billInfo.amount,
        comment,
      });

      if (response.status === 200) {
        toast.success(response.data.message);
        router.push("/user/bills");
        setComment("");
        fetchBillInfo();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error paying bill:", error);
      toast.error("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen mt-4 bg-gray-100 px-4 ">
      <div className="bg-white shadow-md rounded-xl p-6 w-full ">
        
        {billInfo.owner && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-3">
              Owner Information
            </h2>
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg shadow-sm">
              <Image
                src={billInfo.owner.avatar}
                alt={`${billInfo.owner.username}'s avatar`}
                width={50}
                height={50}
                className="rounded-full border"
              />
              <div>
                <p className="text-gray-900 font-medium">
                  Name : {billInfo.owner.username}
                </p>
                <p className="text-gray-600 text-sm">
                  email : {billInfo.owner.email}
                </p>
                <p className="text-gray-600 text-sm">
                  Mobile : {billInfo.owner.mobile}
                </p>
              </div>
            </div>
          </div>
        )}

        {user && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-3">
              Your Information{" "}
              <span className="text-red-500 italic">
                (if you information is not correct just change it in your
                profile settings)
              </span>
            </h2>
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg shadow-sm">
              <Image
                src={user.avatar}
                alt="user avatar"
                width={50}
                height={50}
                className="rounded-full border"
              />
              <div>
                <p className="text-gray-900 font-medium">
                  Name : {user.username}
                </p>
                <p className="text-gray-600 text-sm">email : {user.email}</p>
                <p className="text-gray-600 text-sm">Mobile : {user.mobile}</p>
              </div>
            </div>
          </div>
        )}

        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">
            Payment Details
          </h2>
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <p className="text-gray-900">
              <strong>Amount Due:</strong> ${billInfo.amount}
            </p>
            <p className="text-gray-600">
              <strong>Comment:</strong> {billInfo.comment || "No comments yet."}
            </p>
            <p className="text-gray-600">
              <strong>Due Date:</strong>{" "}
              {billInfo.dueDate
                ? new Date(billInfo.dueDate).toLocaleDateString()
                : "N/A"}
            </p>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">
            Add Payment Comment
          </h2>
          <textarea
            placeholder="Enter your comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full h-24 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black text-gray-700 resize-none shadow-sm"
          ></textarea>
        </div>

        <button
          onClick={handlePayBill}
          className={`w-full flex items-center justify-center bg-black text-white py-3 rounded-lg font-medium transition ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-900"
          }`}
          disabled={loading}
        >
          {loading ? (
            <>
              <FaSpinner className="animate-spin mr-2" /> Processing...
            </>
          ) : (
            "Pay Now"
          )}
        </button>
      </div>
    </div>
  );
}

export default BillPaymentPage;
