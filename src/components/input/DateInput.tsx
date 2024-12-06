import "@/styles/ActivityCalender.css";
import { useEffect, useRef, useState } from "react";
import Calendar from "react-calendar";

interface DateInputProps {
  onChange: (date: string) => void;
  value: string;
}

const DateInput = ({ onChange, value }: DateInputProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
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

  const handleDateClick = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1
    const day = String(date.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    console.log(formattedDate);
    onChange(formattedDate);
    toggleDropdown();
  };

  return (
    <div ref={dropdownRef} className="relative w-full">
      <label className="flex w-full flex-col">
        <span className="mb-2 text-base font-medium leading-[26px] md:text-xl md:leading-8">날짜</span>
        <input
          className="h-11 w-full rounded border border-gray08 px-3 text-sm font-normal leading-[26px] outline-green02 placeholder:text-gray06 md:h-14 md:px-4 md:text-base"
          value={value}
          placeholder="YYYY-MM-DD"
          readOnly
          onClick={toggleDropdown}
        />
      </label>
      {isOpen && (
        <div className="absolute top-20 z-10 h-auto w-[304px] md:top-[100px]">
          <Calendar
            onClickDay={handleDateClick}
            className="rounded-md border border-gray03"
            minDate={tomorrow}
            locale="en-US"
          />
        </div>
      )}
    </div>
  );
};

export default DateInput;
