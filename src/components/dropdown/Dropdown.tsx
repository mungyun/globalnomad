"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// 타입 정의
type DropdownSize = "xl" | "large" | "medium" | "small";

// size에 따른 스타일 설정
const sizeStyles: Record<DropdownSize, { width: string; height: string; fontSize: string }> = {
  xl: { width: "160px", height: "53px", fontSize: "18px" },
  large: { width: "127px", height: "53px", fontSize: "18px" },
  medium: { width: "120px", height: "53px", fontSize: "18px" },
  small: { width: "90px", height: "41px", fontSize: "14px" },
};

interface DropdownProps {
  label: string;
  size: DropdownSize;
  options: string[];
}

const Dropdown = ({ label, size, options }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState(label);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (value: string) => {
    setTitle(value);
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

  const { width, height, fontSize } = sizeStyles[size];
  const listFontSize = size === "small" ? "14px" : "18px";

  return (
    <div ref={dropdownRef} className="dropdown relative text-[18px] font-medium" style={{ width }}>
      <button
        type="button"
        className="flex w-full items-center justify-between gap-2 rounded-[15px] border border-green02 bg-white px-4 py-2 shadow-sm hover:bg-gray-50 focus:border-2"
        style={{ height, fontSize }}
        onClick={toggleDropdown}
      >
        <span className="truncate">{title}</span>
        <Image src="/icons/dropdown.svg" alt="드롭다운 버튼" width={22} height={22} />
      </button>

      {isOpen && (
        <ul className="absolute left-0 z-10 mt-2 rounded-[6px] border border-gray03 bg-white" style={{ width }}>
          {options.map((option, index) => (
            <li
              key={index}
              onClick={() => handleSelect(option)}
              className={`cursor-pointer truncate border-b border-gray03 px-4 py-2 hover:bg-gray-100 ${index === options.length - 1 ? "border-b-0" : ""} ${index === 0 ? "hover:rounded-t-[6px]" : ""} ${index === options.length - 1 ? "hover:rounded-b-[6px]" : ""}`}
              style={{ fontSize: listFontSize }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
