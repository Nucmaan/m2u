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
     if (user) {
      setIsHydrated(true);

       if (user?.role !== "Admin") {
        router.push("/login");
      }
    }
  }, [user, router]);

   if (!isHydrated) {
    return <div>Loading...</div>;
  }

   if (user?.role !== "Admin") {
    return null; 
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
