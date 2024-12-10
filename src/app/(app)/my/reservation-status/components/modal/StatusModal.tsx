"use client";

import useDeviceType from "@/hooks/useDeviceType";
import { getMyReservedSchedule } from "@/lib/api/MyActivities";
import useReservationStore from "@/store/useReservationStore";
import { Schedule, ScheduleCount } from "@/types/MyActivitiesType";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import Skeleton from "react-loading-skeleton";
import StatusModalDropdown from "../StatusModalDropdown";
import ReservationList from "./ReservationList";

const valueStyle = "text-[20px] cursor-pointer";
const titleStyle = "mb-4 text-[20px] font-semibold text-[black03]";

// 날짜 변환 함수
const formatDate = (date: Date | undefined | null) =>
  date ? `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일` : "날짜 없음";

interface StatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  date: Date | null;
}

interface selectedDataProps {
  time: string;
  id: number;
}

const StatusModal = ({ isOpen, onClose, date }: StatusModalProps) => {
  const deviceType = useDeviceType();
  const [value, setValue] = useState<string>("신청");
  const [selectedData, setSelectedData] = useState<selectedDataProps | null>(null);
  const [scheduleData, setScheduleData] = useState<Schedule[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { activityId } = useReservationStore();
  const setSchduleId = useReservationStore((state) => state.setScheduleId);

  // 모달 스크롤 방지
  useEffect(() => {
    if (deviceType === "mobile" && isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [deviceType, isOpen]);

  // 스케줄 데이터 로드
  useEffect(() => {
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

  // 기본 선택 데이터 설정
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

  if (!isOpen) return null;

  return (
    <div
      className={`z-[9999] overflow-y-auto bg-white px-6 py-8 shadow-md ${
        deviceType === "mobile"
          ? "fixed left-0 top-0 h-screen w-screen"
          : "absolute right-0 top-[60px] h-[697px] w-[429px] rounded-3xl"
      }`}
    >
      <div>
        <h2 className="mb-[27px] text-[24px] font-bold text-black03">예약 정보</h2>
        <button className="absolute right-6 top-6 text-[20px] font-bold text-gray09" onClick={onClose}>
          <Image src="/icons/X.svg" alt="모달 닫기" width={40} height={40} />
        </button>
      </div>

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

export default StatusModal;
