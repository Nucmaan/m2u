"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";

const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section
      className="relative min-h-screen flex items-center"
      aria-label="Hero Section"
    >
      {/* Background Image with Parallax Effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed transform scale-105"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/29437909/pexels-photo-29437909/free-photo-of-modern-skyscrapers-in-london-cityscape.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/80"></div>

      {/* Content Container */}
      <div className="relative text-center text-white px-4 sm:px-6 md:px-12 lg:px-20 z-10 container mx-auto">
        <motion.div
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Main Heading */}
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 tracking-wide leading-tight"
            variants={fadeIn}
            transition={{ delay: 0.2 }}
          >
            Discover Your{" "}
            <span className="text-[#F47C48] inline-block transform hover:scale-105 transition-transform duration-300">
              Dream Home
            </span>{" "}
            with <br className="hidden sm:block" />
            <span className="text-[#4C8492] inline-block transform hover:scale-105 transition-transform duration-300">
              MyHome2U
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p 
            className="text-lg sm:text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-gray-200 leading-relaxed"
            variants={fadeIn}
            transition={{ delay: 0.4 }}
          >
            Explore top properties for rent or purchase, tailored to your preferences.
            Find your ideal home effortlessly.
          </motion.p>

          {/* Search Form */}
          <motion.div 
            className="flex flex-col sm:flex-row justify-center items-center gap-4"
            variants={fadeIn}
            transition={{ delay: 0.6 }}
          >
            <form
              action="/listings/search"
              className="w-full max-w-2xl flex flex-col sm:flex-row gap-4"
              onSubmit={(e) => {
                if (!searchQuery.trim()) {
                  e.preventDefault();
                }
              }}
            >
              <div className="relative flex-1">
                <FaMapMarkerAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="query"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by location, city, or property type..."
                  className="w-full p-4 pl-12 rounded-md text-[#333333] shadow-lg placeholder-[#7A7A7A] focus:outline-none focus:ring-2 focus:ring-[#F47C48] transition-all duration-300"
                  style={{ backgroundColor: '#FFFFFF' }}
                  aria-label="Search for properties"
                />
              </div>
              <button
                type="submit"
                className="px-8 py-4 bg-[#F47C48] text-white font-semibold rounded-md hover:bg-[#e86d3f] transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2 min-w-[120px]"
                aria-label="Submit search"
                disabled={!searchQuery.trim()}
              >
                <FaSearch />
                <span>Search</span>
              </button>
            </form>
          </motion.div>

          {/* Action Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row justify-center mt-8 gap-4 sm:gap-6"
            variants={fadeIn}
            transition={{ delay: 0.8 }}
          >
            <Link
              href="/listings"
              className="group px-8 py-3 bg-[#4C8492] text-white font-semibold rounded-md transition-all duration-300 shadow-lg text-center hover:bg-[#3b6d78] transform hover:scale-105 relative overflow-hidden"
            >
              <span className="relative z-10">Explore Listings</span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            </Link>
            <Link
              href="/contact"
              className="group px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-md transition-all duration-300 shadow-lg text-center hover:bg-white hover:text-[#1A3B5D] transform hover:scale-105"
            >
              Contact Us
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg
          className="relative block w-full"
          style={{ height: "4rem" }}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 100"
        >
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,32L48,37.3C96,43,192,53,288,58.7C384,64,480,64,576,58.7C672,53,768,43,864,42.7C960,43,1056,53,1152,53.3C1248,53,1344,43,1392,37.3L1440,32L1440,100L1392,100C1344,100,1248,100,1152,100C1056,100,960,100,864,100C768,100,672,100,576,100C480,100,384,100,288,100C192,100,96,100,48,100L0,100Z"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;