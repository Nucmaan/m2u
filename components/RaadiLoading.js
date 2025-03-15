import React from 'react';
import { FaHome } from 'react-icons/fa';

function RaadiLoading({ fullScreen = true, size = "medium", text = "Loading, please wait..." }) {
  // Determine spinner and text size based on prop
  const spinnerSizes = {
    small: "w-8 h-8 border-2",
    medium: "w-12 h-12 border-3",
    large: "w-16 h-16 border-4"
  };
  
  const textSizes = {
    small: "text-sm",
    medium: "text-base",
    large: "text-lg"
  };
  
  const spinnerSize = spinnerSizes[size] || spinnerSizes.medium;
  const textSize = textSizes[size] || textSizes.medium;
  
  // Component for loading spinner with branding
  const LoadingSpinner = () => (
    <div className="flex flex-col items-center justify-center">
      <div className="relative">
        <div className={`${spinnerSize} border-gray-200 border-t-[#4C8492] rounded-full animate-spin`}></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <FaHome className="text-[#F47C48] animate-pulse" style={{ fontSize: size === "small" ? "0.75rem" : size === "large" ? "1.5rem" : "1rem" }} />
        </div>
      </div>
      {text && (
        <p className={`mt-3 ${textSize} font-medium text-gray-700`}>
          {text}
        </p>
      )}
    </div>
  );
  
  // Return either full screen or inline loading component
  return fullScreen ? (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F7F7F9]">
      <div className="bg-white p-8 rounded-xl shadow-md">
        <LoadingSpinner />
      </div>
    </div>
  ) : (
    <LoadingSpinner />
  );
}

export default RaadiLoading;