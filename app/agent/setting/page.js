"use client";

import React, { useState } from "react";

export default function AgentSettings() {
  const [formData, setFormData] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    password: "",
    bio: "Experienced real estate agent passionate about helping clients.",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement form submission logic here
    alert("Your information has been updated.");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white rounded-lg shadow-md max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-semibold text-[#1A3B5D] mb-6">
          Update Your Information
        </h1>
        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-[#333333] font-medium">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-2 p-3 w-full border border-[#E0E0E0] rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-[#333333] font-medium">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-2 p-3 w-full border border-[#E0E0E0] rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-[#333333] font-medium"
            >
              New Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-2 p-3 w-full border border-[#E0E0E0] rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition"
              placeholder="Enter a new password"
            />
          </div>

          {/* Bio */}
          <div className="mb-4">
            <label htmlFor="bio" className="block text-[#333333] font-medium">
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="mt-2 p-3 w-full border border-[#E0E0E0] rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition"
              placeholder="Tell us a bit about yourself"
              rows="4"
            ></textarea>
          </div>

          {/* Save Button */}
          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 bg-primary text-white rounded-md hover:bg-opacity-80 transition"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
