import useDeviceType from "@/hooks/useDeviceType";
import { Schedule } from "@/types/types";
import { useEffect } from "react";
import ActivityCalendar from "./ActivityCalendar";
import { PartyNumberSelector } from "./SideBar";

const DateModal = ({
  isOpen,
  onClose,
  schedules,
  partyNum,
  setPartyNum,
}: {
  isOpen: boolean;
  onClose: () => void;
  schedules: Schedule[];
  partyNum: number;
  setPartyNum: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const deviceType = useDeviceType();

  // 모바일에서 Date 모달이 띄워지면, 뒷배경 스크롤 기능 차단
  useEffect(() => {
    if (deviceType === "mobile" && isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [deviceType, isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className={`top-0 z-10 overflow-x-auto ${
        deviceType === "mobile"
          ? "fixed left-0 h-full w-full rounded-none"
          : "absolute right-0 h-[599px] w-[480px] rounded-3xl"
      } bg-white px-6 py-8 shadow-md`}
    >
      <button
        className="absolute right-3 top-3 text-[20px] font-bold text-gray09"
        onClick={onClose}
        aria-label="모달 닫기"
      >
        &times;
      </button>
      <h3 className="mb-4 text-[20px] font-bold text-black02">날짜 선택</h3>
      <ActivityCalendar schedules={schedules} />
      {deviceType === "mobile" && (
        <div>
          <h3 className="mb-4 text-[20px] font-bold text-black02">인원 선택</h3>
          <PartyNumberSelector partyNum={partyNum} setPartyNum={setPartyNum} />
        </div>
      )}

      <button
        onClick={onClose}
        className="mt-8 h-[56px] w-full rounded bg-black02 text-[16px] font-bold text-white md:mt-8 xl:mt-6"
      >
        예약하기
      </button>
    </div>
  );
};

export default DateModal;
