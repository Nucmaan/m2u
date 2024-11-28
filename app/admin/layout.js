"use client";
import AdminSidebar from "@/components/AdminSidebar";
import userAuth from "@/myStore/UserAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function Layout({ children }) {
  const user = userAuth((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (user?.role !== "Admin") {
      router.push("/login"); 
    }
  }, [user, router]);

  
  if (user?.role !== "Admin") {
    return null; 
  }
  return (
    <div className="flex">
      <div className="">
        <AdminSidebar />
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}

export default Layout;
