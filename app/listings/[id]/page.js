"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import userAuth from "@/myStore/UserAuth";
import toast from "react-hot-toast";
import Image from "next/image";

const ViewProperty = () => {
  const { id } = useParams();
  const [list, setList] = useState({});
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const user = userAuth((state) => state.user);
  const [owner, setOwner] = useState("");
  const [notes, setNotes] = useState("");
  const [visitingDate, setVisitingDate] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchList = useCallback(async () => {
    try {
      const response = await axios.get(`/api/listings/${id}`);
      setList(response.data.data);
      setOwner(response.data.data.owner);
    } catch (error) {
      console.error(error);
    }
  }, [id]);

  useEffect(() => {
    fetchList();
  }, [fetchList]);

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
        owner: owner,
        listing: id,
        visitingDate: visitingDate,
        notes: notes,
      });

      toast.success(response.data.message);
      setIsModalOpen(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Booking failed");
    }
  };

  return (
    <section className="min-h-screen bg-[#F7F7F9] px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden border border-[#E0E0E0]">
        <div className="relative">
          {list.images?.length > 0 ? (
            <Image
              src={list.images[currentImageIndex]}
              alt={list.title || "Property"}
              width={800}
              height={500}
              className="w-full h-80 sm:h-96 lg:h-[500px] object-cover"
            />
          ) : (
            <Image
              src="https://via.placeholder.com/600"
              alt="Placeholder"
              width={500}
              height={300}
              className="w-full h-80 sm:h-96 lg:h-[500px] object-cover"
            />
          )}
          <button
            onClick={prevImage}
            className="absolute top-1/2 left-6 transform -translate-y-1/2 bg-[#1A3B5D] text-white rounded-full p-3 hover:bg-[#16324A] transition shadow-lg"
            aria-label="Previous Image"
          >
            ❮
          </button>
          <button
            onClick={nextImage}
            className="absolute top-1/2 right-6 transform -translate-y-1/2 bg-[#1A3B5D] text-white rounded-full p-3 hover:bg-[#16324A] transition shadow-lg"
            aria-label="Next Image"
          >
            ❯
          </button>
        </div>

        <div className="p-6 lg:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1A3B5D] mb-4">
            {list.title || "Loading..."}
          </h1>
          <p className="text-sm text-[#7A7A7A] mb-2">{list.address}</p>
          <p className="text-lg font-bold text-[#F47C48] mb-6">{list.price}</p>
          <button
            onClick={handleBookNow}
            className="w-full py-3 bg-[#1A3B5D] text-white font-semibold rounded-lg hover:bg-[#16324A] transition duration-200"
          >
            Book Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default ViewProperty;
