"use client";

import userAuth from "@/myStore/UserAuth";
import React from "react";

export default function AgentProfilePage() {
  const user = userAuth((state) => state.user);

  const agent = {
    name: "John Doe",
    title: "Real Estate Agent",
    bio: "Passionate about helping clients find their dream homes. Experienced in residential and commercial real estate.",
    email: "johndoe@example.com",
    phone: "+1 (123) 456-7890",
    profilePicture: "https://www.w3schools.com/w3images/avatar2.png", // Sample avatar image URL
    socialLinks: {
      linkedin: "https://linkedin.com/in/johndoe",
      twitter: "https://twitter.com/johndoe",
    },
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white rounded-lg shadow-md max-w-4xl mx-auto p-6">
        <div className="flex items-center space-x-6">
          {/* Profile Image */}
          <img
            src={agent.profilePicture}
            alt="Agent Avatar"
            className="w-32 h-32 rounded-full border-4 border-[#1A3B5D]"
          />

          <div>
            <h1 className="text-3xl font-semibold text-[#1A3B5D]">
              {user.username}
            </h1>
            <p className="mt-2 text-secondary-text">{agent.bio || "N/A"}</p>
          </div>
        </div>

        <div className="mt-6 border-t border-[#E0E0E0] pt-6">
          <h3 className="text-xl font-semibold text-[#333333]">
            Contact Information
          </h3>
          <div className="mt-4 space-y-3">
            <div className="flex items-center space-x-3">
              <span className="text-[#4C8492] font-medium">Role:</span>
              <span>{user.role || "N/A"}</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-[#4C8492] font-medium">Email:</span>
              <span>{user.email || "N/A"}</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-[#4C8492] font-medium">Phone:</span>
              <span>{user.phone || "N/A"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
