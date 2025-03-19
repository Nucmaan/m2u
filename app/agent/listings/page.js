"use client";

import RaadiLoading from "@/components/RaadiLoading";
import userAuth from "@/myStore/UserAuth";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiSearch, FiPlus, FiEdit2, FiEye, FiTrash2, FiBell } from "react-icons/fi";
import { BiBed, BiBath, BiArea, BiFilterAlt } from "react-icons/bi";
import { FaSort } from "react-icons/fa";

export default function PropertyList() {
  const [listings, setListings] = useState([]);
  const user = userAuth((state) => state.user);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [listingToDelete, setListingToDelete] = useState(null);

  const getListings = useCallback(async () => {
    setLoading(true);
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
      toast.error("Failed to fetch listings. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [user._id]);

  useEffect(() => {
    getListings();
  }, [getListings]);

  // Filter and sort listings
  const filteredListings = listings
    .filter((listing) => {
      // Apply status filter
      if (filterStatus === "all") return true;
      if (filterStatus === "available") return listing.status === "Available";
      if (filterStatus === "unavailable") return listing.status !== "Available";
      return true;
    })
    .filter((listing) => {
      // Apply search filter
      if (!searchTerm) return true;
      const searchLower = searchTerm.toLowerCase();
      return (
        listing.title.toLowerCase().includes(searchLower) ||
        listing.address.toLowerCase().includes(searchLower) ||
        listing.description?.toLowerCase().includes(searchLower)
      );
    })
    .sort((a, b) => {
      // Apply sort
      if (sortOrder === "newest") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      if (sortOrder === "oldest") {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
      if (sortOrder === "price-asc") {
        return a.price - b.price;
      }
      if (sortOrder === "price-desc") {
        return b.price - a.price;
      }
      return 0;
    });

  const availableProperties = filteredListings.filter(
    (listing) => listing.status === "Available"
  );

  const rentedOrSoldProperties = filteredListings.filter(
    (listing) => listing.status !== "Available"
  );

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  };

  const confirmDelete = (listingId) => {
    setListingToDelete(listingId);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (!listingToDelete) return;
    
    try {
      setIsDeleteModalOpen(false);
      const loadingToast = toast.loading("Deleting property...");
      
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_DOMAIN}/api/listings/${listingToDelete}`
      );
      
      toast.dismiss(loadingToast);
      toast.success(response.data.message || "Property deleted successfully");
      getListings();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete property");
    } finally {
      setListingToDelete(null);
    }
  };

  // Property Card Component
  const PropertyCard = ({ listing, isAvailable }) => (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition duration-300 border border-gray-100">
      <div className="relative">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black/30 z-10"></div>
        <Image
          src={listing.images[0] || "/placeholder-property.jpg"}
          alt={listing.title}
          width={500}
          height={300}
          className="w-full h-56 object-cover"
        />
        <div className="absolute top-3 right-3 z-20">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            isAvailable 
              ? "bg-green-100 text-green-800" 
              : "bg-amber-100 text-amber-800"
          }`}>
            {isAvailable ? "Available" : listing.status}
          </span>
        </div>
      </div>
      
      <div className="p-5">
        <h2 className="text-lg font-bold text-gray-800 line-clamp-1">
          {listing.title}
        </h2>
        <p className="text-sm text-gray-500 mt-1 line-clamp-1">
          {listing.address}
        </p>
        <p className="text-xl font-bold text-primary mt-2">
          {formatPrice(listing.price)}
          <span className="text-sm font-normal text-gray-500 ml-1">
            {listing.listingType === "rent" ? "/month" : ""}
          </span>
        </p>
        
        <div className="flex items-center justify-between mt-3 text-sm text-gray-500 border-t border-gray-100 pt-3">
          <div className="flex items-center">
            <BiBed className="mr-1" />
            <span>{listing.bedrooms} Beds</span>
          </div>
          <div className="flex items-center">
            <BiBath className="mr-1" />
            <span>{listing.bathrooms} Baths</span>
          </div>
          <div className="flex items-center">
            <BiArea className="mr-1" />
            <span>{listing.sqft || "N/A"} sqft</span>
          </div>
        </div>
        
        <div className="mt-4 grid grid-cols-3 gap-2">
          <Link href={`/agent/listings/${listing._id}`} className="flex items-center justify-center px-3 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-all gap-1">
            <FiEdit2 size={14} />
            <span>Edit</span>
          </Link>
          <Link href={`/agent/listings/view/${listing._id}`} className="flex items-center justify-center px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all gap-1">
            <FiEye size={14} />
            <span>View</span>
          </Link>
          <button 
            onClick={() => confirmDelete(listing._id)}
            className="flex items-center justify-center px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all gap-1"
          >
            <FiTrash2 size={14} />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  );

  if (loading) return <RaadiLoading />;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-[#F7F7F9] pt-[110px] pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">My Properties</h1>
            <p className="text-gray-500 mt-1">Manage your property listings</p>
          </div>
          <Link 
            href="/agent/listings/addproperty"
            className="mt-4 md:mt-0 flex items-center justify-center gap-2 px-5 py-2.5 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-colors shadow-sm"
          >
            <FiPlus size={16} />
            <span>Add New Property</span>
          </Link>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search properties by title, address or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            
            <div className="flex flex-wrap gap-2 md:gap-3">
              <div className="relative">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="appearance-none pl-3 pr-8 py-2 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-gray-700"
                >
                  <option value="all">All Status</option>
                  <option value="available">Available</option>
                  <option value="unavailable">Not Available</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                  <BiFilterAlt />
                </div>
              </div>
              
              <div className="relative">
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="appearance-none pl-3 pr-8 py-2 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-gray-700"
                >
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                  <FaSort />
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-4 text-sm">
            <p className="text-gray-600">
              <span className="font-medium">{filteredListings.length}</span> properties found
            </p>
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm("")}
                className="text-primary hover:text-primary-dark"
              >
                Clear search
              </button>
            )}
          </div>
        </div>

        {/* Results Summary */}
        {filteredListings.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <div className="mx-auto w-16 h-16 flex items-center justify-center bg-gray-100 rounded-full mb-4">
              <FiBell className="text-gray-400 text-xl" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">No properties found</h3>
            <p className="text-gray-500 mb-6">
              {searchTerm 
                ? `No results match your search criteria.` 
                : `You haven't added any properties yet.`}
            </p>
            <Link 
              href="/agent/listings/addproperty"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-colors"
            >
              <FiPlus size={16} />
              <span>Add Your First Property</span>
            </Link>
          </div>
        ) : (
          <>
            {/* Available Properties Section */}
            {filterStatus !== "unavailable" && availableProperties.length > 0 && (
              <section className="mb-10">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  Available Properties
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {availableProperties.map((listing) => (
                    <PropertyCard 
                      key={listing._id} 
                      listing={listing} 
                      isAvailable={true} 
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Rented/Sold Properties Section */}
            {filterStatus !== "available" && rentedOrSoldProperties.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  Unavailable Properties
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {rentedOrSoldProperties.map((listing) => (
                    <PropertyCard 
                      key={listing._id} 
                      listing={listing} 
                      isAvailable={false} 
                    />
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Confirm Deletion</h3>
            <p className="text-gray-500 mb-5">
              Are you sure you want to delete this property? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
