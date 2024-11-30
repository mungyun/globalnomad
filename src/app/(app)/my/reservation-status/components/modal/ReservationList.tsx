import React from "react";
import { ReservationListMockData } from "../MockData";
import ReservationItem from "./ReservationItem";

const ReservationList = ({ type }: { type: string }) => {
  const { reservations } = ReservationListMockData;
  return (
    <div>
      {reservations.map((item) => (
        <ReservationItem item={item} key={item.id} type={type} />
      ))}
    </div>
  );
};

export default ReservationList;
