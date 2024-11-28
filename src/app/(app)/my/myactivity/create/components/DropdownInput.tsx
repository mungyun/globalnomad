"use client";

import { PostActivities } from "@/types/ActiviteyType";
import { useEffect, useRef, useState } from "react";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { GoCheck } from "react-icons/go";
import { IoIosArrowDown } from "react-icons/io";
import LabelInput from "../../../../../../components/input/LabelInput";

interface DropdownInputProps {
  register: UseFormRegister<PostActivities>;
  setValue: UseFormSetValue<PostActivities>;
}

const CATEGORY = [
  { value: "교육 · 학습" },
  { value: "문화 · 예술" },
  { value: "스포츠" },
  { value: "식음료" },
  { value: "투어 · 관광" },
  { value: "게임 · 취미" },
];

const DropdownInput = ({ register, setValue }: DropdownInputProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => {
    console.log("test");
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (value: string) => {
    setValue("category", value);
    setIsOpen(false);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      <label>
        <LabelInput placeholder="카테고리" {...register("category")} readOnly onClick={toggleDropdown} />
        <IoIosArrowDown className="absolute right-4 top-4 size-6" />
      </label>
      {isOpen && (
        <ul className="absolute top-16 flex w-full flex-col gap-[2px] rounded bg-white p-2 shadow-custom">
          {CATEGORY.map((item) => (
            <li
              className="flex h-10 items-center rounded-md px-2 text-base leading-[26px] hover:bg-green02 hover:text-white"
              key={item.value}
              onClick={() => handleSelect(item.value)}
            >
              <GoCheck className="mr-2 size-5 text-white" />
              {item.value}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropdownInput;
