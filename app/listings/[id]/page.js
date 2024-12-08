"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import userAuth from "@/myStore/UserAuth";
import toast from "react-hot-toast";

const ViewProperty = () => {
  const { id } = useParams();
  const [list, setList] = useState({});
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const user = userAuth((state) => state.user);

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

  const handleBookNow = () => {
    
    if (!user) {
      toast.success("Please login to book this property.");
      return;
    }

    if (user?.role === "Admin" || user?.role === "Agent") {
      toast.success("Admin or Agent can't book property.");
      return;
    }
  
    // Continue booking logic here
    toast.success("Booking successful!"); // Placeholder for successful booking logic
  };
  

  return (
    <section className="min-h-screen bg-[#F7F7F9] px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative">
          {list.images?.length > 0 ? (
            <img
              src={list.images[currentImageIndex]}
              alt={list.title || "Property"}
              className="w-full h-80 sm:h-96 lg:h-[500px] object-cover"
            />
          ) : (
            <img
              src="https://via.placeholder.com/600"
              alt="Placeholder"
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

        <div className="p-6 lg:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1A3B5D] mb-4">
            {list.title || "Loading..."}
          </h1>
          <p className="text-sm text-gray-600 mb-2">{list.address}</p>
          <p className="text-lg font-bold text-[#F47C48] mb-6">{list.price}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {[
              { label: "City", value: list.city || "N/A" },
              { label: "Bedrooms", value: list.bedrooms || "N/A" },
              { label: "Bathrooms", value: list.bathrooms || "N/A" },
              { label: "Deposit", value: list.deposit || "N/A" },
              { label: "House Type", value: list.houseType || "N/A" },
              { label: "Status", value: list.status || "N/A" },
              { label: "Owner", value: list.owner || "N/A" },
            ].map((item, index) => (
              <div key={index} className="text-sm text-gray-700">
                <span className="font-semibold">{item.label}: </span>
                {item.value}
              </div>
            ))}
          </div>

          <p className="text-gray-600 mb-6">{list.description || "N/A"}</p>

          <div className="text-sm text-gray-700 mb-6">
            <span className="font-semibold">Contact: </span>
            <a
              href="#"
              className="text-[#4C8492] font-medium hover:text-[#F47C48] underline"
            >
              0616500191
            </a>
          </div>

          <button
           onClick={handleBookNow}
            className="w-full py-3 bg-[#4C8492] text-white font-semibold rounded-lg hover:bg-[#3b6d78] transition duration-200"
          >
            Book Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default ViewProperty;
