import { create } from "zustand";
import { persist } from "zustand/middleware";

const userAuth = create(
  persist(
    (set) => ({
      user: null,
      loginUser: (user) => set({ user }),
      logoutUser: () => set({ user: null }),
      updateUser: (updatedUser) => set({ user: updatedUser }),
    }),
    { name: "m2u-storage",
      getStorage: () => localStorage, 
    } 
    
  )
);

export default userAuth;
