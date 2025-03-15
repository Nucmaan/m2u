"use client";
import { useParams, useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import userAuth from "@/myStore/UserAuth";
import toast from "react-hot-toast";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  FaBed, 
  FaBath, 
  FaRulerCombined, 
  FaMapMarkerAlt, 
  FaCalendarAlt,
  FaDollarSign, 
  FaHome, 
  FaBuilding, 
  FaEnvelope,
  FaPhone,
  FaArrowLeft,
  FaChevronLeft,
  FaChevronRight,
  FaImages,
  FaCheck,
  FaTimes,
  FaSpinner
} from "react-icons/fa";
import RaadiLoading from "@/components/RaadiLoading";

const ViewProperty = () => {
  const { id } = useParams();
  const router = useRouter();
  const [list, setList] = useState({});
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showGallery, setShowGallery] = useState(false);
  const user = userAuth((state) => state.user);
  const [owner, setOwner] = useState(null);
  const [notes, setNotes] = useState("");
  const [visitingDate, setVisitingDate] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userBookings, setUserBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("details");

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
  }, [user?._id]);
  
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
    
    setSubmitting(true);
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
      allReadyBooked(); // Refresh bookings
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to book property.");
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (date) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  const getPropertyFeatures = () => {
    const features = [];
    
    if (list.bedrooms) features.push(`${list.bedrooms} Bedrooms`);
    if (list.bathrooms) features.push(`${list.bathrooms} Bathrooms`);
    if (list.propertySize) features.push(`${list.propertySize} Area`);
    if (list.propertyType) features.push(list.propertyType);
    if (list.yearBuilt) features.push(`Built in ${list.yearBuilt}`);
    if (list.parkingSpots) features.push(`${list.parkingSpots} Parking Spots`);
    
    // Add some default features if there aren't many
    if (features.length < 6) {
      if (!features.includes("Air Conditioning")) features.push("Air Conditioning");
      if (!features.includes("Heating System")) features.push("Heating System");
      if (!features.includes("Security System")) features.push("Security System");
    }
    
    return features;
  };

  if (loading) {
    return <RaadiLoading />;
  }

  return (
    <section className="min-h-screen bg-[#F7F7F9] px-4 sm:px-6 lg:px-8 pt-28 pb-12">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto"
      >
        {/* Back Button */}
        <button 
          onClick={() => router.back()} 
          className="flex items-center text-[#1A3B5D] mb-6 hover:text-[#F47C48] transition-colors"
        >
          <FaArrowLeft className="mr-2" /> Back to Listings
        </button>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-[#E0E0E0]">
          {/* Image Gallery */}
          <div className="relative">
            <div className="relative">
              <Image
                src={list.images?.[currentImageIndex] || "/images/nasri.jpg"}
                alt={list.title || "Property"}
                width={1200}
                height={600}
                className="w-full h-80 sm:h-96 lg:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              
              <button
                onClick={() => setShowGallery(true)}
                className="absolute bottom-4 right-4 flex items-center bg-white text-[#1A3B5D] rounded-full px-4 py-2 shadow-md hover:bg-[#F47C48] hover:text-white transition-colors duration-300"
              >
                <FaImages className="mr-2" /> 
                View All {list.images?.length || 0} Photos
              </button>
            </div>

            <button
              onClick={prevImage}
              className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white text-[#1A3B5D] rounded-full p-3 hover:bg-[#F47C48] hover:text-white transition-colors duration-300 shadow-md"
              aria-label="Previous Image"
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={nextImage}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white text-[#1A3B5D] rounded-full p-3 hover:bg-[#F47C48] hover:text-white transition-colors duration-300 shadow-md"
              aria-label="Next Image"
            >
              <FaChevronRight />
            </button>

            {/* Image Indicators */}
            {list.images?.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {list.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      currentImageIndex === index
                        ? "bg-white w-6"
                        : "bg-white/50"
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className="p-6 lg:p-8">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Main Content Column */}
              <div className="flex-grow">
                {/* Header */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                      list.houseType === "Rent"
                        ? "bg-[#4C8492] text-white"
                        : "bg-[#27AE60] text-white"
                    }`}>
                      {list.houseType}
                    </span>
                    {list.status && (
                      <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-[#F47C48]/10 text-[#F47C48]">
                        {list.status}
                      </span>
                    )}
                  </div>
                  <h1 className="text-3xl font-bold text-[#1A3B5D]">{list.title || "N/A"}</h1>
                  
                  <div className="flex items-center text-[#7A7A7A] mt-2">
                    <FaMapMarkerAlt className="mr-1 text-[#F47C48]" />
                    <span>{list.address || list.city || "N/A"}</span>
                  </div>
                </div>
                
                {/* Key Features & Price */}
                <div className="flex flex-wrap gap-6 mb-8 pb-6 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <FaDollarSign className="text-xl text-[#F47C48]" />
                    <div>
                      <div className="text-2xl font-bold text-[#F47C48]">
                        ${list.price?.toLocaleString() || "N/A"}
                      </div>
                      <div className="text-xs text-[#7A7A7A]">
                        {list.houseType === "Rent" ? "Per Month" : "Sale Price"}
                      </div>
                    </div>
                  </div>
                
                  <div className="flex items-center gap-2">
                    <FaBed className="text-xl text-[#4C8492]" />
                    <div>
                      <div className="text-lg font-semibold text-[#1A3B5D]">
                        {list.bedrooms || "N/A"}
                      </div>
                      <div className="text-xs text-[#7A7A7A]">Bedrooms</div>
                    </div>
                  </div>
                
                  <div className="flex items-center gap-2">
                    <FaBath className="text-xl text-[#4C8492]" />
                    <div>
                      <div className="text-lg font-semibold text-[#1A3B5D]">
                        {list.bathrooms || "N/A"}
                      </div>
                      <div className="text-xs text-[#7A7A7A]">Bathrooms</div>
                    </div>
                  </div>
                
                  <div className="flex items-center gap-2">
                    <FaRulerCombined className="text-xl text-[#4C8492]" />
                    <div>
                      <div className="text-lg font-semibold text-[#1A3B5D]">
                        {list.propertySize || "N/A"}
                      </div>
                      <div className="text-xs text-[#7A7A7A]">Area</div>
                    </div>
                  </div>
                
                  <div className="flex items-center gap-2">
                    <FaBuilding className="text-xl text-[#4C8492]" />
                    <div>
                      <div className="text-lg font-semibold text-[#1A3B5D]">
                        {list.propertyType || "N/A"}
                      </div>
                      <div className="text-xs text-[#7A7A7A]">Type</div>
                    </div>
                  </div>
                </div>

                {/* Tabs */}
                <div className="mb-6">
                  <div className="border-b border-gray-200">
                    <nav className="flex space-x-6" aria-label="Tabs">
                      <button
                        onClick={() => setActiveTab("details")}
                        className={`py-3 px-1 border-b-2 font-medium text-sm ${
                          activeTab === "details"
                            ? "border-[#F47C48] text-[#F47C48]"
                            : "border-transparent text-[#7A7A7A] hover:text-[#1A3B5D] hover:border-gray-300"
                        }`}
                      >
                        Description
                      </button>
                      <button
                        onClick={() => setActiveTab("features")}
                        className={`py-3 px-1 border-b-2 font-medium text-sm ${
                          activeTab === "features"
                            ? "border-[#F47C48] text-[#F47C48]"
                            : "border-transparent text-[#7A7A7A] hover:text-[#1A3B5D] hover:border-gray-300"
                        }`}
                      >
                        Features
                      </button>
                      <button
                        onClick={() => setActiveTab("location")}
                        className={`py-3 px-1 border-b-2 font-medium text-sm ${
                          activeTab === "location"
                            ? "border-[#F47C48] text-[#F47C48]"
                            : "border-transparent text-[#7A7A7A] hover:text-[#1A3B5D] hover:border-gray-300"
                        }`}
                      >
                        Location
                      </button>
                    </nav>
                  </div>

                  <div className="py-4">
                    {activeTab === "details" && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <h3 className="font-semibold text-lg text-[#1A3B5D] mb-3">Property Description</h3>
                        <p className="text-[#7A7A7A] whitespace-pre-line leading-relaxed">
                          {list.description || 
                            `This beautiful ${list.propertyType || 'property'} offers ${list.bedrooms || 'several'} bedrooms and ${list.bathrooms || 'multiple'} bathrooms in the heart of ${list.city || 'the city'}. 
                            
                            Featuring modern amenities and a prime location, this property is perfect for families or individuals looking for comfort and convenience.
                            
                            Contact us today to schedule a viewing!`
                          }
                        </p>
                      </motion.div>
                    )}

                    {activeTab === "features" && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <h3 className="font-semibold text-lg text-[#1A3B5D] mb-3">Property Features</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {getPropertyFeatures().map((feature, index) => (
                            <div key={index} className="flex items-center">
                              <FaCheck className="text-[#27AE60] mr-2" />
                              <span className="text-[#7A7A7A]">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {activeTab === "location" && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <h3 className="font-semibold text-lg text-[#1A3B5D] mb-3">Location</h3>
                        <div className="mb-4 text-[#7A7A7A]">
                          <p>Address: {list.address || "N/A"}</p>
                          <p>City: {list.city || "N/A"}</p>
                          <p>Neighborhood: {list.neighborhood || list.city || "N/A"}</p>
                        </div>
                        <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center">
                          <p className="text-[#7A7A7A]">Map view not available</p>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:w-80">
                <div className="bg-[#F7F7F9] p-6 rounded-lg shadow-sm">
                  {/* Agent Info */}
                  {owner && (
                    <div className="mb-6">
                      <h3 className="font-semibold text-lg text-[#1A3B5D] mb-3">Listed by</h3>
                      <div className="flex items-center gap-3 mb-4">
                        <Image
                          src={owner.avatar}
                          alt={owner.username || "Agent"}
                          width={50}
                          height={50}
                          className="w-12 h-12 rounded-full border-2 border-white shadow-sm"
                        />
                        <div>
                          <p className="font-semibold text-[#1A3B5D]">{owner.username}</p>
                          <p className="text-sm text-[#7A7A7A]">{owner.role || "Agent"}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center text-[#7A7A7A]">
                          <FaEnvelope className="w-4 h-4 mr-2 text-[#F47C48]" />
                          <span>{owner.email || "N/A"}</span>
                        </div>
                        {owner.phone && (
                          <div className="flex items-center text-[#7A7A7A]">
                            <FaPhone className="w-4 h-4 mr-2 text-[#F47C48]" />
                            <span>{owner.phone}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Booking Form */}
                  <div>
                    <h3 className="font-semibold text-lg text-[#1A3B5D] mb-3">
                      Schedule a Viewing
                    </h3>
                    <p className="text-sm text-[#7A7A7A] mb-4">
                      Interested in this property? Book a viewing now!
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleBookNow}
                      className="w-full bg-[#F47C48] text-white font-bold py-3 rounded-lg hover:bg-[#e86d3f] transition-all duration-300 flex items-center justify-center"
                      disabled={userBookings.some((booking) => booking.listing._id === id)}
                    >
                      {userBookings.some((booking) => booking.listing._id === id) ? (
                        <>
                          <FaCheck className="mr-2" /> Already Booked
                        </>
                      ) : (
                        <>
                          <FaCalendarAlt className="mr-2" /> Book a Viewing
                        </>
                      )}
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Gallery Modal */}
      {showGallery && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl">
            <button
              onClick={() => setShowGallery(false)}
              className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-[#F47C48] transition-colors z-10"
            >
              <FaTimes />
            </button>
            
            <div className="relative">
              <Image
                src={list.images?.[currentImageIndex] || "/images/nasri.jpg"}
                alt={`Gallery image ${currentImageIndex + 1}`}
                width={1200}
                height={800}
                className="max-h-[80vh] w-auto mx-auto object-contain"
              />
              
              <button
                onClick={prevImage}
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-3 hover:bg-[#F47C48] transition-colors"
              >
                <FaChevronLeft />
              </button>
              
              <button
                onClick={nextImage}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-3 hover:bg-[#F47C48] transition-colors"
              >
                <FaChevronRight />
              </button>
            </div>
            
            <div className="mt-4 flex justify-center">
              <p className="text-white">
                {currentImageIndex + 1} of {list.images?.length || 1}
              </p>
            </div>
            
            {/* Thumbnails */}
            {list.images && list.images.length > 1 && (
              <div className="mt-4 flex space-x-2 overflow-x-auto py-2 justify-center">
                {list.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`h-16 w-24 flex-shrink-0 overflow-hidden rounded-md border-2 transition-all ${
                      currentImageIndex === idx
                        ? "border-[#F47C48]"
                        : "border-transparent"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      width={100}
                      height={100}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Booking Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-4">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold text-[#1A3B5D] mb-4">Schedule a Viewing</h2>

            <div className="mb-4">
              <label className="block text-sm font-medium text-[#7A7A7A] mb-1">
                Visiting Date
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaCalendarAlt className="text-[#7A7A7A]" />
                </div>
                <input
                  type="date"
                  value={visitingDate}
                  onChange={(e) => setVisitingDate(e.target.value)}
                  min={formatDate(new Date())}
                  className="pl-10 w-full p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F47C48] focus:border-transparent"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-[#7A7A7A] mb-1">
                Additional Notes
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add any specific requirements or questions..."
                className="w-full p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F47C48] focus:border-transparent h-32"
              ></textarea>
            </div>

            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="px-4 py-2 border border-gray-300 text-[#7A7A7A] rounded-md hover:bg-gray-50 transition-colors"
                disabled={submitting}
              >
                Cancel
              </button>
              <button 
                onClick={handleConfirmBooking} 
                className="px-4 py-2 bg-[#F47C48] text-white rounded-md hover:bg-[#e86d3f] transition-colors flex items-center"
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <FaSpinner className="animate-spin mr-2" />
                    Submitting...
                  </>
                ) : (
                  <>Confirm Booking</>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ViewProperty;
