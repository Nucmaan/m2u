"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import ViewSingleList from "@/components/ViewSingleList";
import { motion } from "framer-motion";
import { FaSearch, FaArrowLeft, FaHome } from "react-icons/fa";

export default function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentQuery = searchParams.get("query");
  const [searchQuery, setSearchQuery] = useState(currentQuery || "");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/listings/search?query=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F7F9] pt-28 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex flex-col items-center text-center mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-[#1A3B5D] mb-4">
              Find Your Perfect Property
            </h1>
            <p className="text-[#7A7A7A] max-w-2xl">
              Search through our extensive collection of properties. Enter a city name to get started.
            </p>
          </div>

          {/* Search Form */}
          <form 
            onSubmit={handleSearch}
            className="flex w-full max-w-2xl mx-auto mb-6"
          >
            <div className="relative flex-grow">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter city name..."
                className="w-full px-4 py-3 pl-12 pr-4 text-[#1A3B5D] bg-white rounded-l-lg border border-r-0 border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#F47C48] focus:border-transparent"
              />
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#7A7A7A]" />
            </div>
            <button 
              type="submit"
              className="px-8 py-3 bg-[#F47C48] text-white font-semibold rounded-r-lg hover:bg-[#e86d3f] transition-colors duration-300 flex items-center"
            >
              Search
            </button>
          </form>

          <div className="flex justify-center gap-4">
            <button
              onClick={() => router.push("/listings")}
              className="flex items-center text-[#1A3B5D] hover:text-[#F47C48] transition-colors"
            >
              <FaArrowLeft className="mr-2" /> Back to All Listings
            </button>
            <button
              onClick={() => router.push("/")}
              className="flex items-center text-[#1A3B5D] hover:text-[#F47C48] transition-colors"
            >
              <FaHome className="mr-2" /> Back to Home
            </button>
          </div>
        </motion.div>

        {/* Search Results */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <ViewSingleList />
        </motion.div>
      </div>
    </div>
  );
}