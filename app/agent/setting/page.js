"use client";

import userAuth from "@/myStore/UserAuth";
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { FiUser, FiLock, FiPhone, FiMail, FiInfo, FiSave, FiCamera, FiArrowLeft } from "react-icons/fi";

const UserSettings = () => {
  const user = userAuth((state) => state.user);
  const router = useRouter();
  const updateUser = userAuth((state) => state.updateUser);

  // Form states
  const [activeTab, setActiveTab] = useState("profile");
  const [formData, setFormData] = useState({
    username: user?.username || "",
    email: user?.email || "",
    password: "",
    confirmPassword: "",
    mobile: user?.mobile || "",
  });
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar || "/profileImage.jpg");
  const [avatarFile, setAvatarFile] = useState(null);
  
  // UI states
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [isChanged, setIsChanged] = useState(false);

  if (!user) return null;

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    setIsChanged(true);
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ""
      });
    }
  };

  // Handle avatar file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file is an image and size is reasonable
      if (!file.type.match('image.*')) {
        toast.error("Please select an image file");
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error("Image size should be less than 5MB");
        return;
      }
      
      setAvatarFile(file);
      setIsChanged(true);
      
      // Preview the image
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Validate form before submission
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    }
    
    if (formData.password && formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    if (formData.password && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    if (formData.mobile && !/^\d{10,12}$/.test(formData.mobile.replace(/[^\d]/g, ''))) {
      newErrors.mobile = "Please enter a valid phone number";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSaveChanges = async () => {
    if (!validateForm()) return;
    if (!isChanged) {
      toast.info("No changes to save");
      return;
    }
    
    setLoading(true);
    const formDataObj = new FormData();

    // Append only changed fields
    formDataObj.append("id", user._id);
    
    if (formData.username !== user.username) {
      formDataObj.append("username", formData.username);
    }
    
    if (formData.password) {
      formDataObj.append("password", formData.password);
    }
    
    if (formData.mobile !== user.mobile) {
      formDataObj.append("mobile", formData.mobile);
    }
    
    if (avatarFile) {
      formDataObj.append("avatar", avatarFile);
    }

    try {
      const response = await axios.put("/api/user", formDataObj, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      
      if (response.status === 201) {
        updateUser(response.data.userInfo);
        toast.success(response.data.message || "Profile updated successfully");
        setIsChanged(false);
        router.replace("/agent/profile");
      } else {
        toast.error(response.data.message || "Failed to update profile");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      toast.error(errorMessage);
      console.error("Update error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-[#F7F7F9] pt-[120px] pb-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Account Settings</h1>
          <Link 
            href="/agent/profile"
            className="flex items-center text-primary hover:text-primary-dark transition-colors"
          >
            <FiArrowLeft className="mr-2" />
            <span>Back to Profile</span>
          </Link>
        </div>
        
        {/* Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <div className="flex space-x-8">
            <button 
              onClick={() => setActiveTab("profile")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "profile" 
                  ? "border-primary text-primary" 
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Profile Information
            </button>
            <button 
              onClick={() => setActiveTab("security")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "security" 
                  ? "border-primary text-primary" 
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Security
            </button>
          </div>
        </div>
        
        {/* Profile Tab Content */}
        {activeTab === "profile" && (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
            <div className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row gap-8">
                {/* Avatar Upload Section */}
                <div className="md:w-1/3 flex flex-col items-center">
                  <div className="relative group">
                    <div className="w-32 h-32 rounded-xl overflow-hidden border-4 border-gray-100 shadow-sm">
                      <Image
                        src={avatarPreview}
                        alt="User Avatar"
                        width={128}
                        height={128}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-xl">
                      <label htmlFor="avatar-upload" className="cursor-pointer p-2 bg-white rounded-full">
                        <FiCamera className="text-gray-700" />
                      </label>
                    </div>
                    <input
                      type="file"
                      id="avatar-upload"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </div>
                  <p className="mt-3 text-sm text-gray-500">
                    Click to upload a new photo
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    JPG, PNG or GIF • Max 5MB
                  </p>
                </div>

                {/* Profile Form Fields */}
                <div className="flex-1 space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Username
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiUser className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-3 py-2 border ${errors.username ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors`}
                      />
                    </div>
                    {errors.username && (
                      <p className="mt-1 text-sm text-red-600">{errors.username}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiMail className="text-gray-400" />
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        disabled
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
                      />
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      Email cannot be changed. Contact support for assistance.
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiPhone className="text-gray-400" />
                      </div>
                      <input
                        type="tel"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-3 py-2 border ${errors.mobile ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors`}
                      />
                    </div>
                    {errors.mobile && (
                      <p className="mt-1 text-sm text-red-600">{errors.mobile}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Security Tab Content */}
        {activeTab === "security" && (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
            <div className="p-6 md:p-8">
              <h2 className="text-lg font-semibold text-gray-800 mb-6">Change Password</h2>
              
              <div className="max-w-md space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    New Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiLock className="text-gray-400" />
                    </div>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Enter new password"
                      className={`w-full pl-10 pr-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors`}
                    />
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                  )}
                  <p className="mt-1 text-xs text-gray-500">
                    Password must be at least 6 characters long
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiLock className="text-gray-400" />
                    </div>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Confirm new password"
                      className={`w-full pl-10 pr-3 py-2 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors`}
                    />
                  </div>
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                  )}
                </div>
              </div>
              
              <div className="mt-8">
                <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-md">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <FiInfo className="h-5 w-5 text-yellow-400" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-yellow-700">
                        Changing your password will log you out of all other devices.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Action Buttons */}
        <div className="flex justify-end space-x-4">
          <Link
            href="/agent/profile"
            className="px-5 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center"
          >
            Cancel
          </Link>
          <button
            className={`px-5 py-2.5 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-colors flex items-center ${
              loading || (!isChanged) ? 'opacity-70 cursor-not-allowed' : ''
            }`}
            onClick={handleSaveChanges}
            disabled={loading || !isChanged}
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </>
            ) : (
              <>
                <FiSave className="mr-2" />
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