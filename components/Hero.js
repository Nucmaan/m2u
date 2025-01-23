import Link from "next/link";

const HeroSection = () => {
  return (
    <section
      className="relative bg-cover bg-center h-screen flex items-center"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/29437909/pexels-photo-29437909/free-photo-of-modern-skyscrapers-in-london-cityscape.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-70"></div>

      {/* Content */}
      <div className="relative text-center text-white px-6 md:px-12 lg:px-20 z-10 container mx-auto">
        {/* Heading */}
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-wide leading-tight">
          Discover Your <span className="text-[#F47C48]">Dream Home</span> with <br />
          <span className="text-[#4C8492]">MyHome2U</span>
        </h1>

        {/* Subheading */}
        <p className="text-lg md:text-xl mb-10 max-w-3xl mx-auto text-gray-200 leading-relaxed">
          Explore top properties for rent or purchase, tailored to your preferences. Find your ideal home effortlessly.
        </p>

        {/* Search Bar */}
        <div className="flex justify-center items-center gap-2">
          <input
            type="text"
            placeholder="Search by location, city, or property type..."
            className="w-full max-w-lg p-4 rounded-l-md text-[#333333] shadow-lg placeholder-[#7A7A7A] focus:outline-none focus:ring-2 focus:ring-[#F47C48]"
            style={{ backgroundColor: '#FFFFFF' }}
          />
          <button
            className="px-6 py-4 bg-[#F47C48] text-white font-semibold rounded-r-md hover:bg-[#e86d3f] transition duration-300 shadow-lg"
          >
            Search
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center mt-8 space-x-4">
          <button
            className="px-8 py-3 bg-[#4C8492] text-white font-semibold rounded-md hover:bg-[#3b6d78] transition duration-300 shadow-lg"
          >
            <Link href="/listings">Explore Listings</Link>
          </button>
          <button
            className="px-8 py-3 bg-transparent border border-white text-white font-semibold rounded-md hover:bg-white hover:text-[#1A3B5D] transition duration-300 shadow-lg"
          >
            <Link href="/contact">Contact Us</Link>
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;