import React from "react";
import { ReservationListMockData } from "../MockData";
import ReservationItem from "./ReservationItem";

const ApprovalMode = () => {
  const { reservations } = ReservationListMockData;
  return (
    <div>
      {reservations.map((item) => (
        <ReservationItem item={item} key={item.id} type="approval" />
      ))}
    </div>
  );
};

export default ApprovalMode;
