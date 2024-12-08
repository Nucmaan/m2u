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
      setListings(data);
    }
    loadListings();
  }, []);

   const availableProperties = listings.filter(
    (listing) => listing.status === "Available"
  );

   const rentedOrSoldProperties = listings.filter(
    (listing) => listing.status != "Available"
  );

  return (
    <div className="min-h-screen bg-[#F7F7F9] p-6">
     
       <section>
        <h2 className="text-2xl font-bold text-[#333333] mb-4">
          Available Properties
        </h2>
        {availableProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableProperties.map((listing) => (
              <div
                key={listing._id}
                className="bg-white shadow rounded-lg border border-[#E0E0E0] overflow-hidden"
              >
                <img
                  src={listing.images[0]}
                  alt={listing.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-bold text-[#333333]">
                    {listing.title}
                  </h2>
                  <p className="text-[#7A7A7A]">{listing.address}</p>
                  <p className="text-[#4C8492] font-bold mt-2">
                    ${listing.price}
                  </p>
                  <div className="flex items-center mt-2 text-sm text-[#7A7A7A]">
                    <span>{listing.bedrooms} Beds</span>
                    <span className="mx-2">·</span>
                    <span>{listing.bathrooms} Baths</span>
                  </div>
                  <div className="mt-4 flex space-x-2">
                    <button className="flex-1 py-2 bg-[#1A3B5D] text-white font-bold rounded hover:bg-[#16324A]">
                      <Link href={`/admin/listings/${listing._id}`}>Edit</Link>
                    </button>
                    <button className="flex-1 py-2 bg-[#F47C48] text-white font-bold rounded hover:bg-[#E74C3C]">
                      <Link href={`/admin/listings/view/${listing._id}`}>
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

       <section className="mt-8">
        <h2 className="text-2xl font-bold text-[#333333] mb-4">
          Rented/Sold Properties
        </h2>
        {rentedOrSoldProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rentedOrSoldProperties.map((listing) => (
              <div
                key={listing._id}
                className="bg-white shadow rounded-lg border border-[#E0E0E0] overflow-hidden"
              >
                <img
                  src={listing.images[0]}
                  alt={listing.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-bold text-[#333333]">
                    {listing.title}
                  </h2>
                  <p className="text-[#7A7A7A]">{listing.address}</p>
                  <p className="text-[#4C8492] font-bold mt-2">
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
                  <div className="mt-4 flex space-x-2">
                    <button className="flex-1 py-2 bg-[#1A3B5D] text-white font-bold rounded hover:bg-[#16324A]">
                      <Link href={`/admin/listings/${listing._id}`}>Edit</Link>
                    </button>
                    <button className="flex-1 py-2 bg-[#F47C48] text-white font-bold rounded hover:bg-[#E74C3C]">
                      <Link href={`/admin/listings/view/${listing._id}`}>
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
