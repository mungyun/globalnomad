import Image from "next/image";
import React from "react";

export default function Modal({ isModalOpen, setIsModalOpen }) {
  const closeModal = () => setIsModalOpen(false);
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
            onClick={closeModal}
          >
            아니오
          </button>
          <button className="w-[80px] rounded-lg border border-black02 px-3 py-[8px] hover:bg-black02 hover:text-white">
            취소하기
          </button>
        </div>
      </div>
    </div>
  );
}
