import React from "react";

const AgentDashboard = () => {
  return (
    <div className="min-h-screen bg-[#F7F7F9] p-6">
      <h1 className="text-3xl font-bold text-[#1A3B5D]">Agent Dashboard</h1>
      <p className="text-[#7A7A7A] mt-2">
        Welcome back! Here’s an overview of your activities.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        <div className="bg-white shadow rounded-lg p-4 border border-[#E0E0E0]">
          <h2 className="text-lg font-bold text-[#333333]">Active Properties</h2>
          <p className="text-2xl font-bold text-[#4C8492]">10</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4 border border-[#E0E0E0]">
          <h2 className="text-lg font-bold text-[#333333]">Pending Bookings</h2>
          <p className="text-2xl font-bold text-[#F47C48]">5</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4 border border-[#E0E0E0]">
          <h2 className="text-lg font-bold text-[#333333]">Contracts</h2>
          <p className="text-2xl font-bold text-[#27AE60]">7</p>
        </div>
      </div>

      
      <div className="mt-8 space-y-4  ">
        <button className="w-full sm:w-auto mx-1 px-6 py-2 bg-[#1A3B5D] text-white font-bold rounded hover:bg-[#16324A]">
          Add New Property
        </button>
        <button className="w-full  mx-1 sm:w-auto px-6 py-2 bg-[#F47C48] text-white font-bold rounded hover:bg-[#E74C3C]">
          View Bookings
        </button>
        <button className="w-full mx-1 sm:w-auto px-6 py-2 bg-[#4C8492] text-white font-bold rounded hover:bg-[#3C687A]">
          Manage Contracts
        </button>
      </div>
    </div>
  );
};

export default AgentDashboard;
