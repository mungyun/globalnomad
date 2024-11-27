import { PostActivities, Schedule } from "@/types/ActiviteyType";
import { UseFormSetValue } from "react-hook-form";
import { FiMinus } from "react-icons/fi";

interface ScheduleItemProps {
  schedule: Schedule;
  schedules: Schedule[];
  setValue: UseFormSetValue<PostActivities>;
}

const ScheduleItem = ({ schedule, schedules, setValue }: ScheduleItemProps) => {
  const deleteSchedule = () => {
    const updatedSchedules = schedules.filter((item) => item !== schedule);
    setValue("schedules", updatedSchedules);
  };
  return (
    <div className="flex gap-1 md:gap-[5px] xl:gap-5">
      <label className="flex w-full min-w-[35%] flex-col gap-2 xl:flex-1">
        <input
          className="h-11 w-full min-w-[35%] rounded border border-gray08 px-5 py-4 text-sm font-normal leading-[26px] outline-green02 placeholder:text-gray06 md:h-14 md:text-base"
          value={schedule.date}
          readOnly
        />
      </label>
      <div className="flex w-1/2 items-end gap-1 md:gap-[5px] xl:w-auto xl:gap-3">
        <input
          className="drag-none h-11 w-full min-w-20 rounded border border-gray08 px-3 text-sm leading-6 outline-green02 md:h-14 md:px-4 md:text-base md:leading-[26px] xl:max-w-[140px]"
          value={schedule.startTime}
          readOnly
        />
        <span className="hidden h-[56px] items-center text-xl xl:flex">~</span>
        <input
          className="drag-none h-11 w-full min-w-20 rounded border border-gray08 px-3 text-sm leading-6 outline-green02 md:h-14 md:px-4 md:text-base md:leading-[26px] xl:max-w-[140px]"
          value={schedule.endTime}
          readOnly
        />
      </div>
      <button
        onClick={deleteSchedule}
        className="flex size-11 shrink-0 items-center justify-center rounded-lg border border-gray03 md:size-14"
      >
        <FiMinus className="size-10 text-gray08" />
      </button>
    </div>
  );
};

export default ScheduleItem;