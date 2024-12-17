import { useToast } from "@/components/toast/ToastProvider";
import { getMyReservationByTime } from "@/lib/api/MyActivities";
import useReservationStore from "@/store/useReservationStore";
import { Reservation } from "@/types/MyActivitiesType";
import { Message } from "@/utils/toastMessage";
import { isAxiosError } from "axios";
import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import ReservationItem from "./ReservationItem";

const ReservationList = ({ status }: { status: string }) => {
  const { activityId, scheduleId } = useReservationStore();
  const [reservationData, setReservationData] = useState<Reservation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const Toast = useToast();

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
      } catch (error) {
        if (isAxiosError(error)) {
          Toast.error(error.response?.data.message);
        } else {
          Toast.error(Message.reservationListByTimeError);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchReservationData();
  }, [activityId, scheduleId, status]);

  if (isLoading) {
    return <Skeleton height={116} />;
  }

  return (
    <div>
      {reservationData.length === 0 ? (
        <div className="text-gray-500">예약 데이터가 없습니다.</div>
      ) : (
        reservationData.map((item) => <ReservationItem item={item} key={item.id} status={status} />)
      )}
    </div>
  );
};

export default ReservationList;
