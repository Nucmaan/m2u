"use client";

import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import userAuth from "@/myStore/UserAuth";
import { useRouter } from "next/navigation";

const Login = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const loginUser = userAuth((state) => state.loginUser);
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      toast.error("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("/api/login", { username, password });

      loginUser(response.data.user);

      switch (response.data.user.role) {
        case "User":
          router.replace("/user");
          break;
        case "Admin":
          router.replace("/admin");
          break;
        case "Agent":
          router.replace("/agent");
          break;
        default:
          toast.error("Invalid role.");
          return;
      }

      toast.success(response.data.message);

    } catch (error) {
      const message =
        error.response?.data?.message || "An unexpected error occurred.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F7F7F9] to-[#E8EFEF] px-6 py-10 pt-24">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-xl transition-all duration-300 hover:shadow-2xl">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-[#1A3B5D] mb-2">Welcome Back</h2>
          <p className="text-gray-500">Login to access your MyHome2U account</p>
        </div>
        
        <form onSubmit={handleRegister} className="space-y-5">
          <div className="transition-all duration-200 hover:translate-y-[-2px]">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="username">
              Username
            </label>
            <div className="relative">
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#4C8492] focus:border-transparent transition-all duration-200"
                placeholder="Enter your username"
                disabled={loading}
              />
            </div>
          </div>
          
          <div className="transition-all duration-200 hover:translate-y-[-2px]">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#4C8492] focus:border-transparent transition-all duration-200"
                placeholder="Enter your password"
                disabled={loading}
              />
            </div>
          </div>
          
          <div className="text-right">
            <Link href="/forgetpassword" className="text-sm text-[#4C8492] hover:text-[#F47C48] transition duration-200">
              Forgot Password?
            </Link>
          </div>
          
          <button
            type="submit"
            className="w-full py-3 mt-6 bg-gradient-to-r from-[#F47C48] to-[#F56E3F] text-white font-semibold rounded-lg hover:from-[#e86d3f] hover:to-[#e56135] shadow-md hover:shadow-lg transform transition-all duration-200 hover:translate-y-[-2px]"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              "Sign In"
            )}
          </button>
          
          <div className="flex items-center my-4">
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="px-3 text-gray-500 text-sm">OR</span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>
          
          <p className="text-center text-gray-600">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-[#4C8492] font-medium hover:text-[#F47C48] transition duration-200">
              Register now
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;