import { useToast } from "@/components/toast/ToastProvider";
import { UpdateMyReservationByTime } from "@/lib/api/MyActivities";
import useReservationStore from "@/store/useReservationStore";
import { Reservation } from "@/types/MyActivitiesType";
import { QueryClient, useMutation } from "@tanstack/react-query";
import React from "react";

const buttonStyle = "flex h-[38px] w-[82px] items-center justify-center rounded-md text-[14px] font-bold";
const reservationStyle = "flex h-[44px] w-[82px] items-center justify-center rounded-[26.5px] text-[14px] font-bold";

const ReservationItem = ({ item, status }: { item: Reservation; status: string }) => {
  const { nickname, headCount, id } = item;
  const { activityId, setStatusModalOpen } = useReservationStore();
  const Toast = useToast();

  const queryClient = new QueryClient();

  const mutation = useMutation({
    mutationFn: ({ reservationId, status }: { reservationId: number; status: string }) =>
      UpdateMyReservationByTime({ activityId, reservationId, status }),

    onSuccess: (variables) => {
      const { status } = variables;
      if (status === "confirmed") {
        Toast.success("예약을 승인했습니다!");
      } else if (status === "declined") {
        Toast.success("예약을 거절했습니다!");
      }
      queryClient.invalidateQueries({ queryKey: ["ReservationDataByMonth"] });
      setStatusModalOpen(false);
    },

    onError: (error) => {
      Toast.error("예약 상태를 변경하는 중 오류가 발생했습니다.");
      console.error("Mutation Error:", error);
    },
  });

  const handleUpdate = () => {
    mutation.mutate({ reservationId: id, status: "confirmed" });
  };

  const handleDelete = () => {
    mutation.mutate({ reservationId: id, status: "declined" });
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
        {status === "pending" ? (
          <>
            <button onClick={handleUpdate} className={`${buttonStyle} bg-black02 text-white`}>
              승인하기
            </button>
            <button onClick={handleDelete} className={`${buttonStyle} border border-black02 text-black02`}>
              거절하기
            </button>
          </>
        ) : (
          <div
            className={`${reservationStyle} ${
              status === "confirmed" ? "bg-orange01 text-orange02" : "bg-red01 text-red03"
            }`}
          >
            {status === "confirmed" ? "예약승인" : "예약거절"}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReservationItem;
