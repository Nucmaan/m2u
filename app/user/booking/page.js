"use client";

import userAuth from "@/myStore/UserAuth";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import RaadiLoading from "@/components/RaadiLoading";
import { FaCalendarAlt, FaMapMarkerAlt, FaHome, FaMoneyBill, FaPhone, FaEnvelope, FaTimes, FaCheckCircle, FaHourglass, FaClock, FaImage } from "react-icons/fa";
import Image from "next/image";

function UserBookingPage() {
  const [userBookings, setUserBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const user = userAuth((state) => state.user);
  const [errormessage, setErrorMessage] = useState("");
  const [imageErrors, setImageErrors] = useState({});

  const handleImageError = (bookingId) => {
    setImageErrors(prev => ({
      ...prev,
      [bookingId]: true
    }));
  };

  const fetchUserBookings = useCallback(async () => {
    if (!user?._id) return;
    try {
      const response = await axios.get(`/api/booking/userBooking/${user._id}`);
      setUserBookings(response.data.bookings);
    } catch (error) {
      setErrorMessage("Failed to fetch user bookings");
    } finally {
      setLoading(false);
    }
  }, [user?._id]);

  useEffect(() => {
    fetchUserBookings();
  }, [fetchUserBookings]);

  const handleCancelBooking = async (id) => {
    try {
      const response = await axios.delete(`/api/booking/cancel/${id}`);
      toast.success(response.data.message);
      setUserBookings((prevBookings) =>
        prevBookings.filter((booking) => booking._id !== id)
      );
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to cancel booking");
    }
  };

  const getBookingCountByStatus = (status) => {
    if (status === 'all') return userBookings.length;
    return userBookings.filter(booking => booking.status === status).length;
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <FaCheckCircle className="mr-2 text-green-500" />;
      case "processing":
        return <FaHourglass className="mr-2 text-[#4C8492]" />;
      case "pending":
        return <FaClock className="mr-2 text-[#F47C48]" />;
      case "cancelled":
        return <FaTimes className="mr-2 text-red-500" />;
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

  // Filter tabs
  const filterTabs = [
    { label: "All Bookings", value: "all", icon: <FaHome /> },
    { label: "Pending", value: "pending", icon: <FaClock /> },
    { label: "Processing", value: "processing", icon: <FaHourglass /> },
    { label: "Completed", value: "completed", icon: <FaCheckCircle /> },
    { label: "Cancelled", value: "cancelled", icon: <FaTimes /> }
  ];

  const filteredBookings = activeTab === 'all' 
    ? userBookings 
    : userBookings.filter(booking => booking.status === activeTab);

  return (
    <div className="min-h-screen bg-[#F7F7F9] pt-28 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
         <div className="bg-gradient-to-r from-[#4C8492] to-[#1A3B5D] rounded-xl p-6 mb-6 text-white shadow-md">
          <h1 className="text-2xl font-bold">My Bookings</h1>
          <p className="mt-1 text-gray-100">Manage and track your property visits</p>
        </div>

        {loading ? (
          <div className="bg-white rounded-xl shadow-md p-12 flex justify-center">
            <RaadiLoading fullScreen={false} />
          </div>
        ) : errormessage ? (
          <div className="bg-white rounded-xl shadow-md p-12 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <FaTimes className="text-red-500 text-2xl" />
            </div>
            <h2 className="text-xl font-semibold text-gray-700">Error Loading Bookings</h2>
            <p className="text-gray-500 mt-2 max-w-md">{errormessage}</p>
          </div>
        ) : userBookings.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <div className="flex flex-col items-center justify-center">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <FaCalendarAlt className="text-gray-400 text-4xl" />
              </div>
              <h2 className="text-xl font-semibold text-gray-700">No Bookings Found</h2>
              <p className="text-gray-500 mt-2 max-w-md">
                You don not have any property bookings at the moment.
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
             <div className="grid grid-cols-2 md:grid-cols-5 border-b divide-x">
              {filterTabs.map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setActiveTab(tab.value)}
                  className={`py-4 px-4 flex flex-col items-center justify-center transition-colors ${
                    activeTab === tab.value
                      ? "bg-gray-50 border-t-2 border-[#F47C48]"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center mb-1">
                    <span className={`mr-2 ${
                      activeTab === tab.value 
                        ? "text-[#F47C48]" 
                        : "text-gray-500"
                    }`}>
                      {tab.icon}
                    </span>
                    <span className={`font-medium ${
                      activeTab === tab.value 
                        ? "text-[#F47C48]" 
                        : "text-gray-700"
                    }`}>
                      {tab.label}
                    </span>
                  </div>
                  <span className="text-xl font-bold text-gray-800">
                    {getBookingCountByStatus(tab.value)}
                  </span>
                </button>
              ))}
            </div>

             <div className="p-6">
              {filteredBookings.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">No {activeTab === 'all' ? '' : activeTab} bookings found.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredBookings.map((booking) => (
                    <div
                      key={booking._id || "unknown-id"}
                      className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300"
                    >
                      <div className="md:flex">
                         <div className="md:w-1/4 bg-gray-100 flex items-center justify-center h-48 md:h-auto">
                          {booking.listing?.images && booking.listing.images.length > 0 && !imageErrors[booking._id] ? (
                            <div className="relative w-full h-full">
                            <Image
                            src={booking.listing.images[0]}
                            alt={booking.listing?.title || "Property"}
                            layout="fill"
                            objectFit="cover"
                            onError={() => handleImageError(booking._id)}
                          />
                          
                            </div>
                          ) : (
                            <div className="flex flex-col items-center justify-center p-4 h-full">
                              <FaHome className="text-gray-300 text-5xl mb-2" />
                              <p className="text-gray-400 text-sm text-center">Property image not available</p>
                            </div>
                          )}
                        </div>

                         <div className="md:w-3/4 p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="text-xl font-semibold text-gray-800">
                                {booking.listing?.title || "Not Available"}
                              </h3>
                              <div className="mt-2 flex items-center text-gray-600">
                                <FaMapMarkerAlt className="mr-2 text-[#F47C48]" />
                                <span>{booking.listing?.address}, {booking.listing?.city || "Not Available"}</span>
                              </div>
                            </div>
                            <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center ${
                              booking.status === "completed" ? "bg-green-100 text-green-800" : 
                              booking.status === "processing" ? "bg-blue-100 text-blue-800" :
                              booking.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                              "bg-red-100 text-red-800"
                            }`}>
                              {getStatusIcon(booking.status)}
                              {booking.status}
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div className="flex items-center">
                              <FaCalendarAlt className="mr-2 text-gray-400" />
                              <div>
                                <p className="text-xs text-gray-500">Visiting Date</p>
                                <p className="text-sm font-medium">{formatDate(booking.visitingDate)}</p>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <FaHome className="mr-2 text-gray-400" />
                              <div>
                                <p className="text-xs text-gray-500">Property Type</p>
                                <p className="text-sm font-medium">{booking.listing?.houseType || "Not Available"}</p>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <FaMoneyBill className="mr-2 text-gray-400" />
                              <div>
                                <p className="text-xs text-gray-500">Price</p>
                                <p className="text-sm font-medium">${booking.listing?.price || "N/A"}</p>
                              </div>
                            </div>
                          </div>

                          <div className="border-t pt-4 mt-4">
                            <h4 className="text-sm font-medium text-gray-700 mb-2">Owner Contact</h4>
                            <div className="flex flex-wrap gap-4">
                              <div className="flex items-center text-gray-600 text-sm">
                                <FaEnvelope className="mr-2 text-gray-400" />
                                <span>{booking.owner?.email || "Not Available"}</span>
                              </div>
                              <div className="flex items-center text-gray-600 text-sm">
                                <FaPhone className="mr-2 text-gray-400" />
                                <span>{booking.owner?.mobile || "Not Available"}</span>
                              </div>
                            </div>
                          </div>

                          {booking.status === "pending" && (
                            <div className="mt-4 pt-4 border-t flex justify-end">
                              <button
                                onClick={() => handleCancelBooking(booking._id)}
                                className="flex items-center px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                              >
                                <FaTimes className="mr-2" />
                                Cancel Booking
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserBookingPage;
