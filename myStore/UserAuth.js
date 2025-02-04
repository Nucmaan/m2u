import { create } from "zustand";
import { persist } from "zustand/middleware";

const userAuth = create(
  persist(
    (set, get) => ({
      user: null,
      loginUser: (user) => set({ user }),
      logoutUser: () => set({ user: null }),
      hasHydrated: false, // Track hydration state
      setHasHydrated: (state) => set({ hasHydrated: state }),
    }),
    {
      name: "m2u-storage",
      skipHydration: true, // 🚀 Avoid hydration issues during SSR
      onRehydrateStorage: () => (state) => {
        state.setHasHydrated(true); // Mark hydration as complete
      },
    }
  )
);

export default userAuth;
