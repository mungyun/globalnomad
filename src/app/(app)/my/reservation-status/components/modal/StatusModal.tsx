import useDeviceType from "@/hooks/useDeviceType";
import Image from "next/image";
import React, { useEffect } from "react";
import StatusModalNav from "./StatusModalNav";

interface StatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  date: Date | null;
}

const StatusModal = ({ isOpen, onClose, date }: StatusModalProps) => {
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
      <StatusModalNav date={date} />
    </div>
  );
};

export default StatusModal;
