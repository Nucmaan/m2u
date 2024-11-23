"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function AddProperty() {
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("Available");
  const [bedrooms, setBedrooms] = useState(1);
  const [bathrooms, setBathrooms] = useState(1);
  const [coverImage, setCoverImage] = useState(null);

  // Handle file change for cover image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImage(URL.createObjectURL(file));
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Create the property object
    const property = {
      title,
      address,
      price,
      status,
      bedrooms,
      bathrooms,
      coverImage,
    };

    console.log("Property submitted:", property);
    // TODO: Send the data to the backend API
  };

  return (
    <div className="min-h-screen bg-[#F7F7F9] p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-[#1A3B5D] mb-6">
          Add New Property
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-[#333333]" htmlFor="title">
              Property Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 mt-1 border border-[#E0E0E0] rounded"
              placeholder="Enter property title"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-[#333333]" htmlFor="address">
              Address
            </label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-3 mt-1 border border-[#E0E0E0] rounded"
              placeholder="Enter property address"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-[#333333]" htmlFor="price">
              Price
            </label>
            <input
              type="text"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-3 mt-1 border border-[#E0E0E0] rounded"
              placeholder="Enter property price"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-[#333333]" htmlFor="status">
              Status
            </label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full p-3 mt-1 border border-[#E0E0E0] rounded"
            >
              <option value="Available">Available</option>
              <option value="Rented">Rented</option>
              <option value="Sold">Sold</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-[#333333]" htmlFor="bedrooms">
              Bedrooms
            </label>
            <input
              type="number"
              id="bedrooms"
              value={bedrooms}
              onChange={(e) => setBedrooms(Number(e.target.value))}
              className="w-full p-3 mt-1 border border-[#E0E0E0] rounded"
              min="1"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-[#333333]" htmlFor="bathrooms">
              Bathrooms
            </label>
            <input
              type="number"
              id="bathrooms"
              value={bathrooms}
              onChange={(e) => setBathrooms(Number(e.target.value))}
              className="w-full p-3 mt-1 border border-[#E0E0E0] rounded"
              min="1"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-[#333333]" htmlFor="coverImage">
              Cover Image
            </label>
            <input
              type="file"
              id="coverImage"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-3 mt-1 border border-[#E0E0E0] rounded"
            />
            {coverImage && (
              <img
                src={coverImage}
                alt="Cover preview"
                className="mt-4 max-w-full h-48 object-cover rounded"
              />
            )}
          </div>

          <div className="flex justify-between mt-6">
            <button
              type="submit"
              className="px-6 py-2 bg-[#1A3B5D] text-white font-bold rounded hover:bg-[#16324A]"
            >
              Submit
            </button>
            <Link href="/agent/listings">
              <button
                type="button"
                className="px-6 py-2 bg-[#E0E0E0] text-[#333333] font-bold rounded hover:bg-[#D5D5D5]"
              >
                Cancel
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
