"use client";

import { useRouter } from "next/navigation";
import EmptyActivity from "../../../../components/EmptyActivity";
import ActivityItem from "./ActivityItem";
import { mockActivity } from "./mockData2";

const ActivityList = () => {
  const router = useRouter();
  const activities = mockActivity?.activities || [];
  const handleCreateActivity = () => router.push("/createactivity");
  const hasActivities = activities.length > 0;

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
