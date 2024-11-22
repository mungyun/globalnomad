"use client";

import formatPrice from "@/utils/formatPrice";
import dynamic from "next/dynamic";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { mockData } from "./mockdata";

const CalendarComponent = dynamic(() => import("./Calendar"), { ssr: false });

const titleStyle = "font-bold text-black02";

interface PartyNumberSelectorProps {
  partyNum: number;
  setPartyNum: React.Dispatch<React.SetStateAction<number>>;
}

const TimeSlot = ({ time }: { time: string }) => (
  <li className="flex h-[46px] w-[117px] items-center justify-center rounded-lg border border-black02 text-[16px] font-medium">
    {time}
  </li>
);

const PartyNumberSelector: React.FC<PartyNumberSelectorProps> = ({ partyNum, setPartyNum }) => (
  <div className="flex h-[40px] w-[120px] items-center justify-between rounded-md border border-gray03 px-[13px]">
    <button onClick={() => setPartyNum((prev) => Math.max(prev - 1, 0))} aria-label="참여 인원 수 줄이기">
      <Image src="/icons/subtract.svg" alt="빼기" width={20} height={20} />
    </button>
    <span className="text-[14px] text-gray09">{partyNum}</span>
    <button onClick={() => setPartyNum((prev) => prev + 1)} aria-label="참여 인원 수 늘리기">
      <Image src="/icons/add.svg" alt="더하기" width={20} height={20} />
    </button>
  </div>
);

// 오늘 날짜 계산
const getTodayDate = () => {
  const today = new Date();
  return today.toISOString().split("T")[0]; // "YYYY-MM-DD" 형식 반환
};

const SideBar = () => {
  const { price, schedules } = mockData;
  const [selectedDate, setSelectedDate] = useState<string | null>(getTodayDate());
  const [timeList, setTimeList] = useState<string[]>([]);
  const [partyNum, setPartyNum] = useState<number>(0);

  useEffect(() => {
    // 선택된 날짜의 예약 가능한 시간을 설정
    const todaySchedules = schedules.filter((schedule) => schedule.date === getTodayDate());
    const todayTimes = todaySchedules.map((schedule) => `${schedule.startTime} ~ ${schedule.endTime}`);
    setTimeList(todayTimes);
  }, [schedules]);

  const handleDateSelect = (date: string, times: string[]) => {
    setSelectedDate(date);
    setTimeList(times);
  };

  return (
    <div className="sticky top-20 rounded-xl border border-gray02 p-6 shadow-md transition-all xl:h-full xl:w-[384px]">
      {/* 가격 정보 */}
      <h3 className="mb-4 text-[20px] text-gray09">
        <span className="text-[32px] font-bold text-black03">￦ {formatPrice(price)}</span> / 인
      </h3>

      {/* 달력 */}
      <div className="mx-auto h-[299px] w-[336px] border-t border-t-gray03">
        <label htmlFor="calendar" className={`py-4 text-[20px] ${titleStyle} block`}>
          날짜
        </label>
        <CalendarComponent schedules={schedules} onDateSelect={handleDateSelect} />
      </div>

      {/* 시간대 선택 및 참여 인원 수 */}
      {selectedDate && (
        <div className="mt-4">
          {/* 예약 가능한 시간 */}
          <div className="mb-6">
            <h4 className={`text-[18px] ${titleStyle}`}>예약 가능한 시간</h4>
            {timeList.length > 0 ? (
              <div>
                <ul className="mt-[14px] flex gap-3 border-b border-b-gray03 pb-4">
                  {timeList.map((time, index) => (
                    <TimeSlot key={index} time={time} />
                  ))}
                </ul>
                <div className="mb-6 mt-4 border-b border-b-gray03 pb-6">
                  <h4 className={`mb-2 text-[18px] ${titleStyle}`}>참여 인원 수</h4>
                  <PartyNumberSelector partyNum={partyNum} setPartyNum={setPartyNum} />
                  <button className="mt-6 h-[56px] w-full rounded bg-black02 text-[16px] font-bold text-white">
                    예약하기
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`text-[20px] ${titleStyle}`}>총 합계</span>
                  <span className={`text-[20px] ${titleStyle}`}>￦ {formatPrice(partyNum * price)}</span>
                </div>
              </div>
            ) : (
              <p className="mt-2 text-[16px] text-gray08">선택한 날짜에 예약 가능한 시간이 없습니다.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SideBar;
