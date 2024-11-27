"use client";

import { useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

interface TimeInputProps {
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
}

const hours = Array.from({ length: 24 }, (_, index) => String(index).padStart(2, "0"));
const minutes = Array.from({ length: 12 }, (_, index) => String(index * 5).padStart(2, "0"));

const TimeInput = ({ label, value, onChange }: TimeInputProps) => {
  const [time, setTime] = useState({ hour: "00", minute: "00" });
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  const handleSelect = (field: keyof typeof time, value: string) => {
    setTime((prevState) => ({
      ...prevState,
      [field]: value,
    }));
    const newTime = `${time.hour}:${time.minute}`;
    onChange?.(newTime);
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="flex flex-col gap-2 text-base font-medium leading-[26px] md:text-xl md:leading-8">
        {label}
        <input
          className="h-11 w-full min-w-20 rounded border border-gray08 px-3 text-sm leading-6 outline-green02 md:h-14 md:px-4 md:text-base md:leading-[26px] xl:max-w-[140px]"
          placeholder="00:00"
          value={value || ""}
          readOnly
          onClick={toggleDropdown}
        />
        <IoIosArrowDown className="absolute bottom-3 right-2 size-5 md:bottom-4 md:right-4 md:size-6" />
      </label>
      {isOpen && (
        <ul className="gap1 absolute top-24 flex h-[250px] w-[140px] gap-2 rounded border border-gray07 bg-white p-1 shadow-custom">
          <div className="h-full w-1/2 overflow-scroll [&::-webkit-scrollbar]:hidden">
            {hours.map((hour) => (
              <li
                className="flex h-7 select-none items-center justify-center rounded hover:bg-green02 hover:text-white"
                key={hour}
                onClick={() => handleSelect("hour", hour)}
              >
                {hour}
              </li>
            ))}
          </div>
          <div className="h-full w-1/2 overflow-scroll [&::-webkit-scrollbar]:hidden">
            {minutes.map((minute) => (
              <li
                className="flex h-7 select-none items-center justify-center rounded hover:bg-green02 hover:text-white"
                key={minute}
                onClick={() => handleSelect("minute", minute)}
              >
                {minute}
              </li>
            ))}
          </div>
        </ul>
      )}
    </div>
  );
};

export default TimeInput;
