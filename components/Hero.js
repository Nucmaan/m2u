
const HeroSection = () => {
  return (
    <section
      className="relative bg-cover bg-center h-screen flex items-center"
      style={{
        backgroundImage: "url('https://images.pexels.com/photos/323775/pexels-photo-323775.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
        backgroundColor: '#F7F7F9', 
      }}
    >
      
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="container mx-auto relative text-center text-white px-6 md:px-12 lg:px-20">
        
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Find Your Dream Property with <span className="text-[#F47C48]">MyHome2U</span>
        </h1>


        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-gray-200">
          Explore the best homes for rent or buy, tailored to your needs. Your perfect home awaits.
        </p>

    
        <div className="flex justify-center mt-6">
          <input
            type="text"
            placeholder="Search by location, city, or property type..."
            className="w-full max-w-lg p-3 rounded-l-md text-gray-700"
            style={{ backgroundColor: '#F7F7F9', border: '1px solid #E0E0E0' }}
          />
          <button
            className="px-6 py-3 bg-[#F47C48] text-white font-semibold rounded-r-md hover:bg-[#e86d3f] transition duration-200"
          >
            Search
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
