"use client";

import { useToast } from "@/components/toast/ToastProvider";
import { deleteMyActivities } from "@/lib/api/MyActivities";
import { Message } from "@/utils/toastMessage";
import { isAxiosError } from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const linkStyle = "h-[58px] flex items-center justify-center hover:bg-gray02";

const Dropdown = ({ id }: { id: number }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const Toast = useToast();

  const handleDelete = async (id: number) => {
    try {
      await deleteMyActivities(id);
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        Toast.error(error.response?.data?.message || Message.error);
      }
    }
  };

  return (
    <div
      className="relative cursor-pointer"
      onBlur={() => setIsOpen(false)}
      onClick={() => setIsOpen(!isOpen)}
      tabIndex={0}
      aria-expanded={isOpen}
    >
      <Image src="/icons/meatball.svg" alt="드롭다운" width={40} height={40} />
      {isOpen && (
        <div className="absolute right-0 top-12 z-10 w-[160px] rounded-md border border-gray03 bg-white text-[18px] font-medium text-gray09 shadow-md">
          <div
            onClick={() => {
              router.push(`/my/activity/${id}`);
            }}
            className={`${linkStyle} rounded-t-md border border-b-gray03`}
          >
            수정하기
          </div>
          <div onClick={() => handleDelete(id)} className={`${linkStyle} rounded-b-md`}>
            삭제하기
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
