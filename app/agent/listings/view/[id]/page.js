"use client";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import userAuth from "@/myStore/UserAuth";
import toast from "react-hot-toast";
import Image from "next/image";
import Link from "next/link";
import RaadiLoading from "@/components/RaadiLoading";

const ViewProperty = () => {
  const router = useRouter();
  const { id } = useParams();
  const [list, setList] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const user = userAuth((state) => state.user);
  const [owner, setOwner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchList = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/listings/${id}`);
        if (!response.data.data) {
          throw new Error("Property not found");
        }
        setList(response.data.data);
        setOwner(response.data.data.owner);
        setError(null);
      } catch (error) {
        console.error("Error fetching property:", error);
        setError(error.message || "Failed to fetch property details");
        toast.error(error.response?.data?.message || "Failed to fetch property details");
      } finally {
        setLoading(false);
      }
    };
    
    if (id) {
      fetchList();
    }
  }, [id]);

  const nextImage = () => {
    if (list?.images?.length) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === list.images.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const prevImage = () => {
    if (list?.images?.length) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? list.images.length - 1 : prevIndex - 1
      );
    }
  };

  const goToImage = (index) => {
    if (list?.images?.length && index >= 0 && index < list.images.length) {
      setCurrentImageIndex(index);
    }
  };

  const handleGoBack = () => {
    router.back();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7F7F9]">
        <RaadiLoading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F7F7F9] px-4 sm:px-6 lg:px-8 py-8 flex flex-col items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-xl text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-gray-700 mb-6">{error}</p>
          <button 
            onClick={handleGoBack}
            className="bg-[#1A3B5D] text-white font-bold py-3 px-6 rounded-lg hover:bg-[#16324A] transition"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen pt-[110px] bg-[#F7F7F9] px-4 sm:px-6 lg:px-8 py-8">
      <div className="w-full max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-[#E0E0E0]">
        <div className="relative">
          {list?.images?.length > 0 ? (
            <>
              <Image
                src={list.images[currentImageIndex] || "https://via.placeholder.com/500"}
                alt={`${list.title} - Image ${currentImageIndex + 1}`}
                width={800} height={500}
                className="w-full h-80 sm:h-96 lg:h-[500px] object-cover transition-opacity duration-300"
              />
              <button
                onClick={prevImage}
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-[#1A3B5D]/80 text-white rounded-full p-3 hover:bg-[#16324A] transition"
                aria-label="Previous Image"
              >❮</button>
              <button
                onClick={nextImage}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-[#1A3B5D]/80 text-white rounded-full p-3 hover:bg-[#16324A] transition"
                aria-label="Next Image"
              >❯</button>
              
              {/* Image counter */}
              <div className="absolute bottom-4 right-4 bg-[#1A3B5D]/80 text-white px-3 py-1 rounded-full">
                {currentImageIndex + 1} / {list.images.length}
              </div>
              
              {/* Image dots for quick navigation */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                {list.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToImage(index)}
                    className={`w-3 h-3 rounded-full ${currentImageIndex === index ? 'bg-[#F47C48]' : 'bg-white/70'}`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="w-full h-80 sm:h-96 lg:h-[500px] bg-gray-200 flex items-center justify-center">
              <p className="text-gray-500">No images available</p>
            </div>
          )}
        </div>

        <div className="p-6 lg:p-8">
          <div className="flex justify-between items-start mb-6">
            <h1 className="text-3xl font-bold text-[#1A3B5D]">{list?.title}</h1>
            <span className="text-2xl font-bold text-[#F47C48]">${list?.price?.toLocaleString()}</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <h2 className="text-xl font-semibold text-[#1A3B5D] mb-3">Property Details</h2>
              <div className="space-y-2">
                <p className="flex items-center gap-2">
                  <span className="font-medium text-[#1A3B5D]">City:</span> 
                  <span className="text-[#7A7A7A]">{list?.city}</span>
                </p>
                <p className="flex items-center gap-2">
                  <span className="font-medium text-[#1A3B5D]">Address:</span> 
                  <span className="text-[#7A7A7A]">{list?.address}</span>
                </p>
                <p className="flex items-center gap-2">
                  <span className="font-medium text-[#1A3B5D]">Type:</span> 
                  <span className="text-[#7A7A7A]">{list?.houseType}</span>
                </p>
              </div>
            </div>

            {owner && (
              <div>
                <h2 className="text-xl font-semibold text-[#1A3B5D] mb-3">Contact Information</h2>
                <div className="flex items-center gap-4 p-4 border border-[#E0E0E0] rounded-lg bg-[#F9F9F9]">
                  <Image
                    src={owner.avatar || "https://via.placeholder.com/150"}
                    alt={owner.username || "Owner"}
                    width={60} height={60}
                    className="w-14 h-14 rounded-full border object-cover"
                  />
                  <div>
                    <p className="font-semibold text-[#1A3B5D]">{owner.username}</p>
                    <p className="text-[#7A7A7A]">{owner.email}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-4 mt-8">
            <button 
              onClick={handleGoBack} 
              className="flex-1 bg-[#1A3B5D] text-white font-bold py-3 rounded-lg hover:bg-[#16324A] transition"
            >
              Go Back
            </button>
            <Link 
              href={`mailto:${owner?.email}`} 
              className="flex-1 bg-[#F47C48] text-white font-bold py-3 rounded-lg hover:bg-[#d86030] transition text-center"
            >
              Contact Owner
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ViewProperty;
