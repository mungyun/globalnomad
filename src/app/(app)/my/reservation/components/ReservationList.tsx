"use client";

import EmptyActivity from "@/components/EmptyActivity";
import Dropdown from "@/components/dropdown/Dropdown";
import { useEffect, useState } from "react";
import ReservationItem from "./ReservationItem";
import { mockReservations } from "./mockData";

// Activity 데이터 인터페이스
interface Activity {
  id: number;
  title: string;
  bannerImageUrl: string;
  createdAt: string;
}

// Reservation 데이터 인터페이스
interface Reservation {
  id: number;
  activity: Activity;
  scheduleId: number;
  teamId: string;
  date: string;
  startTime: string;
  endTime: string;
  status: string; // 예: "confirmed"
  headCount: number;
  totalPrice: number;
  reviewSubmitted: boolean;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

// Reservations 리스트 인터페이스
interface ReservationsResponse {
  reservations: Reservation[];
}

export default function ReservationList() {
  const hasReservations = mockReservations && mockReservations.reservations.length > 0;
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    (async () => {
      const response = await fetch("https://sp-globalnomad-api.vercel.app/9-1/my-reservations?size=10");
      const data: ReservationsResponse = await response.json();
      console.log(data);
      setReservations(data.reservations);
    })();
  }, []);

  return (
    <section className="flex w-full max-w-[800px] flex-col bg-gray01">
      <header className="mb-5 flex justify-between">
        <h1 className="text-[32px] font-bold">예약내역</h1>
        <span className="hidden xl:block">
          <Dropdown
            label="필터"
            size="xl"
            options={["전체 보기", "예약 신청", "예약 취소", "예약 승인", "예약 거절", "체험 완료"]}
          />
        </span>
      </header>
      <div className="flex flex-col gap-4">
        {hasReservations ? (
          reservations.map((reservation) => <ReservationItem key={reservation.id} reservation={reservation} />)
        ) : (
          <EmptyActivity />
        )}
      </div>
    </section>
  );
}
