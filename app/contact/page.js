import React from 'react';
import { FiPhone, FiMail, FiMapPin } from 'react-icons/fi';

const ContactUs = () => {
  return (
    <section className="bg-[#F7F7F9] py-12 px-6 md:px-12 lg:px-20">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg border border-[#E0E0E0]">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#1A3B5D] mb-8">
          Contact Us
        </h2>

        {/* Contact Information */}
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
            <span className="text-lg text-[#1A3B5D]">KM4 BANADIR, MOGADISHO, SOMALIA</span>
          </div>
        </div>

        {/* Contact Form */}
        <form className="space-y-6">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-[#1A3B5D] mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full p-3 rounded-md border border-[#E0E0E0] text-[#333333] focus:outline-none focus:ring-2 focus:ring-[#F47C48]"
              placeholder="Enter your name"
            />
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-[#1A3B5D] mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-3 rounded-md border border-[#E0E0E0] text-[#333333] focus:outline-none focus:ring-2 focus:ring-[#F47C48]"
              placeholder="Enter your email"
            />
          </div>

          {/* Message Field */}
          <div>
            <label htmlFor="message" className="block text-sm font-semibold text-[#1A3B5D] mb-2">
              Message
            </label>
            <textarea
              id="message"
              rows="4"
              className="w-full p-3 rounded-md border border-[#E0E0E0] text-[#333333] focus:outline-none focus:ring-2 focus:ring-[#F47C48]"
              placeholder="Write your message"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-md bg-[#F47C48] text-white font-semibold hover:bg-[#e86d3f] transition duration-200"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactUs;