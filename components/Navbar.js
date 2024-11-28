"use client";
import userAuth from "@/myStore/UserAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const user = userAuth((state) => state.user); // Access the logged-in user
  const logoutUser = userAuth((state) => state.logoutUser); // Access the logoutUser function
  const router = useRouter()


  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    router.push("/");
    logoutUser(); // Clear the user state
  };

  return (
    <nav
      style={{ backgroundColor: "#1A3B5D" }}
      className="text-white p-4 shadow-md z-50"
    >
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <img src="/logo.png" alt="MyHome2U Logo" className="h-10 w-20" />
          <Link href={"/"} className="text-white hover:text-[#F47C48]">
            <span className="text-xl font-bold">MyHome2U</span>
          </Link>
        </div>

        <div className="hidden md:flex space-x-6">
          <Link href="/listings" className="text-white hover:text-[#F47C48]">
            Property List
          </Link>
          <Link href="/contact" className="text-white hover:text-[#F47C48]">
            Contact Us
          </Link>
          <Link href="/about" className="text-white hover:text-[#F47C48]">
            About Us
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-md"
              style={{ backgroundColor: "#F47C48", color: "#F7F7F9" }}
            >
              Logout
            </button>
          ) : (
            <Link href="/login">
              <button
                className="px-4 py-2 rounded-md"
                style={{ backgroundColor: "#F47C48", color: "#F7F7F9" }}
              >
                Login
              </button>
            </Link>
          )}
        </div>

        <div className="md:hidden">
          <button onClick={toggleMobileMenu} className="text-white">
            {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#1A3B5D]">
          <div className="flex flex-col items-center space-y-4 py-4">
            <Link
              href="/listings"
              className="text-white hover:text-[#F47C48]"
              onClick={toggleMobileMenu}
            >
              Property List
            </Link>
            <Link
              href="/contact"
              className="text-white hover:text-[#F47C48]"
              onClick={toggleMobileMenu}
            >
              Contact Us
            </Link>
            <Link
              href="/about"
              className="text-white hover:text-[#F47C48]"
              onClick={toggleMobileMenu}
            >
              About Us
            </Link>
            {user ? (
              <button
                onClick={() => {
                  handleLogout();
                  toggleMobileMenu();
                }}
                className="px-4 py-2 rounded-md"
                style={{ backgroundColor: "#F47C48", color: "#F7F7F9" }}
              >
                Logout
              </button>
            ) : (
              <Link href="/login" onClick={toggleMobileMenu}>
                <button
                  className="px-4 py-2 rounded-md"
                  style={{ backgroundColor: "#F47C48", color: "#F7F7F9" }}
                >
                  Login
                </button>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
