"use client";

import userAuth from "@/myStore/UserAuth";
import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";

const UserDashboard = () => {
  const userName = userAuth((state) => state.user);
  const [userContracts, setUserContracts] = useState([]);
  const [userBookings, setUserBookings] = useState([]);
  const [totalUnpaidAmount, setTotalUnpaidAmount] = useState(0);

  const getOwnerBills = useCallback(async () => {
    try {
      const response = await axios.get(`/api/bill`);

      if (!response.data || !response.data.data) {
        console.error("Invalid response format:", response);
        return;
      }

      const unpaidBill = response.data.data.filter(
        (bill) => bill?.status !== "Paid" && bill?.user?._id === userName?._id
      );

      const totalAmount = unpaidBill.reduce((sum, bill) => sum + (bill?.amount || 0), 0);
      setTotalUnpaidAmount(totalAmount);
    } catch (error) {
      console.error("Failed to fetch bills. Please try again.", error);
    }
  }, [userName]);

  const fetchUserBookings = useCallback(async () => {
    try {
      const response = await axios.get(`/api/booking/userBooking/${userName?._id}`);

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
      const response = await axios.get(`/api/contracts/usercontract/${userName?._id}`);

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
    <div className="flex flex-col md:flex-row bg-gray-100">
      <div className="flex-1 p-8 space-y-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-semibold text-gray-800">
              Welcome back, {userName?.username || ""}
            </h1>
            <p className="text-lg text-gray-500 mt-2">
              Here&apos;s an overview of your activities
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          <div className="bg-white p-6 shadow-lg rounded-lg flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-gray-700">Total Bookings</h3>
              <p className="text-2xl font-bold text-blue-600">{userBookings.length || 0}</p>
            </div>
            <div className="text-blue-600 text-4xl">📅</div>
          </div>

          <div className="bg-white p-6 shadow-lg rounded-lg flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-gray-700">Active Contracts</h3>
              <p className="text-2xl font-bold text-blue-600">{userContracts.length || 0}</p>
            </div>
            <div className="text-blue-600 text-4xl">📝</div>
          </div>

          <div className="bg-white p-6 shadow-lg rounded-lg flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-gray-700">Outstanding Payments</h3>
              <p className="text-2xl font-bold text-blue-600">${totalUnpaidAmount || 0}</p>
            </div>
            <div className="text-blue-600 text-4xl">💸</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
