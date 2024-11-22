import Image from "next/image";
import Dropdown from "./Dropdown";
import ReservationItem from "./ReservationItem";
import { mockReservations } from "./mockData";

export default function ReservationList() {
  console.log(mockReservations);
  return (
    <div className="flex flex-col gap-3 text-black02 md:gap-4 xl:gap-5">
      <div className="flex justify-between">
        <h1 className="text-[32px] font-bold">예약내역</h1>
        <span className="hidden xl:block">
          <Dropdown
            label="필터"
            size="large"
            options={["예약 신청", "예약 취소", "예약 승인", "예약 거절", "체험 완료"]}
          />
        </span>
      </div>
      {mockReservations !== "" ? (
        mockReservations.reservations.map((reservation) => (
          <ReservationItem key={reservation.id} reservation={reservation} />
        ))
      ) : (
        <span className="mt-9 flex flex-col items-center justify-center md:w-[450px] xl:mt-28 xl:w-[800px]">
          <Image src="/icons/emptyReservation.svg" alt="No Reservations" width={300} height={300} />
          <h2 className="text-2xl text-gray08"> 아직 등록한 체험이 없어요 </h2>
        </span>
      )}
    </div>
  );
}
