"use client";

import useDeviceType from "@/hooks/useDeviceType";
import formatPrice from "@/utils/formatPrice";
import dynamic from "next/dynamic";
import Image from "next/image";
import React, { useState } from "react";
import DateModal from "./DateModal";
import { mockData } from "./mockdata";

const CalendarComponent = dynamic(() => import("./Calendar"), { ssr: false });

const titleStyle = "font-bold text-black02";

interface PartyNumberSelectorProps {
  partyNum: number;
  setPartyNum: React.Dispatch<React.SetStateAction<number>>;
}

const PartyNumberSelector: React.FC<PartyNumberSelectorProps> = ({ partyNum, setPartyNum }) => (
  <div className="flex h-[40px] w-[120px] items-center justify-between rounded-md border border-gray03 px-[13px]">
    <button onClick={() => setPartyNum((prev) => Math.max(prev - 1, 0))} aria-label="참여 인원 수 줄이기">
      <Image src="/icons/subtract.svg" alt="빼기" width={20} height={20} />
    </button>
    <span className="text-[14px] text-gray09">{partyNum}</span>
    <button onClick={() => setPartyNum((prev) => prev + 1)} aria-label="참여 인원 수 늘리기">
      <Image src="/icons/add.svg" alt="더하기" width={20} height={20} />
    </button>
  </div>
);

const SideBar = () => {
  const { price, schedules } = mockData;
  const [partyNum, setPartyNum] = useState<number>(0);
  const deviceType = useDeviceType();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <div className="top-20 rounded-xl border border-gray02 p-6 shadow-md transition-all md:sticky md:h-[423px] md:w-[251px] xl:h-full xl:w-[384px]">
      <h3 className="mb-4 text-gray09 md:text-[16px] xl:text-[20px]">
        <span className="font-bold text-black03 md:text-[24px] xl:text-[32px]">￦ {formatPrice(price)}</span> / 인
      </h3>

      <div className="mx-auto w-full border-t border-t-gray03 xl:w-[336px]">
        <label htmlFor="calendar" className={`text-[20px] md:pb-[5px] md:pt-[13px] xl:py-4 ${titleStyle} block`}>
          날짜
        </label>
        {deviceType === "desktop" ? (
          <CalendarComponent schedules={schedules} />
        ) : (
          <button
            className="mb-[27px] text-[16px] font-semibold"
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            날짜 선택하기
          </button>
        )}
      </div>

      <DateModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
      >
        <h3 className="mb-4 text-[20px] font-bold text-black02">날짜 선택</h3>
        <CalendarComponent schedules={schedules} />
      </DateModal>

      <div className="md:mb-4 xl:mt-4">
        <div className="border-b border-b-gray03 pb-6 md:mb-4 xl:mb-6 xl:mt-4">
          <h4 className={`mb-2 text-[18px] ${titleStyle}`}>참여 인원 수</h4>
          <PartyNumberSelector partyNum={partyNum} setPartyNum={setPartyNum} />
          <button className="h-[56px] w-full rounded bg-black02 text-[16px] font-bold text-white md:mt-8 xl:mt-6">
            예약하기
          </button>
        </div>
        <div className="flex items-center justify-between">
          <span className={`text-[20px] ${titleStyle}`}>총 합계</span>
          <span className={`text-[20px] ${titleStyle}`}>￦ {formatPrice(partyNum * price)}</span>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
