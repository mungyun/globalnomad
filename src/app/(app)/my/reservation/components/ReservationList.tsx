"use client";

import EmptyActivity from "@/components/EmptyActivity";
import { getMyReservation } from "@/lib/api/MyReservation";
import { Reservation } from "@/types/MyReservationType";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import ReservationDropdown from "./ReservationDropdown";
import ReservationItem from "./ReservationItem";

type ReservationStatus = "all" | "pending" | "canceled" | "confirmed" | "declined" | "completed";

interface FilterOption {
  value: ReservationStatus;
  label: string;
}

const FILTER_OPTIONS: FilterOption[] = [
  { value: "all", label: "전체 보기" },
  { value: "pending", label: "예약 신청" },
  { value: "canceled", label: "예약 취소" },
  { value: "confirmed", label: "예약 승인" },
  { value: "declined", label: "예약 거절" },
  { value: "completed", label: "체험 완료" },
];

export default function ReservationList() {
  const [filter, setFilter] = useState<ReservationStatus>("all");

  const { data: reservations = [], isLoading } = useQuery<Reservation[]>({
    queryKey: ["reservations"],
    queryFn: getMyReservation,
    select: (data) => (filter === "all" ? data : data.filter((item) => item.status === filter)),
    retry: 1,
  });

  const handleFilterChange = (selectedLabel: string) => {
    const selectedOption = FILTER_OPTIONS.find((option) => option.label === selectedLabel);
    if (selectedOption) setFilter(selectedOption.value);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <section className="flex w-full max-w-[800px] flex-col bg-gray01">
      <header className="mb-5 flex justify-between">
        <h1 className="text-[32px] font-bold">예약내역</h1>
        <span className="hidden text-center text-3xl xl:block">
          <ReservationDropdown
            label="필터"
            size="xl"
            options={FILTER_OPTIONS.map((option) => option.label)}
            value={FILTER_OPTIONS.find((option) => option.value === filter)?.label || ""}
            onChange={handleFilterChange}
          />
        </span>
      </header>

      <div className="flex flex-col gap-4">
        {reservations.length > 0 ? (
          reservations.map((reservation) => <ReservationItem key={reservation.id} reservation={reservation} />)
        ) : (
          <EmptyActivity />
        )}
      </div>
    </section>
  );
}
