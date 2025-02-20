"use client";
import userAuth from "@/myStore/UserAuth";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

const AdminDashboard = () => {
  const user = userAuth((state) => state.user);

  const [userList, setUserList] = useState([]);
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const getUserList = async () => {
      try {
        const response = await axios.get("/api/user/allUsers");
        setUserList(response.data.users);
      } catch (error) {
        setUserList([]);
        //console.error(error);
      }
    };

    const getListingList = async () => {
      try {
        const response = await axios.get("/api/listings");
        setListings(response.data.Listings);
      } catch (error) {
        setListings([]);
        //console.error(error);
      }
    };
    getListingList();
    getUserList();
  }, []);

  const activeUsers = userList.filter((user) => user.isVerified === true);
  const availableListings = listings.filter((listing) => listing.status === "Available" && listing.owner !== null);
  const allListings= listings.filter((listing) => listing.owner !== null);
  const rentedListings = listings.filter((listing) => listing.owner !== null && listing.status === "Rented");

  return (
    <div className="flex min-h-screen bg-[#F7F7F9] p-3">
      {/* Main Content */}

      <main className="flex-1 px-6 pt-3  ">
        <header className="flex justify-between items-center bg-white shadow-md p-4 rounded-lg">
          <h2 className="text-xl font-semibold text-[#333333]">{user.username}</h2>
          <div className="flex items-center gap-3">
            <span className="text-[#7A7A7A]">{user.role}</span>
            <div className="w-10 h-10 relative">
              <Image
                src={user.avatar || "/default-avatar.png"}
                alt="User Avatar"
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 ">
          <div className="p-6 rounded-lg shadow-md border border-[#E0E0E0] bg-[#4C8492] text-white">
            <h3 className="text-lg">Total Users</h3>
            <p className="text-2xl font-bold">{userList.length || 0}</p>
          </div>
          <div className="p-6 rounded-lg shadow-md border border-[#E0E0E0] bg-[#6E91A2] text-white">
            <h3 className="text-lg">Active Users</h3>
            <p className="text-2xl font-bold">{activeUsers.length || 0}</p>
          </div>
          <div className="p-6 rounded-lg shadow-md border border-[#E0E0E0] bg-[#85A8B3] text-white">
            <h3 className="text-lg">Total Properties</h3>
            <p className="text-2xl font-bold">{allListings.length || 0}</p>
          </div>
          <div className="p-6 rounded-lg shadow-md border border-[#E0E0E0] bg-[#A7BCC1] text-black">
            <h3 className="text-lg">Available Properties</h3>
            <p className="text-2xl font-bold">{availableListings.length || 0}</p>
          </div>
          <div className="p-6 rounded-lg shadow-md border border-[#E0E0E0] bg-[#D4E4E7] text-black">
            <h3 className="text-lg">Rented Properties</h3>
            <p className="text-2xl font-bold">{rentedListings.length || 0}</p>
          </div>
        </div>
      </main>

      
    </div>
  );
};

export default AdminDashboard;
