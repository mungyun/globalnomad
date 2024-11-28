"use client";

import Image from "next/image";
import Link from "next/link";
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
  { iconName: "myactivity", text: "내 체험 관리", link: "my/myactivity" },
  { iconName: "calender", text: "예약 현황", link: "my/calender" },
];

const List: React.FC<ListProps> = ({ iconName, text, link }) => (
  <Link href={`/${link}`}>
    <div className="group flex cursor-pointer gap-5 rounded-xl px-5 py-2 font-bold hover:bg-green01 hover:text-black">
      <Image src={`/icons/${iconName}.svg`} width="24" height="24" alt="icon" className="group-hover:brightness-0" />
      {text}
    </div>
  </Link>
);

interface SideNavigationProps {
  img?: string;
  onClick?: () => void;
}

export default function SideNavigation({ img, onClick }: SideNavigationProps) {
  // 유저데이터 바인딩
  const [user] = useState(true);
  return (
    <div className="relative flex h-[432px] w-[344px] flex-col gap-5 overflow-visible rounded-xl border border-gray03 bg-white p-6 md:w-[251px] xl:w-[384px]">
      <div>
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
      <div className="flex flex-col gap-3 bg-white text-base text-gray07">
        {NAVIGATION_ITEMS.map((item) => (
          <List key={item.link} {...item} />
        ))}
      </div>
    </div>
  );
}
