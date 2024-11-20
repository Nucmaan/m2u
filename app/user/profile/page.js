"use client";

import React from "react";

const ProfilePage = () => {
  // Sample user data
  const user = {
    name: "John Doe",
    email: "johndoe@example.com",
    joinedDate: "2021-06-15",
    avatar: "https://via.placeholder.com/150",
    phone: "+1 234 567 890",
    address: "123 Main Street, Springfield, USA",
  };

  return (
    <div className="min-h-screen flex justify-center bg-[#F7F7F9] py-12">
      <div className="bg-white w-full max-w-4xl shadow-lg rounded-lg p-8 flex flex-col md:flex-row items-center md:items-start">
        
        {/* Avatar Section */}
        <div className="flex-shrink-0 w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-blue-500 mb-6 md:mr-8">
          <img
            src={user.avatar}
            alt="User Avatar"
            className="object-cover w-full h-full"
          />
        </div>

        {/* Profile Details Section */}
        <div className="flex-1">
          <h1 className="text-3xl font-semibold text-[#1A3B5D] mb-2">{user.name}</h1>
          <p className="text-sm text-gray-500 mb-6">{user.email}</p>

          {/* Info */}
          <div className="space-y-4 text-sm text-gray-700">
            <div className="flex justify-between items-center">
              <span className="font-semibold">Phone:</span>
              <span>{user.phone}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold">Address:</span>
              <span>{user.address}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold">Joined:</span>
              <span>{new Date(user.joinedDate).toDateString()}</span>
            </div>
          </div>

          {/* Edit Profile Button */}
          <div className="mt-6 flex justify-start">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200">
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
