"use client";
import React, { useState } from "react";
import axios from "axios";
import userAuth from "@/myStore/UserAuth";
import toast from "react-hot-toast";

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

  const [loading, setLoading] = useState(false); // New loading state

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
    setLoading(true); // Set loading to true when submission starts

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
      setLoading(false); // Reset loading state
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto bg-gray-100 p-8 rounded-lg shadow-md space-y-6"
    >
      <h2 className="text-2xl font-semibold text-center text-black">
        Add New Property Listing
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="flex flex-col">
          <label htmlFor="title" className="text-gray-700 font-medium">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="Enter property title"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="city" className="text-gray-700 font-medium">
            City
          </label>
          <input
            id="city"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="Enter city"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="address" className="text-gray-700 font-medium">
            Address
          </label>
          <input
            id="address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="Enter address"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="price" className="text-gray-700 font-medium">
            Price
          </label>
          <input
            id="price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="Enter price"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="bedrooms" className="text-gray-700 font-medium">
            Bedrooms
          </label>
          <input
            id="bedrooms"
            type="number"
            value={bedrooms}
            onChange={(e) => setBedrooms(e.target.value)}
            className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="Enter number of bedrooms"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="bathrooms" className="text-gray-700 font-medium">
            Bathrooms
          </label>
          <input
            id="bathrooms"
            type="number"
            value={bathrooms}
            onChange={(e) => setBathrooms(e.target.value)}
            className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="Enter number of bathrooms"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="houseType" className="text-gray-700 font-medium">
            House Type
          </label>
          <select
            id="houseType"
            value={houseType}
            onChange={(e) => setHouseType(e.target.value)}
            className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          >
            <option value="Rent">Rent</option>
            <option value="Buy">Buy</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="status" className="text-gray-700 font-medium">
            Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          >
            <option value="Available">Available</option>
            <option value="Sold">Sold</option>
            <option value="Rented">Rented</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="deposit" className="text-gray-700 font-medium">
            Deposit
          </label>
          <input
            id="deposit"
            type="number"
            value={deposit}
            onChange={(e) => setDeposit(e.target.value)}
            className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="Enter deposit amount"
          />
        </div>

        <div className="flex flex-col col-span-2">
          <label htmlFor="description" className="text-gray-700 font-medium">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="Enter property description"
            rows={4}
          />
        </div>

        <div className="flex flex-col col-span-2">
          <label htmlFor="images" className="text-gray-700 font-medium">
            Images
          </label>
          <input
            id="images"
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex flex-wrap gap-4 mt-4">
            {imagePreviews.map((preview, index) => (
              <div key={index} className="relative">
                <img
                  src={preview}
                  alt={`preview-${index}`}
                  className="w-24 h-24 object-cover rounded-md shadow-md"
                />
                <button
                  type="button"
                  onClick={() => handleImageRemove(index)}
                  className="absolute top-0 right-0 bg-red-600 text-white text-sm px-2 py-1 rounded-full"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-3 bg-black text-white font-semibold rounded-md hover:bg-gray-800 transition duration-300"
      >
        {loading ? "Loading..." : "Add Property"}
      </button>
    </form>
  );
};

export default AddListing;
