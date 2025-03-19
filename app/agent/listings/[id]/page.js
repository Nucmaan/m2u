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

  const [formData, setFormData] = useState({
    title: "",
    city: "",
    address: "",
    price: "",
    bedrooms: "",
    bathrooms: "",
    houseType: "Rent",
    status: "Available",
    deposit: "",
    description: ""
  });

  const [images, setImages] = useState([]); // New images
  const [imagePreviews, setImagePreviews] = useState([]); // Image previews for new images
  const [currentImages, setCurrentImages] = useState([]); // Current images from the API
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [errors, setErrors] = useState({});
  const [deleteImageIndexes, setDeleteImageIndexes] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when field is changed
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const fetchListing = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/listings/${id}`);
      const data = response.data.data;

      // Set the state with fetched data
      setFormData({
        title: data.title || "",
        city: data.city || "",
        address: data.address || "",
        price: data.price || "",
        bedrooms: data.bedrooms || "",
        bathrooms: data.bathrooms || "",
        houseType: data.houseType || "Rent",
        status: data.status || "Available",
        deposit: data.deposit || "",
        description: data.description || ""
      });
      
      setCurrentImages(data.images || []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch listing details.");
      console.error("Error fetching listing:", error);
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
    
    // Create image previews for new uploads
    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(prev => [...prev, ...previews]);
    
    setImages(prev => [...prev, ...files]);
  };
  
  const removeNewImage = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
    
    const updatedPreviews = [...imagePreviews];
    URL.revokeObjectURL(updatedPreviews[index]); // Clean up the URL
    updatedPreviews.splice(index, 1);
    setImagePreviews(updatedPreviews);
  };

  const toggleDeleteCurrentImage = (index) => {
    setDeleteImageIndexes(prev => {
      if (prev.includes(index)) {
        return prev.filter(i => i !== index);
      } else {
        return [...prev, index];
      }
    });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    
    if (!formData.price) {
      newErrors.price = "Price is required";
    } else if (isNaN(formData.price) || Number(formData.price) <= 0) {
      newErrors.price = "Price must be a positive number";
    }
    
    if (formData.bedrooms && (isNaN(formData.bedrooms) || Number(formData.bedrooms) < 0)) {
      newErrors.bedrooms = "Bedrooms must be a positive number";
    }
    
    if (formData.bathrooms && (isNaN(formData.bathrooms) || Number(formData.bathrooms) < 0)) {
      newErrors.bathrooms = "Bathrooms must be a positive number";
    }
    
    if (formData.deposit && (isNaN(formData.deposit) || Number(formData.deposit) < 0)) {
      newErrors.deposit = "Deposit must be a positive number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const updateListingInfo = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    setUpdating(true);

    const formDataObj = new FormData();
    
    // Add all form fields
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== "") {
        formDataObj.append(key, value);
      }
    });

    // Add new images
    images.forEach((image) => {
      formDataObj.append("images", image);
    });
    
    // Add indexes of images to delete
    if (deleteImageIndexes.length > 0) {
      formDataObj.append("deleteImageIndexes", JSON.stringify(deleteImageIndexes));
    }

    try {
      const response = await axios.put(`/api/listings/${id}`, formDataObj, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        toast.success("Listing updated successfully");
        router.replace(`/agent/listings`);
      } else {
        toast.error("Failed to update listing");
      }
    } catch (error) {
      console.error("Error updating listing:", error);
      toast.error(error.response?.data?.message || "An error occurred while updating the listing");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7F7F9]">
        <RaadiLoading />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-[110px] bg-[#F7F7F9] px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
        <h1 className="text-2xl font-bold text-[#1A3B5D] mb-6">Edit Property Listing</h1>
        
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#1A3B5D] focus:border-[#1A3B5D] outline-none transition-colors ${
                  errors.title ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.title && <p className="mt-1 text-red-500 text-sm">{errors.title}</p>}
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#1A3B5D] focus:border-[#1A3B5D] outline-none transition-colors ${
                  errors.city ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.city && <p className="mt-1 text-red-500 text-sm">{errors.city}</p>}
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-2">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#1A3B5D] focus:border-[#1A3B5D] outline-none transition-colors ${
                  errors.address ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.address && <p className="mt-1 text-red-500 text-sm">{errors.address}</p>}
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Price ($)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#1A3B5D] focus:border-[#1A3B5D] outline-none transition-colors ${
                  errors.price ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.price && <p className="mt-1 text-red-500 text-sm">{errors.price}</p>}
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Bedrooms</label>
              <input
                type="number"
                name="bedrooms"
                value={formData.bedrooms}
                onChange={handleChange}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#1A3B5D] focus:border-[#1A3B5D] outline-none transition-colors ${
                  errors.bedrooms ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.bedrooms && <p className="mt-1 text-red-500 text-sm">{errors.bedrooms}</p>}
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Bathrooms</label>
              <input
                type="number"
                name="bathrooms"
                value={formData.bathrooms}
                onChange={handleChange}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#1A3B5D] focus:border-[#1A3B5D] outline-none transition-colors ${
                  errors.bathrooms ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.bathrooms && <p className="mt-1 text-red-500 text-sm">{errors.bathrooms}</p>}
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Deposit ($)</label>
              <input
                type="number"
                name="deposit"
                value={formData.deposit}
                onChange={handleChange}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#1A3B5D] focus:border-[#1A3B5D] outline-none transition-colors ${
                  errors.deposit ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.deposit && <p className="mt-1 text-red-500 text-sm">{errors.deposit}</p>}
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Property Type</label>
              <select
                name="houseType"
                value={formData.houseType}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A3B5D] focus:border-[#1A3B5D] outline-none"
              >
                <option value="Rent">For Rent</option>
                <option value="Buy">For Sale</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A3B5D] focus:border-[#1A3B5D] outline-none"
            >
              <option value="Available">Available</option>
              <option value="Sold">Sold</option>
              <option value="Rented">Rented</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A3B5D] focus:border-[#1A3B5D] outline-none"
            ></textarea>
          </div>

          {/* Current Images Preview with delete option */}
          {currentImages.length > 0 && (
            <div>
              <label className="block text-gray-700 font-medium mb-3">
                Current Property Images
              </label>
              <div className="flex flex-wrap gap-4">
                {currentImages.map((img, index) => (
                  <div key={index} className="relative group">
                    <div className={`relative w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden border-2 ${
                      deleteImageIndexes.includes(index) ? 'border-red-500 opacity-50' : 'border-gray-200'
                    }`}>
                      <Image 
                        src={img} 
                        alt={`Property Image ${index + 1}`} 
                        fill={true}
                        className="rounded-lg object-cover"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleDeleteCurrentImage(index)}
                      className={`absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center ${
                        deleteImageIndexes.includes(index) ? 'bg-gray-500' : 'bg-red-500'
                      } text-white text-xs`}
                    >
                      {deleteImageIndexes.includes(index) ? '↺' : '×'}
                    </button>
                  </div>
                ))}
              </div>
              {deleteImageIndexes.length > 0 && (
                <p className="mt-2 text-sm text-red-500">
                  {deleteImageIndexes.length} image(s) marked for deletion. Changes will apply when you save.
                </p>
              )}
            </div>
          )}

          {/* New Images Upload and Preview */}
          <div>
            <label className="block text-gray-700 font-medium mb-3">
              Upload New Images
            </label>
            <div className="mb-4">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg className="w-8 h-8 mb-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                  </svg>
                  <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                  <p className="text-xs text-gray-500">PNG, JPG or WEBP (MAX. 5MB per image)</p>
                </div>
                <input 
                  type="file" 
                  className="hidden" 
                  multiple 
                  onChange={handleImageChange} 
                  accept="image/*"
                />
              </label>
            </div>

            {/* New Image Previews */}
            {imagePreviews.length > 0 && (
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">New Images to Upload:</h3>
                <div className="flex flex-wrap gap-4">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative group">
                      <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden border-2 border-gray-200">
                        <Image 
                          src={preview} 
                          alt={`New Upload ${index + 1}`} 
                          fill={true}
                          className="rounded-lg object-cover"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeNewImage(index)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={updateListingInfo}
              disabled={updating}
              className={`flex-1 px-6 py-3 bg-[#1A3B5D] text-white font-medium rounded-lg hover:bg-[#16324A] transition-colors ${
                updating ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {updating ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving Changes...
                </span>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
