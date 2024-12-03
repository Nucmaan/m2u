"use client";
import axios from "axios";
import React, { useState } from "react";

const AddListing = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [price, setPrice] = useState("");
  const [deposit, setDeposit] = useState("");
  const [houseType, setHouseType] = useState("");
  const [status, setStatus] = useState("");
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  // Handle image upload
  const handleImageChange = (e) => {
    const files = e.target.files;
    if (files) {
      const newImages = [...images, ...Array.from(files)];
      const newPreviews = [
        ...imagePreviews,
        ...Array.from(files).map((file) => URL.createObjectURL(file)),
      ];
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
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("address", address);
    formData.append("city", city);
    formData.append("bedrooms", bedrooms);
    formData.append("bathrooms", bathrooms);
    formData.append("price", price);
    formData.append("deposit", deposit);
    formData.append("houseType", houseType);
    formData.append("status", status);


    images.forEach((image) => {
      formData.append('images', image);
    });

    try {
      const response = await axios.post("/api/listings/addproperty", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Property Added Successfully:", response.data);
    } catch (error) {
      console.error("Error Adding Property:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg space-y-6"
    >
      <h2 className="text-3xl font-semibold text-center text-black">
        Add New Property Listing
      </h2>

      {/* Existing Form Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Title */}
        <div className="flex flex-col">
          <label htmlFor="title" className="font-medium text-gray-700">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter property title"
          />
        </div>

        {/* Other Form Fields */}
        {/* Add all other form fields like description, address, city, etc. here */}
      </div>

      {/* Images Section */}
      <div className="flex flex-col">
        <label htmlFor="images" className="font-medium text-gray-700">
          Images
        </label>
        <input
          id="images"
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          className="p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />

        {/* Image Previews */}
        <div className="flex flex-wrap gap-4 mt-4">
          {imagePreviews.map((preview, index) => (
            <div key={index} className="relative">
              <img
                src={preview}
                alt={`preview-${index}`}
                className="w-32 h-32 object-cover rounded-lg"
              />
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
