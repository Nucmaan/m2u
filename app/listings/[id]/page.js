"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import userAuth from "@/myStore/UserAuth";
import toast from "react-hot-toast";
import Image from "next/image";

const ViewProperty = () => {
  const { id } = useParams();
  const [list, setList] = useState({});
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const user = userAuth((state) => state.user);
  const [owner, setOwner] = useState(null);
  const [notes, setNotes] = useState("");
  const [visitingDate, setVisitingDate] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchList = async () => {
      try {
        const response = await axios.get(`/api/listings/${id}`);
        setList(response.data.data);
        setOwner(response.data.data.owner);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch property details.");
      }
    };
    fetchList();
  }, [id]);

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
      toast.error("Please login to book this property.");
      return;
    }
    if (user?.role === "Admin" || user?.role === "Agent") {
      toast.error("Admin or Agent can't book property.");
      return;
    }
    setIsModalOpen(true);
  };

  const handleConfirmBooking = async () => {
    if (!visitingDate) {
      toast.error("Please select a visiting date.");
      return;
    }
    if (!notes) {
      toast.error("Please add comments for your booking.");
      return;
    }
    try {
      const response = await axios.post(`/api/booking/addBooking`, {
        user: user._id,
        owner: owner?._id,
        listing: id,
        visitingDate,
        notes,
      });
      toast.success(response.data.message);
      setIsModalOpen(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to book property.");
    }
  };

  return (
    <section className="min-h-screen bg-[#F7F7F9] px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-[#E0E0E0]">
        {/* Property Image Section */}
        <div className="relative">
          <Image
            src={list.images?.[currentImageIndex] || "/images/nasri.jpg"}
            alt={list.title || "Property"}
            width={500} height={300}
            className="w-full h-80 sm:h-96 lg:h-[500px] object-cover"
          />
          <button
            onClick={prevImage}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-[#1A3B5D] text-white rounded-full p-3 hover:bg-[#16324A] transition"
            aria-label="Previous Image"
          >❮</button>
          <button
            onClick={nextImage}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-[#1A3B5D] text-white rounded-full p-3 hover:bg-[#16324A] transition"
            aria-label="Next Image"
          >❯</button>
        </div>

        {/* Property Details */}
        <div className="p-6 lg:p-8">
          <h1 className="text-3xl font-bold text-[#1A3B5D] mb-4">{list.title || "Loading..."}</h1>
          <p className="text-[#7A7A7A] mb-2">City: {list.city || "N/A"}</p>
          <p className="text-[#7A7A7A] mb-2">Address: {list.address || "N/A"}</p>
          <p className="text-[#7A7A7A] mb-2">House Type: {list.houseType || "N/A"}</p>
          <p className="text-xl font-bold text-[#F47C48]">Price: ${list.price?.toLocaleString() || "N/A"}</p>

          {/* Owner Details */}
          {owner && (
            <div className="flex items-center gap-4 mt-6 border-t pt-4">
              <Image
                src={owner.avatar || "/images/default-avatar.jpg"}
                alt={owner.username || "Owner"}
                width={50} height={50}
                className="w-12 h-12 rounded-full border"
              />
              <div>
                <p className="font-semibold text-[#1A3B5D]">{owner.username}</p>
                <p className="text-[#7A7A7A]">{owner.email}</p>
              </div>
            </div>
          )}

          {/* Booking Button */}
          <button
            onClick={handleBookNow}
            className="mt-6 w-full bg-[#F47C48] text-white font-bold py-3 rounded-lg hover:bg-[#d86030] transition"
          >Book Now</button>
        </div>
      </div>
    </section>
  );
};

export default ViewProperty;
