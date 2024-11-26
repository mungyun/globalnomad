import React from "react";
import CalendarComponent from "./components/Calendar";
import Dropdown from "./components/Dropdown";

const ReservationStatusPage = () => {
  return (
    <div className="w-full xl:max-w-[800px]">
      <div className="mb-[30px]">
        <h2 className="mb-8 text-[32px] font-bold">예약현황</h2>
        <Dropdown />
      </div>
      <CalendarComponent />
    </div>
  );
};

export default ReservationStatusPage;
