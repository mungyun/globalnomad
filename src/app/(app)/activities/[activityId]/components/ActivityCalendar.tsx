"use client";

import useActivityStore from "@/store/useActivityStore";
import "@/styles/ActivityCalender.css";
import { Schedule } from "@/types/types";
import { formatToLocalDateString, isDateAvailable } from "@/utils/calendarUtils";
import React, { useState } from "react";
import Calendar from "react-calendar";

interface ActivityCalendarProps {
  schedules: Schedule[];
  onChange: (id: number) => void;
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

const ActivityCalendar = ({ schedules, onChange }: ActivityCalendarProps) => {
  const [timeList, setTimeList] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null); // 선택한 날짜 상태 추가
  const { selectedTime, setSelectedTime } = useActivityStore();

  const handleDateClick = (date: Date): void => {
    setSelectedDate(date); // 선택한 날짜 저장
    const localFormattedDate = formatToLocalDateString(date);

    const times = schedules
      .filter((schedule) => schedule.date === localFormattedDate)
      .map((schedule) => ({
        time: `${schedule.startTime} ~ ${schedule.endTime}`,
        id: schedule.id,
      }));

    setTimeList(times.map((time) => time.time));
    setSelectedTime("");
  };

  const handleTimeClick = (time: string): void => {
    if (!selectedDate) return; // 선택된 날짜가 없으면 리턴

    const localFormattedDate = formatToLocalDateString(selectedDate); // 선택된 날짜 포맷
    const selectedSchedule = schedules.find(
      (schedule) => `${schedule.startTime} ~ ${schedule.endTime}` === time && schedule.date === localFormattedDate
    );

    if (selectedSchedule) {
      // 선택된 시간이 이전 선택과 다를 경우에만 onChange 호출
      if (selectedTime !== time) {
        setSelectedTime(time);
        onChange(selectedSchedule.id); // 새로운 id 저장
      }
    } else {
      setSelectedTime("");
      onChange(-1); // 잘못된 id 처리
    }
  };

  return (
    <div>
      <div className="activity-calendar mb-4 flex h-full justify-center">
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
