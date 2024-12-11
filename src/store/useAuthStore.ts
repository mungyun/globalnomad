import { User } from "@/types/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthStore {
  user: User | null;
  setUser: (userData: User) => void;
  clearUser: () => void;
}

const useAuthStore = create(
  persist<AuthStore>(
    (set) => ({
      user: null,
      setUser: (userData) => set({ user: userData }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: "auth-storage",
    }
  )
);

export default useAuthStore;
