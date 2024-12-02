"use client";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

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
    <section className="min-h-screen flex items-center justify-center bg-[#F7F7F9] px-6">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-[#1A3B5D] text-center mb-6">
          Forget Password
        </h2>
        <p className="text-sm text-center text-gray-600 mb-4">
          Enter your email address, and we will send you instructions to reset
          your password.
        </p>
        <form className="space-y-4" onSubmit={handleResetPassword}>
          <div>
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:border-[#4C8492]"
              placeholder="Enter your email"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 mt-4 bg-[#F47C48] text-white font-semibold rounded-md hover:bg-[#e86d3f] transition duration-200"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Reset Password"}
          </button>
          <p className="text-sm text-center text-gray-600 mt-4">
            Remembered your password?{" "}
            <a
              href="/login"
              className="text-[#4C8492] font-medium hover:text-[#F47C48]"
            >
              Back to Login
            </a>
          </p>
        </form>
      </div>
    </section>
  );
}
