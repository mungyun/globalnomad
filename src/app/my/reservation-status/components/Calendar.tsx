"use client";

import "@/styles/ReservationCalender.css";
import React, { useState } from "react";
import Calendar from "react-calendar";

const CalendarComponent = () => {
  const [value, setValue] = useState<Date | null>(new Date());
  const [activeStartDate, setActiveStartDate] = useState(new Date());

  // 헤더의 날짜를 한국어로 표기
  const formatHeader = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    return `${year}년 ${month}월`;
  };

  return (
    <div className="custom-calendar">
      <Calendar
        value={value}
        onChange={(newValue) => setValue(newValue as Date)}
        activeStartDate={activeStartDate}
        onActiveStartDateChange={({ activeStartDate }) => setActiveStartDate(activeStartDate!)}
        showNeighboringMonth={false}
        locale="en-US"
        prevLabel="<" // 이전 버튼
        nextLabel=">" // 다음 버튼
        navigationLabel={({ date }) => formatHeader(date)} // 네비게이션 커스텀
      />
    </div>
  );
};

export default CalendarComponent;
