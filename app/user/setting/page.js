"use client";

import React, { useState } from "react";

const UserSettings = () => {
  // Example state for theme toggle
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [username, setUsername] = useState("John Doe");
  const [email, setEmail] = useState("johndoe@example.com");
  const [password, setPassword] = useState(""); 
  const [confirmPassword, setConfirmPassword] = useState(""); 

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
  };

  const handleUserInfoChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") setUsername(value);
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
    if (name === "confirmPassword") setConfirmPassword(value);
  };

  return (
    <div
      className={`min-h-screen bg-gray-100 ${isDarkMode ? "bg-gray-900" : "bg-gray-100"} transition duration-300`}
    >
      <div className="max-w-7xl mx-auto p-5">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6 dark:text-white">User Settings</h1>

        {/* Profile Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8 dark:bg-gray-800 dark:text-white">
          <h2 className="text-2xl font-semibold mb-4">Profile Information</h2>
          <div className="flex items-center space-x-6">
            <img
              src="https://via.placeholder.com/150"
              alt="User Avatar"
              className="w-24 h-24 rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="font-medium">Username</label>
                  <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={handleUserInfoChange}
                    className="p-2 w-full border rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label className="font-medium">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleUserInfoChange}
                    className="p-2 w-full border rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600"
                  />
                </div>

                <div className="flex items-center justify-between">
                <label className="font-medium">Password</label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={handleUserInfoChange}
                  className="p-2 w-full border rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600"
                />
              </div>

              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            onClick={() => alert("Settings saved")}
          >
            Save Changes
          </button>
          <button
            className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
            onClick={() => alert("Changes discarded")}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserSettings;
