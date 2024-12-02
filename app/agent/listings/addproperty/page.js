"use client"
import React, { useState } from 'react';

const AddListing = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [price, setPrice] = useState('');
  const [deposit, setDeposit] = useState('');
  const [houseType, setHouseType] = useState('');
  const [status, setStatus] = useState('');
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  // Handle image upload
  const handleImageChange = (e) => {
    const files = e.target.files;
    if (files) {
      const newImages = [...images, ...Array.from(files)];
      const newPreviews = [...imagePreviews, ...Array.from(files).map(file => URL.createObjectURL(file))];
      setImages(newImages);
      setImagePreviews(newPreviews);
    }
  };

  // Handle image removal
  const handleImageRemove = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    const updatedPreviews = imagePreviews.filter((_, i) => i !== index);
    setImages(updatedImages);
    setImagePreviews(updatedPreviews);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      title,
      description,
      address,
      city,
      bedrooms,
      bathrooms,
      price,
      deposit,
      houseType,
      status,
      images
    };
    // Handle form data submission (e.g., API call)
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg space-y-6">
      <h2 className="text-3xl font-semibold text-center text-black">Add New Property Listing</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="flex flex-col">
          <label htmlFor="title" className="font-medium text-gray-700">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter property title"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="description" className="font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter property description"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="flex flex-col">
          <label htmlFor="address" className="font-medium text-gray-700">Address</label>
          <input
            id="address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter property address"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="city" className="font-medium text-gray-700">City</label>
          <input
            id="city"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter city"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="flex flex-col">
          <label htmlFor="bedrooms" className="font-medium text-gray-700">Bedrooms</label>
          <input
            id="bedrooms"
            type="number"
            value={bedrooms}
            onChange={(e) => setBedrooms(e.target.value)}
            className="p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Number of bedrooms"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="bathrooms" className="font-medium text-gray-700">Bathrooms</label>
          <input
            id="bathrooms"
            type="number"
            value={bathrooms}
            onChange={(e) => setBathrooms(e.target.value)}
            className="p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Number of bathrooms"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="flex flex-col">
          <label htmlFor="price" className="font-medium text-gray-700">Price</label>
          <input
            id="price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter price"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="deposit" className="font-medium text-gray-700">Deposit</label>
          <input
            id="deposit"
            type="number"
            value={deposit}
            onChange={(e) => setDeposit(e.target.value)}
            className="p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter deposit amount"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="flex flex-col">
          <label htmlFor="houseType" className="font-medium text-gray-700">House Type</label>
          <select
            id="houseType"
            value={houseType}
            onChange={(e) => setHouseType(e.target.value)}
            className="p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select</option>
            <option value="Rent">Rent</option>
            <option value="Buy">Buy</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="status" className="font-medium text-gray-700">Status</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select</option>
            <option value="Available">Available</option>
            <option value="Pending">Pending</option>
            <option value="Sold">Sold</option>
            <option value="Rented">Rented</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col">
        <label htmlFor="images" className="font-medium text-gray-700">Images</label>
        <input
          id="images"
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          className="p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />

        {/* Image Preview */}
        <div className="flex flex-wrap gap-4 mt-4">
          {imagePreviews.map((preview, index) => (
            <div key={index} className="relative">
              <img src={preview} alt={`preview-${index}`} className="w-32 h-32 object-cover rounded-lg" />
              <button
                type="button"
                onClick={() => handleImageRemove(index)}
                className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
              >
                X
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-6">
        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600 focus:outline-none"
        >
          Submit Listing
        </button>
      </div>
    </form>
  );
};

export default AddListing;
