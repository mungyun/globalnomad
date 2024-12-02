import React from "react";
import Banner from "./components/Banner";
import MainContent from "./components/MainContent";
import SideBar from "./components/SideBar";

const ActivityDetailPage = async ({ params }: { params: Promise<{ activityId: string }> }) => {
  const { activityId } = await params;

  return (
    <div>
      <Banner id={Number(activityId)} />
      <div className="relative flex pb-48 xl:gap-6">
        <MainContent id={Number(activityId)} />
        <SideBar id={Number(activityId)} />
      </div>
    </div>
  );
};

export default ActivityDetailPage;
