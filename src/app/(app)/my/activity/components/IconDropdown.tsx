"use client";

import { ActivityList } from "@/types/types";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ActivityModal from "./ActivityModal";

interface IconDropdownProps {
  activity: ActivityList;
}

const IconDropdown = ({ activity }: IconDropdownProps) => {
  const router = useRouter();
  const toggleDropdown = () => setIsOpen((prev) => !prev);
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setModalIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleEditClick = () => {
    router.push(`/my/activity/${activity.id}`);
  };

  const handleDeleteClick = () => {
    setModalIsOpen(true);
  };
  const handleClickOutside = (e: MouseEvent) => {
    if (!dropdownRef.current?.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        aria-label="메뉴 열기"
        className="pl-5 pr-3 pt-4 text-4xl text-gray07 md:pl-8 md:text-[40px] xl:text-[44px]"
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
      {isModalOpen && <ActivityModal setIsModalOpen={setModalIsOpen} activityId={activity.id} />}
    </div>
  );
};

export default IconDropdown;
