"use client";

import authStore from "@/store/authStore";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useRef, useState } from "react";

const HeaderDropdown = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const { clearUser } = authStore();

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (value: string) => {
    setIsOpen(false);
    if (value === "mypage") {
      router.push("/my");
    } else {
      clearUser();
    }
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
    <div ref={dropdownRef} className="relative h-8">
      <button type="button" onClick={toggleDropdown}>
        {children}
      </button>

      {isOpen && (
        <ul className="w-30 absolute right-0 z-10 rounded-[6px] border border-gray03 bg-white text-center">
          <li
            onClick={() => handleSelect("mypage")}
            className={`$ cursor-pointer truncate rounded-t-[6px] border-b border-gray03 px-4 py-2 hover:bg-gray-100`}
          >
            마이 페이지
          </li>
          <li
            onClick={() => handleSelect("logout")}
            className={`cursor-pointer truncate rounded-b-[6px] border-b border-gray03 px-4 py-2 hover:bg-gray-100`}
          >
            로그아웃
          </li>
        </ul>
      )}
    </div>
  );
};

export default HeaderDropdown;
