"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type MenuOption = {
  text: string;
  path: string;
};

const MENU_OPTIONS: MenuOption[] = [
  { text: "수정하기", path: "/updateactivity" },
  { text: "삭제하기", path: "/" },
];

const IconDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleClickOutside = (e: MouseEvent) => {
    if (!dropdownRef.current?.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  const handleMenuClick = (path: string) => {
    router.push(path);
    setIsOpen(false);
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
        className="mr-1 text-4xl text-gray07 md:mr-2 md:text-[40px] xl:mr-3 xl:text-[44px]"
        onClick={toggleDropdown}
      >
        ⋮
      </button>

      {isOpen && (
        <ul className="absolute right-1 z-10 w-28 rounded-md border border-gray03 bg-white text-center text-sm xl:w-36">
          {MENU_OPTIONS.map(({ text, path }, index) => (
            <li
              key={text}
              onClick={() => handleMenuClick(path)}
              className={`cursor-pointer truncate py-2 hover:bg-gray-50 xl:py-3 ${index !== MENU_OPTIONS.length - 1 ? "border-b border-gray03" : ""}`}
            >
              {text}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default IconDropdown;
