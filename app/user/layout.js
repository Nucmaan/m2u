"use client";
import RaadiLoading from "@/components/RaadiLoading";
import Sidebar from "@/components/Sidebar";
import userAuth from "@/myStore/UserAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function Layout({ children }) {
  const router = useRouter();
  const [isHydrated, setIsHydrated] = useState(false);
  const user = userAuth((state) => state.user);


  useEffect(() => {
    // Wait for Zustand to hydrate
    if (user) {
      setIsHydrated(true);

      // Redirect if user is not a regular user
      if (user?.role !== "User") {
        router.push("/login");
      }
    }
  }, [user, router]);

  // Show a loading placeholder while hydration is in progress
  if (!isHydrated) {
    return <RaadiLoading />;
  }

  // Prevent rendering for non-user roles
  if (user?.role !== "User") {
    return null; // Or show a "Permission Denied" page/message
  }

  return (
    <div className="flex">
      <div className="w-1/7">
        <Sidebar />
      </div>
      <div className="flex-1 bg-gray-100">{children}</div>
    </div>
  );
}


export default Layout;
