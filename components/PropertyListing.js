"use client"
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { FaBed, FaBath, FaMapMarkerAlt, FaMoneyBillWave } from "react-icons/fa";
import { useCallback, useEffect, useState } from "react";

export default  function PropertyListing() {
  const [listings, setListings] = useState([]);
  const topListings = listings.slice(0, 3);
  const [error, setError] = useState("");
  
  const getListings = useCallback(async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_DOMAIN}/api/listings`);
  
        if (!response.data?.Listings) {
          throw new Error("Invalid response from server");
        }
  
        const validListings = response.data.Listings.filter((listing) => listing.owner !== null);
        setListings(validListings);
      } catch (error) {
        setError(error?.message);
        setListings([]);
       /// console.error("Error fetching listings:", error);
      }
    }, []);
  
    useEffect(() => {
      getListings();
    }, [getListings]);

  return (
    <div className="pt-10 pb-3 bg-[#F7F7F9]">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-[#1A3B5D] mb-4">
          Explore Our Properties
        </h2>
        <p className="text-center text-[#7A7A7A] mb-8">
          A collection of our top properties
        </p>

        {listings.length === 0 ? (
          <div className="text-center text-lg text-[#7A7A7A]">
            No properties are available at the moment.
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {topListings.map((list) => (
              <div
                key={list._id}
                className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col justify-between border border-[#E0E0E0]"
              >
                <div className="relative w-full h-48">
                  <Image
                    src={list.images[0]}
                    alt={list.title}
                    fill
                 style={{ objectFit: "cover" }}
                  />
                </div>

                <div className="p-6 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="text-xl font-semibold text-[#1A3B5D] truncate mb-2">
                      {list.title}
                    </h3>
                    <p className="text-sm text-[#7A7A7A] flex items-center mb-2">
                      <FaMapMarkerAlt className="mr-2 text-[#4C8492]" />
                      {list.city}
                    </p>
                    <p className="text-sm text-[#7A7A7A] flex items-center mb-2">
                      <FaMoneyBillWave className="mr-2 text-[#27AE60]" />
                      {list.price}
                    </p>
                    <div className="flex justify-between items-center mt-4 text-sm text-[#7A7A7A]">
                      <span className="flex items-center">
                        <FaBed className="mr-2 text-[#4C8492]" />
                        {list.bedrooms} Beds
                      </span>
                      <span className="flex items-center">
                        <FaBath className="mr-2 text-[#F47C48]" />
                        {list.bathrooms} Baths
                      </span>
                    </div>
                  </div>

                  <button className="mt-6 w-full bg-[#1A3B5D] text-white py-2 rounded-md hover:bg-[#16324A] transition duration-300">
                    <Link href={`/listings/${list._id}`}>View Details</Link>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
