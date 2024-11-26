import React from "react";
import Dropdown from "./components/Dropdown";
import StatusCalendar from "./components/StatusCalendar";

const ReservationStatusPage = () => {
  return (
    <div className="w-full xl:max-w-[800px]">
      <div className="mb-[30px]">
        <h2 className="mb-8 text-[32px] font-bold">예약현황</h2>
        <Dropdown />
      </div>
      <StatusCalendar />
    </div>
  );
};

export default ReservationStatusPage;
