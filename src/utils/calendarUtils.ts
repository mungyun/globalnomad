import { Schedule } from "@/types/types";

//날짜를 로컬 시간대 기준으로 "YYYY-MM-DD" 형식 문자열로 변환

export const formatToLocalDateString = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

//사용 가능한 날짜 목록에서 특정 날짜가 포함되어 있는지 확인

export const isDateAvailable = (date: Date, schedules: Schedule[]): boolean => {
  const localFormattedDate = formatToLocalDateString(date);
  const availableDates = schedules.map((schedule) => schedule.date);
  return availableDates.includes(localFormattedDate);
};

//특정 날짜와 일치하는 스케줄의 시간대 목록을 반환

export const getAvailableTimes = (date: Date, schedules: Schedule[]): string[] => {
  const localFormattedDate = formatToLocalDateString(date);
  return schedules
    .filter((schedule) => schedule.date === localFormattedDate)
    .map((schedule) => `${schedule.startTime} ~ ${schedule.endTime}`);
};
