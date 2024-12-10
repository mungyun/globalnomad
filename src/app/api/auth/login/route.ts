import axiosInstance from "@/lib/api/axiosInstanceApi";
import { isAxiosError } from "axios";
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
      const res = NextResponse.json({ message: "로그인 성공" }, { status: 200 });

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
      return NextResponse.json({ message: "조회 실패" }, { status: 400 });
    }
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || "서버 오류";
      return NextResponse.json({ message: errorMessage }, { status: error.response?.status || 500 });
    }

    console.error(error);
    return NextResponse.json({ message: "서버 오류" }, { status: 500 });
  }
};
