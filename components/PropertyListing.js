import axios from "axios";
import Link from "next/link";
import { FaBed, FaBath, FaMapMarkerAlt, FaMoneyBillWave } from "react-icons/fa";

async function fetchListings() {
  try {
    const response = await axios.get("http://localhost:3000/api/listings");
    return response.data.Listings;
  } catch (error) {
    console.error("Error fetching listings:", error);
    return [];
  }
}

export default async function PropertyListing() {
  const listings = await fetchListings();

  const topListings = listings.slice(0, 3);

  return (
    <div className="pt-10 pb-3 bg-[#F7F7F9]">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-[#333333] mb-4">
          Explore Our Properties
        </h2>
        <p className="text-center text-[#7A7A7A] mb-8">
          A collection of our top properties
        </p>

        {listings.length === 0 ? (
          <div className="text-center text-lg text-gray-600">
            No properties are available at the moment.
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {topListings.map((list) => (
              <div
                key={list._id}
                className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col justify-between flex-1"
              >
                <img
                  src={list.images[0]}
                  alt={list.title}
                  className="w-full h-48 object-cover"
                />

                <div className="p-4 mb-4 flex flex-col justify-between flex-1">
                  <h3 className="text-lg font-semibold text-[#333333] truncate">
                    {list.title}
                  </h3>
                  <p className="text-sm text-[#7A7A7A] flex items-center mt-1">
                    <FaMapMarkerAlt className="mr-2 text-[#4C8492]" />
                    {list.city}
                  </p>
                  <p className="text-sm text-[#7A7A7A] flex items-center mt-1">
                    <FaMoneyBillWave className="mr-2 text-[#27AE60]" />
                    {list.price}
                  </p>
                  <div className="flex justify-between items-center mt-4 text-sm text-[#7A7A7A]">
                    <span className="flex items-center">
                      <FaBed className="mr-2 text-[#4C8492]" />
                      {list.bedrooms} Beds
                    </span>
                    <span className="flex items-center">
                      <FaBath className="mr-2 text-[#F47C48]" />
                      {list.bathrooms} Baths
                    </span>
                  </div>
                </div>

                <button className="mt-4 w-full bg-[#1A3B5D] text-white py-2 rounded-md hover:bg-[#16324A] transition duration-300">
                  <Link href={`/listings/${list._id}`}> View Details</Link>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
