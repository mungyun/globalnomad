"use client";

import ReservationModal from "@/app/(app)/my/reservation/components/ReservationModal";
import { Reservation, ReservationStatus, ReservationStatusType } from "@/types/MyReservationType";
import formatPrice from "@/utils/formatPrice";
import Image from "next/image";
import { useState } from "react";

const RESERVATION_STATUS: Record<ReservationStatus, ReservationStatusType> = {
  pending: {
    color: "text-blue02",
    text: "예약 신청",
    buttonColor: "border border-black02",
    buttonText: "예약 취소",
    showButton: true,
  },
  canceled: {
    color: "text-gray08",
    text: "예약 취소",
    showButton: false,
  },
  confirmed: {
    color: "text-orange02",
    text: "예약 승인",
    buttonColor: "border border-black02",
    buttonText: "예약 취소",
    showButton: true,
  },
  declined: {
    color: "text-red03",
    text: "예약 거절",
    showButton: false,
  },
  completed: {
    color: "text-gray08",
    text: "체험 완료",
    buttonColor: "bg-black02 text-white",
    buttonText: "후기 작성",
    showButton: true,
  },
} as const;

const ReservationItem = ({ reservation }: { reservation: Reservation }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const status = RESERVATION_STATUS[reservation.status];

  return (
    <section className="group relative flex rounded-3xl shadow-md">
      <div className="relative aspect-square w-1/3">
        <Image
          src={reservation.activity.bannerImageUrl}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
          alt={`${reservation.activity.title} 배너 이미지`}
          className="rounded-l-3xl object-cover"
        />
      </div>

      <div className="flex min-h-[128px] flex-1 flex-col justify-between rounded-r-3xl p-3 md:p-4 xl:p-5">
        <div className="flex flex-col gap-2">
          <p className={`text-sm font-bold ${status.color} xl:text-base`}>{status.text}</p>
          <h3 className="text-sm font-bold md:text-lg xl:text-xl">{reservation.activity.title}</h3>
          <div className="flex gap-1 whitespace-nowrap text-xs font-normal md:text-sm xl:text-lg">
            <span>{reservation.date}</span>
            <span>·</span>
            <span>{`${reservation.startTime}-${reservation.endTime}`}</span>
            <span>·</span>
            <span>{reservation.headCount}명</span>
          </div>
        </div>

        <div className="flex items-center justify-between font-medium md:text-xl xl:text-2xl">
          <span>₩ {formatPrice(reservation.totalPrice)}</span>
          {status.showButton && (
            <button
              type="button"
              aria-label={status.buttonText}
              className={`${status.buttonColor} absolute right-5 hidden rounded-md px-4 py-2 text-sm font-bold transition-all hover:opacity-90 group-hover:block md:px-6 md:py-3 md:text-base`}
              onClick={() => setIsModalOpen(true)}
            >
              {status.buttonText}
            </button>
          )}
        </div>
      </div>

      {isModalOpen && <ReservationModal setIsModalOpen={setIsModalOpen} reservationId={reservation.id} />}
    </section>
  );
};

export default ReservationItem;
