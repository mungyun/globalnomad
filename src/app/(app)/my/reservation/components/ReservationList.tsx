"use client";

import EmptyActivity from "@/components/EmptyActivity";
import useInfinityItems from "@/hooks/useInfinityItems";
import { getMyReservation } from "@/lib/api/MyReservation";
import ReservationSkeleton from "@/skeleton/reservation/ReservationSkeleton";
import { Reservation } from "@/types/MyReservationType";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { SyncLoader } from "react-spinners";
import ReservationDropdown from "./ReservationDropdown";
import ReservationItem from "./ReservationItem";

interface FilterOption {
  value: string;
  label: string;
}

const FILTER_OPTIONS: FilterOption[] = [
  { value: "", label: "전체 보기" },
  { value: "pending", label: "예약 신청" },
  { value: "canceled", label: "예약 취소" },
  { value: "confirmed", label: "예약 승인" },
  { value: "declined", label: "예약 거절" },
  { value: "completed", label: "체험 완료" },
];

export default function ReservationList() {
  const [filter, setFilter] = useState("");
  const { ref, inView } = useInView();

  const { data, fetchNextPage, hasNextPage, isFetching, isLoading } = useInfinityItems(
    "reservation",
    getMyReservation,
    filter
  );
  console.log(data);

  useEffect(() => {
    if (inView && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [inView]);

  const handleFilterChange = (selectedLabel: string) => {
    const selectedOption = FILTER_OPTIONS.find((option) => option.label === selectedLabel);
    console.log(selectedLabel);
    if (selectedOption) setFilter(selectedOption.value);
  };

  if (isLoading) return <ReservationSkeleton />;

  return (
    <section className="flex min-h-screen w-full max-w-[800px] flex-col bg-gray01">
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
        {data?.pages.map((page, i) =>
          page.totalCount === 0 ? (
            <EmptyActivity key={i} />
          ) : (
            page.reservations.map((reservation: Reservation) => (
              <ReservationItem key={reservation.id} reservation={reservation} />
            ))
          )
        )}
      </div>
      {hasNextPage ? (
        <div ref={ref} className="mt-10 flex justify-center">
          <SyncLoader size={10} color="#112211" />
        </div>
      ) : null}
    </section>
  );
}
