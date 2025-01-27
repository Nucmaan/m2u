"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function UserList() {
  
  const [usersInfo, setUsersInfo] = useState([]);

  const getAllUsers = async () => {
    try {
      const response = await axios.get("/api/userInfo");
      setUsersInfo(response.data.Users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`/api/userInfo/${userId}`);
      const updatedUsers = usersInfo.filter((user) => user._id!== userId);
      setUsersInfo(updatedUsers);
      toast.success("User deleted successfully!");
    } catch (error) {
      toast.error(error.response.data.message || "Couldn't delete user.");
    }
  }


  return (
    <div className="min-h-screen bg-[#F7F7F9] text-[#333333]">
      <div className="p-6">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-[#4C8492]">Manage Users</h2>
          <button className="bg-[#F47C48] hover:bg-orange-500 text-white px-4 py-2 rounded">
            <Link href="/admin/users/adduser">+ Add User</Link>
          </button>
        </div>

        {/* User Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {usersInfo.map((user) => (
            <div
              key={user._id}
              className="bg-white shadow-md rounded-lg p-4 border border-[#E0E0E0]"
            >
              <h3 className="text-lg font-bold text-[#1A3B5D]">{user.username}</h3>
              <p className="text-sm text-[#7A7A7A]">{user.email}</p>
              <p className="text-sm text-[#4C8492] font-semibold">{user.role}</p>
              <div className="mt-4 flex justify-between">
                <button className="bg-[#4C8492] text-white px-3 py-1 rounded hover:bg-[#16324A]">
                  <Link href={`/admin/users/${user._id}`}>Edit</Link>
                </button>
                <button
                onClick={handleDelete(user._id)}
                className="bg-[#E74C3C] text-white px-3 py-1 rounded hover:bg-red-600">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
