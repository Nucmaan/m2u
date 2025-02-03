"use client";

import userAuth from "@/myStore/UserAuth";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function PropertyList() {
  const [listings, setListings] = useState([]);
  const user = userAuth((state) => state.user);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && user?._id) {
      fetchListings();
    }
  }, [isClient, user?._id]);

  const fetchListings = async () => {
    try {
      const response = await axios.get("/api/listings");
      setListings(response.data.Listings || []);
    } catch (error) {
      console.error("Error fetching listings:", error);
      setListings([]);
    }
  };

  if (!isClient) return null; // Prevents SSR issues

  return (
    <div className="min-h-screen bg-[#F7F7F9] p-6">
      <h2 className="text-2xl font-bold text-[#1A3B5D] mb-4">Available Properties</h2>
      {listings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((listing) => (
            <div key={listing._id} className="bg-white rounded-lg shadow-lg">
              <Image src={listing.images[0]} alt={listing.title} width={500} height={300} />
              <h3>{listing.title}</h3>
            </div>
          ))}
        </div>
      ) : (
        <p>No available properties to display.</p>
      )}
    </div>
  );
}
