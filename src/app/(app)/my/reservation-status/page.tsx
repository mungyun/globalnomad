import React from "react";
import StatusCalendar from "./components/StatusCalendar";
import StatusHeader from "./components/StatusHeader";

const ReservationStatusPage = () => {
  return (
    <div className="w-full max-w-[800px]">
      <StatusHeader />
      <StatusCalendar />
    </div>
  );
};

export default ReservationStatusPage;
