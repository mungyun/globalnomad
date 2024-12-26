import axiosInstance from "@/lib/api/axiosInstanceApi";
import { isAxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const url = req.nextUrl;
  const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_URL + `/sign-in/kakao`;
  const code = url.searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(`http://localhost:3000/login?loginSuccess=false`, 302);
  }
  try {
    const response = await axiosInstance.post(`/oauth/sign-in/kakao`, {
      token: code,
      redirectUri,
    });

    const { accessToken, refreshToken } = response.data;

    if (!accessToken || !refreshToken) {
      console.error("백엔드에서 토큰이 누락되었습니다.");
      return NextResponse.redirect(`http://localhost:3000/login?loginSuccess=false`, 302);
    }

    const res = NextResponse.redirect(`${baseUrl}/login?loginSuccess=true`, 302);
    // 쿠키에 token 저장
    res.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 1일 동안 쿠키 유지
      path: "/",
    });
    res.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30일 동안 쿠키 유지
      path: "/",
    });
    return res;
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 403) {
      return NextResponse.redirect(
        `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URL}/sign-up/kakao&response_type=code`
      );
    }
    return NextResponse.redirect(`http://localhost:3000/login?loginSuccess=false`, 302);
  }
};
