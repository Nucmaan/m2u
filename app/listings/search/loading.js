import { FaSpinner } from "react-icons/fa";

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#F7F7F9] pt-28 pb-12 flex items-center justify-center">
      <div className="text-center">
        <FaSpinner className="animate-spin text-[#F47C48] text-4xl mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-[#1A3B5D] mb-2">Searching Properties</h2>
        <p className="text-[#7A7A7A]">Please wait while we find the perfect properties for you...</p>
      </div>
    </div>
  );
}