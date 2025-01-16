"use client";
import AgentSidebar from "@/components/AgentSidebar";
import userAuth from "@/myStore/UserAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function Layout({ children }) {
  const user = userAuth((state) => state.user);
  const router = useRouter();
  const hasHydrated = userAuth.persist.hasHydrated;
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    if (hasHydrated()) {
      setIsHydrated(true);

      if (user?.role !== "Agent") {
        router.push("/login");
      }
    }
  }, [hasHydrated, user, router]);

  if (!isHydrated) {
    return <div>Loading...</div>;
  }

  if (user?.role !== "Agent") {
    return null;
  }

  return (
    <div className="flex">
      <div className="">
        <AgentSidebar />
      </div>
      <div className="flex-1 bg-gray-100">{children}</div>
    </div>
  );
}

export default Layout;
