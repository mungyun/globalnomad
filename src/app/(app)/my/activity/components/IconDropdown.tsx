"use client";

import { ActivityList } from "@/types/types";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Modal from "../../../../../components/modal/Modal";
import { useToast } from "../../../../../components/toast/ToastProvider";

interface IconDropdownProps {
  activity: ActivityList;
}

const IconDropdown = ({ activity }: IconDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setModalIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { success } = useToast();
  const toggleDropdown = () => setIsOpen((prev) => !prev);
  console.log(activity.id);

  const handleClickOutside = (e: MouseEvent) => {
    if (!dropdownRef.current?.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  const handleEditClick = () => {
    router.push(`/my/activity/${activity.id}`);
    setIsOpen(false);
    success("수정하기 페이지 이동합니다");
  };

  const handleDeleteClick = () => {
    setModalIsOpen(true);
  };

  // const deleteActivity = () => {
  //   const index = activity
  // }

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        aria-label="메뉴 열기"
        className="mr-1 text-4xl text-gray07 md:mr-2 md:text-[40px] xl:mr-3 xl:text-[44px]"
        onClick={toggleDropdown}
      >
        ⋮
      </button>

      {isOpen && (
        <ul className="absolute right-1 z-10 w-28 rounded-md border border-gray03 bg-white text-center text-sm xl:w-36">
          <li onClick={handleEditClick} className={`cursor-pointer truncate py-2 hover:bg-green01 xl:py-3`}>
            수정하기
          </li>
          <li
            onClick={handleDeleteClick}
            className={`cursor-pointer truncate border-t border-gray03 py-2 hover:bg-green01 xl:py-3`}
          >
            삭제하기
          </li>
        </ul>
      )}
      {isModalOpen && (
        <Modal setIsModalOpen={setModalIsOpen} text="해당 체험을 삭제하시겠습니까?" buttonText="삭제하기" />
      )}
    </div>
  );
};

export default IconDropdown;
