"use client";

import EmptyActivity from "@/components/EmptyActivity";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ActivityItem from "./ActivityItem";
import { TestAuth } from "./qwe";

const ActivityList = () => {
  const router = useRouter();
  const [activities, setActivities] = useState([]);
  const hasActivities = Array.isArray(activities) && activities.length > 0;

  //  내체험목록 가져오기
  useEffect(() => {
    (async () => {
      const response = await fetch("https://sp-globalnomad-api.vercel.app/9-1/my-activities?size=20", {
        headers: {
          Authorization: `Bearer ${TestAuth}`,
        },
      });
      const data = await response.json();
      console.log(data);
      setActivities(data.activities);
    })();
  }, []);

  const handleCreateActivity = () => {
    router.push("/my/activity/create");
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
