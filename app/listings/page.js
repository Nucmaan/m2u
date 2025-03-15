"use client";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { 
  FaBed, 
  FaBath, 
  FaMapMarkerAlt, 
  FaMoneyBillWave, 
  FaSearch, 
  FaFilter, 
  FaHome, 
  FaBuilding, 
  FaSortAmountDown, 
  FaSortAmountUp,
  FaTimesCircle,
  FaSpinner,
  FaUndo
} from "react-icons/fa";
import RaadiLoading from "@/components/RaadiLoading";

const ListingCard = ({ listing, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-[#E0E0E0] h-full flex flex-col group"
    >
      <div className="relative w-full h-52 overflow-hidden">
        <Image
          src={listing.images[0] || "/images/nasri.jpg"}
          alt={listing.title}
          fill
          style={{ objectFit: "cover" }}
          className="transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
        <div
          className={`absolute top-4 right-4 px-3 py-1 text-xs font-semibold rounded-full ${
            listing.houseType === "Rent"
              ? "bg-[#4C8492] text-white"
              : "bg-[#27AE60] text-white"
          }`}
        >
          {listing.houseType}
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h2 className="text-xl font-semibold text-[#1A3B5D] mb-2 line-clamp-1 group-hover:text-[#F47C48] transition-colors duration-300">
          {listing.title}
        </h2>
        
        <div className="flex items-center text-sm text-[#7A7A7A] mb-2">
          <FaMapMarkerAlt className="mr-2 text-[#F47C48]" />
          <p className="line-clamp-1">{listing.address || listing.city || "N/A"}</p>
        </div>
        
        <div className="flex items-center text-lg font-bold text-[#F47C48] mb-3">
          <FaMoneyBillWave className="mr-2" />
          ${listing.price}
        </div>

        <div className="mt-auto">
          <div className="mt-2 flex justify-between items-center text-sm text-[#7A7A7A] border-t border-gray-100 pt-3">
            <div className="flex items-center">
              <FaBed className="mr-1 text-[#4C8492]" />
              <span>{listing.bedrooms} Beds</span>
            </div>
            <div className="flex items-center">
              <FaBath className="mr-1 text-[#4C8492]" />
              <span>{listing.bathrooms} Baths</span>
            </div>
            <div className="flex items-center">
              <FaHome className="mr-1 text-[#4C8492]" />
              <span>{listing.propertySize || "N/A"}</span>
            </div>
          </div>

          <Link href={`/listings/${listing._id}`} className="block mt-4">
            <motion.button 
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-2.5 bg-[#1A3B5D] text-white font-semibold rounded-md hover:bg-[#16324A] transition-all duration-300 flex items-center justify-center"
            >
              View Details
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

const ListingCardSkeleton = () => (
  <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-[#E0E0E0] h-full flex flex-col animate-pulse">
    <div className="relative w-full h-52 bg-gray-200" />
    <div className="p-6 flex flex-col flex-grow">
      <div className="h-6 bg-gray-200 rounded-md w-3/4 mb-2" />
      <div className="flex items-center mb-2">
        <div className="w-4 h-4 bg-gray-200 rounded-full mr-2" />
        <div className="h-4 bg-gray-200 rounded-md w-1/2" />
      </div>
      <div className="flex items-center mb-3">
        <div className="w-4 h-4 bg-gray-200 rounded-full mr-2" />
        <div className="h-6 bg-gray-200 rounded-md w-1/4" />
      </div>
      <div className="mt-auto">
        <div className="mt-2 flex justify-between items-center border-t border-gray-100 pt-3">
          <div className="h-4 bg-gray-200 rounded-md w-1/4" />
          <div className="h-4 bg-gray-200 rounded-md w-1/4" />
          <div className="h-4 bg-gray-200 rounded-md w-1/4" />
        </div>
        <div className="mt-4 h-10 bg-gray-200 rounded-md w-full" />
      </div>
    </div>
  </div>
);

export default function PropertyListing() {
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    priceMin: "",
    priceMax: "",
    bedrooms: "",
    bathrooms: "",
    propertyType: "",
    houseType: "",
  });
  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);

  const applyFilters = useCallback(() => {
    let result = [...listings];
  
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      result = result.filter(
        (listing) =>
          listing.title?.toLowerCase().includes(search) ||
          listing.description?.toLowerCase().includes(search) ||
          listing.city?.toLowerCase().includes(search) ||
          listing.address?.toLowerCase().includes(search)
      );
    }
  
    if (filters.priceMin) {
      result = result.filter((listing) => listing.price >= parseInt(filters.priceMin));
    }
    if (filters.priceMax) {
      result = result.filter((listing) => listing.price <= parseInt(filters.priceMax));
    }
    if (filters.bedrooms) {
      result = result.filter((listing) => listing.bedrooms >= parseInt(filters.bedrooms));
    }
    if (filters.bathrooms) {
      result = result.filter((listing) => listing.bathrooms >= parseInt(filters.bathrooms));
    }
    if (filters.propertyType) {
      result = result.filter((listing) => listing.propertyType === filters.propertyType);
    }
    if (filters.houseType) {
      result = result.filter((listing) => listing.houseType === filters.houseType);
    }
  
    switch (sortBy) {
      case "priceAsc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "priceDesc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      default:
        break;
    }
  
    setFilteredListings(result);
  }, [listings, searchTerm, filters, sortBy]); // Add dependencies
  
  useEffect(() => {
    applyFilters();
  }, [applyFilters]); // Add applyFilters as a dependency
  
  

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const resetFilters = () => {
    setSearchTerm("");
    setFilters({
      priceMin: "",
      priceMax: "",
      bedrooms: "",
      bathrooms: "",
      propertyType: "",
      houseType: "",
    });
    setSortBy("newest");
  };

  const hasActiveFilters = () => {
    return (
      searchTerm ||
      filters.priceMin ||
      filters.priceMax ||
      filters.bedrooms ||
      filters.bathrooms ||
      filters.propertyType ||
      filters.houseType ||
      sortBy !== "newest"
    );
  };

  const activeFilterCount = () => {
    let count = 0;
    if (searchTerm) count++;
    if (filters.priceMin || filters.priceMax) count++;
    if (filters.bedrooms) count++;
    if (filters.bathrooms) count++;
    if (filters.propertyType) count++;
    if (filters.houseType) count++;
    if (sortBy !== "newest") count++;
    return count;
  };

  return (
    <section className="min-h-screen bg-[#F7F7F9] px-6 pt-28 pb-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
         <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#1A3B5D] mb-4">
            Discover Your Perfect Property
          </h1>
          <p className="text-lg text-[#7A7A7A] max-w-2xl mx-auto">
            Browse through our collection of premium properties available for sale and rent
          </p>
        </div>

         <div className="bg-white rounded-lg shadow-md p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
             <div className="flex-grow relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by location, title, or description..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F47C48] focus:border-transparent"
              />
            </div>

             <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-[#F47C48]/10 text-[#F47C48] font-medium rounded-md hover:bg-[#F47C48]/20 transition-colors duration-300"
            >
              <FaFilter />
              <span>Filters</span>
              {activeFilterCount() > 0 && (
                <span className="inline-flex items-center justify-center w-5 h-5 bg-[#F47C48] text-white text-xs rounded-full">
                  {activeFilterCount()}
                </span>
              )}
            </button>

             <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none w-full px-4 py-2 bg-[#1A3B5D]/10 text-[#1A3B5D] font-medium rounded-md hover:bg-[#1A3B5D]/20 transition-colors duration-300 pr-8 focus:outline-none focus:ring-2 focus:ring-[#1A3B5D]"
              >
                <option value="newest">Newest First</option>
                <option value="priceAsc">Price: Low to High</option>
                <option value="priceDesc">Price: High to Low</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                {sortBy === "priceAsc" ? (
                  <FaSortAmountUp className="text-[#1A3B5D]" />
                ) : sortBy === "priceDesc" ? (
                  <FaSortAmountDown className="text-[#1A3B5D]" />
                ) : (
                  <FaBuilding className="text-[#1A3B5D]" />
                )}
              </div>
            </div>
          </div>

           {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="border-t border-gray-200 pt-4 mt-2"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                 <div>
                  <label className="block text-sm font-medium text-[#7A7A7A] mb-1">
                    Min Price
                  </label>
                  <input
                    type="number"
                    name="priceMin"
                    value={filters.priceMin}
                    onChange={handleFilterChange}
                    placeholder="Min $"
                    className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F47C48]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#7A7A7A] mb-1">
                    Max Price
                  </label>
                  <input
                    type="number"
                    name="priceMax"
                    value={filters.priceMax}
                    onChange={handleFilterChange}
                    placeholder="Max $"
                    className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F47C48]"
                  />
                </div>

                 <div>
                  <label className="block text-sm font-medium text-[#7A7A7A] mb-1">
                    Bedrooms
                  </label>
                  <select
                    name="bedrooms"
                    value={filters.bedrooms}
                    onChange={handleFilterChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F47C48]"
                  >
                    <option value="">Any</option>
                    <option value="1">1+</option>
                    <option value="2">2+</option>
                    <option value="3">3+</option>
                    <option value="4">4+</option>
                    <option value="5">5+</option>
                  </select>
                </div>

                 <div>
                  <label className="block text-sm font-medium text-[#7A7A7A] mb-1">
                    Bathrooms
                  </label>
                  <select
                    name="bathrooms"
                    value={filters.bathrooms}
                    onChange={handleFilterChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F47C48]"
                  >
                    <option value="">Any</option>
                    <option value="1">1+</option>
                    <option value="2">2+</option>
                    <option value="3">3+</option>
                    <option value="4">4+</option>
                  </select>
                </div>

                 <div>
                  <label className="block text-sm font-medium text-[#7A7A7A] mb-1">
                    Property Type
                  </label>
                  <select
                    name="propertyType"
                    value={filters.propertyType}
                    onChange={handleFilterChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F47C48]"
                  >
                    <option value="">Any</option>
                    <option value="House">House</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Condo">Condo</option>
                    <option value="Villa">Villa</option>
                  </select>
                </div>

                 <div>
                  <label className="block text-sm font-medium text-[#7A7A7A] mb-1">
                    Sale/Rent
                  </label>
                  <select
                    name="houseType"
                    value={filters.houseType}
                    onChange={handleFilterChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F47C48]"
                  >
                    <option value="">Any</option>
                    <option value="Sale">Sale</option>
                    <option value="Rent">Rent</option>
                  </select>
                </div>
              </div>

               {hasActiveFilters() && (
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={resetFilters}
                    className="flex items-center text-[#F47C48] hover:text-[#e86d3f] transition-colors duration-300"
                  >
                    <FaUndo className="mr-1" /> Reset All Filters
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </div>

         <div className="flex justify-between items-center mb-6">
          <p className="text-[#7A7A7A]">
            {filteredListings.length} {filteredListings.length === 1 ? "property" : "properties"} found
          </p>
          {hasActiveFilters() && (
            <button
              onClick={resetFilters}
              className="text-sm flex items-center text-[#F47C48]"
            >
              <FaTimesCircle className="mr-1" /> Clear filters
            </button>
          )}
        </div>

         {loading ? (
          <>
            <div className="mb-8 flex justify-center">
              <FaSpinner className="animate-spin text-[#F47C48] text-3xl" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <ListingCardSkeleton key={i} />
              ))}
            </div>
          </>
        ) : error ? (
          <div className="text-center py-12">
            <FaTimesCircle className="text-red-500 text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-[#1A3B5D] mb-2">Oops! Something went wrong</h3>
            <p className="text-[#7A7A7A] mb-6">{error}</p>
            <button
              onClick={getListings}
              className="px-6 py-2 bg-[#F47C48] text-white rounded-md hover:bg-[#e86d3f] transition-colors duration-300"
            >
              Try Again
            </button>
          </div>
        ) : filteredListings.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <FaSearch className="text-[#1A3B5D]/30 text-5xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-[#1A3B5D] mb-2">
              No properties found
            </h3>
            <p className="text-[#7A7A7A] mb-6 max-w-lg mx-auto">
              We could not find any properties matching your criteria. Try adjusting your filters or broadening your search.
            </p>
            <button
              onClick={resetFilters}
              className="px-6 py-2 bg-[#F47C48] text-white rounded-md hover:bg-[#e86d3f] transition-colors duration-300"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredListings.map((listing, index) => (
              <ListingCard key={listing._id} listing={listing} index={index} />
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
}
