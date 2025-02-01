"use client";
import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
 import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
export default function EditListingPage() {
  const { id } = useParams();
  const router = useRouter();
 
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
  const [images, setImages] = useState([]); // New images
  const [imagePreviews, setImagePreviews] = useState([]); // Image previews for new images
  const [currentImages, setCurrentImages] = useState([]); // Current images from the API
  const [loading, setLoading] = useState(false);

  const fetchListing = useCallback(async () => {
    try {
      const response = await axios.get(`/api/listings/${id}`);
      const data = response.data.data;
  
      setTitle(data.title || "");
      setCity(data.city || "");
      setAddress(data.address || "");
      setPrice(data.price || "");
      setBedrooms(data.bedrooms || "");
      setBathrooms(data.bathrooms || "");
      setHouseType(data.houseType || "Rent");
      setStatus(data.status || "Available");
      setDeposit(data.deposit || "");
      setDescription(data.description || "");
      setCurrentImages(data.images || []);
    } catch (error) {
      toast.error("Failed to fetch listing details: " + error.message);
    }
  }, [id]);
  
  useEffect(() => {
    if (id) {
      fetchListing();
    }
  }, [id, fetchListing]); 
  

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

    const formDataToSend = new FormData();
    formDataToSend.append("title", title);
    formDataToSend.append("city", city);
    formDataToSend.append("address", address);
    formDataToSend.append("price", price);
    formDataToSend.append("bedrooms", bedrooms);
    formDataToSend.append("bathrooms", bathrooms);
    formDataToSend.append("houseType", houseType);
    formDataToSend.append("status", status);
    formDataToSend.append("deposit", deposit);
    formDataToSend.append("description", description);

    // Append only new images
    images.forEach((image) => formDataToSend.append("images", image));

    try {
      const response = await axios.put(`/api/listings/${id}`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        toast.success(response.data.message);
        router.push("/admin/listings");
      } else {
        toast.error("Failed to update property. Please try again.");
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg space-y-6"
    >
      {/* Title Field */}
      <div>
        <label className="block text-gray-600 font-semibold">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* City Field */}
      <div>
        <label className="block text-gray-600 font-semibold">City</label>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Address Field */}
      <div>
        <label className="block text-gray-600 font-semibold">Address</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Price Field */}
      <div>
        <label className="block text-gray-600 font-semibold">Price</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Bedrooms Field */}
      <div>
        <label className="block text-gray-600 font-semibold">Bedrooms</label>
        <input
          type="number"
          value={bedrooms}
          onChange={(e) => setBedrooms(e.target.value)}
          className="w-full mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Bathrooms Field */}
      <div>
        <label className="block text-gray-600 font-semibold">Bathrooms</label>
        <input
          type="number"
          value={bathrooms}
          onChange={(e) => setBathrooms(e.target.value)}
          className="w-full mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* House Type Field */}
      <div>
        <label className="block text-gray-600 font-semibold">House Type</label>
        <select
          value={houseType}
          onChange={(e) => setHouseType(e.target.value)}
          className="w-full mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
        >
          <option value="Rent">Rent</option>
          <option value="Buy">Buy</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Status Field */}
      <div>
        <label className="block text-gray-600 font-semibold">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
        >
          <option value="Available">Available</option>
          <option value="Pending">Pending</option>
          <option value="Sold">Sold</option>
          <option value="Rented">Rented</option>
        </select>
      </div>

      {/* Deposit Field */}
      <div>
        <label className="block text-gray-600 font-semibold">Deposit</label>
        <input
          type="number"
          value={deposit}
          onChange={(e) => setDeposit(e.target.value)}
          className="w-full mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Description Field */}
      <div>
        <label className="block text-gray-600 font-semibold">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="4"
          className="w-full mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Image upload */}
      <div>
        <label className="block text-gray-600 font-semibold">Images</label>
        <input
          type="file"
          onChange={handleImageChange}
          multiple
          accept="image/*"
          className="w-full mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
        />
        <div className="mt-4">
          {imagePreviews.map((preview, index) => (
            <div key={index} className="relative inline-block mr-4">
              <Image
                src={preview}
                alt={`Preview ${index}`}
                 width={500} height={300}
                className="w-24 h-24 object-cover rounded-md"
              />
              <button
                type="button"
                onClick={() => handleImageRemove(index)}
                className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
              >
                X
              </button>
            </div>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="w-full mt-6 bg-blue-600 text-white p-3 rounded-md shadow-sm"
        disabled={loading}
      >
        {loading ? "Saving..." : "Update Listing"}
      </button>
    </form>
  );
}
