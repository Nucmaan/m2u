import Link from "next/link";
import React from "react";

const PropertyList = () => {
  // Sample data for properties (replace with actual data from API or state)
  const properties = [
    {
      id: 1,
      title: "Luxury Apartment",
      address: "123 Main St, New York, NY",
      price: "$3000/month",
      status: "Available",
      bedrooms: 3,
      bathrooms: 2,
      coverImage: "https://via.placeholder.com/300x200?text=Luxury+Apartment", // Example image URL
    },
    {
      id: 2,
      title: "Modern Condo",
      address: "456 Elm St, Los Angeles, CA",
      price: "$2500/month",
      status: "Rented",
      bedrooms: 2,
      bathrooms: 2,
      coverImage: "https://via.placeholder.com/300x200?text=Modern+Condo", // Example image URL
    },
    {
      id: 3,
      title: "Cozy House",
      address: "789 Pine St, Chicago, IL",
      price: "$400,000",
      status: "Sold",
      bedrooms: 4,
      bathrooms: 3,
      coverImage: "https://via.placeholder.com/300x200?text=Cozy+House", // Example image URL
    },
  ];

  const availableProperties = properties.filter(
    (property) => property.status === "Available"
  );
  const rentedOrSoldProperties = properties.filter(
    (property) => property.status === "Rented" || property.status === "Sold"
  );

  return (
    <div className="min-h-screen bg-[#F7F7F9] p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#1A3B5D]">
          My Property Listings
        </h1>
        <button className="px-6 py-2 bg-[#1A3B5D] text-white font-bold rounded hover:bg-[#16324A]">
          <Link href="/admin/listings/addproperty">Add New Property</Link>
        </button>
      </div>

      <section>
        <h2 className="text-2xl font-bold text-[#333333] mb-4">
          Available Properties
        </h2>
        {availableProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableProperties.map((property) => (
              <div
                key={property.id}
                className="bg-white shadow rounded-lg border border-[#E0E0E0] overflow-hidden"
              >
                <img
                  src={property.coverImage}
                  alt={property.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-bold text-[#333333]">
                    {property.title}
                  </h2>
                  <p className="text-[#7A7A7A]">{property.address}</p>
                  <p className="text-[#4C8492] font-bold mt-2">
                    {property.price}
                  </p>
                  <div className="flex items-center mt-2 text-sm text-[#7A7A7A]">
                    <span>{property.bedrooms} Beds</span>
                    <span className="mx-2">·</span>
                    <span>{property.bathrooms} Baths</span>
                  </div>
                  <div className="mt-4 flex space-x-2">
                    <button className="flex-1 py-2 bg-[#1A3B5D] text-white font-bold rounded hover:bg-[#16324A]">
                      <Link href={`/admin/listings/${property.id}`}>Edit</Link>
                    </button>
                    <button className="flex-1 py-2 bg-[#F47C48] text-white font-bold rounded hover:bg-[#E74C3C]">
                      <Link href={`/admin/listings/view/${property.id}`}>
                        View Details
                      </Link>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-[#7A7A7A]">No available properties to display.</p>
        )}
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-bold text-[#333333] mb-4">
          Rented/Sold Properties
        </h2>
        {rentedOrSoldProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rentedOrSoldProperties.map((property) => (
              <div
                key={property.id}
                className="bg-white shadow rounded-lg border border-[#E0E0E0] overflow-hidden"
              >
                <img
                  src={property.coverImage}
                  alt={property.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-bold text-[#333333]">
                    {property.title}
                  </h2>
                  <p className="text-[#7A7A7A]">{property.address}</p>
                  <p className="text-[#4C8492] font-bold mt-2">
                    {property.price}
                  </p>
                  <p
                    className={`mt-1 text-sm font-bold ${
                      property.status === "Rented"
                        ? "text-[#F47C48]"
                        : "text-[#E74C3C]"
                    }`}
                  >
                    {property.status}
                  </p>
                  <div className="flex items-center mt-2 text-sm text-[#7A7A7A]">
                    <span>{property.bedrooms} Beds</span>
                    <span className="mx-2">·</span>
                    <span>{property.bathrooms} Baths</span>
                  </div>
                  <div className="mt-4 flex space-x-2">
                    <button className="flex-1 py-2 bg-[#1A3B5D] text-white font-bold rounded hover:bg-[#16324A]">
                      <Link href={`/agent/listings/${property.id}`}>Edit</Link>
                    </button>
                    <button className="flex-1 py-2 bg-[#F47C48] text-white font-bold rounded hover:bg-[#E74C3C]">
                      <Link href={`/admin/listings/view/${property.id}`}>
                        View Details
                      </Link>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-[#7A7A7A]">
            No rented or sold properties to display.
          </p>
        )}
      </section>
    </div>
  );
};

export default PropertyList;
