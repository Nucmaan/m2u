"use client";
import Link from "next/link";
import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav
      style={{ backgroundColor: "#1A3B5D" }}
      className="text-white p-4 shadow-md z-50 transition-all duration-300"
    >
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo and Branding */}
        <div className="flex items-center space-x-3">
          <img src="/logo.png" alt="MyHome2U Logo" className="h-10 w-20" />
          <Link href={"/"} className="text-white hover:text-[#F47C48]">
            <span className="text-2xl font-extrabold">MyHome2U</span>
          </Link>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-8">
          <Link
            href="/listings"
            className="text-lg font-medium text-white hover:text-[#F47C48] transition duration-300"
          >
            Property List
          </Link>
          <Link
            href="/contact"
            className="text-lg font-medium text-white hover:text-[#F47C48] transition duration-300"
          >
            Contact Us
          </Link>
          <Link
            href="/about"
            className="text-lg font-medium text-white hover:text-[#F47C48] transition duration-300"
          >
            About Us
          </Link>
        </div>

        {/* Login Button */}
        <div className="hidden md:flex items-center space-x-4">
          <Link href="/login">
            <button
              className="px-6 py-2 text-lg font-semibold rounded-md bg-[#F47C48] text-white hover:bg-[#F57C42] transition-all duration-300"
            >
              Login
            </button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMobileMenu} className="text-white">
            {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#1A3B5D] p-6 space-y-6 transition-all duration-300">
          <div className="flex flex-col items-center space-y-4">
            <Link
              href="/listings"
              className="text-lg font-medium text-white hover:text-[#F47C48] transition duration-300"
              onClick={toggleMobileMenu}
            >
              Property List
            </Link>
            <Link
              href="/contact"
              className="text-lg font-medium text-white hover:text-[#F47C48] transition duration-300"
              onClick={toggleMobileMenu}
            >
              Contact Us
            </Link>
            <Link
              href="/about"
              className="text-lg font-medium text-white hover:text-[#F47C48] transition duration-300"
              onClick={toggleMobileMenu}
            >
              About Us
            </Link>
            <Link href="/login" onClick={toggleMobileMenu}>
              <button
                className="px-6 py-2 text-lg font-semibold rounded-md bg-[#F47C48] text-white hover:bg-[#F57C42] transition-all duration-300"
              >
                Login
              </button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
