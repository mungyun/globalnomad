import { create } from "zustand";

interface PaginationStore {
  totalCount: number;
  setTotalCount: (value: number) => void;
}

const usePaginationStore = create<PaginationStore>((set) => ({
  totalCount: 0,
  setTotalCount: (value) => set({ totalCount: value }),
}));

export default usePaginationStore;
