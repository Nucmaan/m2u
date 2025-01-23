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
  const [owner, setOwner] = useState("");
  const [notes, setNotes] = useState("");
  const [visitingDate, setVisitingDate] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchList = async () => {
    try {
      const response = await axios.get(`/api/listings/${id}`);
      setList(response.data.data);
      setOwner(response.data.data.owner);
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
      toast.error(error.response.data.message);
    }
  };

  return (
    <section className="min-h-screen bg-[#F7F7F9] px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden border border-[#E0E0E0]">
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
              <div key={index} className="text-sm text-[#7A7A7A]">
                <span className="font-semibold text-[#333333]">{item.label}: </span>
                {item.value}
              </div>
            ))}
          </div>

          <p className="text-[#7A7A7A] mb-6">{list.description || "N/A"}</p>

          <div className="text-sm text-[#7A7A7A] mb-6">
            <span className="font-semibold text-[#333333]">Contact: </span>
            <a
              href="#"
              className="text-[#4C8492] font-medium hover:text-[#F47C48] underline"
            >
              0616500191
            </a>
          </div>

          <button
            onClick={handleBookNow}
            className="w-full py-3 bg-[#1A3B5D] text-white font-semibold rounded-lg hover:bg-[#16324A] transition duration-200"
          >
            Book Now
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md">
            <h2 className="text-xl font-semibold text-[#1A3B5D] mb-4">
              Confirm Booking
            </h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-[#7A7A7A] mb-1">
                Visiting Date
              </label>
              <input
                type="date"
                value={visitingDate}
                onChange={(e) => setVisitingDate(e.target.value)}
                className="w-full px-3 py-2 border border-[#E0E0E0] rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-[#7A7A7A] mb-1">
                Notes / Comments
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3 py-2 border border-[#E0E0E0] rounded-lg"
                rows="4"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-[#E0E0E0] text-[#333333] rounded-lg hover:bg-[#D0D0D0]"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmBooking}
                className="px-4 py-2 bg-[#1A3B5D] text-white rounded-lg hover:bg-[#16324A]"
              >
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