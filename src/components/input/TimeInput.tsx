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
  // const [time, setTiem] = useState({ hour: "00", minute: "00" });
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClickOutside = (e: MouseEvent) => {
    e.preventDefault();
    if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  const handleSelect = (hour: string, minute: string) => {
    const time = `${hour}:${minute}`;
    onChange?.(time);
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="flex flex-col gap-2" onClick={toggleDropdown}>
        {label}
        <input
          className="drag-none h-14 max-w-[140px] rounded border border-gray08 px-4 outline-green02"
          placeholder="00:00"
          value={value || ""}
          readOnly
        />
        <IoIosArrowDown className="absolute bottom-4 right-4 size-6" />
      </label>
      {isOpen && (
        <ul className="gap1 absolute top-24 flex h-[250px] w-[140px] gap-2 rounded border border-gray07 bg-white p-1 shadow-custom">
          <div className="h-full w-1/2 overflow-scroll [&::-webkit-scrollbar]:hidden">
            {hours.map((hour) => (
              <li
                className="flex h-7 select-none items-center justify-center rounded hover:bg-green02 hover:text-white"
                key={hour}
                onClick={() => handleSelect(hour, value?.split(":")[1] || "0")}
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
                onClick={() => handleSelect(value?.split(":")[0] || "0", minute)}
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
