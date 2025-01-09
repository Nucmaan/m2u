"use client";

import userAuth from "@/myStore/UserAuth";
import React from "react";

const ProfilePage = () => {
  const user1 = userAuth((state) => state.user);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center py-5">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-32 md:h-40 relative">
          <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white shadow-lg">
            <img
              src={user1.avatar}
              alt="User Avatar"
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        <div className="pt-20 pb-8 px-6 md:px-12">
          <div className="text-center">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              {user1.username || "User Name"}
            </h1>
            <p className="text-sm md:text-base text-gray-500 mt-2">
              {user1.email || "user@example.com"}
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-lg p-4 shadow-md">
              <h2 className="font-medium text-gray-600">Phone</h2>
              <p className="mt-1 text-gray-800">{user1.phone || "N/A"}</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 shadow-md">
              <h2 className="font-medium text-gray-600">Address</h2>
              <p className="mt-1 text-gray-800">{user1.address || "N/A"}</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 shadow-md">
              <h2 className="font-medium text-gray-600">Joined</h2>
              <p className="mt-1 text-gray-800">
                {user1.createdAt
                  ? new Date(user1.createdAt).toDateString()
                  : "N/A"}
              </p>
            </div>
          </div>

          {/* Button Section */}
          <div className="mt-10 text-center">
            <button className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg shadow-md hover:bg-indigo-700 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-300">
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
