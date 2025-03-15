"use client";
import Image from "next/image";
import userAuth from "@/myStore/UserAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const user = userAuth((state) => state.user);
  const logoutUser = userAuth((state) => state.logoutUser);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    logoutUser();
    router.push("/login");
  };

  const getDashboardLink = () => {
    if (user?.role === "User") return "/user";
    if (user?.role === "Admin") return "/admin";
    if (user?.role === "Agent") return "/agent";
    return "/";
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/listings", label: "Property List" },
    { href: "/contact", label: "Contact Us" },
    { href: "/about", label: "About Us" },
    user && { href: getDashboardLink(), label: "Dashboard" },
  ].filter(Boolean);

  return (
    <nav 
      className={`fixed w-full text-white px-4 pt-4 pb-2 shadow-md z-50 transition-all duration-300 ${
        isScrolled ? "bg-[#1A3B5D] backdrop-blur-lg bg-opacity-95" : "bg-[#1A3B5D]"
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Link href="/" className="text-white hover:text-[#F47C48] transition-colors duration-300">
            <Image 
              src="/logo.png" 
              alt="MyHome2U Logo" 
              width={80} 
              height={40} 
              priority 
              className="transform hover:scale-105 transition-transform duration-300"
            />
          </Link>
        </div>

        <div className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative group"
            >
              <span className="text-white hover:text-[#F47C48] transition-colors duration-300">
                {link.label}
              </span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#F47C48] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <button
              onClick={handleLogout}
              className="px-6 py-2.5 rounded-md transition-all duration-300 bg-[#F47C48] text-white hover:bg-[#e86d3f] transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#F47C48] focus:ring-opacity-50"
              aria-label="Logout"
            >
              Logout
            </button>
          ) : (
            <Link href="/login">
              <button 
                className="px-6 py-2.5 rounded-md transition-all duration-300 bg-[#F47C48] text-white hover:bg-[#e86d3f] transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#F47C48] focus:ring-opacity-50"
                aria-label="Login"
              >
                Login
              </button>
            </Link>
          )}
        </div>

        <button 
          onClick={toggleMobileMenu} 
          className="md:hidden text-white p-2 rounded-md hover:bg-[#F47C48] transition-colors duration-300"
          aria-expanded={isMobileMenuOpen}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      <div 
        className={`md:hidden fixed inset-0 bg-[#1A3B5D] z-50 transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8 p-4">
          <button 
            onClick={toggleMobileMenu}
            className="absolute top-4 right-4 text-white p-2 hover:bg-[#F47C48] rounded-md transition-colors duration-300"
            aria-label="Close mobile menu"
          >
            <FaTimes size={24} />
          </button>
          
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={toggleMobileMenu}
              className="text-xl text-white hover:text-[#F47C48] transition-colors duration-300"
            >
              {link.label}
            </Link>
          ))}
          
          {user ? (
            <button
              onClick={() => {
                handleLogout();
                toggleMobileMenu();
              }}
              className="px-8 py-3 rounded-md bg-[#F47C48] text-white hover:bg-[#e86d3f] transition-all duration-300 transform hover:scale-105"
            >
              Logout
            </button>
          ) : (
            <Link href="/login" onClick={toggleMobileMenu}>
              <button className="px-8 py-3 rounded-md bg-[#F47C48] text-white hover:bg-[#e86d3f] transition-all duration-300 transform hover:scale-105">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
