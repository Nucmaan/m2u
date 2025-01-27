"use client";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section
      className="relative bg-cover bg-center h-screen flex items-center"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/29437909/pexels-photo-29437909/free-photo-of-modern-skyscrapers-in-london-cityscape.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
      }}
      aria-label="Hero Section"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-70"></div>

      <div className="relative text-center text-white px-4 sm:px-6 md:px-12 lg:px-20 z-10 container mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 tracking-wide leading-tight">
          Discover Your <span className="text-[#F47C48]">Dream Home</span> with{" "}
          <br className="hidden sm:block" />
          <span className="text-[#4C8492]">MyHome2U</span>
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-gray-200 leading-relaxed">
          Explore top properties for rent or purchase, tailored to your preferences. Find your ideal home effortlessly.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <form
            action="/listings/search"
            className="w-full max-w-2xl flex"
          >
            <input
              type="text"
              name="query"
              placeholder="Search by location, city, or property type..."
              className="w-full p-3 sm:p-4 rounded-l-md text-[#333333] shadow-lg placeholder-[#7A7A7A] focus:outline-none focus:ring-2 focus:ring-[#F47C48]"
              style={{ backgroundColor: '#FFFFFF' }}
              aria-label="Search for properties"
            />
            <button
              type="submit"
              className="px-6 sm:px-8 py-3 sm:py-4 bg-[#F47C48] text-white font-semibold rounded-r-md hover:bg-[#e86d3f] transition duration-300 shadow-lg"
              aria-label="Submit search"
            >
              Search
            </button>
          </form>
        </div>

        <div className="flex flex-col sm:flex-row justify-center mt-8 gap-4 sm:gap-6">
          <Link
            href="/listings"
            className="px-8 py-3 bg-[#4C8492] text-white font-semibold rounded-md hover:bg-[#3b6d78] transition duration-300 shadow-lg text-center"
          >
            Explore Listings
          </Link>
          <Link
            href="/contact"
            className="px-8 py-3 bg-transparent border border-white text-white font-semibold rounded-md hover:bg-white hover:text-[#1A3B5D] transition duration-300 shadow-lg text-center"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;