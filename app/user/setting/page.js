"use client";

import userAuth from "@/myStore/UserAuth";
import React, { useState } from "react";

const UserSettings = () => {
  const user1 = userAuth((state) => state.user);
  const [username, setUsername] = useState(user1.username);
  const [email, setEmail] = useState(user1.email);
  const [password, setPassword] = useState(
    user1.password || "********************"
  );

  if (!user1) return null; // If use

  const handleUserInfoChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") setUsername(value);
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  return (
    <div className="bg-gray-100 transition duration-300">
      <div className="max-w-7xl mx-auto p-5">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6 dark:text-white">
          User Settings
        </h1>

        {/* Profile Section */}
        <div className="bg-white p-6 rounded-lg shadow-xl mb-8 dark:bg-gray-800 dark:text-white">
          <h2 className="text-2xl font-semibold mb-4">Profile Information</h2>
          <div className="flex items-center space-x-6">
            <img
              src={"https://via.placeholder.com/150"}
              alt="User Avatar"
              className="w-24 h-24 rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="font-medium text-gray-700 dark:text-gray-300">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={handleUserInfoChange}
                    className="p-3 w-full border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label className="font-medium text-gray-700 dark:text-gray-300">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleUserInfoChange}
                    className="p-3 w-full border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label className="font-medium text-gray-700 dark:text-gray-300">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleUserInfoChange}
                    className="p-3 w-full border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200"
            onClick={() => alert("Settings saved")}
          >
            <i className="fas fa-save mr-2"></i> Save Changes
          </button>
          <button
            className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 focus:ring-2 focus:ring-gray-500 focus:outline-none transition duration-200"
            onClick={() => alert("Changes discarded")}
          >
            <i className="fas fa-times mr-2"></i> Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserSettings;
