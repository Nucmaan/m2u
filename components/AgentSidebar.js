import Link from "next/link";
import {
  FaClipboardList,
  FaCog,
  FaFileContract,
  FaFileInvoice,
  FaMoneyBillAlt,
  FaUser,
  FaSignOutAlt,
  FaTachometerAlt,
  FaRegBuilding
} from "react-icons/fa";
import { BsHouseLockFill } from "react-icons/bs";
import { RiSecurePaymentFill } from "react-icons/ri";
import { usePathname } from "next/navigation";
import { useState } from "react";

// Reusable navigation item component with tooltip for mobile
const NavItem = ({ href, icon: Icon, label, isActive }) => {
  return (
    <Link
      href={href}
      className={`flex items-center px-3 py-3 my-1 rounded-lg transition-all duration-200 group relative
        ${isActive ? 'bg-primary/10 text-accent' : 'hover:bg-gray-100 text-primary hover:text-accent'}`}
    >
      <Icon className="text-xl md:text-2xl" />
      <span className="hidden md:block ml-3 font-medium">{label}</span>
      
      {/* Tooltip for mobile view */}
      <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible md:hidden transition-all whitespace-nowrap">
        {label}
      </div>
    </Link>
  );
};

// Section component for grouping navigation items
const NavSection = ({ title, children }) => {
  return (
    <div className="mb-4">
      <h3 className="text-xs uppercase text-gray-500 font-semibold px-4 mb-2 hidden md:block">
        {title}
      </h3>
      <div className="space-y-1 px-2">
        {children}
      </div>
    </div>
  );
};

export default function AgentSidebar() {
  const pathname = usePathname();
  
  // Handle nested routes (e.g., /agent/listings/123 should highlight /agent/listings)
  const isActiveRoute = (href) => {
    if (href === "/agent" && pathname === "/agent") return true;
    return pathname.startsWith(href) && href !== "/agent";
  };

  return (
    <div className="bg-white flex flex-col h-full pt-[100px] w-16 md:w-64  shadow-lg border-r border-gray-200 overflow-y-auto pt-16 scrollbar-hide" 
         style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
      {/* Add custom style to hide scrollbar for all browsers */}
      <style jsx global>{`
        /* Hide scrollbar for Chrome, Safari and Opera */
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      
      {/* Logo and brand */}
      <div className="flex items-center justify-center md:justify-start h-16 border-b border-gray-200 px-4">
        <div className="bg-primary text-white p-2 rounded-lg">
          <FaRegBuilding className="text-xl" />
        </div>
        <h1 className="hidden md:block ml-2 font-bold text-lg text-primary">M2U Agent</h1>
      </div>
      
      <div className="flex-1 py-4">
        {/* Dashboard section */}
        <NavSection title="Main">
          <NavItem 
            href="/agent" 
            icon={FaTachometerAlt} 
            label="Dashboard" 
            isActive={pathname === "/agent"}
          />
          <NavItem 
            href="/agent/profile" 
            icon={FaUser} 
            label="Profile" 
            isActive={isActiveRoute("/agent/profile")}
          />
        </NavSection>
        
        {/* Property Management */}
        <NavSection title="Property Management">
          <NavItem 
            href="/agent/listings" 
            icon={BsHouseLockFill} 
            label="Listings" 
            isActive={isActiveRoute("/agent/listings")}
          />
          <NavItem 
            href="/agent/booking" 
            icon={FaClipboardList} 
            label="Booking" 
            isActive={isActiveRoute("/agent/booking")}
          />
        </NavSection>
        
        {/* Finance section */}
        <NavSection title="Finance">
          <NavItem 
            href="/agent/contract" 
            icon={FaFileContract} 
            label="Contract" 
            isActive={isActiveRoute("/agent/contract")}
          />
          <NavItem 
            href="/agent/bills" 
            icon={FaMoneyBillAlt} 
            label="Bills" 
            isActive={isActiveRoute("/agent/bills")}
          />
          <NavItem 
            href="/agent/payments" 
            icon={RiSecurePaymentFill} 
            label="Payments" 
            isActive={isActiveRoute("/agent/payments")}
          />
          <NavItem 
            href="/agent/invoice" 
            icon={FaFileInvoice} 
            label="Invoice" 
            isActive={isActiveRoute("/agent/invoice")}
          />
        </NavSection>
      </div>
      
      {/* Bottom section with settings and logout */}
      <div className="border-t border-gray-200 py-4 px-2">
        <NavItem 
          href="/agent/setting" 
          icon={FaCog} 
          label="Settings" 
          isActive={isActiveRoute("/agent/setting")}
        />
        <Link
          href="/logout"
          className="flex items-center px-3 py-3 my-1 rounded-lg text-red-500 hover:bg-red-50 transition-all duration-200 group relative"
        >
          <FaSignOutAlt className="text-xl md:text-2xl" />
          <span className="hidden md:block ml-3 font-medium">Logout</span>
          
          {/* Tooltip for mobile */}
          <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible md:hidden transition-all">
            Logout
          </div>
        </Link>
      </div>
    </div>
  );
}
