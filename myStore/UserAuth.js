import { create } from "zustand";
import { persist } from "zustand/middleware";

const userAuth = create(
  persist(
    (set) => ({
      user: null,
      loginUser: (user) => set({ user }),
      logoutUser: () => set({ user: null }),
    }),
    { name: "m2u-storage" } // Automatically uses localStorage with this key
  )
);

export default userAuth;
