"use client";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function EditUser() {
  const { id } = useParams();

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("User");
  const [isVerified, setIsVerified] = useState(false);
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  useEffect(() => {
    const getUserInformation = async () => {
      try {
        const response = await axios.get(`/api/user/${id}`);

        if (response.status === 201) {
          const userData = response.data.user;

          setUserName(userData.username);
          setEmail(userData.email);
          setRole(userData.role);
          setIsVerified(userData.isVerified);
          setMobile(userData.mobile);
          setPassword(userData.password);
        } else {
          toast.error("Can't connect to server");
        }
      } catch (error) {
        console.error("Error fetching user data:", error.message);
        toast.error("Failed to fetch user data");
      }
    };

    if (id) {
      getUserInformation();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/api/user/${id}`, {
        userName,
        email,
        role,
        isVerified,
        mobile,
        password,
      });

      if (response.status === 201) {
        toast.success("User updated successfully.");
        // Redirect to users list
        router.push("/admin/users");
      } else {
        toast.error("Failed to update user. Please try again.");
      }
    } catch (error) {
      console.log(error);
    }
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
          <label
            htmlFor="name"
            className="block text-sm font-medium text-[#7A7A7A]"
          >
            userName
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-[#E0E0E0] rounded focus:outline-none focus:ring-[#4C8492] focus:border-[#4C8492]"
            placeholder="Enter full name"
            required
          />
        </div>

        {/* Email Field */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-[#7A7A7A]"
          >
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

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-[#7A7A7A]"
          >
            Mobile
          </label>
          <input
            type="text"
            id="text"
            name="mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-[#E0E0E0] rounded focus:outline-none focus:ring-[#4C8492] focus:border-[#4C8492]"
            placeholder="Enter mobile address"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-[#7A7A7A]"
          >
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

        {/* Role Dropdown */}
        <div className="mb-4">
          <label
            htmlFor="role"
            className="block text-sm font-medium text-[#7A7A7A]"
          >
            Role
          </label>
          <select
            id="role"
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-[#E0E0E0] rounded focus:outline-none focus:ring-[#4C8492] focus:border-[#4C8492]"
          >
            <option value="Admin">Admin</option>
            <option value="User">User</option>
            <option value="Agent">Agent</option>
          </select>
        </div>

        {/* Verification Checkbox */}
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="isVerified"
            name="isVerified"
            checked={isVerified}
            onChange={(e) => setIsVerified(e.target.checked)}
            className="mr-2"
          />
          <label
            htmlFor="isVerified"
            className="text-sm font-medium text-[#7A7A7A]"
          >
            Verified
          </label>
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
