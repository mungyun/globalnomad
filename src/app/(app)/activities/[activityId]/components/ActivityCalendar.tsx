"use client";

import "@/styles/ActivityCalender.css";
import { Schedule } from "@/types/types";
import { formatToLocalDateString, isDateAvailable } from "@/utils/calendarUtils";
import React, { useState } from "react";
import Calendar from "react-calendar";

interface ActivityCalendarProps {
  schedules: Schedule[];
}

const TimeSlot = ({ time, isSelected, onClick }: { time: string; isSelected: boolean; onClick: () => void }) => (
  <li
    className={`flex h-[46px] w-[117px] cursor-pointer items-center justify-center rounded-lg border border-black02 text-[16px] font-medium ${
      isSelected ? "bg-black02 text-white" : ""
    }`}
    onClick={onClick}
  >
    {time}
  </li>
);

const ActivityCalendar: React.FC<ActivityCalendarProps> = ({ schedules }) => {
  const [timeList, setTimeList] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const handleDateClick = (date: Date): void => {
    const localFormattedDate = formatToLocalDateString(date);

    const times = schedules
      .filter((schedule) => schedule.date === localFormattedDate)
      .map((schedule) => `${schedule.startTime} ~ ${schedule.endTime}`);

    setTimeList(times);
    setSelectedTime(null);
  };

  const handleTimeClick = (time: string): void => {
    setSelectedTime(time);
  };

  return (
    <div>
      <div className="mb-4 flex h-full justify-center">
        <Calendar
          onClickDay={handleDateClick}
          tileClassName={({ date }) => (isDateAvailable(date, schedules) ? "text-black02" : "text-gray06")}
          className="w-full rounded-md border border-gray03"
          minDate={new Date()}
          locale="en-US"
        />
      </div>
      <div className="mb-6">
        <div>
          <h4 className="text-[18px] font-bold text-black02">예약 가능한 시간</h4>
          {timeList.length > 0 ? (
            <ul className="mt-[14px] flex gap-3 border-b border-b-gray03 pb-4">
              {timeList.map((time, index) => (
                <TimeSlot
                  key={index}
                  time={time}
                  isSelected={selectedTime === time}
                  onClick={() => handleTimeClick(time)}
                />
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-[16px] text-gray08">선택한 날짜에 예약 가능한 시간이 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivityCalendar;
