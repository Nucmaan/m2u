"use client";

import RaadiLoading from "@/components/RaadiLoading";
import userAuth from "@/myStore/UserAuth";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState, useCallback } from "react";
import { FaCalendarAlt, FaHome, FaMoneyBillWave, FaUser, FaPhone, FaEnvelope, FaCheckCircle, FaHourglass, FaTimesCircle, FaClock, FaFileContract, FaTag, FaChevronLeft, FaChevronRight } from "react-icons/fa";

function ContractPage() {
  const [userContracts, setUserContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");
  const user = userAuth((state) => state.user);
  const [errormessage, setErrorMessage] = useState("");
   const [activeImages, setActiveImages] = useState({});

  const getOwnerContracts = useCallback(async () => {
    if (!user || !user._id) return;
    try {
      const response = await axios.get(
        `/api/contracts/usercontract/${user._id}`
      );
      setUserContracts(response.data.contracts);
      
      // Initialize active image index for each contract
      const initialActiveImages = {};
      response.data.contracts.forEach(contract => {
        initialActiveImages[contract._id] = 0;
      });
      setActiveImages(initialActiveImages);
    } catch (error) {
      setErrorMessage("Failed to fetch contracts");
      setUserContracts([]); 
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    getOwnerContracts();
  }, [getOwnerContracts]);

  const getContractCountByStatus = (status) => {
    if (status === 'all') return userContracts.length;
    return userContracts.filter(contract => contract.status === status).length;
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Active":
        return <FaCheckCircle className="mr-2 text-green-500" />;
      case "Pending":
        return <FaHourglass className="mr-2 text-[#F47C48]" />;
      case "Completed":
        return <FaCheckCircle className="mr-2 text-[#4C8492]" />;
      case "Cancelled":
        return <FaTimesCircle className="mr-2 text-red-500" />;
      case "Expired":
        return <FaClock className="mr-2 text-gray-500" />;
      default:
        return null;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Not Available";
    try {
      const date = new Date(dateString);
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return date.toLocaleDateString('en-US', options);
    } catch (error) {
      return "Invalid Date";
    }
  };

   const handleImageNav = (contractId, direction) => {
    setActiveImages(prev => {
      const contract = userContracts.find(c => c._id === contractId);
      if (!contract || !contract.property.images || contract.property.images.length <= 1) {
        return prev;
      }
      
      const currentIndex = prev[contractId] || 0;
      const imageCount = contract.property.images.length;
      
      let newIndex;
      if (direction === 'next') {
        newIndex = (currentIndex + 1) % imageCount;
      } else {
        newIndex = (currentIndex - 1 + imageCount) % imageCount;
      }
      
      return { ...prev, [contractId]: newIndex };
    });
  };

   const handleImageError = (e) => {
    e.target.src = "https://via.placeholder.com/300x200?text=No+Image+Available";
  };

   const filterTabs = [
    { label: "All Contracts", value: "all", icon: <FaFileContract /> },
    { label: "Active", value: "Active", icon: <FaCheckCircle /> },
    { label: "Pending", value: "Pending", icon: <FaHourglass /> },
    { label: "Completed", value: "Completed", icon: <FaCheckCircle /> }
  ];

  const filteredContracts = activeFilter === 'all' 
    ? userContracts 
    : userContracts.filter(contract => contract.status === activeFilter);

  return (
    <div className="min-h-screen bg-[#F7F7F9] pt-28 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
         <div className="bg-gradient-to-r from-[#4C8492] to-[#1A3B5D] rounded-xl p-6 mb-6 text-white shadow-md">
          <h1 className="text-2xl font-bold">My Contracts</h1>
          <p className="mt-1 text-gray-100">Manage all your property agreements in one place</p>
        </div>

        {loading ? (
          <div className="bg-white rounded-xl shadow-md p-12 flex justify-center">
            <RaadiLoading fullScreen={false} />
          </div>
        ) : errormessage ? (
          <div className="bg-white rounded-xl shadow-md p-12 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <FaTimesCircle className="text-red-500 text-2xl" />
            </div>
            <h2 className="text-xl font-semibold text-gray-700">Error Loading Contracts</h2>
            <p className="text-gray-500 mt-2 max-w-md">{errormessage}</p>
          </div>
        ) : userContracts.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <div className="flex flex-col items-center justify-center">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <FaFileContract className="text-gray-400 text-4xl" />
              </div>
              <h2 className="text-xl font-semibold text-gray-700">No Contracts Found</h2>
              <p className="text-gray-500 mt-2 max-w-md">
                You do not have any active contracts at the moment.
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
             <div className="grid grid-cols-2 md:grid-cols-4 border-b divide-x">
              {filterTabs.map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setActiveFilter(tab.value)}
                  className={`py-4 px-4 flex flex-col items-center justify-center transition-colors ${
                    activeFilter === tab.value
                      ? "bg-gray-50 border-t-2 border-[#F47C48]"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center mb-1">
                    <span className={`mr-2 ${
                      activeFilter === tab.value 
                        ? "text-[#F47C48]" 
                        : "text-gray-500"
                    }`}>
                      {tab.icon}
                    </span>
                    <span className={`font-medium ${
                      activeFilter === tab.value 
                        ? "text-[#F47C48]" 
                        : "text-gray-700"
                    }`}>
                      {tab.label}
                    </span>
                  </div>
                  <span className="text-xl font-bold text-gray-800">
                    {getContractCountByStatus(tab.value)}
                  </span>
                </button>
              ))}
            </div>

             <div className="p-6">
              {filteredContracts.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">No {activeFilter.toLowerCase()} contracts found.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredContracts.map((contract) => {
                    const {
                      _id,
                      property,
                      startDate,
                      endDate,
                      monthlyRent,
                      deposit,
                      status,
                      owner,
                    } = contract;

                    const hasImages = property?.images?.length > 0;
                    const activeImageIndex = activeImages[_id] || 0;
                    const currentImage = hasImages ? property.images[activeImageIndex] : null;

                    return (
                      <div
                        key={_id || "unknown-id"}
                        className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300"
                      >
                        <div className="md:flex">
                           <div className="md:w-1/3 bg-gray-50 relative">
                            {hasImages ? (
                              <div className="relative h-48 md:h-full w-full">
                              <Image 
                              src={currentImage} 
                              alt={property.title || "Property"} 
                              layout="fill"
                              objectFit="cover"
                              onError={(e) => e.target.src = "https://via.placeholder.com/300x200?text=No+Image+Available"}
                            />
                            
                                {property.images.length > 1 && (
                                  <>
                                    <button 
                                      onClick={() => handleImageNav(_id, 'prev')}
                                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 focus:outline-none"
                                    >
                                      <FaChevronLeft size={16} />
                                    </button>
                                    <button 
                                      onClick={() => handleImageNav(_id, 'next')}
                                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 focus:outline-none"
                                    >
                                      <FaChevronRight size={16} />
                                    </button>
                                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1">
                                      {property.images.map((_, index) => (
                                        <div 
                                          key={index}
                                          className={`h-2 w-2 rounded-full ${
                                            index === activeImageIndex 
                                              ? "bg-white" 
                                              : "bg-white bg-opacity-50"
                                          }`}
                                        />
                                      ))}
                                    </div>
                                  </>
                                )}
                                <div className="absolute top-2 left-2 px-3 py-1 bg-black bg-opacity-50 text-white text-sm rounded-full">
                                  {property.houseType}
                                </div>
                              </div>
                            ) : (
                              <div className="flex items-center justify-center p-6 h-48 md:h-full">
                                <div className="text-center">
                                  <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-2">
                                    <FaHome className={`text-3xl ${property.houseType === "Buy" ? "text-[#1A3B5D]" : "text-[#F47C48]"}`} />
                                  </div>
                                  <span className="text-sm font-medium text-gray-700">{property.houseType} Contract</span>
                                </div>
                              </div>
                            )}
                          </div>

                           <div className="p-6 md:w-2/3">
                            <div className="flex justify-between items-start mb-4">
                              <div>
                                <h3 className="text-xl font-semibold text-gray-800">
                                  {property.title || "Untitled Property"}
                                </h3>
                                <div className="flex items-center text-gray-500 mt-1">
                                  <FaCalendarAlt className="mr-2 text-[#4C8492]" />
                                  {property.houseType === "Buy" ? (
                                    <span>Purchase Date: {formatDate(startDate)}</span>
                                  ) : (
                                    <span>Period: {formatDate(startDate)} - {formatDate(endDate)}</span>
                                  )}
                                </div>
                              </div>
                              <div className={`px-3 py-1 rounded-full text-sm font-medium flex items-center ${
                                status === "Active" ? "bg-green-100 text-green-800" : 
                                status === "Pending" ? "bg-yellow-100 text-yellow-800" :
                                status === "Completed" ? "bg-blue-100 text-blue-800" :
                                status === "Cancelled" ? "bg-red-100 text-red-800" :
                                "bg-gray-100 text-gray-800"
                              }`}>
                                {getStatusIcon(status)}
                                {status}
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                              <div className="flex items-center text-gray-600">
                                <FaHome className="mr-2 text-gray-400" />
                                <span>Type: {property.houseType}</span>
                              </div>
                              <div className="flex items-center text-gray-600">
                                <FaMoneyBillWave className="mr-2 text-gray-400" />
                                <span>
                                  {property.houseType === "Buy" 
                                    ? `Price: $${property.price}`
                                    : `Rent: $${property.price}/month`}
                                </span>
                              </div>
                              {property.houseType === "Rent" && deposit && (
                                <div className="flex items-center text-gray-600">
                                  <FaMoneyBillWave className="mr-2 text-gray-400" />
                                  <span>Deposit: ${deposit}</span>
                                </div>
                              )}
                            </div>

                            <div className="flex items-center text-gray-600 mb-4">
                              <FaTag className="mr-2 text-gray-400" />
                              <span>Location: {property.city}, {property.address}</span>
                            </div>

                            <div className="border-t pt-4">
                              <h4 className="text-sm font-medium text-gray-700 mb-2">Owner Contact</h4>
                              <div className="flex flex-wrap gap-4">
                                {owner?.username && (
                                  <div className="flex items-center text-gray-600 text-sm">
                                    <FaUser className="mr-2 text-gray-400" />
                                    <span>{owner.username}</span>
                                  </div>
                                )}
                                {owner?.email && (
                                  <div className="flex items-center text-gray-600 text-sm">
                                    <FaEnvelope className="mr-2 text-gray-400" />
                                    <span>{owner.email}</span>
                                  </div>
                                )}
                                {owner?.mobile && (
                                  <div className="flex items-center text-gray-600 text-sm">
                                    <FaPhone className="mr-2 text-gray-400" />
                                    <span>{owner.mobile}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ContractPage;
