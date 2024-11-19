import Link from 'next/link';
import React from 'react';

const PropertyListing = () => {
  // Sample property data (replace this with actual data from your backend)
  const properties = [
    {
      id: 1,
      title: 'Modern Family House',
      address: '123 Main Street, Los Angeles, CA',
      price: '$1,200,000',
      bedrooms: 4,
      bathrooms: 3,
      imageUrl: 'https://via.placeholder.com/300', // Replace with real image URLs
      houseType: 'Buy', // Rent or Buy
    },
    {
      id: 2,
      title: 'Cozy Apartment',
      address: '456 Elm Street, New York, NY',
      price: '$800,000',
      bedrooms: 2,
      bathrooms: 1,
      imageUrl: 'https://via.placeholder.com/300',
      houseType: 'Rent', // Rent or Buy
    },
    // Add more sample properties as needed
  ];

  return (
    <section className="min-h-screen bg-[#F7F7F9] px-6 py-8">
      <h1 className="text-3xl font-bold text-[#1A3B5D] text-center mb-8">
        Property Listings
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {properties.map((property) => (
          <div
            key={property.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-200"
          >
            <img
              src={property.imageUrl}
              alt={property.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-[#1A3B5D] mb-2">
                {property.title}
              </h2>
              <p className="text-sm text-gray-600 mb-2">{property.address}</p>
              <p className="text-lg font-bold text-[#F47C48]">{property.price}</p>
              <div className="mt-2 flex justify-between items-center text-sm text-gray-700">
                <span>{property.bedrooms} Beds</span>
                <span>{property.bathrooms} Baths</span>
              </div>
              {/* House Type Indicator */}
              <div
                className={`mt-2 inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                  property.houseType === 'Rent'
                    ? 'bg-[#4C8492] text-white'
                    : 'bg-[#27AE60] text-white'
                }`}
              >
                {property.houseType}
              </div>
              <button className="mt-4 w-full py-2 bg-[#4C8492] text-white font-semibold rounded-md hover:bg-[#3b6d78] transition duration-200">
                <Link href={"/listings/1"} > View Details
                </Link>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PropertyListing;
