import { useInfiniteQuery } from "@tanstack/react-query";

const useInfinityItems = (key: string, fetchFn, filter?: string | undefined) => {
  return useInfiniteQuery({
    queryKey: [key, filter],
    queryFn: ({ pageParam: cursorId }: { pageParam: number | unknown }) => fetchFn({ cursorId, filter: filter || "" }),
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
