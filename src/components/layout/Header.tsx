import { User } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { IoPersonCircleOutline } from "react-icons/io5";
import HeaderDropdown from "../dropdown/HeaderDropdown";

const Header = () => {
  const user: User = {
    id: 1279,
    email: "sprint91@codeit.kr",
    nickname: "나나문",
    profileImageUrl:
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/profile_image/9-1_1279_1732338379593.jpeg",
    createdAt: "2024-11-18T19:46:59.369Z",
    updatedAt: "2024-11-23T14:19:30.749Z",
  };
  const isLoggedIn = !!user;

  return (
    <div className="h-[70px] w-full border-b border-gray03 p-5">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between text-sm font-medium leading-6 text-black03">
        <Link href="/" className="relative h-[30px] w-[172px]" as="image">
          <Image src="/icons/logo_md.svg" fill priority alt="로고 아이콘" />
        </Link>

        {isLoggedIn ? (
          <div className="flex items-center gap-3 md:gap-[25px]">
            <div className="relative size-5">
              <Image src="/icons/Icon_notification.svg" alt="알림 아이콘" fill />
            </div>

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
