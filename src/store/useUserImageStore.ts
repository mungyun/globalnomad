import { create } from "zustand";

interface IuseUserImageStore {
  updateUserImage: string;
  setUpdateUserImage: (userImage: string) => void;
}

const useUserImageStore = create<IuseUserImageStore>((set) => ({
  updateUserImage: "",
  setUpdateUserImage: (newUserImage: string) => set({ updateUserImage: newUserImage }),
}));

export default useUserImageStore;
