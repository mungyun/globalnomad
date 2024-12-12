"use client";

import EmptyActivity from "@/components/EmptyActivity";
import { getMyActivities } from "@/lib/api/MyActivities";
import ActivitySkeleton from "@/skeleton/myactivity/ActivitySkeleton";
import { Activity } from "@/types/MyActivitiesType";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import ActivityItem from "./ActivityItem";

const ActivityList = () => {
  const router = useRouter();

  // 내 체험 목록 가져오기
  const {
    data: activities = [],
    isLoading,
    isError,
    error,
  } = useQuery<Activity[]>({
    queryKey: ["myActivities"],
    queryFn: () => getMyActivities({ size: 20 }),
  });

  if (isLoading) return <ActivitySkeleton />;

  if (isError) return <div>오류 발생: {error instanceof Error ? error.message : "알 수 없는 오류"}</div>;

  const hasActivities = activities.length > 0;

  const handleCreateActivity = () => {
    router.push("/my/activity/create");
  };

  return (
    <section className="flex h-screen w-full max-w-[800px] flex-col bg-gray01">
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
        {hasActivities ? (
          activities.map((activity) => <ActivityItem key={activity.id} activity={activity} />)
        ) : (
          <EmptyActivity />
        )}
      </div>
    </section>
  );
};

export default ActivityList;
