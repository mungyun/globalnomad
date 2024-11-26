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
      <div>
        <h2 className="mb-[27px] text-[24px] font-bold text-black03">예약 정보</h2>
        <button className="absolute right-6 top-6 text-[20px] font-bold text-gray09" onClick={onClose}>
          <Image src="/icons/X.svg" alt="모달 닫기" width={40} height={40} />
        </button>
      </div>
      <StatusModalNav />
      <div>{!date}</div>
    </div>
  );
};

export default StatusModal;
