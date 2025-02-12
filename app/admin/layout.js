"use client";
import AdminSidebar from "@/components/AdminSidebar";
import userAuth from "@/myStore/UserAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function Layout({ children }) {
  const user = userAuth((state) => state.user);
  const router = useRouter();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Wait for Zustand to hydrate
    if (user) {
      setIsHydrated(true);

      // Redirect if user is not an admin
      if (user?.role !== "Admin") {
        router.push("/login");
      }
    }
  }, [user, router]);

  // Show a loading placeholder while hydration is in progress
  if (!isHydrated) {
    return <div>Loading...</div>;
  }

  // Prevent rendering for non-admin users
  if (user?.role !== "Admin") {
    return null; // Or show a "Permission Denied" page/message
  }

  return (
    <div className="flex ">
      <div >
        <AdminSidebar />
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}

export default Layout;
