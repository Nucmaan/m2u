"use client";

function UserBookingPage() {
  const bookings = [
    {
      id: 1,
      property: "Luxury Apartment",
      visitingDate: "2024-11-25",
      status: "Pending",
      owner: {
        name: "John Doe",
        phone: "+123 456 7890",
        email: "john.doe@example.com",
      },
    },
    {
      id: 2,
      property: "Cozy Villa",
      visitingDate: "2024-11-27",
      status: "Confirmed",
      owner: {
        name: "Jane Smith",
        phone: "+987 654 3210",
        email: "jane.smith@example.com",
      },
    },
    {
      id: 3,
      property: "Beach House",
      visitingDate: "2024-12-02",
      status: "Cancelled",
      owner: {
        name: "Michael Johnson",
        phone: "+111 222 3333",
        email: "michael.johnson@example.com",
      },
    },
  ];

  const handleCancelBooking = (id) => {
  
    console.log(`Booking with ID ${id} has been canceled.`);
    
  };

  return (
    <div className="p-4 md:p-8 bg-[#F7F7F9] min-h-screen">
      <h1 className="text-2xl font-bold text-[#1A3B5D] mb-4">All Bookings</h1>

      {["Pending", "Confirmed", "Cancelled"].map((status) => (
        <div key={status} className="mb-6">
          <h2 className="text-xl font-semibold text-[#1A3B5D] mb-2">
            {status} Bookings
          </h2>
          <div className="space-y-4">
            {bookings
              .filter((booking) => booking.status === status)
              .map((booking) => (
                <div
                  key={booking.id}
                  className="bg-white shadow-md rounded-lg p-4 md:flex md:justify-between md:items-center"
                >
                  <div>
                    <h3 className="text-lg font-medium text-gray-800">
                      {booking.property}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Visiting Date: {new Date(booking.visitingDate).toDateString()}
                    </p>
                    <div className="mt-2 text-sm text-gray-700">
                      <p>
                        <strong>Owner:</strong> {booking.owner.name}
                      </p>
                      <p>
                        <strong>Phone:</strong>{" "}
                        <a
                          href={`tel:${booking.owner.phone}`}
                          className="text-blue-600 hover:underline"
                        >
                          {booking.owner.phone}
                        </a>
                      </p>
                      <p>
                        <strong>Email:</strong>{" "}
                        <a
                          href={`mailto:${booking.owner.email}`}
                          className="text-blue-600 hover:underline"
                        >
                          {booking.owner.email}
                        </a>
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 md:mt-0 flex items-center space-x-4">
                    <div
                      className={`px-3 py-1 text-sm font-medium rounded-full ${
                        status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : status === "Confirmed"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {status}
                    </div>
                  
                    {status === "Pending" && (
                      <button
                        onClick={() => handleCancelBooking(booking.id)}
                        className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserBookingPage;
