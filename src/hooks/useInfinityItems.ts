import { getMyReservation } from "@/lib/api/MyReservation";
import { ReservationResponse } from "@/types/MyReservationType";
import { useInfiniteQuery } from "@tanstack/react-query";

const useInfinityItems = (key: string, filter?: string | undefined) => {
  return useInfiniteQuery<ReservationResponse>({
    queryKey: [key, filter],
    queryFn: ({ pageParam }: { pageParam: number | unknown }) => getMyReservation({ pageParam, filter: filter || "" }),
    getNextPageParam: (last) => {
      const cursorId = last.cursorId;
      if (cursorId === null) {
        return undefined;
      }
      return cursorId;
    },
    initialPageParam: undefined,
  });
};

export default useInfinityItems;
