"use client";

import { ListProps } from "@/types/MyPageType";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavigationItem = ({ iconName, text, link }: ListProps) => {
  const pathname = usePathname();
  const isActive = pathname === `/${link}`;
  return (
    <Link href={`/${link}`}>
      <div
        className={`group relative flex min-h-[40px] transform cursor-pointer gap-5 overflow-hidden rounded-xl px-5 py-2 font-bold transition-all duration-300 ease-in-out ${isActive ? "scale-105 text-white" : "hover:scale-102 text-black"}`}
      >
        <div
          className={`absolute inset-0 transition-transform duration-300 ease-in-out ${
            isActive ? "translate-x-0 bg-green02" : "-translate-x-full bg-green01 group-hover:translate-x-0"
          }`}
        />

        <div className="relative z-10 flex gap-5">
          <Image
            src={`/icons/${iconName}.svg`}
            width={24}
            height={24}
            alt={`${text} 아이콘`}
            className={`transition-all duration-200 ${
              isActive ? "brightness-0 contrast-200 invert" : "group-hover:brightness-0"
            }`}
          />
          <span className="hidden md:block">{text}</span>
        </div>
      </div>
    </Link>
  );
};

const NAVIGATION_ITEMS: ListProps[] = [
  { iconName: "mypage", text: "내 정보", link: "my" },
  { iconName: "reservation", text: "예약 정보", link: "my/reservation" },
  { iconName: "myactivity", text: "내 체험 관리", link: "my/activity" },
  { iconName: "reservation-status", text: "예약 현황", link: "my/reservation-status" },
];

const NavigationMenu = () => {
  return (
    <div className="flex justify-between gap-3 bg-white px-10 text-base text-gray07 md:flex-col md:px-0 xl:px-2">
      {NAVIGATION_ITEMS.map((item) => (
        <NavigationItem key={item.link} {...item} />
      ))}
    </div>
  );
};

export default NavigationMenu;
