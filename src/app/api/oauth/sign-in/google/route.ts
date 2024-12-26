import axiosInstance from "@/lib/api/axiosInstanceApi";
import { isAxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_URL + `/sign-in/google`;
  const url = req.nextUrl;
  const code = url.searchParams.get("code");

  if (!code || !redirectUri) {
    return NextResponse.json({ error: "필수 필드가 누락되었습니다." }, { status: 400 });
  }

  const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "",
      client_secret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET || "",
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
    }),
  });

  if (!tokenResponse.ok) {
    return NextResponse.json({ error: "토큰을 가져오지 못했습니다." }, { status: 400 });
  }

  const tokenData = await tokenResponse.json();
  const { id_token } = tokenData;

  try {
    const response = await axiosInstance.post(`/oauth/sign-in/google`, {
      token: id_token,
      redirectUri,
    });

    const { accessToken, refreshToken } = response.data;

    if (!accessToken || !refreshToken) {
      return NextResponse.redirect(`${baseUrl}/login`, 302);
    }

    const res = NextResponse.redirect(`${baseUrl}`, 302);

    // 쿠키에 token 저장
    res.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24,
      path: "/",
    });
    res.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });
    return res;
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 403) {
      return NextResponse.redirect(
        `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URL}/sign-up/google&response_type=code&scope=https://www.googleapis.com/auth/userinfo.profile`
      );
    }
    return NextResponse.redirect(`http://localhost:3000/login?loginSuccess=false`, 302);
  }
};
