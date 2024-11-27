"use client";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";

const Login = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      toast.error("Please fill in all fields.");
      return;
    }

    setLoading(true); // Start loading
    try {
      const response = await axios.post(
        "/api/login",
        { username, password }
      );

      console.log(response.data);
      toast.success(response.data.message);
      setUserName("");
      setPassword("");
    } catch (error) {
      const message =
        error.response?.data?.message || "An unexpected error occurred.";
      toast.error(message);
      console.error("Login Error:", error);
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-[#F7F7F9] px-6">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-[#1A3B5D] text-center mb-6">
          Login to MyHome2U
        </h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="email"
            >
              username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:border-[#4C8492]"
              placeholder="Enter your username"
              disabled={loading}
            />
          </div>
          <div>
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:border-[#4C8492]"
              placeholder="Enter your password"
              disabled={loading}
            />
          </div>
          <div className="text-right">
            <Link
              href="/forgetpassword"
              className="text-sm text-[#4C8492] hover:text-[#F47C48]"
            >
              Forget Password?
            </Link>
          </div>
          <button
            type="submit"
            className="w-full py-2 mt-4 bg-[#F47C48] text-white font-semibold rounded-md hover:bg-[#e86d3f] transition duration-200"
            disabled={loading}
          >
            {loading ? "Processing..." : "Login"}
          </button>
          <p className="text-sm text-center text-gray-600 mt-4">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="text-[#4C8492] font-medium hover:text-[#F47C48]"
            >
              Register here
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
