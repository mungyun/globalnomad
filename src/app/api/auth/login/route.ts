import axiosInstance from "@/lib/api/axiosInstanceApi";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { email, password } = await req.json();

    const response = await axiosInstance.post("/auth/login", {
      email,
      password,
    });

    const accessToken = response.data.accessToken;
    const refreshToken = response.data.refreshToken;

    if (accessToken && refreshToken) {
      // accessToken을 쿠키에 저장
      const res = NextResponse.json({ message: "로그인 성공", user: response.data.user }, { status: 200 });

      res.cookies.set("accessToken", accessToken, {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 60 * 60 * 24, // 1일 동안 쿠키 유지
        path: "/",
      });

      // refreshToken을 쿠키에 저장
      res.cookies.set("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 30, // 30일 동안 쿠키 유지
        path: "/",
      });

      return res;
    } else {
      return NextResponse.json({ message: "권한 없음" }, { status: 401 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "서버 오류" }, { status: 500 });
  }
};
