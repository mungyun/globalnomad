import { create } from "zustand";

interface ReservationState {
  activityId: number;
  scheduleId: number;
  statusModalOpen: boolean;
  setActivityId: (id: number) => void;
  setScheduleId: (id: number) => void;
  setStatusModalOpen: (isOpen: boolean) => void;
}

const useReservationStore = create<ReservationState>((set) => ({
  activityId: 0,
  scheduleId: 0,
  statusModalOpen: false,
  setActivityId: (activityId: number) => set({ activityId }),
  setScheduleId: (scheduleId: number) => set({ scheduleId }),
  setStatusModalOpen: (isOpen: boolean) => set({ statusModalOpen: isOpen }),
}));

export default useReservationStore;
