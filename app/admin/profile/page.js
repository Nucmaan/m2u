"use client";

import React from "react";

export default function AgentProfilePage() {
  const agent = {
    name: "John Doe",
    title: "Real Estate admin",
    bio: "Passionate about helping clients find their dream homes. Experienced in residential and commercial real estate.",
    email: "johndoe@example.com",
    phone: "+1 (123) 456-7890",
    profilePicture:
      "https://www.w3schools.com/w3images/avatar2.png", // Sample avatar image URL
    socialLinks: {
      linkedin: "https://linkedin.com/in/johndoe",
      twitter: "https://twitter.com/johndoe",
    },
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Profile Card */}
      <div className="bg-white rounded-lg shadow-md max-w-4xl mx-auto p-6">
        <div className="flex items-center space-x-6">
          {/* Profile Image */}
          <img
            src={agent.profilePicture}
            alt="Agent Avatar"
            className="w-32 h-32 rounded-full border-4 border-[#1A3B5D]"
          />

          {/* Agent Info */}
          <div>
            <h1 className="text-3xl font-semibold text-[#1A3B5D]">{agent.name}</h1>
            <h2 className="text-xl text-[#4C8492]">{agent.title}</h2>
            <p className="mt-2 text-secondary-text">{agent.bio}</p>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-6 border-t border-[#E0E0E0] pt-6">
          <h3 className="text-xl font-semibold text-[#333333]">Contact Information</h3>
          <div className="mt-4 space-y-3">
            <div className="flex items-center space-x-3">
              <span className="text-[#4C8492] font-medium">Email:</span>
              <span>{agent.email}</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-[#4C8492] font-medium">Phone:</span>
              <span>{agent.phone}</span>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-[#333333]">Social Links</h3>
          <div className="mt-4 space-x-4">
            <a
              href={agent.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1A3B5D] hover:text-[#4C8492] transition"
            >
              LinkedIn
            </a>
            <a
              href={agent.socialLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1A3B5D] hover:text-[#4C8492] transition"
            >
              Twitter
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
