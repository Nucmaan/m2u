"use client";

import RaadiLoading from "@/components/RaadiLoading";
import userAuth from "@/myStore/UserAuth";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState, useCallback } from "react";
import { FaCalendarAlt, FaMoneyBillWave, FaMapMarkerAlt, FaHome, FaExclamationTriangle, FaInfoCircle, FaCheck } from "react-icons/fa";

export default function BillPage() {
  const [userBill, setUserBill] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const user = userAuth((state) => state.user);

  const getUserBills = useCallback(async () => {
    if (!user || !user._id) return;

    try {
      setLoading(true);
      const response = await axios.get(`/api/bill`);

      const userBills = response.data.data.filter(
        (bill) => bill.user && bill.user._id === user._id
      );

      setUserBill(userBills);
    } catch (error) {
      setError("Failed to fetch bills. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    getUserBills();
  }, [getUserBills]);

  const getBillCountByStatus = (status) => {
    if (status === 'all') return userBill.length;
    if (status === 'unpaid') return userBill.filter(bill => bill.status !== "Paid").length;
    return userBill.filter(bill => bill.status === status).length;
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Paid":
        return <FaCheck className="mr-2 text-green-500" />;
      case "Pending":
        return <FaInfoCircle className="mr-2 text-[#F47C48]" />;
      case "Overdue":
        return <FaExclamationTriangle className="mr-2 text-red-500" />;
      default:
        return null;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Not Available";
    try {
      const date = new Date(dateString);
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return date.toLocaleDateString('en-US', options);
    } catch (error) {
      return "Invalid Date";
    }
  };

  // Filter tabs
  const filterTabs = [
    { label: "All Bills", value: "all", icon: <FaMoneyBillWave /> },
    { label: "Unpaid", value: "unpaid", icon: <FaExclamationTriangle /> },
    { label: "Overdue", value: "Overdue", icon: <FaExclamationTriangle /> },
    { label: "Paid", value: "Paid", icon: <FaCheck /> }
  ];

  const filteredBills = activeFilter === 'all' 
    ? userBill 
    : activeFilter === 'unpaid'
      ? userBill.filter(bill => bill.status !== "Paid")
      : userBill.filter(bill => bill.status === activeFilter);

  return (
    <div className="min-h-screen bg-[#F7F7F9] pt-28 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Page Header */}
        <div className="bg-gradient-to-r from-[#4C8492] to-[#1A3B5D] rounded-xl p-6 mb-6 text-white shadow-md">
          <h1 className="text-2xl font-bold">My Bills</h1>
          <p className="mt-1 text-gray-100">Manage and pay your property related bills</p>
        </div>

        {loading ? (
          <div className="bg-white rounded-xl shadow-md p-12 flex justify-center">
            <RaadiLoading fullScreen={false} />
          </div>
        ) : error ? (
          <div className="bg-white rounded-xl shadow-md p-12 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <FaExclamationTriangle className="text-red-500 text-2xl" />
            </div>
            <h2 className="text-xl font-semibold text-gray-700">Error Loading Bills</h2>
            <p className="text-gray-500 mt-2 max-w-md">{error}</p>
          </div>
        ) : userBill.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <div className="flex flex-col items-center justify-center">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <FaMoneyBillWave className="text-gray-400 text-4xl" />
              </div>
              <h2 className="text-xl font-semibold text-gray-700">No Bills Found</h2>
              <p className="text-gray-500 mt-2 max-w-md">
                You don not have any bills at the moment.
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            {/* Bill Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 border-b divide-x">
              {filterTabs.map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setActiveFilter(tab.value)}
                  className={`py-4 px-4 flex flex-col items-center justify-center transition-colors ${
                    activeFilter === tab.value
                      ? "bg-gray-50 border-t-2 border-[#F47C48]"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center mb-1">
                    <span className={`mr-2 ${
                      activeFilter === tab.value 
                        ? "text-[#F47C48]" 
                        : "text-gray-500"
                    }`}>
                      {tab.icon}
                    </span>
                    <span className={`font-medium ${
                      activeFilter === tab.value 
                        ? "text-[#F47C48]" 
                        : "text-gray-700"
                    }`}>
                      {tab.label}
                    </span>
                  </div>
                  <span className="text-xl font-bold text-gray-800">
                    {getBillCountByStatus(tab.value)}
                  </span>
                </button>
              ))}
            </div>

            {/* Bills List */}
            <div className="p-6">
              {filteredBills.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">No {activeFilter === 'all' ? '' : activeFilter.toLowerCase()} bills found.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredBills.map((bill) => (
                    <div
                      key={bill._id}
                      className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300"
                    >
                      <div className="border-b border-gray-100 bg-gray-50 px-4 py-3 flex justify-between items-center">
                        <h3 className="font-semibold text-gray-800 truncate">
                          {bill.property?.title || "Property Bill"}
                        </h3>
                        <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center ${
                          bill.status === "Paid" ? "bg-green-100 text-green-800" : 
                          bill.status === "Overdue" ? "bg-red-100 text-red-800" :
                          "bg-yellow-100 text-yellow-800"
                        }`}>
                          {getStatusIcon(bill.status)}
                          {bill.status}
                        </div>
                      </div>
                      
                      <div className="p-4">
                        <div className="mb-4">
                          <div className="flex items-center mb-2">
                            <FaMapMarkerAlt className="text-gray-400 mr-2" />
                            <p className="text-sm text-gray-600 truncate">
                              {bill.property?.address || "Address not available"}
                            </p>
                          </div>
                          <div className="flex items-center mb-2">
                            <FaMoneyBillWave className="text-gray-400 mr-2" />
                            <p className="text-sm font-medium text-[#1A3B5D]">
                              Amount: <span className="text-[#F47C48]">${bill.amount}</span>
                            </p>
                          </div>
                          <div className="flex items-center">
                            <FaCalendarAlt className="text-gray-400 mr-2" />
                            <p className="text-sm text-gray-600">
                              Due: {formatDate(bill.dueDate)}
                            </p>
                          </div>
                        </div>
                        
                        {bill.status !== "Paid" && (
                          <Link
                            href={`/user/bills/${bill._id}`}
                            className="w-full block text-center bg-[#1A3B5D] text-white px-4 py-2 rounded-md hover:bg-[#16324A] transition-colors duration-200 mt-4"
                          >
                            Pay Now
                          </Link>
                        )}
                        
                        {bill.status === "Paid" && (
                          <div className="w-full text-center bg-green-50 text-green-700 px-4 py-2 rounded-md mt-4 flex items-center justify-center">
                            <FaCheck className="mr-2" />
                            Paid on {formatDate(bill.updatedAt)}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
