"use client";

import userAuth from "@/myStore/UserAuth";
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const UserSettings = () => {
  const user1 = userAuth((state) => state.user);

  const [username, setUsername] = useState(user1.username);
  const [email] = useState(user1.email); 
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState(user1.mobile || "");
  const [avatarPreview, setAvatarPreview] = useState(user1.avatar || "/profileImage.jpg");
  const [avatarFile, setAvatarFile] = useState(null);

  const updateUser = userAuth((state) => state.updateUser);


  const id = user1._id;

  const router = useRouter();

  if (!user1) return null;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      // Preview the image
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = async () => {
    const formData = new FormData();

    formData.append("id", id); 

    if (username) {
      formData.append("username", username);
    }
    if (password) {
      formData.append("password", password);
    }
    if (mobile) {
      formData.append("mobile", mobile);
    }
    if (avatarFile) {
      formData.append("avatar", avatarFile);
    }

    try {
      const response = await axios.put("/api/user", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 201) {
        updateUser(response.data.userInfo);
        toast.success(response.data.message);
        router.replace("/user/profile");
      } 
    } catch (error) {

      toast.error(error.response.data.message || "Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="bg-[#F7F7F9] min-h-screen p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold text-[#1A3B5D] mb-8">User Settings</h1>

        <div className="bg-white rounded-lg shadow-md border border-[#E0E0E0] p-6 mb-8">
          <h2 className="text-2xl font-semibold text-[#1A3B5D] mb-6">Profile Information</h2>
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-6">
            <div className="relative">
              <Image
                src={ user1.avatar ? user1.avatar : "/profileImage.jpg"}
                alt="User Avatar"
                width={500} height={300}
                className="w-24 h-24 rounded-full object-cover border-2 border-[#E0E0E0]"
              />
              <input
                type="file"
                accept="image/*"
                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                onChange={handleFileChange}
              />
            </div>
            <div className="flex-1 space-y-4 w-full">
              <div>
                <label className="block font-medium text-[#1A3B5D] mb-2">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full p-3 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A3B5D] transition duration-200"
                />
              </div>

              <div>
                <label className="block font-medium text-[#1A3B5D] mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  disabled
                  className="w-full p-3 border border-[#E0E0E0] rounded-lg bg-[#F7F7F9] focus:outline-none transition duration-200"
                />
              </div>

              <div>
                <label className="block font-medium text-[#1A3B5D] mb-2">Password</label>
                <input
                  type="password"
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A3B5D] transition duration-200"
                />
              </div>

              <div>
                <label className="block font-medium text-[#1A3B5D] mb-2">Mobile</label>
                <input
                  type="text"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="w-full p-3 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A3B5D] transition duration-200"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            className="px-6 py-3 bg-[#1A3B5D] text-white rounded-lg hover:bg-[#16324A] focus:outline-none focus:ring-2 focus:ring-[#1A3B5D] transition duration-200"
            onClick={handleSaveChanges}
          >
            Save Changes
          </button>
          <Link
            href="/user/profile"
            className="px-6 py-3 bg-[#E0E0E0] text-[#1A3B5D] rounded-lg hover:bg-[#D0D0D0] focus:outline-none focus:ring-2 focus:ring-[#1A3B5D] transition duration-200"
          >
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserSettings;