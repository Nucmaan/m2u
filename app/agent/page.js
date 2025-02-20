"use client";
import userAuth from "@/myStore/UserAuth";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState, useCallback } from "react";

const AgentDashboard = () => {
  const user = userAuth((state) => state.user);
  const [listings, setListings] = useState([]);
  const [ownerContracts, setOwnerContracts] = useState([]);
  const [ownerBookings, setOwnerBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const fetchOwnerBookings = useCallback(async () => {
    try {
      if (!user?._id) {
        //console.log("User ID missing!");
        return;
      }

      const response = await axios.get(`/api/booking/ownerBooking/${user._id}`);

      if (response.status === 200) {
        setOwnerBookings(response.data.bookings);
        setError(""); // Clear errors
      } else {
        setOwnerBookings([]);
      }
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch bookings.");
    } finally {
      setLoading(false);
    }
  }, [user?._id]);

  const getOwnerContracts = useCallback(async () => {
    try {
      if (!user?._id) return;

      const response = await axios.get(
        `/api/contracts/ownercontract/${user._id}`
      );

      if (response.status === 404) {
        setOwnerContracts([]);
      } else {
        setOwnerContracts(response.data.contracts);
      }
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch contracts.");
    }
  }, [user?._id]);

  const getListings = useCallback(async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_DOMAIN}/api/listings`
      );

      if (!response.data?.Listings) {
        throw new Error("Invalid response from server");
      }

      const validListings = response.data.Listings.filter(
        (listing) => listing.owner !== null
      );

      const filteredListings = validListings.filter(
        (listing) => listing.owner?._id === user._id
      );
      setListings(filteredListings);
    } catch (error) {
      setListings([]);
      //console.error("Error fetching listings:", error);
      setErrorMessage(error.message);
    }
  }, [user?._id]);

  useEffect(() => {
    if (user?._id) {
      getOwnerContracts();
      fetchOwnerBookings();
      getListings();
    }
  }, [user?._id, getOwnerContracts, fetchOwnerBookings, getListings]);

  const availableProperties = listings.filter(
    (listing) => listing.status === "Available"
  );

  const pendingBooking = ownerBookings.filter(
    (booking) => booking.status === "pending" && booking.owner === user._id
  );

  return (
    <div className="flex min-h-screen bg-[#F7F7F9] p-3">
      {/* Main Content */}
      <main className="flex-1 px-6 pt-3  ">
        <header className="flex justify-between items-center bg-white shadow-md p-4 rounded-lg">
          <h2 className="text-xl font-semibold text-[#333333]">
            {user.username}
          </h2>
          <div className="flex items-center gap-3">
            <span className="text-[#7A7A7A]">{user.role}</span>
            <div className="w-10 h-10 relative">
              <Image
                src={user.avatar || "/default-avatar.png"}
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
            <h3 className="text-lg">Active Listings</h3>
            <p className="text-2xl font-bold">
              {availableProperties.length || 0}
            </p>
          </div>
          <div className="p-6 rounded-lg shadow-md border border-[#E0E0E0] bg-[#6E91A2] text-white">
            <h3 className="text-lg">Pending Bookings</h3>
            <p className="text-2xl font-bold">{pendingBooking.length || 0}</p>
          </div>
          <div className="p-6 rounded-lg shadow-md border border-[#E0E0E0] bg-[#85A8B3] text-white">
            <h3 className="text-lg">Owner Contracts</h3>
            <p className="text-2xl font-bold">{ownerContracts.length || 0}</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AgentDashboard;
