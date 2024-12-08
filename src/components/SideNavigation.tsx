"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { IoPersonCircleOutline } from "react-icons/io5";

interface ListProps {
  iconName: string;
  text: string;
  link: string;
}

const NAVIGATION_ITEMS: ListProps[] = [
  { iconName: "mypage", text: "내 정보", link: "my" },
  { iconName: "reservation", text: "예약 정보", link: "my/reservation" },
  { iconName: "myactivity", text: "내 체험 관리", link: "my/activity" },
  { iconName: "reservation-status", text: "예약 현황", link: "my/reservation-status" },
];

const NavigationItem = ({ iconName, text, link }: ListProps) => {
  const pathname = usePathname();
  const isActive = pathname === `/${link}`;
  return (
    <Link href={`/${link}`}>
      <div
        className={`group flex min-h-[40px] cursor-pointer gap-5 rounded-xl px-5 py-2 font-bold ${isActive ? "bg-green02 text-white" : "hover:bg-green01 hover:text-black"} `}
      >
        <Image
          src={`/icons/${iconName}.svg`}
          width="24"
          height="24"
          alt={`${text} 아이콘`}
          className={`transition-all duration-200 ${
            isActive ? "brightness-0 contrast-200 invert" : "group-hover:brightness-0"
          }`}
        />
        <span className="hidden md:block">{text}</span>
      </div>
    </Link>
  );
};

interface SideNavigationProps {
  img?: string;
  onClick?: () => void;
}

export default function SideNavigation({ img, onClick }: SideNavigationProps) {
  // 유저데이터 바인딩
  const [user] = useState(true);
  return (
    <div className="fixed bottom-0 z-10 flex w-screen flex-col gap-5 overflow-visible rounded-xl border border-gray03 bg-white py-3 shadow-md md:sticky md:top-10 md:h-[432px] md:w-[251px] md:min-w-[251px] md:p-6 xl:w-[384px]">
      <div className="hidden md:block">
        <div className="relative m-auto flex h-[160px] w-[160px] items-center justify-center overflow-hidden rounded-full bg-gray03">
          {user && img ? (
            <Image src={img} layout="fill" objectFit="cover" alt="프로필이미지" />
          ) : (
            <IoPersonCircleOutline className="h-full w-full scale-[1.3] text-gray07" />
          )}
        </div>
        <button
          type="button"
          onClick={onClick}
          className="md absolute left-[195px] top-[145px] h-[44px] w-[44px] cursor-pointer md:left-[150px] xl:left-[215px]"
          aria-label="수정 버튼"
        >
          <Image src="/icons/edit.svg" alt="이미지 수정" fill />
        </button>
      </div>
      <div className="flex justify-between gap-3 bg-white px-10 text-base text-gray07 md:flex-col md:px-0 xl:px-2">
        {NAVIGATION_ITEMS.map((item) => (
          <NavigationItem key={item.link} {...item} />
        ))}
      </div>
    </div>
  );
}
