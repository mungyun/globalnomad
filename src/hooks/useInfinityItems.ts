import { getMyReservation } from "@/lib/api/MyReservation";
import { useInfiniteQuery } from "@tanstack/react-query";

const useInfinityItems = (filter?: string | undefined) => {
  return useInfiniteQuery({
    queryKey: ["reservation"],
    queryFn: ({ cursorId, status }: { cursorId: number | null; status: string }) =>
      getMyReservation({ cursorId, status }),
    getNextPageParam: (last) => {
      const cursorId = last.cursorId;
      console.log(filter);
      if (cursorId === null) {
        return undefined;
      }
      return cursorId;
    },
    initialPageParam: undefined,
  });
};

export default useInfinityItems;
