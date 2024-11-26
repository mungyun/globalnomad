import React from "react";
import StatusCalendar from "./components/StatusCalendar";
import StatusDropdown from "./components/StatusDropdown";

const ReservationStatusPage = () => {
  return (
    <div className="w-full max-w-[800px] px-4 md:px-[23px] xl:px-0">
      <div className="mb-[30px]">
        <h2 className="mb-6 text-[32px] font-bold md:mb-8">예약현황</h2>
        <StatusDropdown />
      </div>
      <StatusCalendar />
    </div>
  );
};

export default ReservationStatusPage;
