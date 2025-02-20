"use client";

import userAuth from "@/myStore/UserAuth";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState, useCallback } from "react";

const UserDashboard = () => {
  const [userContracts, setUserContracts] = useState([]);
  const [userBookings, setUserBookings] = useState([]);

  const [totalUnpaidAmount, setTotalUnpaidAmount] = useState(0);
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
      getOwnerContracts();
      fetchUserBookings();
      getOwnerBills();
    }
  }, [userName, getOwnerContracts, fetchUserBookings, getOwnerBills]);

  return (
    <div className="flex min-h-screen bg-[#F7F7F9] p-3">
      {/* Main Content */}
      <main className="flex-1 px-6 pt-3  ">
        <header className="flex justify-between items-center bg-white shadow-md p-4 rounded-lg">
          <h2 className="text-xl font-semibold text-[#333333]">
            {userName.username}
          </h2>
          <div className="flex items-center gap-3">
            <span className="text-[#7A7A7A]">{userName.role}</span>
            <div className="w-10 h-10 relative">
              <Image
                src={userName.avatar || "/default-avatar.png"}
                alt="User Avatar"
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 ">
          <div className="p-6 rounded-lg shadow-md border border-[#E0E0E0] bg-[#4C8492] text-white">
            <h3 className="text-lg">Total Bookings</h3>
            <p className="text-2xl font-bold">{userBookings.length || 0}</p>
          </div>
          <div className="p-6 rounded-lg shadow-md border border-[#E0E0E0] bg-[#6E91A2] text-white">
            <h3 className="text-lg">Active Contracts</h3>
            <p className="text-2xl font-bold">{userContracts.length || 0}</p>
          </div>
          <div className="p-6 rounded-lg shadow-md border border-[#E0E0E0] bg-[#85A8B3] text-white">
            <h3 className="text-lg">Outstanding Bills</h3>
            <p className="text-2xl font-bold">
              ${totalUnpaidAmount || 0}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;
