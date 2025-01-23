import axios from "axios";
import Link from "next/link";
import Image from "next/image";

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

  return (
    <section className="min-h-screen bg-[#F7F7F9] px-6 py-8">
      <h1 className="text-3xl font-bold text-[#1A3B5D] text-center mb-8">
        Property Listings
      </h1>

      {listings.length === 0 ? (
        <div className="text-center text-lg text-[#7A7A7A]">
          No properties are available at the moment.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {listings.map((listing) => (
            <div
              key={listing._id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-200 border border-[#E0E0E0]"
            >
              <div className="relative w-full h-48">
                <Image
                  src={listing.images[0]}
                  alt={listing.title}
                  layout="fill" 
                  objectFit="cover" 
                />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-semibold text-[#1A3B5D] mb-2">
                  {listing.title}
                </h2>
                <p className="text-sm text-[#7A7A7A] mb-2">{listing.address}</p>
                <p className="text-lg font-bold text-[#F47C48]">
                  {listing.price}
                </p>
                <div className="mt-2 flex justify-between items-center text-sm text-[#7A7A7A]">
                  <span>{listing.bedrooms} Beds</span>
                  <span>{listing.bathrooms} Baths</span>
                </div>
                <div
                  className={`mt-2 inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                    listing.houseType === "Rent"
                      ? "bg-[#4C8492] text-white"
                      : "bg-[#27AE60] text-white"
                  }`}
                >
                  {listing.houseType}
                </div>
                <button className="mt-4 w-full py-2 bg-[#1A3B5D] text-white font-semibold rounded-md hover:bg-[#16324A] transition duration-200">
                  <Link href={`/listings/${listing._id}`}>View Details</Link>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
