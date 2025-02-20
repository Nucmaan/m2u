"use client";
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import RaadiLoading from "@/components/RaadiLoading";

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
  const [errorMessage, setErrorMessage] = useState("");


  const [updating, setUpdating] = useState(false);


  const fetchListing = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/listings/${id}`);
      const data = response.data.data;
      //console.log("Fetched data:", data);

      // Set the state with fetched data
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
      setErrorMessage(error.response?.data?.message || "");
     // console.error("Error fetching listing:", error);
      toast.error("Failed to fetch listing details.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchListing();
    }
  }, [id, fetchListing]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files]); // Append new images
  };

  const updateListingInfo = async (e) => {
    e.preventDefault();

    setUpdating(true);

    const formData = new FormData();
    if(title) {
      formData.append("title", title);
    }
    if(city) {
      formData.append("city", city);
    }
    if(address) {
      formData.append("address", address);
    }
    if(price) {
      formData.append("price", price);
    }
    if(bedrooms) {
      formData.append("bedrooms", bedrooms);
    }
    if(bathrooms) {
      formData.append("bathrooms", bathrooms);
    }
    if(houseType) {
      formData.append("houseType", houseType);
    }
    if(status) {
      formData.append("status", status);
    }
    if(deposit) {
      formData.append("deposit", deposit);
    }
    if(description) {
      formData.append("description", description);
    }

    images.forEach((image) => {
      formData.append("images", image);
    });


    try {
      
      const response = await axios.put(`/api/listings/${id}`, formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            });

      if (response.status === 200) {
        toast.success("Listing updated successfully.");
        router.replace(`/agent/listings`);
      }else{
        toast.error("Failed to update listing.");
      }

    } catch (error) {
      setErrorMessage(error.response?.data?.message || "");
      //console.log(error);
    } finally {
      setUpdating(false);
    }
  }

  if(loading){
    return <RaadiLoading/>;
  }


  return (
    <form className="max-w-8xl m-6   bg-white px-8 pt-6 pb-8 rounded-lg ">
      <div>
        <label className="block text-gray-600 font-semibold">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-gray-600 font-semibold">City</label>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-gray-600 font-semibold">address</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-gray-600 font-semibold">price</label>
        <input
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-gray-600 font-semibold">bedrooms</label>
        <input
          type="text"
          value={bedrooms}
          onChange={(e) => setBedrooms(e.target.value)}
          className="w-full mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-gray-600 font-semibold">bathrooms</label>
        <input
          type="text"
          value={bathrooms}
          onChange={(e) => setBathrooms(e.target.value)}
          className="w-full mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-gray-600 font-semibold">deposit</label>
        <input
          type="text"
          value={deposit}
          onChange={(e) => setDeposit(e.target.value)}
          className="w-full mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-gray-600 font-semibold">
          Additional Information
        </label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-gray-600 font-semibold">house Type</label>
        <select
          value={houseType}
          onChange={(e) => setHouseType(e.target.value)}
          className="w-full mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
        >
          <option value="Rent">Rent</option>
          <option value="Buy">Buy</option>
        </select>
      </div>

      <div>
        <label className="block text-gray-600 font-semibold">
          house status
        </label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
        >
          <option value="Available">Available</option>
          <option value="Sold">Sold</option>
          <option value="Rented">Rented</option>
        </select>
      </div>

     {/* Other form fields remain unchanged */}

      {/* Current Images Preview */}
      <div>
        <label className="block text-gray-600 font-semibold mb-2">
          Current Property Images
        </label>
        <div className="flex flex-wrap gap-2">
          {currentImages.map((img, index) => (
            <Image key={index} src={img} alt={`Image ${index}`} width={100} height={100} />
          ))}
        </div>
      </div>

      {/* Upload New Images */}
      <div>
        <label className="block text-gray-600 font-semibold mb-2">
          Upload New Images
        </label>
        <input
          type="file"
          multiple
          onChange={handleImageChange}
          className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
        />
      </div>


      <button
        type="submit"
        onClick={updateListingInfo}
        className="bg-[#1A3B5D] text-white py-2 px-4 rounded-md hover:bg-[#1A3B5D] focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {updating ? "Saving..." : "Save Changes"}
      </button>

    </form>
  );
}
