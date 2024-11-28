import { create } from "zustand";

const userAuth = create((set) => ({
  user: null,
  loginUser: (user) => set({ user }),
  logoutUser: () => set({ user: null }),
}));

export default userAuth;
