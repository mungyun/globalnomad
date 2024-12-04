"use client";

import EmptyActivity from "@/components/EmptyActivity";
import Dropdown from "@/components/dropdown/Dropdown";
import { getMyReservation } from "@/lib/api/MyReservation";
import { Reservation } from "@/types/MyReservationType";
import { useQuery } from "@tanstack/react-query";
import ReservationItem from "./ReservationItem";

export default function ReservationList() {
  const { data: reservations = [], isLoading } = useQuery<Reservation[]>({
    queryKey: ["reservations"],
    queryFn: getMyReservation,
    retry: 1,
  });
  if (isLoading) return <div>Loading...</div>;

  const hasReservations = reservations.length > 0;

  return (
    <section className="flex w-full max-w-[800px] flex-col bg-gray01">
      <header className="mb-5 flex justify-between">
        <h1 className="text-[32px] font-bold">예약내역</h1>
        <span className="hidden text-center text-3xl xl:block">
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
