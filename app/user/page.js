"use client";

import React from "react";

const UserDashboard = () => {
  const user = {
    name: "John Doe",
    avatar: "https://via.placeholder.com/150",
    recentActivity: [
      { id: 1, action: "Booked a property", date: "2024-11-01" },
      { id: 2, action: "Paid rent of $1,200", date: "2024-10-28" },
      { id: 3, action: "Signed a rental contract", date: "2024-10-15" },
    ],
    stats: {
      totalBookings: 5,
      activeContracts: 2,
      outstandingPayments: "$1,200",
    },
  };

  return (
    <div className="flex flex-col  md:flex-row  bg-gray-100">
      <div className="flex-1 p-8 space-y-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-semibold text-gray-800">
              Welcome back, {user.name}
            </h1>
            <p className="text-lg text-gray-500 mt-2">
              Here's an overview of your activities
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          <div className="bg-white p-6 shadow-lg rounded-lg flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-gray-700">
                Total Bookings
              </h3>
              <p className="text-2xl font-bold text-blue-600">
                {user.stats.totalBookings}
              </p>
            </div>
            <div className="text-blue-600 text-4xl">📅</div>
          </div>

          <div className="bg-white p-6 shadow-lg rounded-lg flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-gray-700">
                Active Contracts
              </h3>
              <p className="text-2xl font-bold text-blue-600">
                {user.stats.activeContracts}
              </p>
            </div>
            <div className="text-blue-600 text-4xl">📝</div>
          </div>

          <div className="bg-white p-6 shadow-lg rounded-lg flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-gray-700">
                Outstanding Payments
              </h3>
              <p className="text-2xl font-bold text-blue-600">
                {user.stats.outstandingPayments}
              </p>
            </div>
            <div className="text-blue-600 text-4xl">💸</div>
          </div>
        </div>

        <div className="bg-white p-6 shadow-lg rounded-lg">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Recent Activity
          </h3>
          <ul className="space-y-4">
            {user.recentActivity.map((activity) => (
              <li key={activity.id} className="text-sm text-gray-600">
                <span className="font-semibold">{activity.action}</span>
                <span className="text-gray-500">
                  {" "}
                  on {new Date(activity.date).toLocaleDateString()}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-6 shadow-lg rounded-lg">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Upcoming Tasks
          </h3>
          <ul className="space-y-4">
            <li className="text-sm text-gray-600">
              <span className="font-semibold">Pay Rent</span> - Due on
              2024-11-15
            </li>
            <li className="text-sm text-gray-600">
              <span className="font-semibold">Sign Lease Renewal</span> - Due on
              2024-12-01
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
