import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const userAuth = create(
  persist(
    (set) => ({
      user: null,
      loginUser: (user) => set({ user }),
      logoutUser: () => set({ user: null }),
    }),
    {
      name: "m2u-storage",
      storage: typeof window !== "undefined" ? createJSONStorage(() => localStorage) : undefined,
    }
  )
);

export default userAuth;
