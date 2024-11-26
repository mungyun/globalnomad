import React from "react";
import Dropdown from "./components/Dropdown";
import StatusCalendar from "./components/StatusCalendar";

const ReservationStatusPage = () => {
  return (
    <div className="w-full px-4 md:px-[23px] xl:max-w-[800px] xl:px-0">
      <div className="mb-[30px]">
        <h2 className="mb-6 text-[32px] font-bold md:mb-8">예약현황</h2>
        <Dropdown />
      </div>
      <StatusCalendar />
    </div>
  );
};

export default ReservationStatusPage;
