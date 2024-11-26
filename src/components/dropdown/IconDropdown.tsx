"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function IconDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const handleDropdownClick = () => setIsOpen((prev) => !prev);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  const handleClickOutside = (e: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  const handleClickRoute = (e: React.MouseEvent<HTMLLIElement>) => {
    const target = e.target as HTMLElement;
    if (target.innerText === "수정하기") {
      router.push("/updateactivity");
    } else {
      router.push("/");
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="mr-1 text-4xl text-gray07 md:mr-2 md:text-[40px] xl:mr-3 xl:text-[44px]"
        onClick={handleDropdownClick}
      >
        ⋮
      </button>
      {isOpen && (
        <ul className="absolute right-1 z-10 w-28 rounded-md border border-gray03 bg-white text-center text-sm xl:w-36">
          <li className="truncate border-b border-gray03 py-2 xl:py-3" onClick={handleClickRoute}>
            수정하기
          </li>
          <li className="truncate px-6 py-2 xl:py-3" onClick={handleClickRoute}>
            삭제하기
          </li>
        </ul>
      )}
    </div>
  );
}
