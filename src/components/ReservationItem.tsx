"use client";

import Image from "next/image";
import { useState } from "react";
import Modal from "./Modal";

interface Reservation {
  id: number;
  activity: {
    bannerImageUrl: string;
    title: string;
  };
  date: string;
  startTime: string;
  endTime: string;
  headCount: number;
  totalPrice: number;
  status: string;
}

const ReservationItem: React.FC<{ reservation: Reservation }> = ({ reservation }) => {
  const statusColor: Record<string, string> = {
    pending: "text-blue02",
    cancelled: "text-gray08",
    confirmed: "text-orange02",
    refused: "text-red03",
    completed: "text-gray08",
  };
  const buttonStatusColor: Record<string, string> = {
    pending: "border-black02;",
    cancelled: "border-none cursor-default",
    confirmed: "border-black02;",
    refused: "border-none cursor-default",
    completed: "bg-black02 text-white",
  };

  const statusText: Record<string, string> = {
    pending: "예약 신청",
    cancelled: "예약 취소",
    confirmed: "예약 승인",
    refused: "예약 거절",
    completed: "체험 완료",
  };

  const buttonText: Record<string, string> = {
    pending: "예약취소",
    confirmed: "예약취소",
    completed: "후기 작성",
  };

  const textColor = statusColor[reservation.status];
  const buttonColor = buttonStatusColor[reservation.status];
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <div
      key={reservation.id}
      className="flex max-h-[128px] max-w-[344px] rounded-xl bg-red-50 md:min-h-[156px] md:min-w-[429px] xl:min-h-[204px] xl:min-w-[792px]"
    >
      <Image
        src={reservation.activity.bannerImageUrl}
        width={300}
        height={300}
        alt="Reservation Banner"
        className="w-1/3 min-w-[128px] flex-shrink-0 rounded-l-xl object-cover md:min-w-[156px] xl:max-w-[204px]"
      />
      <div className="group flex w-full max-w-[216px] flex-col justify-between gap-2 p-3 md:max-w-[270px] xl:max-w-[900px] xl:p-6">
        <p className={`text-sm font-bold ${textColor} xl:text-base`}>{statusText[reservation.status] || "오류"}</p>
        <h3 className="overflow-hidden text-ellipsis whitespace-nowrap text-sm font-bold md:text-lg xl:text-xl">
          {reservation.activity.title}
        </h3>
        <div className="text-xs font-normal md:text-sm xl:text-lg">
          <span>{reservation.date} </span>
          <span className="mx-1">·</span>
          <span>
            {reservation.startTime} ~ {reservation.endTime}
          </span>
          <span className="mx-1">·</span>
          <span>{reservation.headCount}명</span>
        </div>
        <div className="relative flex justify-between font-medium md:text-xl xl:text-2xl">
          ₩ {reservation.totalPrice.toLocaleString()}
          {buttonText[reservation.status] && (
            <button
              className={`absolute right-0 hidden rounded-md border border-black01 px-3 py-1 text-sm font-bold group-hover:block md:-bottom-1 md:px-5 md:py-2 xl:px-9 xl:py-[10px] xl:text-base ${buttonColor}`}
              onClick={() => setIsModalOpen(true)}
            >
              {buttonText[reservation.status]}
            </button>
          )}
        </div>
      </div>
      {isModalOpen && <Modal setIsModalOpen={setIsModalOpen} />}
    </div>
  );
};

export default ReservationItem;
