"use client";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post("/api/resetpassword", { email });
      if (response.status === 200) {
        toast.success(response.data.message);
        setEmail("");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          toast.error(error.response.data.message || "Invalid request.");
        } else if (error.response.status === 404) {
          toast.error("User not found.");
        } else if (error.response.status === 500) {
          toast.error("Server error. Please try again later.");
        } else {
          toast.error("Something went wrong. Please try again.");
        }
      } else {
        toast.error("Network error. Please check your connection.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F7F7F9] to-[#E8EFEF] px-6 py-10 pt-24">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-xl transition-all duration-300 hover:shadow-2xl">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-[#1A3B5D] mb-2">
            Forgot Password
          </h2>
          <p className="text-gray-500">
            Enter your email address, and we will send you instructions to reset
            your password.
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleResetPassword}>
          <div className="transition-all duration-200 hover:translate-y-[-2px]">
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#4C8492] focus:border-transparent transition-all duration-200"
                placeholder="Enter your email"
                disabled={isLoading}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 mt-6 bg-gradient-to-r from-[#F47C48] to-[#F56E3F] text-white font-semibold rounded-lg hover:from-[#e86d3f] hover:to-[#e56135] shadow-md hover:shadow-lg transform transition-all duration-200 hover:translate-y-[-2px]"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              "Reset Password"
            )}
          </button>

          <div className="flex items-center my-4">
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="px-3 text-gray-500 text-sm">OR</span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>

          <p className="text-center text-gray-600">
            Remembered your password?{" "}
            <Link href="/login" className="text-[#4C8492] font-medium hover:text-[#F47C48] transition duration-200">
              Back to Login
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}
