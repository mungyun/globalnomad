"use client";

import TimeInput from "@/components/input/TimeInput";
import { ActiviteForm, Schedule } from "@/types/ActivityType";
import { useState } from "react";
import { UseFormSetValue, UseFormWatch } from "react-hook-form";
import { FiPlus } from "react-icons/fi";
import ScheduleItem from "./ScheduleItem";

interface ScheduleListProps {
  watch: UseFormWatch<ActiviteForm>;
  setValue: UseFormSetValue<ActiviteForm>;
}

const defaultSchedule = { date: "", startTime: "00:00", endTime: "00:00" };

const ScheduleList = ({ watch, setValue }: ScheduleListProps) => {
  const [schedule, setSchedule] = useState<Schedule>(defaultSchedule);
  const schedules = watch("schedules", []);

  const addSchedule = () => {
    // 시작 시간이 종료 시간보다 작을 경우 스케줄 추가 안됨
    if (schedule.startTime < schedule.endTime) {
      setValue("schedules", [schedule, ...schedules]);
      // 스케줄 추가 시 input value 초기화
      setSchedule(defaultSchedule);
    } else {
      console.log("실패");
    }
  };

  const handleChange = (field: keyof Schedule, value: string) => {
    setSchedule((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  return (
    <>
      <label className="text-xl font-bold leading-8 text-black03 md:text-2xl">예약 가능한 시간대</label>
      <div className="flex w-full items-end gap-1 border-b border-gray03 pb-5 md:gap-[5px] xl:gap-5">
        <label className="flex w-full flex-col">
          <span className="mb-2 text-base font-medium leading-[26px] md:text-xl md:leading-8">날짜</span>
          <input
            className="h-11 w-full rounded border border-gray08 px-3 text-sm font-normal leading-[26px] outline-green02 placeholder:text-gray06 md:h-14 md:px-4 md:text-base"
            // type="date"
            value={schedule.date}
            placeholder="YY/MM/DD"
            onChange={(e) => handleChange("date", e.target.value)}
          />
        </label>
        <div className="flex items-end gap-1 md:gap-[5px] xl:w-auto xl:gap-3">
          <TimeInput
            label="시작 시간"
            value={schedule.startTime}
            onChange={(value) => handleChange("startTime", value)}
          />
          <span className="hidden h-[56px] items-center text-xl xl:flex">~</span>
          <TimeInput label="종료 시간" value={schedule.endTime} onChange={(value) => handleChange("endTime", value)} />
        </div>
        <button
          onClick={addSchedule}
          disabled={!schedule.date || !schedule.endTime || !schedule.startTime}
          className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-green02 md:size-14"
        >
          <FiPlus className="size-10 text-white" />
        </button>
      </div>
      <div className="flex flex-col gap-5">
        {schedules.map((schedule, index) => (
          <ScheduleItem key={index} schedule={schedule} schedules={schedules} setValue={setValue} />
        ))}
      </div>
    </>
  );
};

export default ScheduleList;
