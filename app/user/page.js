"use client";

import userAuth from "@/myStore/UserAuth";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState, useCallback } from "react";
import { FaCalendarCheck, FaFileContract, FaMoneyBillWave, FaClock, FaChartLine, FaSearch, FaPlus, FaCreditCard, FaMapMarkerAlt } from "react-icons/fa";

const UserDashboard = () => {
  const [userContracts, setUserContracts] = useState([]);
  const [userBookings, setUserBookings] = useState([]);
  const [totalUnpaidAmount, setTotalUnpaidAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const userName = userAuth((state) => state.user);

  const getOwnerBills = useCallback(async () => {
    try {
      const response = await axios.get(`/api/bill`);
      if (!response.data || !response.data.data) {
        console.error("Invalid response format:", response);
        return;
      }

      const unpaidBill = response.data.data.filter(
        (bill) => bill?.status !== "Paid" && bill?.user?._id === userName._id
      );

      const totalAmount = unpaidBill.reduce(
        (sum, bill) => sum + (bill?.amount || 0),
        0
      );
      setTotalUnpaidAmount(totalAmount);
    } catch (error) {
      console.error("Failed to fetch bills. Please try again.", error);
    }
  }, [userName]);

  const fetchUserBookings = useCallback(async () => {
    try {
      const response = await axios.get(
        `/api/booking/userBooking/${userName?._id}`
      );

      if (!response.data || !response.data.bookings) {
        console.error("Invalid response format:", response);
        return;
      }

      setUserBookings(response.data.bookings);
    } catch (error) {
      console.error("Error fetching user bookings:", error);
    }
  }, [userName]);

  const getOwnerContracts = useCallback(async () => {
    try {
      const response = await axios.get(
        `/api/contracts/usercontract/${userName?._id}`
      );

      if (!response.data || !response.data.contracts) {
        console.error("Invalid response format:", response);
        return;
      }

      const activeContracts = response.data.contracts.filter(
        (contract) => contract?.status === "Active"
      );

      setUserContracts(activeContracts);
    } catch (error) {
      console.error("Error fetching contracts:", error);
    }
  }, [userName]);

  useEffect(() => {
    if (userName?._id) {
      setIsLoading(true);
      Promise.all([getOwnerContracts(), fetchUserBookings(), getOwnerBills()]).finally(() => {
        setIsLoading(false);
      });
    }
  }, [userName, getOwnerContracts, fetchUserBookings, getOwnerBills]);

  const quickActions = [
    {
      title: "Find Properties",
      icon: <FaSearch className="text-white text-lg" />,
      color: "from-[#4C8492] to-[#1A3B5D]",
      link: "/"
    },
    {
      title: "Book Property",
      icon: <FaPlus className="text-white text-lg" />,
      color: "from-[#F47C48] to-[#E05F2C]",
      link: "/"
    },
    {
      title: "Pay Bills",
      icon: <FaCreditCard className="text-white text-lg" />,
      color: "from-green-500 to-green-600",
      link: "/user/bills"
    },
    {
      title: "View Contracts",
      icon: <FaFileContract className="text-white text-lg" />,
      color: "from-purple-500 to-purple-600",
      link: "/user/contract"
    }
  ];

  return (
    <div className="flex min-h-screen pt-24 bg-[#F7F7F9]">
      {/* Main Content */}
      <main className="flex-1 px-6 py-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-[#4C8492] to-[#1A3B5D] p-6 rounded-xl shadow-lg mb-8 text-white">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Welcome back, {userName.username}!</h1>
              <p className="text-gray-200 mt-1">Here is what is happening with your properties today.</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 relative">
                <Image
                  src={userName.avatar || "/default-avatar.png"}
                  alt="User Avatar"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full border-2 border-white"
                />
              </div>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4C8492]"></div>
          </div>
        ) : (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-[#4C8492] transition-transform hover:transform hover:scale-105">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-gray-500 font-medium">Total Bookings</p>
                    <h3 className="text-3xl font-bold text-gray-800 mt-1">{userBookings.length || 0}</h3>
                  </div>
                  <div className="bg-[#4C8492]/10 p-3 rounded-lg">
                    <FaCalendarCheck className="text-[#4C8492] text-xl" />
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-[#F47C48] transition-transform hover:transform hover:scale-105">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-gray-500 font-medium">Active Contracts</p>
                    <h3 className="text-3xl font-bold text-gray-800 mt-1">{userContracts.length || 0}</h3>
                  </div>
                  <div className="bg-[#F47C48]/10 p-3 rounded-lg">
                    <FaFileContract className="text-[#F47C48] text-xl" />
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-red-500 transition-transform hover:transform hover:scale-105">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-gray-500 font-medium">Outstanding Bills</p>
                    <h3 className="text-3xl font-bold text-gray-800 mt-1">${totalUnpaidAmount.toFixed(2) || "0.00"}</h3>
                  </div>
                  <div className="bg-red-100 p-3 rounded-lg">
                    <FaMoneyBillWave className="text-red-500 text-xl" />
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {quickActions.map((action, index) => (
                  <Link href={action.link} key={index}>
                    <div className={`bg-gradient-to-r ${action.color} p-5 rounded-xl text-white shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer h-full`}>
                      <div className="flex flex-col items-center justify-center text-center h-full">
                        <div className="bg-white/20 p-3 rounded-full mb-3">{action.icon}</div>
                        <h3 className="font-medium">{action.title}</h3>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default UserDashboard;
