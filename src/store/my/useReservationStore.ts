import { create } from "zustand";

interface ReservationState {
  activityId: number;
  setActivityId: (id: number) => void;
}

const useReservationStore = create<ReservationState>((set) => ({
  activityId: 0,
  setActivityId: (activityId: number) => set({ activityId }),
}));

export default useReservationStore;
