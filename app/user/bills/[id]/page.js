"use client";

import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

function Page() {
  const { id } = useParams();
  const [billInfo, setBillInfo] = useState({});
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Fetch bill information
  const fetchBillInfo = async () => {
    try {
      const response = await axios.get(`/api/bill/${id}`);
      setBillInfo(response.data.data);
    } catch (error) {
      console.error("Error fetching bill info:", error);
    }
  };

  // Handle payment
  const handlePayBill = async () => {
    try {
      setLoading(true);
     const response =  await axios.put(`/api/bill/paynow/${id}`, { 
        amount : billInfo.amount, 
        comment 
      });

      if(response.status === 200) {
        toast.success(response.data.message);
        router.push("/user/bills");
        setComment('');
        fetchBillInfo(); 
      }else{
        toast.error(response.data.message);
      }

    } catch (error) {
      console.error("Error paying bill:", error);
      alert("Payment failed!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBillInfo();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-8">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Pay Bill
        </h1>

        {billInfo.owner && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Owner Information
            </h2>
            <div className="flex items-center gap-4">
              <img
                src={billInfo.owner.avatar}
                alt={`${billInfo.owner.username}'s avatar`}
                className="w-12 h-12 rounded-full border"
              />
              <div>
                <p className="text-gray-800 font-medium">
                  <strong>Name:</strong> {billInfo.owner.username}
                </p>
                <p className="text-gray-600">
                  <strong>Email:</strong> {billInfo.owner.email}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Bill Details
          </h2>
          <p className="text-gray-800">
            <strong>Amount Due:</strong> ${billInfo.amount}
          </p>
          <p className="text-gray-600">
            <strong>Comment:</strong> {billInfo.comment || "No comments yet."}
          </p>
          <p className="text-gray-600">
            <strong>Due Date:</strong> {new Date(billInfo.dueDate).toLocaleDateString()}
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Add Payment Comment
          </h2>
          <textarea
            placeholder="Enter your comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full h-24 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black text-gray-700 resize-none"
          ></textarea>
        </div>

        <button
          onClick={handlePayBill}
          className={`w-full bg-black text-white py-3 rounded-lg font-medium transition ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-900"
          }`}
          disabled={loading}
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </div>
    </div>
  );
}

export default Page;
