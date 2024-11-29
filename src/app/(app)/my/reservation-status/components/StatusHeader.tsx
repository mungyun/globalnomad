import React from "react";
import { ActivityListMockData } from "./MockData";
import StatusDropdown from "./StatusDropdown";

const StatusHeader = () => {
  const datas = ActivityListMockData.activities.map((activity) => activity.title);

  return (
    <div className="mb-[30px]">
      <h2 className="mb-6 text-[32px] font-bold md:mb-8">예약현황</h2>
      <StatusDropdown datas={datas} type="header" />
    </div>
  );
};

export default StatusHeader;
