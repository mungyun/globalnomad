"use client";

import "@/styles/ReservationCalender.css";
import React, { useState } from "react";
import Calendar from "react-calendar";
import { ReservationMockData } from "./MockData";
import StatusModal from "./StatusModal";

const caseStyle = "text-start text-[14px] font-medium h-[23px] rounded pl-1";
const roundStyle = "absolute left-1 top-3 h-[8px] w-[8px] rounded-full";

const StatusCalendar = () => {
  const [value, setValue] = useState<Date | null>(new Date());
  const [activeStartDate, setActiveStartDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // 예약 데이터를 날짜별로 매핑
  const reservationMap = ReservationMockData.reduce(
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
    const dateString = date.toISOString().split("T")[0]; // yyyy-mm-dd 형식으로 변환
    const reservations = reservationMap[dateString];

    // 예약 상태가 있을 경우 표시
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
      <Calendar
        value={value}
        onChange={(newValue) => setValue(newValue as Date)} // 타입이 Date | Date[]일 수 있어 'as Date'를 추가
        activeStartDate={activeStartDate}
        onActiveStartDateChange={({ activeStartDate }) => setActiveStartDate(activeStartDate!)}
        onClickDay={(date) => {
          setSelectedDate(date); // 클릭한 날짜 저장
          setIsModalOpen(true); // 모달 열기
        }}
        showNeighboringMonth={false} // 이전, 다음 달 날짜를 숨김
        locale="en-US" // 기본 locale은 영어로 설정
        prevLabel="<<" // 이전 버튼
        nextLabel=">>" // 다음 버튼
        navigationLabel={({ date }) => formatHeader(date)} // 네비게이션 커스터마이징
        tileContent={tileContent} // 날짜별 예약 상태를 표시하는 함수 적용
      />
      <StatusModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} date={selectedDate} />
    </div>
  );
};

export default StatusCalendar;
