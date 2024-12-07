"use client";

import { getMyReservedSchedule } from "@/lib/api/MyActivities";
import useReservationStore from "@/store/my/useReservationStore";
import { Schedule, ScheduleCount } from "@/types/MyActivitiesType";
import React, { useEffect, useMemo, useState } from "react";
import StatusDropdown from "../StatusDropdown";
import ReservationList from "./ReservationList";

const valueStyle = "text-[20px] cursor-pointer";
const titleStyle = "mb-4 text-[20px] font-semibold text-[black03]";

// 날짜 변환 함수
const formatDate = (date: Date | undefined | null) =>
  date ? `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일` : "날짜 없음";

const StatusModalNav = ({ date }: { date: Date }) => {
  const [value, setValue] = useState<string>("신청");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [scheduleData, setScheduleData] = useState<Schedule[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { activityId } = useReservationStore();

  useEffect(() => {
    // 모달이 열릴 때만 데이터 로드
    const fetchSchedules = async () => {
      if (!date || !activityId) return;
      setIsLoading(true);
      setError(null);
      try {
        const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
          date.getDate()
        ).padStart(2, "0")}`;
        const response = await getMyReservedSchedule({ activityId, date: formattedDate });
        setScheduleData(response || []);
      } catch (err) {
        console.error(err);
        setError("예약 데이터를 불러오는 데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSchedules();
  }, [activityId, date]);

  // datas 계산
  const datas = useMemo(() => {
    return scheduleData.map((schedule) => ({
      time: `${schedule.startTime || "시간 없음"} ~ ${schedule.endTime || "시간 없음"}`,
      counts: schedule.count,
    }));
  }, [scheduleData]);

  // 상태별 매핑
  const statusMapping: Record<string, keyof ScheduleCount> = {
    신청: "pending",
    승인: "confirmed",
    거절: "declined",
  };

  // 상태별 숫자 가져오기
  const getStatusCounts = (status: keyof typeof statusMapping) => {
    const mappedStatus = statusMapping[status];
    const selectedSchedule = datas.find((data) => data.time === selectedTime);
    return selectedSchedule ? selectedSchedule.counts[mappedStatus] : 0;
  };

  return (
    <div>
      {/* 상태 탭 */}
      <ul className="flex gap-3 border-b border-b-gray03 pb-[10px]">
        {Object.keys(statusMapping).map((item) => (
          <li
            key={item}
            className={`${valueStyle} ${value === item ? "font-semibold text-green02" : "text-gray09"}`}
            onClick={() => setValue(item)}
          >
            {item} {getStatusCounts(item as keyof typeof statusMapping)}
          </li>
        ))}
      </ul>

      {/* 예약 날짜 및 시간대 선택 */}
      <div>
        <div className="mb-6 mt-[27px]">
          <h3 className={titleStyle}>예약 날짜</h3>
          <span className="mb-[2px] text-[20px] text-black03">{formatDate(date)}</span>

          {isLoading ? (
            <div className="mt-2 text-gray09">로딩 중...</div>
          ) : error ? (
            <div className="mt-2 text-red-500">{error}</div>
          ) : datas.length === 0 ? (
            <div className="mt-2 text-gray09">예약 데이터가 없습니다.</div>
          ) : (
            <StatusDropdown
              datas={datas.map((data, index) => ({ id: index, title: data.time }))}
              type="modal"
              onSelect={(selected) => setSelectedTime(selected.title)}
            />
          )}
        </div>

        {/* 예약 내역 */}
        <div className="mt-6">
          <h3 className={titleStyle}>예약 내역</h3>
          {value === "신청" ? (
            <ReservationList type="application" />
          ) : value === "승인" ? (
            <ReservationList type="approval" />
          ) : (
            <ReservationList type="refusal" />
          )}
        </div>
      </div>
    </div>
  );
};

export default StatusModalNav;
