"use client";

import { Schedule, ScheduleCount } from "@/types/MyActivitiesType";
import React, { useEffect, useMemo, useState } from "react";
import { SchedulemockData } from "../MockData";
import StatusDropdown from "../StatusDropdown";
import ApplicationMode from "./ApplicationMode";
import ApprovalMode from "./ApprovalMode";
import RefusalMode from "./RefusalMode";

const valueStyle = "text-[20px] cursor-pointer";
const titleStyle = "mb-4 text-[20px] font-semibold text-[black03]";

// 날짜 변환 함수
const formatDate = (date: Date | undefined | null) => {
  if (!date) return "날짜 없음";
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
};

const StatusModalNav = ({ date }: { date?: Date | null }) => {
  const [value, setValue] = useState<string>("신청");
  const [selectedTime, setSelectedTime] = useState<string>(""); // 시간대 상태

  const schedules: Schedule[] = SchedulemockData;

  // 시간대별 데이터 가공 (Memoization으로 최적화)
  const datas = useMemo(() => {
    return schedules.map((schedule) => ({
      time: `${schedule.startTime.split("T")[1].slice(0, 5)} ~ ${schedule.endTime.split("T")[1].slice(0, 5)}`,
      counts: schedule.count, // 각 시간대별 신청, 승인, 거절 숫자
    }));
  }, [schedules]);

  // 상태별 매핑
  const statusMapping: Record<string, keyof ScheduleCount> = {
    신청: "pending", // '신청' -> 'pending'
    승인: "confirmed", // '승인' -> 'confirmed'
    거절: "declined", // '거절' -> 'declined'
  };

  // 선택된 시간대 데이터 가져오기
  const [selectedSchedule, setSelectedSchedule] = useState<{
    time: string;
    counts: ScheduleCount;
  }>();

  // 각 상태별 숫자 가져오기
  const getStatusCounts = (status: keyof typeof statusMapping) => {
    const mappedStatus = statusMapping[status];
    return selectedSchedule ? selectedSchedule.counts[mappedStatus] : ""; // 매핑된 상태의 값 반환
  };

  // 예약 날짜가 변경될 때 selectedTime 초기화
  useEffect(() => {
    if (datas.length > 0 && !selectedTime) {
      // 날짜가 변경될 때 첫 번째 시간대를 기본값으로 설정
      setSelectedTime(datas[0].time);
    }
  }, [date, datas, selectedTime]); // selectedTime을 의존성 배열에 추가하여 불필요한 업데이트 방지

  // selectedTime이 변경될 때 selectedSchedule을 업데이트
  useEffect(() => {
    if (selectedTime) {
      const newSelectedSchedule = datas.find((data) => data.time === selectedTime);
      if (newSelectedSchedule) {
        setSelectedSchedule(newSelectedSchedule); // 상태 업데이트가 필요한 경우에만 실행
      }
    }
  }, [selectedTime, datas]); // selectedTime이나 datas가 변경될 때마다 실행

  return (
    <div>
      {/* 상태 탭 */}
      <ul className="flex gap-3 border-b border-b-gray03 pb-[10px]">
        {["신청", "승인", "거절"].map((item) => (
          <li
            key={item}
            className={`${valueStyle} ${value === item ? "text font-semibold text-green02" : "text-gray09"}`}
            onClick={() => setValue(item)}
          >
            {item} {selectedSchedule ? getStatusCounts(item as keyof typeof statusMapping) : 0}
          </li>
        ))}
      </ul>

      {/* 예약 날짜 및 시간대 선택 */}
      <div>
        <div className="mb-6 mt-[27px]">
          <h3 className={`${titleStyle}`}>예약 날짜</h3>
          <span className="mb-[2px] text-[20px] text-black03">{formatDate(date)}</span>
          <StatusDropdown
            datas={datas.map((data) => data.time)} // 시간대만 전달
            type="modal"
            onSelect={(selected) => setSelectedTime(selected)} // 시간대 선택 시 상태 업데이트
          />
        </div>

        {/* 예약 내역 */}
        <div className="mt-6">
          <h3 className={`${titleStyle}`}>예약 내역</h3>
          {value === "신청" ? <ApplicationMode /> : value === "승인" ? <ApprovalMode /> : <RefusalMode />}
        </div>
      </div>
    </div>
  );
};

export default StatusModalNav;
