"use client";
import userAuth from "@/myStore/UserAuth";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

async function fetchListings() {
  try {
    const response = await axios.get("/api/listings");
    return response.data.Listings;
  } catch (error) {
    console.error("Error fetching listings:", error);
    return [];
  }
}

const AgentDashboard = () => {

  const [listings, setListings] = useState([]);
  const user = userAuth((state) => state.user);

  const [ownerContracts, setOwnerContracts] = useState([]);

   const [ownerBookings, setOwnerBookings] = useState([]);
  
  
    const fetchOwnerBookings = async () => {
      try {
        const response = await axios.get(`/api/booking/ownerBooking/${user._id}`);
        const pendingBookings = response.data.bookings.filter(
          (booking) => booking.status === "pending"
        )
        setOwnerBookings(pendingBookings);
      } catch (error) {
        console.error("Error fetching owner bookings:", error);
      }
    };
  
    const getOwnerContracts = async () => {
      try {
        const response = await axios.get(
          `/api/contracts/ownercontract/${user._id}`
        );
        setOwnerContracts(response.data.contracts);
      } catch (error) {
        console.error(error);
      }
    };

  useEffect(() => {
    async function loadListings() {
      const data = await fetchListings();
      const filteredListings = data.filter((listing) => listing.owner === user._id && listing.status === "Available");
      setListings(filteredListings);
    }
    loadListings();
    getOwnerContracts();
    fetchOwnerBookings();
  }, [user._id]);


  return (
    <div className="min-h-screen bg-[#F7F7F9] p-6">
      {/* Heading */}
      <h1 className="text-3xl font-bold text-[#1A3B5D]">Agent Dashboard</h1>
      <p className="text-[#7A7A7A] mt-2">
        Welcome back! Here’s an overview of your activities.
      </p>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {/* Active Properties Card */}
        <div className="bg-white shadow-lg rounded-lg p-6 border border-[#E0E0E0] hover:shadow-xl transition duration-300">
          <h2 className="text-lg font-bold text-[#1A3B5D]">Active Properties</h2>
          <p className="text-2xl font-bold text-[#4C8492] mt-2">{listings.length || 0}</p>
        </div>

        {/* Pending Bookings Card */}
        <div className="bg-white shadow-lg rounded-lg p-6 border border-[#E0E0E0] hover:shadow-xl transition duration-300">
          <h2 className="text-lg font-bold text-[#1A3B5D]">Pending Bookings</h2>
          <p className="text-2xl font-bold text-[#F47C48] mt-2">{ownerBookings.length || 0}</p>
        </div>

        {/* Contracts Card */}
        <div className="bg-white shadow-lg rounded-lg p-6 border border-[#E0E0E0] hover:shadow-xl transition duration-300">
          <h2 className="text-lg font-bold text-[#1A3B5D]">Contracts</h2>
          <p className="text-2xl font-bold text-[#27AE60] mt-2">{ownerContracts.length || 0}</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex flex-col sm:flex-row gap-4">
        <button className="w-full sm:w-auto px-6 py-2 bg-[#1A3B5D] text-white font-bold rounded hover:bg-[#16324A] transition duration-300">
          <Link href="/agent/listings/addproperty">Add New Property</Link>
        </button>
        <button className="w-full sm:w-auto px-6 py-2 bg-[#F47C48] text-white font-bold rounded hover:bg-[#e86d3f] transition duration-300">
        <Link href="/agent/booking">View Bookings</Link>
        </button>
        <button className="w-full sm:w-auto px-6 py-2 bg-[#4C8492] text-white font-bold rounded hover:bg-[#3b6d78] transition duration-300">
          <Link href="/agent/contract">Manage Contracts</Link>
        </button>
      </div>
    </div>
  );
};

export default AgentDashboard;