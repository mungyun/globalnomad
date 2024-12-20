"use client";

import EmptyActivity from "@/components/EmptyActivity";
import useInfinityItems from "@/hooks/useInfinityItems";
import { getMyActivities } from "@/lib/api/MyActivities";
import ActivitySkeleton from "@/skeleton/myactivity/ActivitySkeleton";
import { Activity } from "@/types/MyActivitiesType";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { SyncLoader } from "react-spinners";
import ActivityItem from "./ActivityItem";

const ActivityList = () => {
  const router = useRouter();

  const { data, isLoading, fetchNextPage, hasNextPage, isFetching } = useInfinityItems("activity", getMyActivities);
  const { ref, inView } = useInView();

  useEffect(() => {
    if (hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [inView]);

  if (isLoading) return <ActivitySkeleton />;

  const handleCreateActivity = () => {
    router.push("/my/activity/create");
  };

  return (
    <section className="flex min-h-screen w-full max-w-[800px] flex-col bg-gray01">
      <header className="mb-5 flex justify-between xl:h-[53px]">
        <h2 className="text-[32px] font-bold">내 체험 관리</h2>
        <button
          className="flex h-[48px] w-[120px] items-center justify-center rounded bg-black02 font-semibold text-white"
          onClick={handleCreateActivity}
          aria-label="체험 등록하기"
        >
          체험 등록하기
        </button>
      </header>
      <div className="flex flex-col gap-4">
        {data?.pages.map((page, i) =>
          page.totalCount === 0 ? (
            <EmptyActivity key={i} />
          ) : (
            page.activities.map((activity: Activity) => <ActivityItem activity={activity} key={activity.id} />)
          )
        )}
      </div>
      {hasNextPage ? (
        <div className="my-10 flex justify-center">
          <SyncLoader ref={ref} />
        </div>
      ) : null}
    </section>
  );
};

export default ActivityList;
