"use client";

import userAuth from "@/myStore/UserAuth";
import Link from "next/link";
import React from "react";
import { FiEdit } from "react-icons/fi";


export default function AgentProfilePage() {
  const user = userAuth((state) => state.user);

  const avatarSrc = user.avatar ? user.avatar : "/profileImage.jpg";

  return (
    <div className="p-6 bg-[#F7F7F9] min-h-screen">
      <div className="bg-white rounded-lg shadow-lg max-w-4xl mx-auto p-5 border border-[#E0E0E0]">
        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row items-center space-y-6 sm:space-y-0 sm:space-x-3">
          {/* Profile Image */}
          <img
          src={avatarSrc}
          alt="Agent Avatar"
          width={150}
          height={150}
            className="w-32 h-32 rounded-full border-4 border-[#1A3B5D]"
          />

          {/* Profile Details */}
          <div className="text-center sm:text-left">
            <h1 className="text-3xl font-bold text-[#1A3B5D]">
              {user.username || "John Doe"}
            </h1>
            <p className="mt-2 text-lg text-[#4C8492] font-medium">
              {user.title || "Admin Information"}
            </p>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-8 border-t border-[#E0E0E0] pt-8">
          <h3 className="text-2xl font-bold text-[#1A3B5D] mb-6">
            Contact Information
          </h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <span className="text-[#4C8492] font-medium">Role:</span>
              <span className="text-[#333333]">{user.role || "N/A"}</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-[#4C8492] font-medium">Email:</span>
              <span className="text-[#333333]">{user.email || "N/A"}</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-[#4C8492] font-medium">Phone:</span>
              <span className="text-[#333333]">{user.mobile || "N/A"}</span>
            </div>
          </div>
        </div>

        <div className="pt-3 text-center ">
        <button className="flex items-center justify-center gap-2 px-6 py-3 bg-[#F47C48] text-white font-medium rounded-lg shadow-md hover:bg-[#d66a3b] transition duration-300 focus:outline-none focus:ring-4 focus:ring-[#f3a68b]">
          <FiEdit />
        <Link href="/admin/setting">Edit Profile</Link>
        </button>
      </div>

      </div>
    </div>
  );
}