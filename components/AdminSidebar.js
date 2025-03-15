"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  FaClipboardList,
  FaCog,
  FaFileContract,
  FaFileInvoice,
  FaMoneyBillAlt,
  FaUser,
  FaUserCog,
  FaChartBar,
  FaCalendarAlt,
  FaBell,
  FaSignOutAlt,
  FaBars,
  FaTimes
} from "react-icons/fa";
import { BsHouseLockFill } from "react-icons/bs";
import { useState, useEffect } from "react";
import userAuth from "@/myStore/UserAuth";
import Image from "next/image";

const menuItems = [
  {
    title: "Dashboard",
    icon: FaMoneyBillAlt,
    path: "/admin",
    badge: null
  },
  {
    title: "Profile",
    icon: FaUser,
    path: "/admin/profile",
    badge: null
  },
  {
    title: "Listings",
    icon: BsHouseLockFill,
    path: "/admin/listings",
    badge: "New"
  },
  {
    title: "Users",
    icon: FaUserCog,
    path: "/admin/users",
    badge: null
  },
  {
    title: "Analytics",
    icon: FaChartBar,
    path: "/admin/analytics",
    badge: null
  },
  {
    title: "Bookings",
    icon: FaCalendarAlt,
    path: "/admin/bookings",
    badge: "5"
  },
  {
    title: "Notifications",
    icon: FaBell,
    path: "/admin/notifications",
    badge: "3"
  },
  {
    title: "Settings",
    icon: FaCog,
    path: "/admin/setting",
    badge: null
  }
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const user = userAuth((state) => state.user);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setShowMobileMenu(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sidebarVariants = {
    expanded: {
      width: "240px",
      transition: {
        duration: 0.3
      }
    },
    collapsed: {
      width: "80px",
      transition: {
        duration: 0.3
      }
    }
  };

  const mobileMenuVariants = {
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    closed: {
      x: "-100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  };

  const MenuItem = ({ item }) => {
    const isActive = pathname === item.path;
    const Icon = item.icon;

    return (
      <Link href={item.path}>
        <motion.div
          className={`flex items-center px-4 py-3 mb-2 rounded-lg cursor-pointer group relative ${
            isActive 
              ? "bg-[#F47C48] text-white" 
              : "hover:bg-[#F47C48]/10 text-[#1A3B5D]"
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Icon className={`text-xl ${isActive ? "text-white" : "text-[#1A3B5D] group-hover:text-[#F47C48]"}`} />
          {(!isCollapsed || isMobile) && (
            <span className={`ml-3 font-medium ${isActive ? "text-white" : "text-[#1A3B5D] group-hover:text-[#F47C48]"}`}>
              {item.title}
            </span>
          )}
          {item.badge && (
            <span className={`absolute right-3 top-1/2 -translate-y-1/2 px-2 py-1 text-xs font-semibold rounded-full ${
              isActive ? "bg-white text-[#F47C48]" : "bg-[#F47C48] text-white"
            }`}>
              {item.badge}
            </span>
          )}
        </motion.div>
      </Link>
    );
  };

  const SidebarContent = () => (
    <>
      {/* User Profile Section */}
      <div className={`mb-6 px-4 py-4 border-b border-gray-200 ${isCollapsed && !isMobile ? "text-center" : ""}`}>
        <div className="flex items-center">
          <Image
            src={user?.avatar || "/images/default-avatar.jpg"}
            alt="Admin"
            width={40}
            height={40}
            className="rounded-full border-2 border-[#F47C48]"
          />
          {(!isCollapsed || isMobile) && (
            <div className="ml-3">
              <h3 className="font-semibold text-[#1A3B5D]">{user?.username || "Admin"}</h3>
              <p className="text-sm text-[#7A7A7A]">{user?.email || "admin@example.com"}</p>
            </div>
          )}
        </div>
      </div>

      {/* Menu Items */}
      <div className="px-3">
        {menuItems.map((item, index) => (
          <MenuItem key={item.path} item={item} />
        ))}
      </div>

      {/* Logout Button */}
      <div className="mt-auto px-3 mb-6">
        <motion.button
          className="flex items-center w-full px-4 py-3 rounded-lg text-[#DC2626] hover:bg-red-50 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <FaSignOutAlt className="text-xl" />
          {(!isCollapsed || isMobile) && (
            <span className="ml-3 font-medium">Logout</span>
          )}
        </motion.button>
      </div>
    </>
  );

  // Mobile Menu Button
  const MobileMenuButton = () => (
    <button
      onClick={() => setShowMobileMenu(!showMobileMenu)}
      className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-white shadow-md md:hidden"
    >
      {showMobileMenu ? (
        <FaTimes className="text-xl text-[#1A3B5D]" />
      ) : (
        <FaBars className="text-xl text-[#1A3B5D]" />
      )}
    </button>
  );

  if (isMobile) {
    return (
      <>
        <MobileMenuButton />
        <motion.div
          initial="closed"
          animate={showMobileMenu ? "open" : "closed"}
          variants={mobileMenuVariants}
          className="fixed inset-y-0 left-0 w-[280px] bg-white shadow-xl z-40 flex flex-col overflow-y-auto"
        >
          <SidebarContent />
        </motion.div>
      </>
    );
  }

  return (
    <motion.div
      initial="expanded"
      animate={isCollapsed ? "collapsed" : "expanded"}
      variants={sidebarVariants}
      className="bg-white h-screen shadow-md flex flex-col relative"
    >
      {/* Collapse Toggle */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-6 bg-white rounded-full p-1.5 shadow-md hover:bg-gray-50"
      >
        <motion.div
          animate={{ rotate: isCollapsed ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <FaBars className="text-[#1A3B5D]" />
        </motion.div>
      </button>

      <SidebarContent />
    </motion.div>
  );
}
