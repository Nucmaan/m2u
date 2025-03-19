"use client";
import React, { useState } from "react";
import axios from "axios";
import userAuth from "@/myStore/UserAuth";
import toast from "react-hot-toast";
import Image from "next/image";
import Link from "next/link";
import { FiUpload, FiArrowLeft, FiCheckCircle, FiMapPin, FiHome, FiDollarSign, FiSave } from "react-icons/fi";
import { BiArea, BiBed } from "react-icons/bi";

const AddListing = () => {
  const user = userAuth((state) => state.user);
  
  // Form state
  const [formData, setFormData] = useState({
    title: "",
    city: "",
    address: "",
    price: "",
    bedrooms: "",
    bathrooms: "",
    sqft: "",
    houseType: "Rent",
    status: "Available",
    deposit: "",
    description: "",
    amenities: {
      parking: false,
      airConditioning: false,
      heating: false,
      wifi: false,
      kitchen: false,
      tv: false,
      laundry: false,
      pool: false,
    }
  });
  
  // UI state
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});
  
  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      // Handle nested properties (for amenities)
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: type === 'checkbox' ? checked : value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ""
      });
    }
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      // Validate each file
      const validFiles = Array.from(files).filter(file => {
        // Check file type
        if (!file.type.match('image.*')) {
          toast.error(`${file.name} is not an image file`);
          return false;
        }
        // Check file size (limit to 5MB)
        if (file.size > 5 * 1024 * 1024) {
          toast.error(`${file.name} is too large (max 5MB)`);
          return false;
        }
        return true;
      });
      
      if (validFiles.length > 0) {
        const newImages = [...images, ...validFiles];
        const newPreviews = [
          ...imagePreviews,
          ...validFiles.map((file) => URL.createObjectURL(file)),
        ];
        setImages(newImages);
        setImagePreviews(newPreviews);
      }
    }
  };

  // Remove an image from the selection
  const handleImageRemove = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    const updatedPreviews = imagePreviews.filter((_, i) => i !== index);
    setImages(updatedImages);
    setImagePreviews(updatedPreviews);
  };

  // Validate form before submission
  const validateForm = () => {
    const newErrors = {};
    
    // Required fields
    ['title', 'city', 'address', 'price', 'bedrooms', 'bathrooms'].forEach(field => {
      if (!formData[field]) {
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
      }
    });
    
    // Numeric validation
    ['price', 'bedrooms', 'bathrooms', 'deposit', 'sqft'].forEach(field => {
      if (formData[field] && isNaN(Number(formData[field]))) {
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} must be a number`;
      }
    });
    
    // Positive number validation
    ['price', 'bedrooms', 'bathrooms'].forEach(field => {
      if (formData[field] && Number(formData[field]) <= 0) {
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} must be greater than zero`;
      }
    });
    
    // Image validation
    if (images.length === 0) {
      newErrors.images = "At least one image is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }
    
    setLoading(true);
    const formDataToSend = new FormData();
    
    // Append all form fields
    formDataToSend.append("owner", user._id);
    Object.keys(formData).forEach(key => {
      if (key !== 'amenities') {
        formDataToSend.append(key, formData[key]);
      }
    });
    
    // Append amenities as JSON
    formDataToSend.append("amenities", JSON.stringify(formData.amenities));
    
    // Append images
    images.forEach((image) => formDataToSend.append("images", image));

    try {
      const response = await axios.post("/api/listings/addproperty", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      
      if (response.status === 200) {
        toast.success(response.data.message || "Property added successfully!");
        
        // Reset form
        setFormData({
          title: "",
          city: "",
          address: "",
          price: "",
          bedrooms: "",
          bathrooms: "",
          sqft: "",
          houseType: "Rent",
          status: "Available",
          deposit: "",
          description: "",
          amenities: {
            parking: false,
            airConditioning: false,
            heating: false,
            wifi: false,
            kitchen: false,
            tv: false,
            laundry: false,
            pool: false,
          }
        });
        setImages([]);
        setImagePreviews([]);
        setCurrentStep(1);
      } else {
        toast.error("Failed to add property. Please try again.");
      }
    } catch (error) {
      toast.error(`Failed to add property: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Go to next form step
  const handleNextStep = () => {
    // Validate current step before proceeding
    const fieldsToValidate = currentStep === 1 
      ? ['title', 'city', 'address', 'price', 'bedrooms', 'bathrooms', 'sqft', 'houseType']
      : [];
    
    const stepErrors = {};
    fieldsToValidate.forEach(field => {
      if (!formData[field]) {
        stepErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
      }
    });
    
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      toast.error("Please fill in all required fields");
      return;
    }
    
    setCurrentStep(currentStep + 1);
  };

  // Go to previous form step
  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  // Render form steps
  const renderFormStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div className="col-span-2">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Basic Information</h3>
            </div>
            
            {/* Title */}
            <div className="col-span-2">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Property Title*
              </label>
              <input
                id="title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleInputChange}
                className={`w-full p-3 border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                placeholder="e.g. Modern 2-Bedroom Apartment with Ocean View"
              />
              {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
            </div>
            
            {/* Location */}
            <div className="sm:col-span-2">
              <div className="flex items-center mb-2">
                <FiMapPin className="text-primary mr-2" />
                <h3 className="text-md font-medium text-gray-700">Location</h3>
              </div>
            </div>
            
            {/* City */}
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                City*
              </label>
              <input
                id="city"
                name="city"
                type="text"
                value={formData.city}
                onChange={handleInputChange}
                className={`w-full p-3 border ${errors.city ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                placeholder="e.g. New York"
              />
              {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
            </div>
            
            {/* Address */}
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                Address*
              </label>
              <input
                id="address"
                name="address"
                type="text"
                value={formData.address}
                onChange={handleInputChange}
                className={`w-full p-3 border ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                placeholder="e.g. 123 Main Street, Apt 4B"
              />
              {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
            </div>
            
            {/* Property Details */}
            <div className="sm:col-span-2">
              <div className="flex items-center mb-2">
                <FiHome className="text-primary mr-2" />
                <h3 className="text-md font-medium text-gray-700">Property Details</h3>
              </div>
            </div>
            
            {/* Price */}
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                Price* ($)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiDollarSign className="text-gray-500" />
                </div>
                <input
                  id="price"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleInputChange}
                  className={`w-full pl-8 p-3 border ${errors.price ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                  placeholder="e.g. 1500"
                />
              </div>
              {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
            </div>
            
            {/* House Type */}
            <div>
              <label htmlFor="houseType" className="block text-sm font-medium text-gray-700 mb-1">
                Listing Type*
              </label>
              <select
                id="houseType"
                name="houseType"
                value={formData.houseType}
                onChange={handleInputChange}
                className={`w-full p-3 border ${errors.houseType ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
              >
                <option value="Rent">For Rent</option>
                <option value="Buy">For Sale</option>
              </select>
              {errors.houseType && <p className="mt-1 text-sm text-red-600">{errors.houseType}</p>}
            </div>
            
            {/* Deposit - only show for Rent */}
            {formData.houseType === "Rent" && (
              <div>
                <label htmlFor="deposit" className="block text-sm font-medium text-gray-700 mb-1">
                  Security Deposit ($)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiDollarSign className="text-gray-500" />
                  </div>
                  <input
                    id="deposit"
                    name="deposit"
                    type="number"
                    value={formData.deposit}
                    onChange={handleInputChange}
                    className={`w-full pl-8 p-3 border ${errors.deposit ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                    placeholder="e.g. 1500"
                  />
                </div>
                {errors.deposit && <p className="mt-1 text-sm text-red-600">{errors.deposit}</p>}
              </div>
            )}
            
            {/* Status */}
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                Status*
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className={`w-full p-3 border ${errors.status ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
              >
                <option value="Available">Available</option>
                <option value="Pending">Pending</option>
                <option value="Sold">Sold</option>
                <option value="Rented">Rented</option>
              </select>
              {errors.status && <p className="mt-1 text-sm text-red-600">{errors.status}</p>}
            </div>
            
            {/* Room Details */}
            <div className="sm:col-span-2">
              <div className="flex items-center mb-2">
                <BiBed className="text-primary mr-2" />
                <h3 className="text-md font-medium text-gray-700">Room Details</h3>
              </div>
            </div>
            
            {/* Bedrooms */}
            <div>
              <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700 mb-1">
                Bedrooms*
              </label>
              <input
                id="bedrooms"
                name="bedrooms"
                type="number"
                value={formData.bedrooms}
                onChange={handleInputChange}
                className={`w-full p-3 border ${errors.bedrooms ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                placeholder="e.g. 2"
              />
              {errors.bedrooms && <p className="mt-1 text-sm text-red-600">{errors.bedrooms}</p>}
            </div>
            
            {/* Bathrooms */}
            <div>
              <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-700 mb-1">
                Bathrooms*
              </label>
              <input
                id="bathrooms"
                name="bathrooms"
                type="number"
                value={formData.bathrooms}
                onChange={handleInputChange}
                className={`w-full p-3 border ${errors.bathrooms ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                placeholder="e.g. 1.5"
              />
              {errors.bathrooms && <p className="mt-1 text-sm text-red-600">{errors.bathrooms}</p>}
            </div>
            
            {/* Square Feet */}
            <div>
              <label htmlFor="sqft" className="block text-sm font-medium text-gray-700 mb-1">
                Square Feet
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <BiArea className="text-gray-500" />
                </div>
                <input
                  id="sqft"
                  name="sqft"
                  type="number"
                  value={formData.sqft}
                  onChange={handleInputChange}
                  className={`w-full pl-8 p-3 border ${errors.sqft ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                  placeholder="e.g. 1200"
                />
              </div>
              {errors.sqft && <p className="mt-1 text-sm text-red-600">{errors.sqft}</p>}
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="grid grid-cols-1 gap-6">
            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Property Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className={`w-full p-3 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                placeholder="Describe your property in detail..."
                rows={5}
              />
              {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
            </div>
            
            {/* Amenities */}
            <div>
              <h3 className="text-md font-medium text-gray-700 mb-3">Amenities & Features</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {Object.keys(formData.amenities).map((amenity) => (
                  <div key={amenity} className="flex items-center">
                    <input
                      id={amenity}
                      name={`amenities.${amenity}`}
                      type="checkbox"
                      checked={formData.amenities[amenity]}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    />
                    <label htmlFor={amenity} className="ml-2 block text-sm text-gray-700 capitalize">
                      {amenity === 'airConditioning' ? 'Air Conditioning' : 
                       amenity === 'wifi' ? 'WiFi' : 
                       amenity === 'tv' ? 'TV' : amenity}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Property Images*
              </label>
              <div className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg ${errors.images ? 'border-red-500' : 'border-gray-300'}`}>
                <div className="space-y-1 text-center">
                  <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="images"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary-dark focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary"
                    >
                      <span>Upload files</span>
                      <input
                        id="images"
                        name="images"
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageChange}
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF up to 5MB each
                  </p>
                </div>
              </div>
              {errors.images && <p className="mt-1 text-sm text-red-600">{errors.images}</p>}
              
              {/* Image Previews */}
              {imagePreviews.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Selected Images:</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {imagePreviews.map((preview, index) => (
                      <div key={index} className="relative group">
                        <div className="relative h-32 w-full rounded-lg overflow-hidden">
                          <Image
                            src={preview}
                            alt={`preview-${index}`}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <button
                              type="button"
                              onClick={() => handleImageRemove(index)}
                              className="bg-red-600 text-white rounded-full p-1 hover:bg-red-700 transition-colors"
                            >
                              &times;
                            </button>
                          </div>
                        </div>
                        {index === 0 && (
                          <span className="absolute top-2 left-2 bg-primary text-white text-xs px-2 py-1 rounded">
                            Main Photo
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-[#F7F7F9] pt-[110px] pb-10">
      <div className="max-w-8xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Add New Property</h1>
            <p className="text-gray-500 mt-1">Fill in the details to create a new property listing</p>
          </div>
          <Link 
            href="/agent/listings"
            className="flex items-center text-primary hover:text-primary-dark transition-colors"
          >
            <FiArrowLeft className="mr-2" />
            <span>Back to Listings</span>
          </Link>
        </div>
        
        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Progress Steps */}
          <div className="border-b border-gray-200">
            <div className="p-4">
              <div className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  currentStep >= 1 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  1
                </div>
                <div className={`flex-1 h-1 mx-2 ${
                  currentStep >= 2 ? 'bg-primary' : 'bg-gray-200'
                }`}></div>
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  currentStep >= 2 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  2
                </div>
              </div>
              <div className="flex justify-between mt-1 text-xs text-gray-500">
                <span>Property Details</span>
                <span>Description & Images</span>
              </div>
            </div>
          </div>
          
          {/* Form Content */}
          <div className="p-6">
            {renderFormStep()}
          </div>
          
          {/* Form Actions */}
          <div className="bg-gray-50 px-6 py-4 flex justify-between">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handlePrevStep}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors"
              >
                Previous
              </button>
            ) : (
              <Link
                href="/agent/listings"
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors"
              >
                Cancel
              </Link>
            )}
            
            {currentStep < 2 ? (
              <button
                type="button"
                onClick={handleNextStep}
                className="px-5 py-2.5 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                disabled={loading}
                className="flex items-center px-5 py-2.5 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Property...
                  </>
                ) : (
                  <>
                    <FiSave className="mr-2" />
                    Create Property
                  </>
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddListing;