"use client";

import { useToast } from "@/components/toast/ToastProvider";
import { getMyActivities } from "@/lib/api/MyActivities";
import useReservationStore from "@/store/useReservationStore";
import { isAxiosError } from "axios";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

interface Activity {
  id: number;
  title: string;
}

const StatusHeaderDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Activity | null>(null);
  const [datas, setDatas] = useState<Activity[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const setActivityId = useReservationStore((state) => state.setActivityId);
  const Toast = useToast();

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await getMyActivities({});
        const activityData = response.map((item: Activity) => ({
          id: item.id,
          title: item.title,
        }));
        setDatas(activityData);

        if (activityData.length > 0) {
          const firstItem = activityData[0];
          setSelectedItem(firstItem);
          setActivityId(firstItem.id);
        }
      } catch (error) {
        if (isAxiosError(error)) {
          Toast.error(error?.message);
        }
      }
    };

    fetchActivities();
  }, [setActivityId]);

  // 드롭다운 외부 클릭 시 닫기
  const closeDropdown = (e: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", closeDropdown);
    return () => document.removeEventListener("click", closeDropdown);
  }, []);

  // 드롭다운 토글
  const toggleDropdown = () => setIsOpen((prev) => !prev);

  // 항목 선택 시 처리
  const handleSelect = (item: Activity) => {
    setSelectedItem(item); // 선택된 항목 설정
    setActivityId(item.id); // 전역 상태 업데이트
    setIsOpen(false); // 드롭다운 닫기
  };

  return (
    <div ref={dropdownRef} className="relative w-full rounded-md border border-gray-300">
      <button
        onClick={toggleDropdown}
        className="relative flex h-[56px] w-full items-center justify-between rounded-[4px] border border-gray08 bg-white px-4"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className="absolute bottom-10 left-3 h-[24px] w-[45px] bg-white text-[14px]">체험명</div>
        <span className="text-[16px]">{selectedItem?.title || "선택된 항목 없음"}</span>
        <Image src="/icons/dropdown2.svg" width={24} height={24} alt="드롭 다운" />
      </button>

      {isOpen && (
        <div
          className="absolute left-0 mt-2 w-full rounded-md border border-gray03 bg-white shadow-lg"
          style={{ zIndex: 50 }}
        >
          {datas.map((data, index) => {
            const isFirst = index === 0;
            const isLast = index === datas.length - 1;
            return (
              <span
                key={data.id}
                onClick={() => handleSelect(data)}
                className={`relative flex h-[56px] cursor-pointer items-center bg-white px-4 text-[16px] text-gray08 hover:bg-gray01 ${
                  isFirst ? "rounded-t-md" : ""
                } ${isLast ? "rounded-b-md" : ""}`}
              >
                {data.title}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default StatusHeaderDropdown;
