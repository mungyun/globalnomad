import React from "react";
import Banner from "./components/Banner";
import MainContent from "./components/MainContent";
import SideBar from "./components/SideBar";

const ActivityDetailPage = () => {
  return (
    <div>
      <Banner />
      <div className="flex gap-6 pb-48">
        <MainContent />
        <SideBar />
      </div>
    </div>
  );
};

export default ActivityDetailPage;
