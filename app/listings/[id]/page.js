"use client";
import { useParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import userAuth from "@/myStore/UserAuth";
import toast from "react-hot-toast";
import Image from "next/image";
import RaadiLoading from "@/components/RaadiLoading";

const ViewProperty = () => {
  const { id } = useParams();
  const [list, setList] = useState({});
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const user = userAuth((state) => state.user);
  const [owner, setOwner] = useState(null);
  const [notes, setNotes] = useState("");
  const [visitingDate, setVisitingDate] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userBookings, setUserBookings] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  const handleBookNow = () => {
    if (!user) {
      toast.error("Please login to book this property.");
      return;
    }
    if (user?.role === "Admin" || user?.role === "Agent") {
      toast.error("Admin or Agent can't book property.");
      return;
    }

    if (userBookings.some((booking) => booking.listing._id === id)) {
      toast.error("You have already booked this property.");
      return;
    }

    setIsModalOpen(true);
  };

  useEffect(() => {
    const fetchList = async () => {
      try {
        const response = await axios.get(`/api/listings/${id}`);
        setList(response.data.data);
        setOwner(response.data.data.owner);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch property details.");
      } finally {
        setLoading(false);
      }
    };
    fetchList();
  }, [id]);
  
  const allReadyBooked = useCallback(async () => {
    if (!user?._id) return;
  
    try {
      const response = await axios.get(`/api/booking/userBooking/${user._id}`);
      if (response.status === 200) {
        setUserBookings(response.data.bookings);
      } else {
        setUserBookings([]);
      }
    } catch (error) {
      setUserBookings([]);
      console.error(error);
    }
  }, [user?._id]); // Depend only on user?._id
  
  useEffect(() => {
    if (user?._id) {
      allReadyBooked();
    }
  }, [user?._id, allReadyBooked]);
  

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

  if (loading) {
    return <RaadiLoading />;
  }

  return (
    <section className="min-h-screen bg-[#F7F7F9] px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-[#E0E0E0]">
        <div className="relative">
          <Image
            src={list.images?.[currentImageIndex] || "/images/nasri.jpg"}
            alt={list.title || "Property"}
            width={500}
            height={300}
            className="w-full h-80 sm:h-96 lg:h-[500px] object-cover"
          />
          <button
            onClick={prevImage}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-[#1A3B5D] text-white rounded-full p-3 hover:bg-[#16324A] transition"
            aria-label="Previous Image"
          >
            ❮
          </button>
          <button
            onClick={nextImage}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-[#1A3B5D] text-white rounded-full p-3 hover:bg-[#16324A] transition"
            aria-label="Next Image"
          >
            ❯
          </button>
        </div>

        <div className="p-6 lg:p-8">
          <h1 className="text-3xl font-bold text-[#1A3B5D] mb-4">{list.title || "N/A"}</h1>
          <p className="text-[#7A7A7A] mb-2">City: {list.city || "N/A"}</p>
          <p className="text-[#7A7A7A] mb-2">Address: {list.address || "N/A"}</p>
          <p className="text-[#7A7A7A] mb-2">House Type: {list.houseType || "N/A"}</p>
          <p className="text-xl font-bold text-[#F47C48]">
            Price: ${list.price?.toLocaleString() || "N/A"}
          </p>

          {owner && (
            <div className="flex items-center gap-4 mt-6 border-t pt-4">
              <Image
                src={owner.avatar}
                alt={owner.username || "N/A"}
                width={50}
                height={50}
                className="w-12 h-12 rounded-full border"
              />
              <div>
                <p className="font-semibold text-[#1A3B5D]">{owner.username}</p>
                <p className="text-[#7A7A7A]">{owner.email || "N/A"}</p>
              </div>
            </div>
          )}

          <button
            onClick={handleBookNow}
            className="mt-6 w-full bg-[#F47C48] text-white font-bold py-3 rounded-lg hover:bg-[#d86030] transition"
          >
            Book Now
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold text-[#1A3B5D] mb-4">Confirm Booking</h2>

            <label className="block text-sm font-medium text-gray-700">Visiting Date</label>
            <input
              type="date"
              value={visitingDate}
              onChange={(e) => setVisitingDate(e.target.value)}
              className="mt-1 w-full p-2 border rounded"
            />

            <label className="block mt-4 text-sm font-medium text-gray-700">Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="mt-1 w-full p-2 border rounded"
            ></textarea>

            <div className="flex justify-end mt-6">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-gray-400 text-white rounded mr-2">
                Cancel
              </button>
              <button onClick={handleConfirmBooking} className="px-4 py-2 bg-[#F47C48] text-white rounded">
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ViewProperty;
