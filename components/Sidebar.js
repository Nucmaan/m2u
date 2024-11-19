"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  FaFileInvoice,
  FaClipboardList,
  FaFileContract,
  FaUser,
  FaCog,
  FaMoneyBillAlt,
} from "react-icons/fa";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative min-h-screen bg-[#F7F7F9]">
      <button
        className="absolute top-4 left-4 text-[#1A3B5D] md:hidden"
        onClick={handleToggle}
      >
        {isOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
      </button>

      <div
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 left-0 bg-white shadow-lg w-64 transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static`}
        style={{ height: "100vh", zIndex: 1050 }}  // Adjusted z-index for sidebar
      >
        <div className="p-6">
          <h2 className="text-2xl font-bold text-[#1A3B5D] mb-6">
            User Dashboard
          </h2>
          <ul className="space-y-4">
            {/* Dashboard */}
            <li className="flex items-center space-x-3 text-gray-700 hover:text-[#F47C48] cursor-pointer">
              <FaMoneyBillAlt className="text-xl md:text-2xl" />
              <Link
                href="/user"
                className="font-medium text-base md:text-lg"
                onClick={handleToggle} // Close sidebar on click
              >
                Dashboard
              </Link>
            </li>

            {/* Profile */}
            <li className="flex items-center space-x-3 text-gray-700 hover:text-[#F47C48] cursor-pointer">
              <FaUser className="text-xl md:text-2xl" />
              <Link
                href="/user/profile"
                className="font-medium text-base md:text-lg"
                onClick={handleToggle}
              >
                Profile
              </Link>
            </li>

            {/* Booking */}
            <li className="flex items-center space-x-3 text-gray-700 hover:text-[#F47C48] cursor-pointer">
              <FaClipboardList className="text-xl md:text-2xl" />
              <Link
                href="/user/booking"
                className="font-medium text-base md:text-lg"
                onClick={handleToggle}
              >
                Booking
              </Link>
            </li>

            {/* Contract */}
            <li className="flex items-center space-x-3 text-gray-700 hover:text-[#F47C48] cursor-pointer">
              <FaFileContract className="text-xl md:text-2xl" />
              <Link
                href="/user/contract"
                className="font-medium text-base md:text-lg"
                onClick={handleToggle}
              >
                Contract
              </Link>
            </li>

            {/* Bills */}
            <li className="flex items-center space-x-3 text-gray-700 hover:text-[#F47C48] cursor-pointer">
              <FaMoneyBillAlt className="text-xl md:text-2xl" />
              <Link
                href="/user/bills"
                className="font-medium text-base md:text-lg"
                onClick={handleToggle}
              >
                Bills
              </Link>
            </li>

            {/* Invoice */}
            <li className="flex items-center space-x-3 text-gray-700 hover:text-[#F47C48] cursor-pointer">
              <FaFileInvoice className="text-xl md:text-2xl" />
              <Link
                href="/user/invoice"
                className="font-medium text-base md:text-lg"
                onClick={handleToggle}
              >
                Invoice
              </Link>
            </li>

            {/* Settings */}
            <li className="flex items-center space-x-3 text-gray-700 hover:text-[#F47C48] cursor-pointer">
              <FaCog className="text-xl md:text-2xl" />
              <Link
                href="/user/setting"
                className="font-medium text-base md:text-lg"
                onClick={handleToggle}
              >
                Settings
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-10 bg-black bg-opacity-25 md:hidden"
          onClick={handleToggle}
        ></div>
      )}
    </div>
  );
};

export default Sidebar;
