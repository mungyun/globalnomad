"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { ActivityListMockData } from "./MockData";

const Dropdown = () => {
  const { activities } = ActivityListMockData;
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
        <div
          className="z-1 absolute left-0 mt-2 w-full rounded-md border border-gray03 shadow-lg"
          style={{ zIndex: 50 }}
        >
          {activities.map((activity, index) => {
            const isFirst = index === 0;
            const isLast = index === activities.length - 1;
            return (
              <span
                key={activity.id}
                onClick={() => handleSelect(activity.title)}
                className={`relative flex h-[56px] cursor-pointer items-center bg-white px-4 text-gray08 hover:bg-gray01 ${
                  isFirst ? "rounded-t-md" : ""
                } ${isLast ? "rounded-b-md" : ""}`}
              >
                {activity.title}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
