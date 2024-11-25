"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import mockData from "./MockData";

const Dropdown = () => {
  const { activities } = mockData;
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(activities[0].title);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const closeDropdown = (e: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  const handleSelect = (item: string) => {
    setSelectedItem(item);
    setIsOpen(false);
  };

  useEffect(() => {
    document.addEventListener("click", closeDropdown);
    return () => document.removeEventListener("click", closeDropdown);
  }, []);

  return (
    <div ref={dropdownRef} className="relative w-full rounded-md border border-gray-300">
      <button
        onClick={toggleDropdown}
        className="relative flex h-[56px] w-full items-center justify-between rounded-md bg-white px-4"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className="absolute bottom-10 left-3 h-[24px] w-[45px] bg-white text-[14px]">체험명</div>
        <span className="text-[16px]">{selectedItem}</span>
        <Image src="/icons/dropdown2.svg" width={24} height={24} alt="드롭 다운" />
      </button>
      {isOpen && (
        <div className="absolute left-0 mt-2 w-full rounded-md border border-gray-300 bg-white shadow-lg">
          {activities.map((activity) => (
            <span
              key={activity.id}
              onClick={() => handleSelect(activity.title)}
              className="flex h-[56px] cursor-pointer items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              {activity.title}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
