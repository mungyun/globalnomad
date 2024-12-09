"use client";

import { getMyReservedSchedule } from "@/lib/api/MyActivities";
import useReservationStore from "@/store/my/useReservationStore";
import { Schedule, ScheduleCount } from "@/types/MyActivitiesType";
import React, { useEffect, useMemo, useState } from "react";
import Skeleton from "react-loading-skeleton";
import StatusModalDropdown from "../StatusModalDropdown";
import ReservationList from "./ReservationList";

const valueStyle = "text-[20px] cursor-pointer";
const titleStyle = "mb-4 text-[20px] font-semibold text-[black03]";

// 날짜 변환 함수
const formatDate = (date: Date | undefined | null) =>
  date ? `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일` : "날짜 없음";

interface selectedDataProps {
  time: string;
  id: number;
}

const StatusModalNav = ({ date }: { date: Date }) => {
  const [value, setValue] = useState<string>("신청");
  const [selectedData, setSelectedData] = useState<selectedDataProps | null>(null);
  const [scheduleData, setScheduleData] = useState<Schedule[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { activityId } = useReservationStore();
  const setSchduleId = useReservationStore((state) => state.setScheduleId);

  useEffect(() => {
    // 모달이 열릴 때만 데이터 로드
    const fetchSchedules = async () => {
      if (!date || !activityId) return;
      setIsLoading(true);

      try {
        const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
          date.getDate()
        ).padStart(2, "0")}`;
        const response = await getMyReservedSchedule({ activityId, date: formattedDate });
        setScheduleData(response || []);
      } catch (err) {
        console.error(err);
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
      scheduleId: schedule.scheduleId,
    }));
  }, [scheduleData]);

  // 상태별 매핑
  const statusMapping: Record<string, keyof ScheduleCount> = {
    신청: "pending",
    승인: "confirmed",
    거절: "declined",
  };

  useEffect(() => {
    if (datas.length > 0 && !selectedData) {
      setSelectedData({ id: datas[0].scheduleId, time: datas[0].time });
      setSchduleId(datas[0].scheduleId);
    }
  }, [datas]);

  // 상태별 숫자 가져오기
  const getStatusCounts = (status: keyof typeof statusMapping) => {
    if (!selectedData || datas.length === 0) return 0;
    const mappedStatus = statusMapping[status];
    const selectedSchedule = datas.find((data) => data.time === selectedData.time);
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
            <Skeleton height={56} />
          ) : datas.length === 0 ? (
            <div className="mt-2 text-gray09">예약 데이터가 없습니다.</div>
          ) : (
            <StatusModalDropdown
              datas={datas.map((data) => ({ id: data.scheduleId, time: data.time }))}
              onSelect={(selected) => {
                setSelectedData(selected);
                setSchduleId(selected.id);
              }}
            />
          )}
        </div>

        {/* 예약 내역 */}
        <div className="mt-6">
          <h3 className={titleStyle}>예약 내역</h3>
          {value === "신청" ? (
            <ReservationList status="pending" />
          ) : value === "승인" ? (
            <ReservationList status="confirmed" />
          ) : (
            <ReservationList status="declined" />
          )}
        </div>
      </div>
    </div>
  );
};

export default StatusModalNav;
