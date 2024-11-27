import { Schedule } from "@/types/MyActivitiesType";
import React, { useState } from "react";
import { SchedulemockData } from "../MockData";
import StatusDropdown from "../StatusDropdown";
import ApplicationMode from "./ApplicationMode";
import ApprovalMode from "./ApprovalMode";
import RefusalMode from "./RefusalMode";

const valueStyle = "text-[20px] cursor-pointer";
const titleStyle = "mb-4 text-[20px] font-semibold text-[black03]";

// 날짜 변환 함수
const formatDate = (dateString?: string): string => {
  if (!dateString) return ""; // date가 없으면 빈 문자열 반환
  const date = new Date(dateString);
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
};

const StatusModalNav = ({ date }: { date?: string }) => {
  const [value, setValue] = useState<string>("신청");
  const schedules: Schedule[] = SchedulemockData;

  // Schedule 데이터를 title 배열로 변환
  const datas = schedules.map(
    (schedule) => `${schedule.startTime.split("T")[1].slice(0, 5)} ~ ${schedule.endTime.split("T")[1].slice(0, 5)}`
  );

  return (
    <div>
      <ul className="flex gap-3 border-b border-b-gray03 pb-[10px]">
        {["신청", "승인", "거절"].map((item) => (
          <li
            key={item}
            className={`${valueStyle} ${value === item ? "text font-semibold text-green02" : "text-gray09"}`}
            onClick={() => setValue(item)}
          >
            {item}
          </li>
        ))}
      </ul>

      <div>
        <div className="mb-6 mt-[27px]">
          <h3 className={`${titleStyle}`}>예약 날짜</h3>
          <span className="mb-[2px] text-[20px] text-black03">{formatDate(date)}</span>
          <StatusDropdown datas={datas} type="modal" />
        </div>
        <div>
          <h3 className={`${titleStyle}`}>예약 내역</h3>
          {value === "신청" ? <ApplicationMode /> : value === "승인" ? <ApprovalMode /> : <RefusalMode />}
        </div>
      </div>
    </div>
  );
};

export default StatusModalNav;
