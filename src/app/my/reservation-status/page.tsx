import React from "react";
import StatusCalendar from "./components/StatusCalendar";
import StatusHeader from "./components/StatusHeader";

const ReservationStatusPage = () => {
  return (
    <div className="w-full max-w-[800px] px-4 md:px-[23px] xl:px-0">
      <StatusHeader />
      <StatusCalendar />
    </div>
  );
};

export default ReservationStatusPage;
