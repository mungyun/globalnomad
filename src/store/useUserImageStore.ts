import { create } from "zustand";

interface IuseUserImageStore {
  currentUserImage: string | null;
  updateUserImage: string | null;
  setCurrentUserImage: (userImage: string) => void;
  setUpdateUserImage: (userImage: string) => void;
}

const useUserImageStore = create<IuseUserImageStore>((set) => ({
  currentUserImage: null,
  updateUserImage: null,
  setCurrentUserImage: (newCurrentImage: string) => set({ currentUserImage: newCurrentImage }),
  setUpdateUserImage: (newUserImage: string) => set({ updateUserImage: newUserImage }),
}));

export default useUserImageStore;
