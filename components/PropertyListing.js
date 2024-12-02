import { FaBed, FaBath, FaMapMarkerAlt, FaMoneyBillWave } from "react-icons/fa";

export default function PropertyListing() {
  // Sample property data
  const properties = [
    {
      id: 1,
      title: "Modern Apartment in City Center",
      location: "Downtown, Los Angeles",
      price: "$1,500/month",
      bedrooms: 2,
      bathrooms: 2,
      image: "https://images.pexels.com/photos/12387912/pexels-photo-12387912.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: 2,
      title: "Spacious Family House",
      location: "Suburbs, New York",
      price: "$3,200/month",
      bedrooms: 4,
      bathrooms: 3,
      image: "https://images.pexels.com/photos/27626186/pexels-photo-27626186/free-photo-of-a-large-villa-with-a-swimming-pool-and-terrace.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: 3,
      title: "Luxury Villa with Pool",
      location: "Beverly Hills, CA",
      price: "$10,000/month",
      bedrooms: 5,
      bathrooms: 4,
      image: "https://images.pexels.com/photos/18971223/pexels-photo-18971223/free-photo-of-hotel-with-a-swimming-pool-with-the-view-of-a-mountain.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: 4,
      title: "Cozy Studio Apartment",
      location: "Midtown, Chicago",
      price: "$1,000/month",
      bedrooms: 1,
      bathrooms: 1,
      image: "https://images.pexels.com/photos/4628181/pexels-photo-4628181.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
  ];

  return (
    <div className="pt-10 pb-3 bg-[#F7F7F9]">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-[#333333] mb-4">
          Explore Our Properties
        </h2>
        <p className="text-center text-[#7A7A7A] mb-8">
          A collection of our top properties
        </p>

        {/* Property Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {properties.map((property) => (
            <div
              key={property.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col justify-between flex-1"
            >
              {/* Property Image */}
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-48 object-cover"
              />

              {/* Property Details */}
              <div className="p-4 mb-4 flex flex-col justify-between flex-1">
                <h3 className="text-lg font-semibold text-[#333333] truncate">
                  {property.title}
                </h3>
                <p className="text-sm text-[#7A7A7A] flex items-center mt-1">
                  <FaMapMarkerAlt className="mr-2 text-[#4C8492]" />
                  {property.location}
                </p>
                <p className="text-sm text-[#7A7A7A] flex items-center mt-1">
                  <FaMoneyBillWave className="mr-2 text-[#27AE60]" />
                  {property.price}
                </p>
                <div className="flex justify-between items-center mt-4 text-sm text-[#7A7A7A]">
                  <span className="flex items-center">
                    <FaBed className="mr-2 text-[#4C8492]" />
                    {property.bedrooms} Beds
                  </span>
                  <span className="flex items-center">
                    <FaBath className="mr-2 text-[#F47C48]" />
                    {property.bathrooms} Baths
                  </span>
                </div>
              </div>

              {/* View Button */}
              <button className="mt-4 w-full bg-[#1A3B5D] text-white py-2 rounded-md hover:bg-[#16324A] transition duration-300">
                View
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
