"use client";

import { useToast } from "@/components/toast/ToastProvider";
import { Message } from "@/utils/toastMessage";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const SocialLogin = () => {
  const searchParams = useSearchParams();
  const Toast = useToast();

  const redirect_uri = `${process.env.NEXT_PUBLIC_REDIRECT_URL}`;
  const googleAuthURL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${redirect_uri}/sign-in/google&response_type=code&scope=https://www.googleapis.com/auth/userinfo.profile`;
  const kakaoAuthURL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${redirect_uri}/sign-in/kakao&response_type=code`;

  useEffect(() => {
    if (searchParams.get("loginSuccess") === "false") {
      Toast.error(Message.loginError);
      const currentPath = window.location.pathname; // 현재 경로만 가져옵니다.
      window.history.replaceState({}, "", currentPath);
    }
    if (searchParams.get("loginSuccess") === "true") {
      Toast.success(Message.loginSuccess);
    }
  }, [searchParams, Toast]);

  return (
    <div className="relative mt-7 w-full border-t border-gray03 md:mt-10">
      <p className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap bg-gray01 px-[23.5px] text-gray08 md:-top-4 md:px-[37.5px] md:text-xl md:leading-8">
        SNS 계정으로 로그인하기
      </p>
      <div className="mx-auto flex w-fit gap-4 pt-9 md:pt-14">
        {/* 구글 로그인 */}
        <Link href={googleAuthURL} className="inline-flex">
          <div className="relative size-12 rounded-full md:size-[72px]">
            <Image src="/icons/google.svg" alt="구글 간편 로그인" fill />
          </div>
        </Link>
        {/* 카카오톡 로그인 */}
        <Link href={kakaoAuthURL} className="inline-flex">
          <div className="relative size-12 rounded-full md:size-[72px]">
            <Image src="/icons/kakao.svg" alt="카카오톡 간편 로그인" fill />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SocialLogin;
