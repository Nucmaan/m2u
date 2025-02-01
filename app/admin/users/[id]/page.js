"use client";
import React, { useState, useEffect } from "react";

export default function EditUser({ userId = 1 }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "User", // Default role
  });

  // Simulate fetching user data on component mount
  useEffect(() => {
    // Simulate fetching user data from an API
    const fetchedUser = {
      id: userId,
      name: "John Doe",
      email: "john.doe@example.com",
      role: "Admin",
    };

    setFormData(fetchedUser);
  }, [userId]); // Only depend on userId

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated User Data:", formData);
    // Add logic to send the updated formData to the backend here.
  };

  return (
    <div className="min-h-screen bg-[#F7F7F9] p-6 text-[#333333]">
      <h1 className="text-2xl font-semibold text-[#4C8492] mb-6">Edit User</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 border border-[#E0E0E0] max-w-md mx-auto"
      >
        {/* Name Field */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-[#7A7A7A]">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-[#E0E0E0] rounded focus:outline-none focus:ring-[#4C8492] focus:border-[#4C8492]"
            placeholder="Enter full name"
            required
          />
        </div>

        {/* Email Field */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-[#7A7A7A]">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-[#E0E0E0] rounded focus:outline-none focus:ring-[#4C8492] focus:border-[#4C8492]"
            placeholder="Enter email address"
            required
          />
        </div>

        {/* Role Dropdown */}
        <div className="mb-4">
          <label htmlFor="role" className="block text-sm font-medium text-[#7A7A7A]">
            Role
          </label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-[#E0E0E0] rounded focus:outline-none focus:ring-[#4C8492] focus:border-[#4C8492]"
          >
            <option value="Admin">Admin</option>
            <option value="User">User</option>
            <option value="Agent">Agent</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#F47C48] hover:bg-orange-500 text-white px-4 py-2 rounded"
        >
          Update User
        </button>
      </form>
    </div>
  );
}
