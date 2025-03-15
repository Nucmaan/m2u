"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaClipboardList,
  FaCog,
  FaFileContract,
  FaFileInvoice,
  FaMoneyBillAlt,
  FaUser,
  FaHome,
  FaSignOutAlt,
} from "react-icons/fa";

export default function Sidebar() {
  const pathname = usePathname();
  
  const menuItems = [
    { path: "/user", icon: <FaHome size={18} />, text: "Dashboard" },
    { path: "/user/profile", icon: <FaUser size={18} />, text: "Profile" },
    { path: "/user/booking", icon: <FaClipboardList size={18} />, text: "Booking" },
    { path: "/user/contract", icon: <FaFileContract size={18} />, text: "Contract" },
    { path: "/user/bills", icon: <FaMoneyBillAlt size={18} />, text: "Bills" },
    { path: "/user/invoice", icon: <FaFileInvoice size={18} />, text: "Invoice" },
    { path: "/user/setting", icon: <FaCog size={18} />, text: "Settings" },
  ];

  return (
    <aside className="bg-white shadow-lg h-full flex flex-col pt-1 w-16 md:w-64 border-r border-gray-100 min-h-[calc(100vh-64px)]">
      {/* Logo/Brand Section */}
      <div className="py-6 px-4 border-b border-gray-100">
        <Link href="/user" className="flex items-center justify-center md:justify-start">
          <div className="bg-gradient-to-r from-[#4C8492] to-[#1A3B5D] p-2 rounded-lg">
            <FaMoneyBillAlt className="text-white text-xl" />
          </div>
          <span className="hidden md:block ml-3 font-bold text-xl text-[#1A3B5D]">MyHome2U</span>
        </Link>
      </div>
      
      {/* Navigation Section */}
      <div className="flex-1 py-6 flex flex-col space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center px-4 py-3 mx-2 rounded-lg transition-all duration-200 group hover:bg-gray-100 ${
                isActive
                  ? "bg-gradient-to-r from-[#F47C48]/10 to-[#4C8492]/10 border-r-4 border-[#F47C48]"
                  : ""
              }`}
            >
              <div className={`flex items-center justify-center w-8 h-8 ${
                isActive ? "text-[#F47C48]" : "text-gray-600 group-hover:text-[#4C8492]"
              }`}>
                {item.icon}
              </div>
              <span className={`hidden md:block ml-3 font-medium ${
                isActive ? "text-[#F47C48]" : "text-gray-600 group-hover:text-[#4C8492]"
              }`}>
                {item.text}
              </span>
              {isActive && <div className="hidden md:block ml-auto w-2 h-2 rounded-full bg-[#F47C48]"></div>}
            </Link>
          );
        })}
      </div>
      
      {/* Logout Section */}
      <div className="border-t border-gray-100 p-4 mt-auto">
        <Link 
          href="/login" 
          className="flex items-center px-4 py-3 mx-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-all duration-200 group"
        >
          <div className="flex items-center justify-center w-8 h-8 text-gray-600 group-hover:text-red-500">
            <FaSignOutAlt size={18} />
          </div>
          <span className="hidden md:block ml-3 font-medium group-hover:text-red-500">Logout</span>
        </Link>
      </div>
    </aside>
  );
}
