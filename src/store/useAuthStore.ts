import { User } from "@/types/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthStore {
  user: User | null;
  isLogin: boolean;
  setUser: (userData: User) => void;
  clearUser: () => void;
}

const useAuthStore = create(
  persist<AuthStore>(
    (set) => ({
      user: null,
      isLogin: false,
      setUser: (userData) => set({ user: userData, isLogin: true }),
      clearUser: () => set({ user: null, isLogin: false }),
    }),
    {
      name: "auth-storage",
    }
  )
);

export default useAuthStore;
