import { useToast } from "@/components/toast/ToastProvider";
import { deleteMyActivities } from "@/lib/api/MyActivities";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import React, { useEffect, useRef } from "react";

interface ModalProps {
  setIsModalOpen: (isOpen: boolean) => void;
  activityId: number;
}

export default function ActivityModal({ setIsModalOpen, activityId }: ModalProps): JSX.Element {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const closeModal = () => setIsModalOpen(false);
  const { success, error } = useToast();

  const queryClient = useQueryClient();
  const { mutate: deleteActivity } = useMutation({
    mutationFn: () => deleteMyActivities(activityId),
    onSuccess: () => {
      success("체험 삭제완료");
      closeModal();
      queryClient.invalidateQueries({ queryKey: ["myActivities"] });
    },
    onError: (err) => {
      error(err.message);
      closeModal();
    },
  });

  const handleClickOutside = (e: MouseEvent) => {
    if (!dropdownRef.current?.contains(e.target as Node)) {
      closeModal();
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
          <p> 해당 체험을 삭제하시겠습니까? </p>
        </div>
        <div className="flex gap-3 text-sm">
          <button
            className="w-[80px] rounded-lg border border-black02 px-3 py-[10px] hover:bg-black02 hover:text-white"
            onClick={() => deleteActivity()}
          >
            삭제하기
          </button>
          <button
            className="w-[80px] rounded-lg border border-black02 px-3 py-[8px] hover:bg-black02 hover:text-white"
            onClick={closeModal}
          >
            아니오
          </button>
        </div>
      </div>
    </div>
  );
}
