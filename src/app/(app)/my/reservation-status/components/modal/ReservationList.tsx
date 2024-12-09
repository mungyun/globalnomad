import { getMyReservationByTime } from "@/lib/api/MyActivities";
import useReservationStore from "@/store/my/useReservationStore";
import { Reservation } from "@/types/MyActivitiesType";
import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import ReservationItem from "./ReservationItem";

const ReservationList = ({ type }: { type: string }) => {
  const { activityId, scheduleId } = useReservationStore();
  const [reservationData, setReservationData] = useState<Reservation[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const status = type === "application" ? "pending" : type === "approval" ? "confirmed" : "declined";

  useEffect(() => {
    const fetchReservationData = async () => {
      if (!activityId || !scheduleId) return;

      setIsLoading(true);
      try {
        const response = await getMyReservationByTime({
          activityId,
          scheduleId,
          status,
          size: 10,
        });

        const reservations = Array.isArray(response.reservations) ? response.reservations : [];
        setReservationData(reservations);
      } catch (err) {
        console.error("내 예약 시간대별 정보 조회 오류: ", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReservationData();
  }, [activityId, scheduleId, type]);

  if (isLoading) {
    return <Skeleton height={116} />;
  }

  return (
    <div>
      {reservationData.length === 0 ? (
        <div className="text-gray-500">예약 데이터가 없습니다.</div>
      ) : (
        reservationData.map((item) => <ReservationItem item={item} key={item.scheduleId} type={type} />)
      )}
    </div>
  );
};

export default ReservationList;
