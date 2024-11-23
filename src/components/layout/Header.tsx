import Image from "next/image";
import Link from "next/link";

/* eslint-disable @next/next/no-img-element */
const Header = () => {
  const user = true;
  const isLoggedIn = !!user;
  // const options = ["마이 페이지", "로그아웃"];

  return (
    <div className="h-[70px] w-full border-b border-gray03 p-5">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between text-sm font-medium leading-6 text-black03">
        <Link href="/">
          <img src="/icons/logo_md.svg" alt="로고 아이콘" />
        </Link>

        {isLoggedIn ? (
          <div className="flex items-center gap-3 md:gap-[25px]">
            <div className="relative size-5">
              <Image src="/icons/Icon_notification.svg" alt="알림 아이콘" fill />
            </div>

            <div className="h-[22px] w-[1px] bg-gray03"></div>

            <div className="flex items-center gap-[10px]">
              <div className="relative size-8 rounded-full">
                <Image src="/images/userProfileImg.png" alt="유저 프로필 이미지" fill />
              </div>
              <span>정만철</span>
            </div>
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
