"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

export default function ViewDetailsPage() {
  const { id } = useParams();
  const [list, setList] = useState({});
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const fetchList = async () => {
    try {
      const response = await axios.get(`/api/listings/${id}`);
      setList(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const nextImage = () => {
    if (list.images?.length) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === list.images.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const prevImage = () => {
    if (list.images?.length) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? list.images.length - 1 : prevIndex - 1
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F7F9] p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#1A3B5D]">{list.title}</h1>
        <p className="text-[#7A7A7A]">
          {list.address}, {list.city}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="relative">
          {list.images?.length > 0 ? (
            <img
              src={list.images[currentImageIndex]}
              alt={list.title || "Property"}
              className="w-full h-80 sm:h-96 lg:h-[500px] object-cover"
            />
          ) : (
            <Image
              src="https://via.placeholder.com/600"
              alt="Placeholder"
               width={500} height={300}
              className="w-full h-80 sm:h-96 lg:h-[500px] object-cover"
            />
          )}
          <button
            onClick={prevImage}
            className="absolute top-1/2 left-6 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-3 hover:bg-gray-700 transition shadow-lg"
            aria-label="Previous Image"
          >
            ❮
          </button>
          <button
            onClick={nextImage}
            className="absolute top-1/2 right-6 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-3 hover:bg-gray-700 transition shadow-lg"
            aria-label="Next Image"
          >
            ❯
          </button>
        </div>

        <div className="lg:w-1/2 bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold text-[#333333]">Details</h2>
          <p className="text-[#7A7A7A] mt-2">{list.description}</p>

          <div className="mt-4">
            <div className="flex justify-between text-[#333333] font-medium">
              <span>Price:</span>
              <span className="text-[#4C8492] font-bold">{list.price}</span>
            </div>
            <div className="flex justify-between text-[#333333] font-medium">
              <span>Deposit:</span>
              <span className="text-[#4C8492]">{list.deposit}</span>
            </div>
            <div className="flex justify-between text-[#333333] font-medium">
              <span>Status:</span>
              <span
                className={`font-bold ${
                  list.status === "Available"
                    ? "text-[#27AE60]"
                    : "text-[#E74C3C]"
                }`}
              >
                {list.status}
              </span>
            </div>
            <div className="flex justify-between text-[#333333] font-medium">
              <span>House Type:</span>
              <span>{list.houseType}</span>
            </div>
            <div className="flex justify-between text-[#333333] font-medium">
              <span>Bedrooms:</span>
              <span>{list.bedrooms}</span>
            </div>
            <div className="flex justify-between text-[#333333] font-medium">
              <span>Bathrooms:</span>
              <span>{list.bathrooms}</span>
            </div>
            <div className="flex justify-between text-[#333333] font-medium">
              <span>Parking Spaces:</span>
              <span>{list.parking}</span>
            </div>
            <div className="flex justify-between text-[#333333] font-medium">
              <span>Owner:</span>
              <span>{list._id}</span>
            </div>
          </div>

          <div className="mt-6">
            <button className="px-6 py-2 bg-[#1A3B5D] text-white font-bold rounded hover:bg-[#16324A] mr-4">
              <Link href={`/admin/listings/${list._id}`}>Edit Listing</Link>
            </button>
            <button className="px-6 py-2 bg-[#F47C48] text-white font-bold rounded hover:bg-[#E74C3C]">
              <Link href={`/admin/listings`}>Back to List</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
