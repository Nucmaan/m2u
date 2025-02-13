"use client";

import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const response = await axios.post("/api/sendEmail",formData);

    if(response.status === 200){
      toast.success(response.data.message);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } else {
      toast.error(response?.data?.message || "Failed to send message.");
    }
    setLoading(false);
  };

  return (
    <section className="bg-[#F7F7F9] py-12 px-6 md:px-12 lg:px-20">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg border border-[#E0E0E0]">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#1A3B5D] mb-8">
          Contact Us
        </h2>

        {/* Contact Info */}
        <div className="flex flex-col items-center md:flex-row md:justify-around text-center md:text-left mb-8">
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <FiPhone className="text-[#4C8492] text-2xl" />
            <span className="text-lg text-[#1A3B5D]">+252 616500191</span>
          </div>
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <FiMail className="text-[#4C8492] text-2xl" />
            <span className="text-lg text-[#1A3B5D]">info@myhome2u.com</span>
          </div>
          <div className="flex items-center space-x-3">
            <FiMapPin className="text-[#4C8492] text-2xl" />
            <span className="text-lg text-[#1A3B5D]">KM4 BANADIR, MOGADISHU, SOMALIA</span>
          </div>
        </div>

        {/* Contact Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-[#1A3B5D] mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 rounded-md border border-[#E0E0E0] text-[#333333] focus:outline-none focus:ring-2 focus:ring-[#F47C48]"
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-[#1A3B5D] mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 rounded-md border border-[#E0E0E0] text-[#333333] focus:outline-none focus:ring-2 focus:ring-[#F47C48]"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Subject */}
          <div>
            <label htmlFor="subject" className="block text-sm font-semibold text-[#1A3B5D] mb-2">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full p-3 rounded-md border border-[#E0E0E0] text-[#333333] focus:outline-none focus:ring-2 focus:ring-[#F47C48]"
              placeholder="Enter the subject"
              required
            />
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-sm font-semibold text-[#1A3B5D] mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-3 rounded-md border border-[#E0E0E0] text-[#333333] focus:outline-none focus:ring-2 focus:ring-[#F47C48]"
              placeholder="Write your message"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-md bg-[#F47C48] text-white font-semibold hover:bg-[#e86d3f] transition duration-200"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactUs;
