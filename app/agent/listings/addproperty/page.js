"use client";
import React, { useState } from "react";
import axios from "axios";
import userAuth from "@/myStore/UserAuth";
import toast from "react-hot-toast";
import Image from "next/image";

const AddListing = () => {
  const user = userAuth((state) => state.user);

  const [title, setTitle] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [price, setPrice] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [houseType, setHouseType] = useState("Rent");
  const [status, setStatus] = useState("Available");
  const [deposit, setDeposit] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const handleImageRemove = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    const updatedPreviews = imagePreviews.filter((_, i) => i !== index);
    setImages(updatedImages);
    setImagePreviews(updatedPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("owner", user._id);
    formData.append("title", title);
    formData.append("city", city);
    formData.append("address", address);
    formData.append("price", price);
    formData.append("bedrooms", bedrooms);
    formData.append("bathrooms", bathrooms);
    formData.append("houseType", houseType);
    formData.append("status", status);
    formData.append("deposit", deposit);
    formData.append("description", description);

    images.forEach((image) => formData.append("images", image));

    try {
      const response = await axios.post("/api/listings/addproperty", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 200) {
        toast.success(response.data.message);
        setTitle("");
        setCity("");
        setAddress("");
        setPrice("");
        setBedrooms("");
        setBathrooms("");
        setHouseType("Rent");
        setStatus("Available");
        setDeposit("");
        setDescription("");
        setImages([]);
        setImagePreviews([]);
      } else {
        toast.error("Failed to add property. Please try again.");
      }
    } catch (error) {
      toast.error(`Failed to add property. Please try again. ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto bg-white p-8 mt-3 rounded-lg shadow-lg border border-[#E0E0E0] space-y-6"
    >
      <h2 className="text-2xl font-bold text-center text-[#1A3B5D]">
        Add New Property Listing
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Title */}
        <div className="flex flex-col">
          <label htmlFor="title" className="text-sm font-semibold text-[#1A3B5D] mb-2">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-3 border border-[#E0E0E0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#F47C48]"
            placeholder="Enter property title"
            required
          />
        </div>

        {/* City */}
        <div className="flex flex-col">
          <label htmlFor="city" className="text-sm font-semibold text-[#1A3B5D] mb-2">
            City
          </label>
          <input
            id="city"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="p-3 border border-[#E0E0E0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#F47C48]"
            placeholder="Enter city"
            required
          />
        </div>

        {/* Address */}
        <div className="flex flex-col">
          <label htmlFor="address" className="text-sm font-semibold text-[#1A3B5D] mb-2">
            Address
          </label>
          <input
            id="address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="p-3 border border-[#E0E0E0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#F47C48]"
            placeholder="Enter address"
            required
          />
        </div>

        {/* Price */}
        <div className="flex flex-col">
          <label htmlFor="price" className="text-sm font-semibold text-[#1A3B5D] mb-2">
            Price
          </label>
          <input
            id="price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="p-3 border border-[#E0E0E0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#F47C48]"
            placeholder="Enter price"
            required
          />
        </div>

        {/* Bedrooms */}
        <div className="flex flex-col">
          <label htmlFor="bedrooms" className="text-sm font-semibold text-[#1A3B5D] mb-2">
            Bedrooms
          </label>
          <input
            id="bedrooms"
            type="number"
            value={bedrooms}
            onChange={(e) => setBedrooms(e.target.value)}
            className="p-3 border border-[#E0E0E0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#F47C48]"
            placeholder="Enter number of bedrooms"
            required
          />
        </div>

        {/* Bathrooms */}
        <div className="flex flex-col">
          <label htmlFor="bathrooms" className="text-sm font-semibold text-[#1A3B5D] mb-2">
            Bathrooms
          </label>
          <input
            id="bathrooms"
            type="number"
            value={bathrooms}
            onChange={(e) => setBathrooms(e.target.value)}
            className="p-3 border border-[#E0E0E0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#F47C48]"
            placeholder="Enter number of bathrooms"
            required
          />
        </div>

        {/* House Type */}
        <div className="flex flex-col">
          <label htmlFor="houseType" className="text-sm font-semibold text-[#1A3B5D] mb-2">
            House Type
          </label>
          <select
            id="houseType"
            value={houseType}
            onChange={(e) => setHouseType(e.target.value)}
            className="p-3 border border-[#E0E0E0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#F47C48]"
          >
            <option value="Rent">Rent</option>
            <option value="Buy">Buy</option>
          </select>
        </div>

        {/* Status */}
        <div className="flex flex-col">
          <label htmlFor="status" className="text-sm font-semibold text-[#1A3B5D] mb-2">
            Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="p-3 border border-[#E0E0E0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#F47C48]"
          >
            <option value="Available">Available</option>
            <option value="Sold">Sold</option>
            <option value="Rented">Rented</option>
          </select>
        </div>

        {/* Deposit */}
        <div className="flex flex-col">
          <label htmlFor="deposit" className="text-sm font-semibold text-[#1A3B5D] mb-2">
            Deposit
          </label>
          <input
            id="deposit"
            type="number"
            value={deposit}
            onChange={(e) => setDeposit(e.target.value)}
            className="p-3 border border-[#E0E0E0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#F47C48]"
            placeholder="Enter deposit amount"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col col-span-2">
          <label htmlFor="description" className="text-sm font-semibold text-[#1A3B5D] mb-2">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="p-3 border border-[#E0E0E0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#F47C48]"
            placeholder="Enter property description"
            rows={4}
          />
        </div>

        {/* Images */}
        <div className="flex flex-col col-span-2">
          <label htmlFor="images" className="text-sm font-semibold text-[#1A3B5D] mb-2">
            Images
          </label>
          <input
            id="images"
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="p-3 border border-[#E0E0E0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#F47C48]"
          />
          <div className="flex flex-wrap gap-4 mt-4">
            {imagePreviews.map((preview, index) => (
              <div key={index} className="relative">
                <Image
                  src={preview}
                  alt={`preview-${index}`}
                   width={500} height={300}
                  className="w-24 h-24 object-cover rounded-md shadow-md"
                />
                <button
                  type="button"
                  onClick={() => handleImageRemove(index)}
                  className="absolute top-0 right-0 bg-[#E74C3C] text-white text-sm px-2 py-1 rounded-full hover:bg-[#C0392B] transition duration-200"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-3 bg-[#1A3B5D] text-white font-semibold rounded-md hover:bg-[#16324A] transition duration-200"
        disabled={loading}
      >
        {loading ? "Loading..." : "Add Property"}
      </button>
    </form>
  );
};

export default AddListing;