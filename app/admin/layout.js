"use client";
import AdminSidebar from "@/components/AdminSidebar";
import userAuth from "@/myStore/UserAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function Layout({ children }) {
  const user = userAuth((state) => state.user);
  const router = useRouter();
  const hasHydrated = userAuth.persist.hasHydrated;
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Wait for zustand to hydrate
    if (hasHydrated()) {
      setIsHydrated(true);

      // Redirect if user is not an admin
      if (user?.role !== "Admin") {
        router.push("/login");
      }
    }
  }, [hasHydrated, user, router]);

  // Show a loading placeholder while hydration is in progress
  if (!isHydrated) {
    return <div>Loading...</div>;
  }

  // Prevent rendering for non-admin users
  if (user?.role !== "Admin") {
    return null;
  }

  return (
    <div className="flex">
      <div>
        <AdminSidebar />
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}

export default Layout;
