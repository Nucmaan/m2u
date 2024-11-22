import Link from "next/link";

export default function ViewDetailsPage() {
  // Sample property data (replace with actual data from your API or props)
  const property = {
    title: "Luxury Apartment",
    description:
      "This luxury apartment offers a modern design, spacious interiors, and beautiful city views. Perfect for families or individuals looking for a premium living experience.",
    address: "123 Main St, New York, NY",
    city: "New York",
    price: "$3000/month",
    deposit: "$1500",
    status: "Available",
    houseType: "Rent",
    bedrooms: 3,
    bathrooms: 2,
    parking: 1,
    owner: "Agent Name",
    image: "https://via.placeholder.com/400",
  };

  return (
    <div className="min-h-screen bg-[#F7F7F9] p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#1A3B5D]">{property.title}</h1>
        <p className="text-[#7A7A7A]">
          {property.address}, {property.city}
        </p>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Property Image */}
        <div className="lg:w-1/2">
          <img
            src={property.image}
            alt={property.title}
            className="w-full h-auto rounded-lg shadow"
          />
        </div>

        {/* Property Details */}
        <div className="lg:w-1/2 bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold text-[#333333]">Details</h2>
          <p className="text-[#7A7A7A] mt-2">{property.description}</p>

          <div className="mt-4">
            <div className="flex justify-between text-[#333333] font-medium">
              <span>Price:</span>
              <span className="text-[#4C8492] font-bold">{property.price}</span>
            </div>
            <div className="flex justify-between text-[#333333] font-medium">
              <span>Deposit:</span>
              <span className="text-[#4C8492]">{property.deposit}</span>
            </div>
            <div className="flex justify-between text-[#333333] font-medium">
              <span>Status:</span>
              <span
                className={`font-bold ${
                  property.status === "Available"
                    ? "text-[#27AE60]"
                    : "text-[#E74C3C]"
                }`}
              >
                {property.status}
              </span>
            </div>
            <div className="flex justify-between text-[#333333] font-medium">
              <span>House Type:</span>
              <span>{property.houseType}</span>
            </div>
            <div className="flex justify-between text-[#333333] font-medium">
              <span>Bedrooms:</span>
              <span>{property.bedrooms}</span>
            </div>
            <div className="flex justify-between text-[#333333] font-medium">
              <span>Bathrooms:</span>
              <span>{property.bathrooms}</span>
            </div>
            <div className="flex justify-between text-[#333333] font-medium">
              <span>Parking Spaces:</span>
              <span>{property.parking}</span>
            </div>
            <div className="flex justify-between text-[#333333] font-medium">
              <span>Owner:</span>
              <span>{property.owner}</span>
            </div>
          </div>

          <div className="mt-6">
            <button className="px-6 py-2 bg-[#1A3B5D] text-white font-bold rounded hover:bg-[#16324A] mr-4">
              <Link href={`/agent/listings/1`}>Edit Listing</Link>
            </button>
            <button className="px-6 py-2 bg-[#F47C48] text-white font-bold rounded hover:bg-[#E74C3C]">
              <Link href={`/agent/listings`}>Back to List</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
