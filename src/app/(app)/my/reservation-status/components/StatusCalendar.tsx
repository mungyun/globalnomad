"use client";

import { proxy } from "@/lib/api/axiosInstanceApi";
import useReservationStore from "@/store/my/useReservationStore";
import "@/styles/ReservationCalender.css";
import { ReservationData } from "@/types/MyReservationType";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import StatusModal from "./modal/StatusModal";

const caseStyle = "text-start text-[14px] font-medium h-[23px] rounded pl-1";
const roundStyle = "absolute left-1 top-3 h-[8px] w-[8px] rounded-full";

const StatusCalendar = () => {
  const [value, setValue] = useState<Date | null>(new Date());
  const [activeStartDate, setActiveStartDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [reservationData, setReservationData] = useState<ReservationData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { activityId } = useReservationStore();
  const setSchduleId = useReservationStore((state) => state.setScheduleId);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      if (!value || !activityId) return;

      const year = String(value.getFullYear());
      const month = String(value.getMonth() + 1);

      try {
        const response = await proxy.get(
          `/api/my-activities/${activityId}/reservation-dashboard?year=${year}&month=${month}`
        );
        setReservationData(response.data);
      } catch (error) {
        console.error("월별 예약 데이터 패칭 실패:", error);
        router.push("/404");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [value, activityId]);

  const reservationMap = reservationData.reduce(
    (acc, { date, reservations }) => {
      acc[date] = reservations;
      return acc;
    },
    {} as Record<string, { completed: number; confirmed: number; pending: number }>
  );

  // 헤더의 날짜를 한국어로 표기
  const formatHeader = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    return `${year}년 ${month}월`;
  };

  // 날짜에 예약 상태를 표시할 내용
  const tileContent = ({ date }: { date: Date }) => {
    const dateString = date.toLocaleDateString("en-CA"); // yyyy-mm-dd 형식으로 변환
    const reservations = reservationMap[dateString];

    if (reservations) {
      const { completed, confirmed, pending } = reservations;

      return (
        <div className="w-full">
          {completed > 0 ? (
            <div className={`${roundStyle} bg-gray09`}></div>
          ) : (
            <div className={`${roundStyle} bg-blue03`}></div>
          )}
          {completed > 0 && <div className={`${caseStyle} bg-gray03 text-gray09`}>완료 {completed}</div>}
          {confirmed > 0 && <div className={`${caseStyle} bg-orange01 text-orange02`}>승인 {confirmed}</div>}
          {pending > 0 && <div className={`${caseStyle} bg-blue03 text-white`}>예약 {pending}</div>}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="custom-calendar relative">
      {isLoading ? (
        <Skeleton height={770} />
      ) : (
        <Calendar
          value={value}
          onChange={(newValue) => setValue(newValue as Date)} // newValue는 Date[]일 수도 있으므로 타입 단언 필요
          activeStartDate={activeStartDate}
          onActiveStartDateChange={({ activeStartDate }) => setActiveStartDate(activeStartDate!)} // activeStartDate가 null 가능성이 있음
          onClickDay={(date) => {
            setSelectedDate(date);
            setIsModalOpen(true);
          }}
          showNeighboringMonth={false}
          locale="en-US"
          prevLabel="<<"
          nextLabel=">>"
          navigationLabel={({ date }) => formatHeader(date)}
          tileContent={tileContent}
          tileDisabled={() => isModalOpen}
        />
      )}
      {isModalOpen && (
        <StatusModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSchduleId(0);
          }}
          date={selectedDate}
        />
      )}
    </div>
  );
};

export default StatusCalendar;
