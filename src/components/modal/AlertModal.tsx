"use client";

import useDeviceType from "@/hooks/useDeviceType";
import { getMyNotifications } from "@/lib/api/MyNotifications";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React, { useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import AlertItem from "./AlertItem";

const AlertModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const {
    data: alertData,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["myNotifications", { size: 10, cursorId: undefined }], // queryKey에 매개변수 포함
    queryFn: getMyNotifications, // queryFn에 함수 전달
    staleTime: 1000 * 60, // 1분 동안 데이터 캐싱
    enabled: isOpen,
  });

  const deviceType = useDeviceType();

  useEffect(() => {
    if (deviceType === "mobile" && isOpen) {
      document.body.style.overflow = "hidden"; // 모바일에서 모달이 열리면 스크롤을 막음
    }
    return () => {
      document.body.style.overflow = ""; // 모달이 닫히면 스크롤을 복원
    };
  }, [deviceType, isOpen]);

  if (!isOpen) return null;

  if (isLoading) {
    return (
      <div className="z-[9999] flex flex-col items-center justify-center gap-2 bg-green01 px-5 py-6 shadow-md">
        <Skeleton height={126} width={328} />
        <Skeleton height={126} width={328} />
      </div>
    );
  }

  if (isError || !alertData) {
    return (
      <div className="z-[9999] bg-green01 px-5 py-6 shadow-md">
        <p>알림 데이터를 불러오는 데 실패했습니다.</p>
      </div>
    );
  }

  const { totalCount, notifications } = alertData;

  return (
    <div
      className={`z-[9999] bg-green01 px-5 py-6 shadow-md ${
        deviceType === "mobile"
          ? "fixed left-0 top-0 h-screen w-screen"
          : "absolute top-[57px] h-[356px] rounded-[10px] md:right-0 md:w-[368px]"
      }`}
    >
      <div className="mb-4 flex justify-between">
        <h2 className="text-[20px] font-bold text-black03">알림 {totalCount}개</h2>
        <Image className="cursor-pointer" onClick={onClose} src="/icons/X.svg" alt="모달 닫기" width={24} height={24} />
      </div>
      <ul className="flex h-full flex-col gap-2 overflow-y-auto md:h-[260px]">
        {notifications.map((item) => (
          <AlertItem key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
};

export default AlertModal;
