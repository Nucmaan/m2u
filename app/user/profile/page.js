"use client";

import userAuth from "@/myStore/UserAuth";
import Image from "next/image";
import React from "react";
import { FiEdit, FiMail, FiPhone, FiMapPin, FiCalendar } from "react-icons/fi";

const ProfilePage = () => {
  const user1 = userAuth((state) => state.user);
  const avatarUrl = user1.avatar || "https://via.placeholder.com/150"; // Use local fallback

  return (
    <div className="min-h-screen bg-[#F7F7F9] py-3  flex justify-center">
      <div className="w-full max-w-5xl bg-white rounded-lg shadow-lg border border-[#E0E0E0]">
        {/* Header */}
        <div className="relative bg-[#1A3B5D] h-40 rounded-t-lg">
          <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
          <Image
          src={avatarUrl}
          alt="User Avatar"
          width={150}
          height={150}
          objectFit="cover"
        />
          </div>
        </div>

        {/* User Info */}
        <div className="pt-20 pb-6 text-center px-6">
          <h1 className="text-3xl font-bold text-[#333333]">
            {user1.username || "John Doe"}
          </h1>
          <p className="text-sm text-[#7A7A7A] mt-2">{user1.email || "john.doe@example.com"}</p>
        </div>

        {/* Details Section */}
        <div className="px-6 py-4 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Phone */}
          <div className="flex items-center gap-4 p-4 bg-[#F7F7F9] rounded-lg border border-[#E0E0E0]">
            <FiPhone className="text-[#4C8492] text-xl" />
            <div>
              <h2 className="text-sm font-medium text-[#7A7A7A]">Phone</h2>
              <p className="text-[#333333]">{user1.phone || "N/A"}</p>
            </div>
          </div>

          {/* Address */}
          <div className="flex items-center gap-4 p-4 bg-[#F7F7F9] rounded-lg border border-[#E0E0E0]">
            <FiMapPin className="text-[#4C8492] text-xl" />
            <div>
              <h2 className="text-sm font-medium text-[#7A7A7A]">Address</h2>
              <p className="text-[#333333]">{user1.address || "N/A"}</p>
            </div>
          </div>

          {/* Joined */}
          <div className="flex items-center gap-4 p-4 bg-[#F7F7F9] rounded-lg border border-[#E0E0E0]">
            <FiCalendar className="text-[#4C8492] text-xl" />
            <div>
              <h2 className="text-sm font-medium text-[#7A7A7A]">Joined</h2>
              <p className="text-[#333333]">
                {user1.createdAt ? new Date(user1.createdAt).toLocaleDateString() : "N/A"}
              </p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="py-6 text-center ml-2">
          <button className="flex items-center justify-center gap-2 px-6 py-3 bg-[#F47C48] text-white font-medium rounded-lg shadow-md hover:bg-[#d66a3b] transition duration-300 focus:outline-none focus:ring-4 focus:ring-[#f3a68b]">
            <FiEdit />
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
