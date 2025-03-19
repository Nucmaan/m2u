"use client";
import userAuth from "@/myStore/UserAuth";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState, useCallback } from "react";
import { FaPlus, FaCalendarAlt, FaFileContract, FaBell, FaChartLine, FaRegClock } from "react-icons/fa";
import { BsHouseDoor, BsArrowRight, BsBarChartLine, BsGrid } from "react-icons/bs";
import { RiDashboardLine } from "react-icons/ri";

const AgentDashboard = () => {
  const user = userAuth((state) => state.user);
  const [listings, setListings] = useState([]);
  const [ownerContracts, setOwnerContracts] = useState([]);
  const [ownerBookings, setOwnerBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [recentActivities, setRecentActivities] = useState([]);
  
  // Get current time for greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const fetchOwnerBookings = useCallback(async () => {
    try {
      if (!user?._id) {
        return;
      }

      const response = await axios.get(`/api/booking/ownerBooking/${user._id}`);

      if (response.status === 200) {
        setOwnerBookings(response.data.bookings);
        setError(""); 
      } else {
        setOwnerBookings([]);
      }
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch bookings.");
    } finally {
      setLoading(false);
    }
  }, [user?._id]);

  const getOwnerContracts = useCallback(async () => {
    try {
      if (!user?._id) return;

      const response = await axios.get(
        `/api/contracts/ownercontract/${user._id}`
      );

      if (response.status === 404) {
        setOwnerContracts([]);
      } else {
        setOwnerContracts(response.data.contracts);
      }
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch contracts.");
    }
  }, [user?._id]);

  const getListings = useCallback(async () => {
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
      setErrorMessage(error.message);
    }
  }, [user?._id]);

  // Generate recent activities from various data sources
  const generateRecentActivities = useCallback(() => {
    const activities = [];
    
    // Add recent bookings (last 3)
    ownerBookings.slice(0, 3).forEach(booking => {
      activities.push({
        id: `booking-${booking._id}`,
        type: 'booking',
        title: `New booking request: ${booking.propertyName || 'Property'}`,
        date: new Date(booking.createdAt || Date.now()),
        status: booking.status
      });
    });
    
    // Add recent contracts (last 3)
    ownerContracts.slice(0, 3).forEach(contract => {
      activities.push({
        id: `contract-${contract._id}`,
        type: 'contract',
        title: `Contract ${contract.status}: ${contract.propertyName || 'Property'}`,
        date: new Date(contract.createdAt || Date.now()),
        status: contract.status
      });
    });
    
    // Sort by date (newest first)
    activities.sort((a, b) => b.date - a.date);
    
    setRecentActivities(activities.slice(0, 5));
  }, [ownerBookings, ownerContracts]);

  useEffect(() => {
    if (user?._id) {
      Promise.all([
        getOwnerContracts(),
        fetchOwnerBookings(),
        getListings()
      ]).finally(() => {
        setLoading(false);
      });
    }
  }, [user?._id, getOwnerContracts, fetchOwnerBookings, getListings]);

  useEffect(() => {
    generateRecentActivities();
  }, [ownerBookings, ownerContracts, generateRecentActivities]);

  const availableProperties = listings.filter(
    (listing) => listing.status === "Available"
  );

  const pendingBooking = ownerBookings.filter(
    (booking) => booking.status === "pending" && booking.owner === user._id
  );

  // Display loading state
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F7F7F9]">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-gray-50 to-[#F7F7F9]">
      {/* Main Content with top padding */}
      <main className="flex-1 p-6 pt-[114px]">
        {/* Welcome Banner */}
        <div className="relative mb-8 overflow-hidden rounded-xl bg-gradient-to-r from-primary to-blue-600 text-white">
          <div className="absolute right-0 top-0 opacity-10">
            <svg xmlns="http://www.w3.org/2000/svg" width="300" height="150" viewBox="0 0 100 100">
              <path fill="white" d="M95,50 L75,25 L75,10 L90,10 L90,0 L0,0 L0,10 L15,10 L15,25 L5,50 L15,75 L15,100 L75,100 L75,75 L95,50Z"></path>
            </svg>
          </div>
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div>
                <h2 className="text-xl md:text-2xl font-light mb-1">{getGreeting()},</h2>
                <h1 className="text-2xl md:text-3xl font-bold mb-3">{user.username}</h1>
                <p className="text-blue-100">Welcome to your agent dashboard</p>
              </div>
              <div className="mt-4 md:mt-0 flex items-center bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                <div className="w-12 h-12 md:w-14 md:h-14 relative rounded-full overflow-hidden border-2 border-white">
                  <Image
                    src={user.avatar || "/default-avatar.png"}
                    alt="User Avatar"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="ml-3">
                  <p className="font-medium">{user.username}</p>
                  <p className="text-sm text-blue-100">{user.role}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Error Display */}
        {(error || errorMessage) && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error || errorMessage}</p>
              </div>
            </div>
          </div>
        )}

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group">
            <div className="h-2 bg-gradient-to-r from-blue-400 to-primary"></div>
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-800">Active Listings</h3>
                <div className="p-2 rounded-full bg-blue-50 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <BsHouseDoor className="text-xl" />
                </div>
              </div>
              <div className="flex items-end">
                <p className="text-4xl font-bold text-gray-800 leading-none mb-2">
                  {availableProperties.length || 0}
                </p>
                <div className="flex items-center ml-2 mb-2">
                  <BsBarChartLine className="text-green-500" />
                  <span className="text-xs text-green-500 ml-1">+2%</span>
                </div>
              </div>
              <div className="h-1 w-full bg-gray-100 mb-3 rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: `${Math.min(100, availableProperties.length * 10)}%` }}></div>
              </div>
              <Link href="/agent/listings" className="flex items-center text-sm text-primary font-medium hover:text-primary-dark group-hover:underline">
                View all properties <BsArrowRight className="ml-1 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
          
          <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group">
            <div className="h-2 bg-gradient-to-r from-amber-400 to-amber-500"></div>
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-800">Pending Bookings</h3>
                <div className="p-2 rounded-full bg-amber-50 text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-all duration-300">
                  <FaCalendarAlt className="text-xl" />
                </div>
              </div>
              <div className="flex items-end">
                <p className="text-4xl font-bold text-gray-800 leading-none mb-2">
                  {pendingBooking.length || 0}
                </p>
                {pendingBooking.length > 0 && (
                  <span className="ml-2 mb-2 text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full">
                    Requires attention
                  </span>
                )}
              </div>
              <div className="h-1 w-full bg-gray-100 mb-3 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: `${Math.min(100, pendingBooking.length * 20)}%` }}></div>
              </div>
              <Link href="/agent/booking" className="flex items-center text-sm text-amber-600 font-medium hover:text-amber-700 group-hover:underline">
                Manage bookings <BsArrowRight className="ml-1 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
          
          <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group">
            <div className="h-2 bg-gradient-to-r from-emerald-400 to-emerald-500"></div>
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-800">Active Contracts</h3>
                <div className="p-2 rounded-full bg-emerald-50 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                  <FaFileContract className="text-xl" />
                </div>
              </div>
              <div className="flex items-end">
                <p className="text-4xl font-bold text-gray-800 leading-none mb-2">
                  {ownerContracts.length || 0}
                </p>
                <div className="flex items-center ml-2 mb-2">
                  <FaRegClock className="text-gray-500" />
                  <span className="text-xs text-gray-500 ml-1">Last updated today</span>
                </div>
              </div>
              <div className="h-1 w-full bg-gray-100 mb-3 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${Math.min(100, ownerContracts.length * 15)}%` }}></div>
              </div>
              <Link href="/agent/contract" className="flex items-center text-sm text-emerald-600 font-medium hover:text-emerald-700 group-hover:underline">
                View contracts <BsArrowRight className="ml-1 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Actions and Recent Activity */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <div className="md:col-span-1 bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-lg font-semibold text-gray-800">Quick Actions</h3>
              <BsGrid className="text-gray-400" />
            </div>
            <div className="space-y-3">
              <Link 
                href="/agent/listings/create" 
                className="flex items-center gap-3 p-4 rounded-lg group hover:bg-primary hover:text-white transition-all duration-300 border border-gray-100"
              >
                <div className="p-2 rounded-full bg-primary/10 text-primary group-hover:bg-white group-hover:text-primary">
                  <FaPlus />
                </div>
                <div>
                  <span className="font-medium">Add New Property</span>
                  <p className="text-xs text-gray-500 group-hover:text-white/80">Create a new property listing</p>
                </div>
              </Link>
              
              <Link 
                href="/agent/booking" 
                className="flex items-center gap-3 p-4 rounded-lg group hover:bg-amber-500 hover:text-white transition-all duration-300 border border-gray-100"
              >
                <div className="p-2 rounded-full bg-amber-50 text-amber-500 group-hover:bg-white group-hover:text-amber-500">
                  <FaCalendarAlt />
                </div>
                <div>
                  <span className="font-medium">View Bookings</span>
                  <p className="text-xs text-gray-500 group-hover:text-white/80">Manage pending requests</p>
                </div>
              </Link>
              
              <Link 
                href="/agent/contract" 
                className="flex items-center gap-3 p-4 rounded-lg group hover:bg-emerald-500 hover:text-white transition-all duration-300 border border-gray-100"
              >
                <div className="p-2 rounded-full bg-emerald-50 text-emerald-500 group-hover:bg-white group-hover:text-emerald-500">
                  <FaFileContract />
                </div>
                <div>
                  <span className="font-medium">Manage Contracts</span>
                  <p className="text-xs text-gray-500 group-hover:text-white/80">Review and update contracts</p>
                </div>
              </Link>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-lg font-semibold text-gray-800">Recent Activity</h3>
              <div className="relative">
                <FaBell className="text-gray-400 cursor-pointer hover:text-primary transition-colors" />
                {pendingBooking.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">{pendingBooking.length}</span>
                )}
              </div>
            </div>
            
            {recentActivities.length > 0 ? (
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start p-3 rounded-lg hover:bg-gray-50 border border-gray-50 transition-all">
                    <div className={`p-2 rounded-full mr-3 ${
                      activity.type === 'booking' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'
                    }`}>
                      {activity.type === 'booking' ? (
                        <FaCalendarAlt className="text-lg" />
                      ) : (
                        <FaFileContract className="text-lg" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">{activity.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-xs text-gray-500">
                          {activity.date.toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          activity.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                          activity.status === 'approved' ? 'bg-green-100 text-green-800' : 
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {activity.status}
                        </span>
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-primary">
                      <BsArrowRight />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center bg-gray-50 p-8 rounded-lg">
                <div className="p-3 rounded-full bg-gray-100 mb-3">
                  <FaRegClock className="text-gray-400 text-2xl" />
                </div>
                <p className="text-gray-500 mb-1">No recent activity found</p>
                <p className="text-xs text-gray-400">New activity will appear here</p>
              </div>
            )}
            
            {recentActivities.length > 0 && (
              <Link href="/agent/activities" className="inline-flex items-center text-primary hover:text-primary-dark mt-5 text-sm font-medium">
                View all activity <BsArrowRight className="ml-1 transition-transform group-hover:translate-x-1" />
              </Link>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AgentDashboard;
