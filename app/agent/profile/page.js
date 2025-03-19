"use client";

import userAuth from "@/myStore/UserAuth";
import Image from "next/image";
import React, { useState } from "react";
import { FiEdit, FiMail, FiPhone, FiCalendar, FiUser, FiMapPin, FiInfo } from "react-icons/fi";
import { FaUserCheck, FaRegAddressCard, FaBuilding, FaShieldAlt, FaRegCopy } from "react-icons/fa";
import { HiOutlineIdentification } from "react-icons/hi";
import Link from "next/link";

// Profile info card component
const ProfileInfoCard = ({ icon: Icon, title, value, bgColor = "bg-blue-50" }) => {
  return (
    <div className="flex items-center gap-4 p-5 bg-white rounded-xl border border-gray-100 hover:shadow-md transition-all duration-200">
      <div className={`${bgColor} p-3 rounded-lg`}>
        <Icon className="text-primary text-xl" />
      </div>
      <div>
        <h2 className="text-sm font-medium text-gray-500">{title}</h2>
        <p className="text-gray-800 font-medium mt-1">{value || "Not available"}</p>
      </div>
    </div>
  );
};

const ProfilePage = () => {
  const user = userAuth((state) => state.user);
  const [copied, setCopied] = useState(false);
  
  // Format date nicely
  const formatDate = (dateString) => {
    if (!dateString) return "Not available";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  // Copy user ID to clipboard
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b pt-[110px] from-gray-50 to-[#F7F7F9]  pb-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Profile Header Card */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-8">
          {/* Cover Image */}
          <div className="relative h-48 bg-gradient-to-r from-primary to-blue-600">
            <div className="absolute left-0 bottom-0 w-full h-24 bg-gradient-to-t from-black/30 to-transparent"></div>
          </div>
          
          {/* Profile Info Section */}
          <div className="relative px-6 pb-6">
            {/* Avatar */}
            <div className="absolute -top-16 left-6 w-32 h-32">
              <div className="relative w-full h-full rounded-xl overflow-hidden border-4 border-white shadow-md">
                <Image
                  src={user.avatar || "/profileImage.jpg"}
                  alt={`${user.username}'s avatar`}
                  fill
                  sizes="128px"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
            
            {/* User info with Edit button */}
            <div className="flex flex-col sm:flex-row sm:justify-between pt-16 sm:pt-4 sm:items-end">
              <div className="mb-4 sm:mb-0">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                  {user.username || "User"}
                </h1>
                <div className="flex items-center mt-2 gap-2">
                  <FiMail className="text-gray-500" />
                  <p className="text-gray-600">{user.email || "email@example.com"}</p>
                </div>
                <div className="flex items-center mt-1">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                    {user.role || "User"}
                  </span>
                </div>
              </div>
              
              <Link 
                href="/agent/setting" 
                className="flex items-center justify-center gap-2 px-5 py-2.5 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 shadow-sm"
              >
                <FiEdit className="text-sm" />
                <span>Edit Profile</span>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Profile Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <ProfileInfoCard 
            icon={FiPhone} 
            title="Phone Number" 
            value={user.mobile || "Not provided"} 
            bgColor="bg-blue-50" 
          />
          
          <ProfileInfoCard 
            icon={FiMapPin} 
            title="Location" 
            value={user.address || "Not provided"} 
            bgColor="bg-green-50" 
          />
          
          <ProfileInfoCard 
            icon={FiCalendar} 
            title="Joined" 
            value={formatDate(user.createdAt)} 
            bgColor="bg-amber-50" 
          />
          
          <ProfileInfoCard 
            icon={FaRegAddressCard} 
            title="Full Name" 
            value={user.fullName || user.username || "Not provided"} 
            bgColor="bg-purple-50" 
          />
          
          <ProfileInfoCard 
            icon={FaBuilding} 
            title="Company" 
            value={user.company || "Not provided"} 
            bgColor="bg-red-50" 
          />
          
          <div className="flex items-center gap-4 p-5 bg-white rounded-xl border border-gray-100 hover:shadow-md transition-all duration-200">
            <div className="bg-indigo-50 p-3 rounded-lg">
              <HiOutlineIdentification className="text-primary text-xl" />
            </div>
            <div className="flex-1 overflow-hidden">
              <h2 className="text-sm font-medium text-gray-500">User ID</h2>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-gray-800 font-medium truncate">
                  {user._id || "Not available"}
                </p>
                <button 
                  onClick={() => copyToClipboard(user._id)}
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  {copied ? <span className="text-green-500 text-xs">Copied!</span> : <FaRegCopy size={14} />}
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Agent Info Section */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <FaShieldAlt className="text-primary text-xl" />
            <h2 className="text-xl font-semibold text-gray-800">Account Information</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Account Status</h3>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                Active
              </span>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Account Type</h3>
              <span className="text-gray-800">{user.role || "Standard"}</span>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Last Login</h3>
              <span className="text-gray-800">{formatDate(user.lastLogin) || "Today"}</span>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Email Verified</h3>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                user.emailVerified ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
              }`}>
                {user.emailVerified ? "Verified" : "Pending Verification"}
              </span>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-100">
            <p className="text-gray-500 text-sm">
              This information is private and only visible to you and administrators.
            </p>
          </div>
        </div>
        
        {/* Actions Footer */}
        <div className="flex justify-center gap-4">
          <Link 
            href="/agent/listings" 
            className="px-5 py-2.5 bg-white text-gray-700 font-medium rounded-lg border border-gray-200 hover:bg-gray-50 transition duration-300 focus:outline-none"
          >
            Manage Listings
          </Link>
          
          <Link 
            href="/agent/setting" 
            className="px-5 py-2.5 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition duration-300 focus:outline-none"
          >
            Account Settings
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
