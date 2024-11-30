import axiosInstance from "@/lib/api/axiosInstanceApi";
import { isAxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { email, nickname, password } = await req.json();

    const response = await axiosInstance.post("/users", {
      email,
      nickname,
      password,
    });

    // 회원가입 성공 후 로그인 페이지로 리다이렉트
    if (response.status >= 200 && response.status < 300) {
      return NextResponse.json({ message: "회원가입 성공" });
    } else {
      return NextResponse.json({ message: "회원가입 실패" }, { status: 400 });
    }
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      // 충돌(중복된 이메일) 상태 처리
      if (error.response?.status === 409) {
        return NextResponse.json({ message: "중복된 이메일입니다." }, { status: 409 });
      }
    }

    // 기타 서버 오류 처리
    console.error(error);
    return NextResponse.json({ message: "서버 오류" }, { status: 500 });
  }
};
