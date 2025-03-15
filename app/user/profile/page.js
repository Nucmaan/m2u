"use client";

import userAuth from "@/myStore/UserAuth";
import Image from "next/image";
import React from "react";
import { FiEdit, FiMail, FiPhone, FiCalendar } from "react-icons/fi";
import { FaUserCheck } from "react-icons/fa";
import Link from "next/link";

const ProfilePage = () => {  
  const user = userAuth((state) => state.user);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="min-h-screen bg-[#F7F7F9] pt-24 pb-5">
      <div className="max-w-5xl mx-auto ">
        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Cover/Header */}
          <div className="relative">
            <div className="h-48 bg-gradient-to-r from-[#4C8492] to-[#1A3B5D]"></div>
            <div className="absolute top-32 left-8">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg bg-white">
                <Image
                  src={user.avatar || "/profileImage.jpg"}
                  alt="User Avatar"
                  width={128}
                  height={128}
                  objectFit="cover"
                  className="rounded-full"
                />
              </div>
            </div>
            <div className="ml-48 p-6 pb-4 flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  {user.username || "User"}
                </h1>
                <p className="text-gray-500 flex items-center mt-1">
                  <FiMail className="mr-2" />
                  {user.email || "email@example.com"}
                </p>
              </div>
              <Link href="/user/setting">
                <button className="flex items-center gap-2 px-4 py-2 bg-[#F47C48] text-white font-medium rounded-lg hover:bg-[#e06b3a] transition-all duration-200">
                  <FiEdit className="text-sm" />
                  <span>Edit Profile</span>
                </button>
              </Link>
            </div>
          </div>

          {/* Profile Details */}
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Phone */}
              <div className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-50 p-3 rounded-full">
                    <FiPhone className="text-blue-500" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Phone Number</h3>
                    <p className="text-gray-800 font-medium">{user.mobile || "Not provided"}</p>
                  </div>
                </div>
              </div>

              {/* Role */}
              <div className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="bg-green-50 p-3 rounded-full">
                    <FaUserCheck className="text-green-500" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Account Type</h3>
                    <p className="text-gray-800 font-medium">{user.role || "Standard User"}</p>
                  </div>
                </div>
              </div>

              {/* Joined Date */}
              <div className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="bg-purple-50 p-3 rounded-full">
                    <FiCalendar className="text-purple-500" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Member Since</h3>
                    <p className="text-gray-800 font-medium">{formatDate(user.createdAt)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Status */}
            <div className="mt-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Account Status</h2>
              <div className="bg-white rounded-lg border border-gray-200 p-5">
                <div className="flex items-center mb-4">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-green-700 font-medium">Active</span>
                </div>
                <p className="text-gray-600">
                  Your account is in good standing. You have full access to all features and services.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
