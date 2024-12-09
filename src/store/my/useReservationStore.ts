import { create } from "zustand";

interface ReservationState {
  activityId: number;
  scheduleId: number;
  setActivityId: (id: number) => void;
  setScheduleId: (id: number) => void;
}

const useReservationStore = create<ReservationState>((set) => ({
  activityId: 0,
  scheduleId: 0,
  setActivityId: (activityId: number) => set({ activityId }),
  setScheduleId: (scheduleId: number) => set({ scheduleId }),
}));

export default useReservationStore;
