"use client";

import DateInput from "@/components/input/DateInput";
import TimeInput from "@/components/input/TimeInput";
import { useToast } from "@/components/toast/ToastProvider";
import { ActivityForm, Schedule } from "@/types/ActivityType";
import { useState } from "react";
import { UseFormSetValue, UseFormWatch } from "react-hook-form";
import { FiPlus } from "react-icons/fi";
import ScheduleItem from "../../create/components/ScheduleItem";

interface ScheduleListProps {
  watch: UseFormWatch<ActivityForm>;
  setValue: UseFormSetValue<ActivityForm>;
}

const defaultSchedule = { date: "", startTime: "00:00", endTime: "00:00" };

const ScheduleList = ({ watch, setValue }: ScheduleListProps) => {
  const [schedule, setSchedule] = useState<Schedule>(defaultSchedule);
  const [timeReset, setTimeReset] = useState<boolean>(false);
  const schedules = watch("schedules");
  const addSchedules = watch("schedulesToAdd", []) as Schedule[];
  const Toast = useToast();

  const addSchedule = () => {
    // 시작 시간이 종료 시간보다 작을 경우 스케줄 추가 안됨
    if (schedule.startTime < schedule.endTime) {
      setValue("schedulesToAdd", [schedule, ...addSchedules]);
      // 스케줄 추가 시 input value 초기화
      setSchedule(defaultSchedule);
      setTimeReset((prev) => !prev);
    } else {
      Toast.error("시작 시간이 종료 시간보다 작습니다.");
    }
  };

  const handleChange = (field: keyof Schedule, value: string) => {
    setSchedule((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const deleteSchedule = (schedule: Schedule) => {
    const toRemove = watch("scheduleIdsToRemove", []) as number[];
    if (schedule.id) {
      setValue("scheduleIdsToRemove", [...toRemove, schedule.id]);
    }
    const updatedSchedules = schedules.filter((item) => item !== schedule);
    setValue("schedules", updatedSchedules);
  };

  return (
    <>
      <label className="text-xl font-bold leading-8 text-black03 md:text-2xl">예약 가능한 시간대</label>
      <div className="flex w-full items-end gap-1 border-b border-gray03 pb-5 md:gap-[5px] xl:gap-5">
        <DateInput onChange={(date: string) => handleChange("date", date)} value={schedule.date} />
        <div className="flex items-end gap-1 md:gap-[5px] xl:w-auto xl:gap-3">
          <TimeInput
            label="시작 시간"
            timeReset={timeReset}
            value={schedule.startTime}
            onChange={(value) => handleChange("startTime", value)}
          />
          <span className="hidden h-[56px] items-center text-xl xl:flex">~</span>
          <TimeInput
            label="종료 시간"
            timeReset={timeReset}
            value={schedule.endTime}
            onChange={(value) => handleChange("endTime", value)}
          />
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
        {[...schedules, ...addSchedules].map((schedule, index) => (
          <ScheduleItem
            key={index}
            schedule={schedule}
            onDelete={() => {
              deleteSchedule(schedule);
            }}
          />
        ))}
      </div>
    </>
  );
};

export default ScheduleList;
