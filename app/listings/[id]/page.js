import React from 'react';

const ViewProperty = () => {

  const property = {
    id: 1,
    title: 'Modern Family House',
    address: '123 Main Street, Los Angeles, CA',
    city: 'Los Angeles',
    price: '$1,200,000',
    bedrooms: 4,
    bathrooms: 3,
    parking: 2,
    deposit: '$50,000',
    houseType: 'Buy', 
    status: 'Available', 
    description:
      'This stunning modern family house features an open-concept design, a spacious backyard, and a luxurious kitchen. Located in a prime area of Los Angeles, this property is perfect for families looking for comfort and style.',
    imageUrl: 'https://via.placeholder.com/600', 
    owner: 'John Doe',
    contact: 'john@example.com',
  };

  return (
    <section className="min-h-screen bg-[#F7F7F9] px-6 py-8">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <img
          src={property.imageUrl}
          alt={property.title}
          className="w-full h-80 object-cover"
        />
        <div className="p-6">
          <h1 className="text-3xl font-bold text-[#1A3B5D] mb-4">
            {property.title}
          </h1>
          <p className="text-sm text-gray-600 mb-2">{property.address}</p>
          <p className="text-lg font-bold text-[#F47C48] mb-4">{property.price}</p>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-sm text-gray-700">
              <span className="font-semibold">City: </span>
              {property.city}
            </div>
            <div className="text-sm text-gray-700">
              <span className="font-semibold">Bedrooms: </span>
              {property.bedrooms}
            </div>
            <div className="text-sm text-gray-700">
              <span className="font-semibold">Bathrooms: </span>
              {property.bathrooms}
            </div>
            <div className="text-sm text-gray-700">
              <span className="font-semibold">Parking: </span>
              {property.parking} Spots
            </div>
            <div className="text-sm text-gray-700">
              <span className="font-semibold">Deposit: </span>
              {property.deposit}
            </div>
            <div className="text-sm text-gray-700">
              <span className="font-semibold">House Type: </span>
              {property.houseType}
            </div>
            <div className="text-sm text-gray-700">
              <span className="font-semibold">Status: </span>
              {property.status}
            </div>
            <div className="text-sm text-gray-700">
              <span className="font-semibold">Owner: </span>
              {property.owner}
            </div>
          </div>
          <p className="text-gray-600 mb-4">{property.description}</p>
          <div className="text-sm text-gray-700 mb-6">
            <span className="font-semibold">Contact: </span>
            <a
              href={`mailto:${property.contact}`}
              className="text-[#4C8492] font-medium hover:text-[#F47C48]"
            >
              {property.contact}
            </a>
          </div>
          <button className="w-full py-2 bg-[#4C8492] text-white font-semibold rounded-md hover:bg-[#3b6d78] transition duration-200">
            Book Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default ViewProperty;
