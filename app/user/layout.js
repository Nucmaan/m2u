"use client";
import Sidebar from "@/components/Sidebar";
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

      if (user?.role !== "User") {
        router.push("/login");
      }
    }
  }, [hasHydrated, user, router]);

  if (!isHydrated) {
    return <div>Loading...</div>;
  }

  if (user?.role !== "User") {
    return null;
  }

  return (
    <div className="flex">
      <div className="">
        <Sidebar />
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}

export default Layout;
