import { cancelMyReservation } from "@/lib/api/MyReservation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { toast } from "react-toastify";

interface ModalProps {
  setIsModalOpen: (isOpen: boolean) => void;
  reservationId: number;
}

const ReservationModal = ({ setIsModalOpen, reservationId }: ModalProps): JSX.Element => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const handleCloseModal = () => setIsModalOpen(false);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => cancelMyReservation(reservationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reservations"] });
      toast.success("예약 취소 완료");
      handleCloseModal();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleReservationCancel = async () => {
    await mutation.mutate();
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (!dropdownRef.current?.contains(e.target as Node)) {
      handleCloseModal();
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-50">
      <div className="z-10 flex h-[184px] w-[298px] flex-col items-center justify-between rounded-xl bg-white p-6">
        <div className="flex flex-col items-center gap-4">
          <Image src="/icons/check.svg" width={24} height={24} alt="체크표시" />
          <p> 예약을 취소하시겠어요? </p>
        </div>
        <div className="flex gap-3 text-sm">
          <button
            className="w-[80px] rounded-lg border border-black02 px-3 py-[10px] hover:bg-black02 hover:text-white"
            onClick={handleReservationCancel}
          >
            취소하기
          </button>
          <button
            className="w-[80px] rounded-lg border border-black02 px-3 py-[8px] hover:bg-black02 hover:text-white"
            onClick={handleCloseModal}
          >
            아니오
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReservationModal;
