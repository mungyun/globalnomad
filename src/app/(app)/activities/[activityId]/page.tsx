import React from "react";
import Banner from "./components/Banner";
import MainContent from "./components/MainContent";
import SideBar from "./components/SideBar";

const ActivityDetailPage = () => {
  return (
    <div>
      <Banner />
      <div className="relative flex pb-48 xl:gap-6">
        <MainContent />
        <SideBar />
      </div>
    </div>
  );
};

export default ActivityDetailPage;
