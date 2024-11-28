"use client"
import Sidebar from "@/components/Sidebar";
import userAuth from "@/myStore/UserAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function Layout({ children }) {
  const user = userAuth((state) => state.user); 
  const router = useRouter();

  useEffect(() => {
    if (user?.role !== "User") {
      router.push("/login"); // Redirect to login if not a user
    }
  }, [user, router]);

  // Render layout only if user.role === "User"
  if (user?.role !== "User") {
    return null; // Prevent rendering during the redirect
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
