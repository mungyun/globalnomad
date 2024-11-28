import useDeviceType from "@/hooks/useDeviceType";
import Image from "next/image";
import React from "react";
import { AlertMockData } from "../layout/MockData";
import AlertItem from "./AlertItem";

const AlertModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { totalCount, notifications } = AlertMockData;
  const deviceType = useDeviceType();

  if (!isOpen) return null;

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
      <ul className="flex h-full flex-col gap-2 overflow-auto overflow-y-auto md:h-[260px]">
        {notifications.map((item) => (
          <AlertItem key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
};

export default AlertModal;
