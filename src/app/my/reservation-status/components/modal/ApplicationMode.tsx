import React from "react";
import { ReservationListMockData } from "../MockData";
import ReservationItem from "./ReservationItem";

const ApplicationMode = () => {
  const { reservations } = ReservationListMockData;
  return (
    <div>
      {reservations.map((item) => (
        <ReservationItem item={item} key={item.id} type="application" />
      ))}
    </div>
  );
};

export default ApplicationMode;
