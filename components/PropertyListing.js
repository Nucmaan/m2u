"use client"
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { FaBed, FaBath, FaMapMarkerAlt, FaMoneyBillWave, FaArrowRight } from "react-icons/fa";
import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";

const PropertyCard = ({ list, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col justify-between border border-[#E0E0E0] transform hover:scale-105 transition-transform duration-300"
    >
      <div className="relative w-full h-48 group">
        <Image
          src={list.images[0]}
          alt={list.title}
          fill
          style={{ objectFit: "cover" }}
          className="transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
      </div>

      <div className="p-6 flex flex-col justify-between flex-1">
        <div>
          <h3 className="text-xl font-semibold text-[#1A3B5D] truncate mb-2 group-hover:text-[#F47C48] transition-colors duration-300">
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

        <Link 
          href={`/listings/${list._id}`}
          className="mt-6 group"
        >
          <button className="w-full bg-[#1A3B5D] text-white py-3 rounded-md hover:bg-[#16324A] transition-all duration-300 flex items-center justify-center space-x-2">
            <span>View Details</span>
            <FaArrowRight className="transform group-hover:translate-x-2 transition-transform duration-300" />
          </button>
        </Link>
      </div>
    </motion.div>
  );
};

const LoadingSkeleton = () => (
  <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col justify-between border border-[#E0E0E0] animate-pulse">
    <div className="relative w-full h-48 bg-gray-200" />
    <div className="p-6">
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-4" />
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-2" />
      <div className="h-4 bg-gray-200 rounded w-1/3 mb-4" />
      <div className="flex justify-between mb-4">
        <div className="h-4 bg-gray-200 rounded w-1/4" />
        <div className="h-4 bg-gray-200 rounded w-1/4" />
      </div>
      <div className="h-10 bg-gray-200 rounded w-full mt-4" />
    </div>
  </div>
);

export default function PropertyListing() {
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  
  const getListings = useCallback(async () => {
    try {
      setIsLoading(true);
      setError("");
      
      const response = await axios.get(`${process.env.NEXT_PUBLIC_DOMAIN}/api/listings`);

      if (!response.data?.Listings) {
        throw new Error("Invalid response from server");
      }

      const validListings = response.data.Listings.filter(
        (listing) => 
          listing.owner !== null && 
          listing.owner.isVerified === true && 
          listing.status === "Available"
      );
      
      setListings(validListings);
    } catch (error) {
      setError(error?.message || "Failed to fetch properties");
      setListings([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getListings();
  }, [getListings]);

  const topListings = listings.slice(0, 3);

  return (
    <section className="py-16 bg-[#F7F7F9]">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-[#1A3B5D] mb-4">
            Explore Our Properties
          </h2>
          <p className="text-lg text-[#7A7A7A]">
            Discover our handpicked selection of premium properties
          </p>
        </motion.div>

        {isLoading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <LoadingSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-8"
          >
            <div className="bg-red-50 text-red-600 p-4 rounded-lg inline-block">
              <p className="text-lg font-semibold">Oops! Something went wrong</p>
              <p className="text-sm mt-2">{error}</p>
              <button
                onClick={getListings}
                className="mt-4 px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-300"
              >
                Try Again
              </button>
            </div>
          </motion.div>
        ) : listings.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-8"
          >
            <div className="bg-gray-50 p-8 rounded-lg inline-block">
              <p className="text-xl text-[#7A7A7A]">
                No properties are available at the moment.
              </p>
            </div>
          </motion.div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {topListings.map((list, index) => (
              <PropertyCard key={list._id} list={list} index={index} />
            ))}
          </div>
        )}

        {listings.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mt-12"
          >
            <Link href="/listings">
              <button className="inline-flex items-center space-x-2 px-8 py-3 bg-[#F47C48] text-white rounded-md hover:bg-[#e86d3f] transition-all duration-300 transform hover:scale-105">
                <span>View All Properties</span>
                <FaArrowRight className="transform group-hover:translate-x-2 transition-transform duration-300" />
              </button>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
