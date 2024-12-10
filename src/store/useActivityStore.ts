import { create } from "zustand";

interface ActivityState {
  selectedTime: string;
  setSelectedTime: (time: string) => void;
}

const useActivityStore = create<ActivityState>((set) => ({
  selectedTime: "",
  setSelectedTime: (time: string) => set({ selectedTime: time }),
}));

export default useActivityStore;
