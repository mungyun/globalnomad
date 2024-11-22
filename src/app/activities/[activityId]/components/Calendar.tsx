"use client";

import "@/styles/Calender.css";
import React from "react";
import Calendar from "react-calendar";

interface Schedule {
  date: string;
  startTime: string;
  endTime: string;
}

interface CalendarComponentProps {
  schedules: Schedule[];
  onDateSelect: (date: string, times: string[]) => void;
}

const CalendarComponent: React.FC<CalendarComponentProps> = ({ schedules, onDateSelect }) => {
  const getAvailableDates = () => schedules.map((schedule) => schedule.date);

  const isDateAvailable = (date: Date) => {
    const formattedDate = date.toISOString().split("T")[0];
    return getAvailableDates().includes(formattedDate);
  };

  const handleDateClick = (date: Date) => {
    const formattedDate = date.toISOString().split("T")[0];
    const times = schedules
      .filter((schedule) => schedule.date === formattedDate)
      .map((schedule) => `${schedule.startTime} ~ ${schedule.endTime}`);
    onDateSelect(formattedDate, times);
  };

  return (
    <div className="mb-4 flex justify-center">
      <Calendar
        onClickDay={handleDateClick}
        tileClassName={({ date }) => (isDateAvailable(date) ? "bg-green01 text-green02" : "text-gray09")}
        className="w-full rounded-md border border-gray03"
        minDate={new Date()}
        locale="en-US"
      />
    </div>
  );
};

export default CalendarComponent;
