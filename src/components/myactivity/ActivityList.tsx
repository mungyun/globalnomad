"use client";

import { useRouter } from "next/navigation";
import EmptyActivity from "../EmptyActivity";
import { mockActivity } from "../mockData2";
import ActivityItem from "./ActivityItem";

export default function ActivityList() {
  const hasActivites: boolean = mockActivity && mockActivity.activities.length > 0;
  const router = useRouter();
  const handleClick = () => router.push("/createactivity");
  return (
    <div className="flex w-full max-w-[800px] flex-col bg-white">
      <div className="mb-5 flex justify-between">
        <h2 className="text-[32px] font-bold"> 내 체험관리</h2>
        <button
          className="flex h-[48px] w-[120px] items-center justify-center rounded bg-black02 font-semibold text-white"
          onClick={handleClick}
        >
          체험 등록하기
        </button>
      </div>
      <div className="flex flex-col gap-4">
        {hasActivites ? (
          mockActivity.activities.map((activity) => <ActivityItem key={activity.id} activity={activity} />)
        ) : (
          <EmptyActivity />
        )}
      </div>
    </div>
  );
}
