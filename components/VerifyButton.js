"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function VerifyButton({ token }) {
    
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleVerify = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/verify/${token}`);
      toast.success(response.data.message);

      if (response.status === 200) {
        router.replace("/login");
      } else if (response.status === 400) {
        toast.error(response.data.message, { duration: 3000 });
      } else {
        toast.error("Invalid token. Please try again.");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong. Please try again.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleVerify}
      className={`px-6 py-3 text-white rounded-lg font-medium shadow-md transition duration-300 ${
        loading
          ? "bg-[#4C8492] cursor-not-allowed"
          : "bg-[#F47C48] hover:bg-[#16324A]"
      }`}
      disabled={loading}
    >
      {loading ? "Verifying..." : "Verify Now"}
    </button>
  );
}
