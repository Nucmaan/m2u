"use client";
import AgentSidebar from "@/components/AgentSidebar";
import RaadiLoading from "@/components/RaadiLoading";
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

      // Redirect if user is not an agent
      if (user?.role !== "Agent") {
        router.push("/login");
      }
    }
  }, [user, router]);

  // Show a loading placeholder while hydration is in progress
  if (!isHydrated) {
    return <RaadiLoading />;
  }

  // Prevent rendering for non-agent users
  if (user?.role !== "Agent") {
    return null; // Or show a "Permission Denied" page/message
  }

  return (
    <div className="flex">
      <div className="w-1/7">
        <AgentSidebar />
      </div>
      <div className="flex-1 bg-gray-100">{children}</div>
    </div>
  );
}

export default Layout;
