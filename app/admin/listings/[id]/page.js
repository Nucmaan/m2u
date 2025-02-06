"use client";
import React, { useEffect, useState, useCallback } from "react";
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
      console.log("Fetched data:", data);

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
      console.error("Error fetching listing:", error);
      toast.error("Failed to fetch listing details.");
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchListing();
    }
  }, [id, fetchListing]);

  return (
    <form className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg space-y-6">
      <div>
        <label className="block text-gray-600 font-semibold">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Image Previews */}
      <div>
        <label className="block text-gray-600 font-semibold">Images</label>
        <div className="flex flex-wrap gap-2">
          {currentImages.map((img, index) => (
            <Image key={index} src={img} alt={`Image ${index}`} width={100} height={100} />
          ))}
        </div>
      </div>
    </form>
  );
}
