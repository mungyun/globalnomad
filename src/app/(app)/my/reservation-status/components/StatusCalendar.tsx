"use client";

import { useToast } from "@/components/toast/ToastProvider";
import { getMyActivitiesByMonth } from "@/lib/api/MyActivities";
import useReservationStore from "@/store/useReservationStore";
import "@/styles/ReservationCalender.css";
import { ReservationData } from "@/types/MyReservationType";
import { Message } from "@/utils/toastMessage";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Calendar from "react-calendar";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import StatusModal from "./modal/StatusModal";

const caseStyle = "text-start text-[14px] font-medium h-[23px] rounded pl-1";
const roundStyle = "absolute left-1 top-3 h-[8px] w-[8px] rounded-full";

const StatusCalendar = () => {
  const [value, setValue] = useState<Date>(new Date());
  const [activeStartDate, setActiveStartDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const { activityId, statusModalOpen, setStatusModalOpen, setScheduleId } = useReservationStore();
  const Toast = useToast();
  const router = useRouter();

  const year = String(value.getFullYear());
  const month = String(value.getMonth() + 1);

  const { data: reservationData = [], isLoading } = useQuery<ReservationData[], Error>({
    queryKey: ["ReservationDataByMonth", year, month, activityId],
    queryFn: () => getMyActivitiesByMonth({ year, month, activityId }),
    enabled: !!activityId && !!value,
    onError: (error: unknown) => {
      if (isAxiosError(error)) {
        Toast.error(error.response?.data?.message || Message.error);
        router.push("/404");
      } else {
        Toast.error(Message.error);
      }
    },
  } as UseQueryOptions<ReservationData[], Error>);

  const reservationMap = reservationData.reduce(
    (acc, { date, reservations }) => {
      acc[date] = reservations;
      return acc;
    },
    {} as Record<string, { completed: number; confirmed: number; pending: number }>
  );

  // 헤더 날짜 형식 설정
  const formatHeader = (date: Date) => `${date.getFullYear()}년 ${date.getMonth() + 1}월`;

  // 날짜 타일에 표시할 콘텐츠
  const tileContent = ({ date }: { date: Date }) => {
    const dateString = date.toLocaleDateString("en-CA"); // yyyy-mm-dd 형식
    const reservations = reservationMap[dateString];

    if (reservations) {
      const { completed, confirmed, pending } = reservations;

      return (
        <div className="w-full">
          <div className={`${roundStyle} ${completed > 0 ? "bg-gray09" : "bg-blue03"}`}></div>
          {completed > 0 && <div className={`${caseStyle} bg-gray03 text-gray09`}>완료 {completed}</div>}
          {confirmed > 0 && <div className={`${caseStyle} bg-orange01 text-orange02`}>승인 {confirmed}</div>}
          {pending > 0 && <div className={`${caseStyle} bg-blue03 text-white`}>예약 {pending}</div>}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="status-calendar relative">
      {isLoading ? (
        <Skeleton height={770} />
      ) : (
        <Calendar
          value={value}
          onChange={(newValue) => setValue(newValue as Date)} // Date[] 가능성에 대비한 타입 단언
          activeStartDate={activeStartDate}
          onActiveStartDateChange={({ activeStartDate }) => setActiveStartDate(activeStartDate!)} // null 방지
          onClickDay={(date) => {
            setSelectedDate(date);
            setStatusModalOpen(true);
          }}
          showNeighboringMonth={false}
          locale="en-US"
          prevLabel="<<"
          nextLabel=">>"
          navigationLabel={({ date }) => formatHeader(date)}
          tileContent={tileContent}
          tileDisabled={() => statusModalOpen}
        />
      )}
      {statusModalOpen && selectedDate && (
        <StatusModal
          isOpen={statusModalOpen}
          onClose={() => {
            setStatusModalOpen(false);
            setScheduleId(0);
          }}
          date={selectedDate}
        />
      )}
    </div>
  );
};

export default StatusCalendar;
