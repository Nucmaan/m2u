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


export default function PropertyList() {
  const [listings, setListings] = useState([]);
  const user = userAuth((state) => state.user);

  useEffect(() => {
    async function loadListings() {
      const data = await fetchListings();
      const filteredListings = data.filter((listing) => listing.owner?._id === user._id);
      setListings(filteredListings);
    }
    loadListings();
  }, [user._id]);

  const availableProperties = listings.filter(
    (listing) => listing.status === "Available"
  );

  const rentedOrSoldProperties = listings.filter(
    (listing) => listing.status !== "Available"
  );

  return (
    <div className="min-h-screen bg-[#F7F7F9] p-6">
      {/* Available Properties Section */}
      <section>
        <h2 className="text-2xl font-bold text-[#1A3B5D] mb-4 flex items-center justify-between">
          Available Properties
          <button className="px-4 py-2 bg-[#1A3B5D] text-white rounded-lg shadow hover:bg-[#16324A] transition duration-200">
            <Link href="/agent/listings/addproperty">Add New Property</Link>
          </button>
        </h2>
        {availableProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableProperties.map((listing) => (
              <div
                key={listing._id}
                className="bg-white rounded-lg shadow-lg border border-[#E0E0E0] overflow-hidden hover:shadow-xl transition duration-300"
              >
                <img
                  src={listing.images[0]}
                  alt={listing.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h2 className="text-xl font-bold text-[#1A3B5D]">
                    {listing.title}
                  </h2>
                  <p className="text-sm text-[#7A7A7A] mt-1">{listing.address}</p>
                  <p className="text-lg font-bold text-[#4C8492] mt-2">
                    ${listing.price}
                  </p>
                  <div className="flex items-center mt-2 text-sm text-[#7A7A7A]">
                    <span>{listing.bedrooms} Beds</span>
                    <span className="mx-2">·</span>
                    <span>{listing.bathrooms} Baths</span>
                  </div>
                  <div className="mt-6 flex space-x-4">
                    <button className="flex-1 py-2 bg-[#1A3B5D] text-white font-bold rounded-lg hover:bg-[#16324A] transition duration-200">
                      <Link href={`/agent/listings/${listing._id}`}>Edit</Link>
                    </button>
                    <button className="flex-1 py-2 bg-[#F47C48] text-white font-bold rounded-lg hover:bg-[#e86d3f] transition duration-200">
                      <Link href={`/agent/listings/view/${listing._id}`}>
                        View Details
                      </Link>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-[#7A7A7A]">No available properties to display.</p>
        )}
      </section>

      {/* Rented/Sold Properties Section */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold text-[#1A3B5D] mb-4">
          Rented/Sold Properties
        </h2>
        {rentedOrSoldProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rentedOrSoldProperties.map((listing) => (
              <div
                key={listing._id}
                className="bg-white rounded-lg shadow-lg border border-[#E0E0E0] overflow-hidden hover:shadow-xl transition duration-300"
              >
                <img
                  src={listing.images[0]}
                  alt={listing.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h2 className="text-xl font-bold text-[#1A3B5D]">
                    {listing.title}
                  </h2>
                  <p className="text-sm text-[#7A7A7A] mt-1">{listing.address}</p>
                  <p className="text-lg font-bold text-[#4C8492] mt-2">
                    ${listing.price}
                  </p>
                  <p
                    className={`mt-1 text-sm font-bold ${
                      listing.houseType === "Rented"
                        ? "text-[#F47C48]"
                        : "text-[#4C8492]"
                    }`}
                  >
                    {listing.houseType}
                  </p>
                  <div className="flex items-center mt-2 text-sm text-[#7A7A7A]">
                    <span>{listing.bedrooms} Beds</span>
                    <span className="mx-2">·</span>
                    <span>{listing.bathrooms} Baths</span>
                  </div>
                  <div className="mt-6 flex space-x-4">
                    <button className="flex-1 py-2 bg-[#1A3B5D] text-white font-bold rounded-lg hover:bg-[#16324A] transition duration-200">
                      <Link href={`/agent/listings/${listing._id}`}>Edit</Link>
                    </button>
                    <button className="flex-1 py-2 bg-[#F47C48] text-white font-bold rounded-lg hover:bg-[#e86d3f] transition duration-200">
                      <Link href={`/agent/listings/view/${listing._id}`}>
                        View Details
                      </Link>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-[#7A7A7A]">
            No rented or sold properties to display.
          </p>
        )}
      </section>
    </div>
  );
}