import useDeviceType from "@/hooks/useDeviceType";
import React, { useEffect } from "react";

interface StatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  date: Date | null;
}

const StatusModal = ({ isOpen, onClose, date }: StatusModalProps) => {
  const deviceType = useDeviceType();

  useEffect(() => {
    if (deviceType === "mobile" && isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [deviceType, isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className={`top-[60px] z-10 overflow-x-auto ${
        deviceType === "mobile"
          ? "fixed left-0 h-full w-full rounded-none"
          : "absolute right-0 h-[697px] w-[429px] rounded-3xl"
      } bg-white px-6 py-8 shadow-md`}
    >
      <button
        className="absolute right-3 top-3 text-[20px] font-bold text-gray09"
        onClick={onClose}
        aria-label="모달 닫기"
      >
        &times;
      </button>
      <div>{date ? date.toDateString() : "선택된 날짜 없음"}</div>
    </div>
  );
};

export default StatusModal;
