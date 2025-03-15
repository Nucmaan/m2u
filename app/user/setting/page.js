"use client";

import userAuth from "@/myStore/UserAuth";
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { FaUser, FaEnvelope, FaLock, FaPhone, FaCamera, FaSave, FaTimes, FaArrowLeft } from "react-icons/fa";
import RaadiLoading from "@/components/RaadiLoading";

const UserSettings = () => {
  const user1 = userAuth((state) => state.user);

  const [username, setUsername] = useState(user1?.username || "");
  const [email] = useState(user1?.email || ""); 
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState(user1?.mobile || "");
  const [avatarPreview, setAvatarPreview] = useState(user1?.avatar || "/profileImage.jpg");
  const [avatarFile, setAvatarFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const updateUser = userAuth((state) => state.updateUser);
  const id = user1?._id;
  const router = useRouter();

  if (!user1) {
    return (
      <div className="min-h-screen bg-[#F7F7F9] pt-28 pb-12 flex justify-center items-center">
        <RaadiLoading fullScreen={false} />
      </div>
    );
  }

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
    if (!username.trim()) {
      toast.error("Username cannot be empty");
      return;
    }

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
      setLoading(true);
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
      toast.error(error.response?.data?.message || "Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F7F9] pt-28 pb-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Back Button */}
        <Link 
          href="/user/profile" 
          className="inline-flex items-center text-gray-600 hover:text-[#4C8492] mb-4 transition-colors"
        >
          <FaArrowLeft className="mr-2" />
          Back to Profile
        </Link>

        {/* Page Header */}
        <div className="bg-gradient-to-r from-[#4C8492] to-[#1A3B5D] rounded-xl p-6 mb-6 text-white shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Account Settings</h1>
              <p className="mt-1 text-gray-100">Update your personal information</p>
            </div>
            <div className="hidden md:block">
              <Image
                src={avatarPreview}
                alt="User Avatar"
                width={64}
                height={64}
                className="rounded-full border-2 border-white object-cover w-16 h-16"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center">
              <FaUser className="mr-2 text-[#4C8492]" />
              Profile Information
            </h2>
          </div>

          <div className="p-6">
            {/* Avatar Upload Section */}
            <div className="flex flex-col items-center mb-8">
              <div className="relative group">
                <Image
                  src={avatarPreview}
                  alt="User Avatar"
                  width={128}
                  height={128}
                  className="w-32 h-32 rounded-full object-cover border-4 border-gray-200 group-hover:opacity-80 transition-opacity"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <label htmlFor="avatarUpload" className="bg-white bg-opacity-70 rounded-full p-3 cursor-pointer">
                    <FaCamera className="text-[#1A3B5D] text-xl" />
                  </label>
                  <input
                    id="avatarUpload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </div>
              </div>
              <p className="mt-2 text-sm text-gray-500">Click on the image to change your profile picture</p>
            </div>

            {/* Form Fields */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <FaUser className="mr-2 text-gray-400" />
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4C8492] transition duration-200"
                  placeholder="Your username"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <FaEnvelope className="mr-2 text-gray-400" />
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  disabled
                  className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
                  placeholder="Your email address"
                />
                <p className="mt-1 text-xs text-gray-500">Email cannot be changed</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <FaLock className="mr-2 text-gray-400" />
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4C8492] transition duration-200"
                />
                <p className="mt-1 text-xs text-gray-500">Leave blank to keep your current password</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <FaPhone className="mr-2 text-gray-400" />
                  Mobile Number
                </label>
                <input
                  type="text"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4C8492] transition duration-200"
                  placeholder="Your mobile number"
                />
              </div>
            </div>

            {/* Security Notice */}
            <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
              <p className="text-sm text-blue-700">
                Your personal information is secure and will not be shared with third parties.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
          <Link
            href="/user/profile"
            className="order-2 sm:order-1 py-3 px-6 flex justify-center items-center bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <FaTimes className="mr-2" />
            Cancel
          </Link>
          <button
            className="order-1 sm:order-2 py-3 px-6 flex justify-center items-center bg-[#1A3B5D] text-white rounded-lg hover:bg-[#16324A] transition-colors"
            onClick={handleSaveChanges}
            disabled={loading}
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving Changes...
              </>
            ) : (
              <>
                <FaSave className="mr-2" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserSettings;