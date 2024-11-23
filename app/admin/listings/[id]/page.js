"use client";
import { useState, useEffect } from "react";

export default function EditListingPage() {
  // Sample property data to populate the form (replace with actual API call)
  const [property, setProperty] = useState({
    title: "Luxury Apartment",
    description: "A spacious and luxurious apartment with modern amenities.",
    address: "123 Main St, New York, NY",
    city: "New York",
    price: 3000,
    deposit: 1500,
    status: "Available",
    houseType: "Rent",
    bedrooms: 3,
    bathrooms: 2,
    parking: 1,
    coverImage: "https://via.placeholder.com/400",
    video: "https://www.youtube.com/watch?v=example",
  });

  // Form state
  const [formData, setFormData] = useState(property);

  useEffect(() => {
    // Prefill the form with property data
    setFormData(property);
  }, [property]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated property data:", formData);
    // Make an API call here to save the updated property details
  };

  return (
    <div className="min-h-screen bg-[#F7F7F9] p-6">
      <h1 className="text-3xl font-bold text-[#1A3B5D] mb-6">
        Edit Property Listing
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md space-y-4"
      >
        {/* Title */}
        <div>
          <label className="block text-[#333333] font-medium mb-2">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border border-[#E0E0E0] rounded p-2"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-[#333333] font-medium mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full border border-[#E0E0E0] rounded p-2"
          />
        </div>

        {/* Cover Image */}
        <div>
          <label className="block text-[#333333] font-medium mb-2">
            Cover Image URL
          </label>
          <input
            type="text"
            name="coverImage"
            value={formData.coverImage}
            onChange={handleChange}
            className="w-full border border-[#E0E0E0] rounded p-2"
          />
          {formData.coverImage && (
            <img
              src={formData.coverImage}
              alt="Cover Preview"
              className="mt-2 w-full h-48 object-cover rounded-lg border border-[#E0E0E0]"
            />
          )}
        </div>

        {/* Video */}
        <div>
          <label className="block text-[#333333] font-medium mb-2">
            Video URL (YouTube or other)
          </label>
          <input
            type="text"
            name="video"
            value={formData.video}
            onChange={handleChange}
            className="w-full border border-[#E0E0E0] rounded p-2"
          />
          {formData.video && (
            <div className="mt-2">
              <iframe
                width="100%"
                height="200"
                src={formData.video.replace("watch?v=", "embed/")}
                title="Property Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-lg border border-[#E0E0E0]"
              />
            </div>
          )}
        </div>

        {/* Address */}
        <div>
          <label className="block text-[#333333] font-medium mb-2">
            Address
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full border border-[#E0E0E0] rounded p-2"
          />
        </div>

        {/* City */}
        <div>
          <label className="block text-[#333333] font-medium mb-2">
            City
          </label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="w-full border border-[#E0E0E0] rounded p-2"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-[#333333] font-medium mb-2">
            Price
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full border border-[#E0E0E0] rounded p-2"
          />
        </div>

        {/* Deposit */}
        <div>
          <label className="block text-[#333333] font-medium mb-2">
            Deposit
          </label>
          <input
            type="number"
            name="deposit"
            value={formData.deposit}
            onChange={handleChange}
            className="w-full border border-[#E0E0E0] rounded p-2"
          />
        </div>

        {/* Status */}
        <div>
          <label className="block text-[#333333] font-medium mb-2">
            Status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border border-[#E0E0E0] rounded p-2"
          >
            <option value="Available">Available</option>
            <option value="Pending">Pending</option>
            <option value="Sold">Sold</option>
            <option value="Rented">Rented</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#1A3B5D] text-white font-bold py-2 px-4 rounded hover:bg-[#16324A]"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
