import React from "react";
import { ReservationListMockData } from "../MockData";
import ReservationItem from "./ReservationItem";

const RefusalMode = () => {
  const { reservations } = ReservationListMockData;
  return (
    <div>
      {reservations.map((item) => (
        <ReservationItem item={item} key={item.id} type="refusal" />
      ))}
    </div>
  );
};

export default RefusalMode;
