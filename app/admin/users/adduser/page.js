"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function AddUser() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      toast.error("All fields are required");
      return;
    }

    try {
      const response = await axios.post("/api/user/addUser", {
        username,
        email,
        password,
      });

      if (response.status === 201) {
        toast.success(response.data.message);
        setUsername("");
        setEmail("");
        setPassword("");

        router.replace("/admin/users");
      }

      if(response.status === 400){
        toast.error(response.data.message);
      }
      
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add user.");
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F7F9] p-6 text-[#333333]">
      <h1 className="text-2xl font-semibold text-[#4C8492] mb-6">Add New User</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 border border-[#E0E0E0] max-w-md mx-auto"
      >
        {/* Name Field */}
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-[#7A7A7A]">
            Name
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-[#E0E0E0] rounded focus:outline-none focus:ring-[#4C8492] focus:border-[#4C8492]"
            placeholder="Enter username"
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-[#E0E0E0] rounded focus:outline-none focus:ring-[#4C8492] focus:border-[#4C8492]"
            placeholder="Enter email address"
            required
          />
        </div>

        {/* Password Field */}
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-[#7A7A7A]">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-[#E0E0E0] rounded focus:outline-none focus:ring-[#4C8492] focus:border-[#4C8492]"
            placeholder="Enter password"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#F47C48] hover:bg-orange-500 text-white px-4 py-2 rounded"
        >
          Add User
        </button>
      </form>
    </div>
  );
}
