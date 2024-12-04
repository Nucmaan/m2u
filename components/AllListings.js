"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
export default function AllListings() {
  const [listings, setListings] = useState([]);

  const fetchListings = async () => {
    try {
      const response = await axios.get("/api/listings");
      setListings(response.data.Listings);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  return (
    <section className="min-h-screen bg-[#F7F7F9] px-6 py-8">
      <h1 className="text-3xl font-bold text-[#1A3B5D] text-center mb-8">
        Property Listings
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {listings.map((listing) => (
          <div
            key={listing._id}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-200"
          >
            <img
              src={listing.images[0]}
              alt={listing.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-[#1A3B5D] mb-2">
                {listing.title}
              </h2>
              <p className="text-sm text-gray-600 mb-2">{listing.address}</p>
              <p className="text-lg font-bold text-[#F47C48]">
                {listing.price}
              </p>
              <div className="mt-2 flex justify-between items-center text-sm text-gray-700">
                <span>{listing.bedrooms} Beds</span>
                <span>{listing.bathrooms} Baths</span>
              </div>

              <div
                className={`mt-2 inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                  listing.houseType === "Rent"
                    ? "bg-[#4C8492] text-white"
                    : "bg-[#27AE60] text-white"
                }`}
              >
                {listing.houseType}
              </div>
              <button className="mt-4 w-full py-2 bg-[#4C8492] text-white font-semibold rounded-md hover:bg-[#3b6d78] transition duration-200">
                <Link href={`/listings/${listing._id}`}> View Details</Link>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
