"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const linkStyle = "h-[58px] flex items-center justify-center hover:bg-gray02";

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative cursor-pointer"
      onBlur={() => setIsOpen(false)}
      onClick={() => setIsOpen(!isOpen)}
      tabIndex={0}
      aria-expanded={isOpen}
    >
      <Image src="/icons/meatball.svg" alt="드롭다운" width={40} height={40} />
      {isOpen && (
        <div className="absolute right-0 top-12 z-10 w-[160px] rounded-md border border-gray03 bg-white text-[18px] font-medium text-gray09 shadow-md">
          <Link href="" className={`${linkStyle} rounded-t-md border border-b-gray03`}>
            수정하기
          </Link>
          <Link href="" className={`${linkStyle} rounded-b-md`}>
            삭제하기
          </Link>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
