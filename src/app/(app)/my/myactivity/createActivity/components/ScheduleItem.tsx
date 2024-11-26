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
      <input
        className="h-[56px] w-full rounded border border-gray08 px-5 py-4 text-base font-normal leading-[26px] outline-green02 placeholder:text-gray06"
        value={schedule.date}
        readOnly
      />
      <div className="flex items-end gap-1 md:gap-[5px] xl:gap-3">
        <input
          className="drag-none h-14 max-w-[140px] rounded border border-gray08 px-4 outline-green02"
          value={schedule.startTime}
          readOnly
        />
        <span className="hidden h-[56px] items-center text-xl xl:flex">~</span>
        <input
          className="drag-none h-14 max-w-[140px] rounded border border-gray08 px-4 outline-green02"
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
