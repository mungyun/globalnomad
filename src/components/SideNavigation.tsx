"use client";

import useUploadProfileImage from "@/hooks/useUploadProfileImage";
import { PostProfileImage } from "@/lib/api/MyPage";
// import useUploadImage from "@/hooks/useUploadImage";
import useAuthStore from "@/store/useAuthStore";
import { useMutation } from "@tanstack/react-query";
// import useUserImageStore from "@/store/useUserImageStore";
// import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
// import { ReactEventHandler, useEffect, useState } from "react";
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

// 페이지 이동
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

export default function SideNavigation() {
  const pathname = usePathname();

  // 유저 이미지 전역관리
  // const { userImage, uploadUserImage } = useUserImageStore();
  const { user, setUser } = useAuthStore();

  // const mutation = useUploadProfileImage();

  // const handleChangeUserImg1 = async (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   console.log(file);
  //   if (!file) return;

  //   try {
  //     const imageUrl = await mutation.mutateAsync(file);
  //     console.log("받은 이미지 URL:", imageUrl);

  //     if (!user) return;
  //     if (!imageUrl) {
  //       console.error("이미지 URL이 없습니다");
  //       return;
  //     }

  //     setUser({
  //       ...user,
  //       profileImageUrl: imageUrl,
  //       updatedAt: new Date().toISOString(),
  //     });
  //   } catch (error) {
  //     console.error("프로필 이미지 업데이트 실패:", error);
  //   }
  // };

  const mutation = useMutation({
    mutationFn: (file: File) => PostProfileImage(file),
  });

  const handleChangeUserImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const img = await mutation.mutateAsync(file);
    console.log(img);
  };

  return (
    <div className="fixed bottom-0 z-10 flex w-screen flex-col gap-5 overflow-visible rounded-xl border border-gray03 bg-white py-3 shadow-md md:sticky md:top-10 md:h-[432px] md:w-[251px] md:min-w-[251px] md:p-6 xl:w-[384px]">
      <div className="hidden md:block">
        <div className="relative m-auto flex h-[160px] w-[160px] items-center justify-center overflow-hidden rounded-full bg-gray03">
          {user !== null ? (
            <Image src={user.profileImageUrl || ""} layout="fill" objectFit="cover" alt="프로필이미지" />
          ) : (
            <IoPersonCircleOutline className="h-full w-full scale-[1.3] text-gray07" />
          )}
        </div>

        {/* {pathname === "/my" ? <EditButton onChange={handleChangeUserImg} /> : null} */}
        {pathname === "/my" ? (
          <label className="md absolute left-[195px] top-[145px] h-[44px] w-[44px] cursor-pointer md:left-[150px] xl:left-[215px]">
            <input type="file" className="hidden" onChange={handleChangeUserImg} />
            <Image src="/icons/edit.svg" alt="이미지 수정" fill />
          </label>
        ) : null}
      </div>
      <div className="flex justify-between gap-3 bg-white px-10 text-base text-gray07 md:flex-col md:px-0 xl:px-2">
        {NAVIGATION_ITEMS.map((item) => (
          <NavigationItem key={item.link} {...item} />
        ))}
        {/* <input type="file" /> */}
      </div>
    </div>
  );
}
