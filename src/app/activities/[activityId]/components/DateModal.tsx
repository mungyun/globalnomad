import useDeviceType from "@/hooks/useDeviceType";
import { Schedule } from "@/types/types";
import CalendarComponent from "./Calendar";
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

  if (!isOpen) return null;

  return (
    <div
      className={`fixed top-0 z-10 overflow-x-auto ${
        deviceType === "mobile" ? "left-0 h-full w-full rounded-none" : "right-0 h-[599px] w-[480px] rounded-3xl"
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
      <CalendarComponent schedules={schedules} />
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
