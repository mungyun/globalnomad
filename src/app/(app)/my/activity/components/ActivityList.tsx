"use client";

import EmptyActivity from "@/components/EmptyActivity";
import { useToast } from "@/components/toast/ToastProvider";
import { getMyActivities } from "@/lib/api/MyActivities";
import { Activity } from "@/types/MyActivitiesType";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import ActivityItem from "./ActivityItem";

const ActivityList = () => {
  const router = useRouter();
  const { success } = useToast();

  //  내체험목록 가져오기
  const { data: activities = [], isLoading } = useQuery<Activity[]>({
    queryKey: ["myActivities"],
    queryFn: getMyActivities,
  });

  if (isLoading) return <div>Loading...</div>;

  const hasActivities = activities.length > 0;

  const handleCreateActivity = () => {
    router.push("/my/activity/create");
    success("체험등록 페이지로 이동합니다");
  };

  return (
    <section className="flex w-full max-w-[800px] flex-col bg-gray01">
      <header className="mb-5 flex justify-between">
        <h2 className="text-[32px] font-bold"> 내 체험관리</h2>
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
