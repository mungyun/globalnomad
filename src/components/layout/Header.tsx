"use client";

import authStore from "@/store/authStore";
import Image from "next/image";
import Link from "next/link";
import { IoPersonCircleOutline } from "react-icons/io5";
import HeaderDropdown from "../dropdown/HeaderDropdown";
import Notification from "./Notification";

const Header = () => {
  const { user } = authStore();

  return (
    <div className="h-[70px] w-full border-b border-gray03 p-5">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between text-sm font-medium leading-6 text-black03">
        <Link href="/" className="relative h-[30px] w-[172px]">
          <Image src="/icons/logo_md.svg" fill priority alt="로고 아이콘" />
        </Link>

        {user ? (
          <div className="flex items-center gap-3 md:gap-[25px]">
            <Notification />

            <div className="h-[22px] w-[1px] bg-gray03"></div>

            <HeaderDropdown>
              <div className="flex items-center gap-[10px]">
                <div className="relative size-8 overflow-hidden rounded-full">
                  {user.profileImageUrl ? (
                    <Image
                      src={user.profileImageUrl}
                      alt="유저 프로필 이미지"
                      fill
                      sizes="99vw"
                      style={{ objectFit: "cover" }}
                    />
                  ) : (
                    <IoPersonCircleOutline className="size-full text-gray07" />
                  )}
                </div>
                <span>{user.nickname}</span>
              </div>
            </HeaderDropdown>
          </div>
        ) : (
          <div className="flex gap-6">
            <Link href="/login">로그인</Link>
            <Link href="/signup">회원가입</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
