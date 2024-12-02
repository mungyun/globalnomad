"use client";

import useDeviceType from "@/hooks/useDeviceType";
import { getActivityDetail } from "@/lib/api/Activities";
import { Schedule } from "@/types/types";
import formatPrice from "@/utils/formatPrice";
import { useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import Image from "next/image";
import React, { useState } from "react";
import DateModal from "./DateModal";

// 동적 import로 Calendar 컴포넌트 불러오기
const ActivityCalendar = dynamic(() => import("./ActivityCalendar"), { ssr: false });

const titleStyle = "font-bold text-black02";

interface PartyNumberSelectorProps {
  partyNum: number;
  setPartyNum: React.Dispatch<React.SetStateAction<number>>;
}

export const PartyNumberSelector: React.FC<PartyNumberSelectorProps> = ({ partyNum, setPartyNum }) => (
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

const DateSelector = ({
  deviceType,
  schedules,
  onOpenModal,
}: {
  deviceType: string;
  schedules: Schedule[];
  onOpenModal: () => void;
}) => {
  if (deviceType === "desktop") {
    return <ActivityCalendar schedules={schedules} />;
  } else if (deviceType === "tablet" || deviceType === "mobile") {
    return (
      <button className="mb-[27px] text-[16px] font-semibold" onClick={onOpenModal} aria-label="날짜 선택하기 버튼">
        날짜 선택하기
      </button>
    );
  }
};

const SideBar = ({ id }: { id: number }) => {
  const deviceType = useDeviceType();
  const [partyNum, setPartyNum] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const {
    data: activityDetailData,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["activityDetailData", id],
    queryFn: () => getActivityDetail(id),
    enabled: !!id,
    staleTime: 60 * 5 * 1000,
  });

  if (isPending) {
    return <div>로딩 중...</div>;
  }

  if (isError) {
    return <div>활동을 가져오는 데 실패했습니다.</div>;
  }

  const { price, schedules } = activityDetailData;
  console.log(schedules);

  return deviceType !== "mobile" ? (
    <div className="relative top-20 rounded-xl border border-gray02 p-6 shadow-md transition-all md:sticky md:h-[423px] md:w-[251px] md:min-w-[251px] xl:h-full xl:w-[384px]">
      {/* 가격 정보 */}
      <h3 className="mb-4 text-gray09 md:text-[16px] xl:text-[20px]">
        <span className="font-bold text-black03 md:text-[24px] xl:text-[32px]">￦ {formatPrice(price)}</span> / 인
      </h3>
      {/* 날짜 선택 */}
      <div className="mx-auto w-full border-t border-t-gray03 xl:w-[336px]">
        <label htmlFor="calendar" className={`block text-[20px] md:pb-[5px] md:pt-[13px] xl:py-4 ${titleStyle}`}>
          날짜
        </label>
        <DateSelector deviceType={deviceType} schedules={schedules} onOpenModal={() => setIsModalOpen(true)} />
      </div>
      {/* 날짜 선택 모달 */}
      <DateModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        schedules={schedules}
        partyNum={partyNum}
        setPartyNum={setPartyNum}
      />
      {/* 참여 인원 선택 및 합계 계산 */}
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
  ) : (
    <div className="z-1 fixed bottom-0 left-0 flex h-[83px] w-full items-center justify-between border-t border-t-gray07 bg-white p-4">
      <div className="flex flex-col gap-2">
        <h4 className="text-[18px] font-medium">
          <span className="text-[20px] font-bold text-black02">￦ {formatPrice(price)} / </span> 1명
        </h4>
        <button
          className="w-[77px] text-[14px] font-semibold text-green02 underline"
          onClick={() => setIsModalOpen(true)}
        >
          날짜 선택하기
        </button>
      </div>
      <button className="flex h-[48px] w-[106px] items-center justify-center rounded-md bg-gray06 text-white">
        예약하기
      </button>
      <DateModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        schedules={schedules}
        partyNum={partyNum}
        setPartyNum={setPartyNum}
      />
    </div>
  );
};

export default SideBar;
