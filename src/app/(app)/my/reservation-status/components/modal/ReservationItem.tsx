import { UpdateMyReservationByTime } from "@/lib/api/MyActivities";
import useReservationStore from "@/store/my/useReservationStore";
import { Reservation } from "@/types/MyActivitiesType";
import React from "react";

const buttonStyle = "flex h-[38px] w-[82px] items-center justify-center rounded-md text-[14px] font-bold";
const reservationStyle = "flex h-[44px] w-[82px] items-center justify-center rounded-[26.5px] text-[14px] font-bold";

const ReservationItem = ({ item, type }: { item: Reservation; type: string }) => {
  const { nickname, headCount, id } = item;
  const { activityId } = useReservationStore();

  const handleUpdate = () => {
    UpdateMyReservationByTime({ activityId, reservationId: id, status: "confirmed" });
  };

  const handleDelete = () => {
    UpdateMyReservationByTime({ activityId, reservationId: id, status: "declined" });
  };

  return (
    <div className="mb-[14px] h-full w-full rounded-[4px] border border-gray03 px-4 py-3 text-[16px] font-medium text-black03">
      <p className="mb-[6px]">
        <span className="font-semibold text-gray08">닉네임</span> {nickname}
      </p>
      <p>
        <span className="font-semibold text-gray08">인원</span> {headCount}명
      </p>
      <div className="flex justify-end gap-[6px]">
        {type === "application" ? (
          <>
            <button onClick={handleUpdate} className={`${buttonStyle} bg-black02 text-white`}>
              승인하기
            </button>
            <button onClick={handleDelete} className={`${buttonStyle} border border-black02 text-black02`}>
              거절하기
            </button>
          </>
        ) : type === "approval" ? (
          <div className={`${reservationStyle} bg-orange01 text-orange02`}>예약승인</div>
        ) : (
          <div className={`${reservationStyle} bg-red01 text-red03`}>예약거절</div>
        )}
      </div>
    </div>
  );
};

export default ReservationItem;
