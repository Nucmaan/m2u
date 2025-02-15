"use client";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

const Register = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    try {
      const response = await axios.post("/api/register", {
        username,
        email,
        password,
      });

      //console.log(response.data);
      toast.success(response.data.message);
     
    } catch (error) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
      //console.error(error);
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-[#F7F7F9] px-6">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-[#1A3B5D] text-center mb-6">
          Create an Account
        </h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:border-[#4C8492]"
              placeholder="Choose a username"
              disabled={loading}
            />
          </div>
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
              placeholder="Create a password"
              disabled={loading}
            />
          </div>
          <button
            type="submit"
            className={`w-full py-2 mt-4 text-white font-semibold rounded-md transition duration-200 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#F47C48] hover:bg-[#e86d3f]"
            }`}
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
          <p className="text-sm text-center text-gray-600 mt-4">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-[#4C8492] font-medium hover:text-[#F47C48]"
            >
              Login here
            </a>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Register;
