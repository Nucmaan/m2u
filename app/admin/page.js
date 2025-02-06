"use client"; // Ensures the component runs only on the client

import userAuth from "@/myStore/UserAuth";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [hasHydrated, setHasHydrated] = useState(false);
  const user = userAuth((state) => state.user);

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  if (!hasHydrated) {
    return <p>Loading...</p>; // Prevents pre-rendering errors
  }

  if (!user || Object.keys(user).length === 0) {
    return <p>User not found</p>; // Handle undefined user case properly
  }

  return (
    <div>
      <h1>Welcome, {user?.username}</h1>
    </div>
  );
}
