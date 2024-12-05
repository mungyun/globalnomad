"use client";

import EmptyActivity from "@/components/EmptyActivity";
import { getMyReservation } from "@/lib/api/MyReservation";
import { Reservation } from "@/types/MyReservationType";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import ReservationDropdown from "./ReservationDropdown";
import ReservationItem from "./ReservationItem";

export default function ReservationList() {
  const FILTER_OPTIONS = ["전체 보기", "예약 신청", "예약 취소", "예약 승인", "예약 거절", "체험 완료"];
  const [filter, setFilter] = useState<string>(FILTER_OPTIONS[0]);

  const filterReservations = (data: Reservation[], filter: string) => {
    switch (filter) {
      case FILTER_OPTIONS[0]:
        return data;
      case FILTER_OPTIONS[1]:
        return data.filter((reservation) => reservation.status === "pending");
      case FILTER_OPTIONS[2]:
        return data.filter((reservation) => reservation.status === "canceled");
      case FILTER_OPTIONS[3]:
        return data.filter((reservation) => reservation.status === "confirmed");
      case FILTER_OPTIONS[4]:
        return data.filter((reservation) => reservation.status === "declined");
      case FILTER_OPTIONS[5]:
        return data.filter((reservation) => reservation.status === "completed");
      default:
        return data;
    }
  };

  const { data: reservations = [], isLoading } = useQuery<Reservation[]>({
    queryKey: ["reservations"],
    queryFn: getMyReservation,
    select: (data) => filterReservations(data, filter),
    retry: 1,
  });
  if (isLoading) return <div>Loading...</div>;

  const handleFilterChange = (value: string) => {
    setFilter(value);
    console.log(filter);
  };

  const hasReservations = reservations.length > 0;

  return (
    <section className="flex w-full max-w-[800px] flex-col bg-gray01">
      <header className="mb-5 flex justify-between">
        <h1 className="text-[32px] font-bold">예약내역</h1>
        <span className="hidden text-center text-3xl xl:block">
          <ReservationDropdown
            label="필터"
            size="xl"
            options={FILTER_OPTIONS}
            value={filter}
            onChange={(value: string) => handleFilterChange(value)}
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
