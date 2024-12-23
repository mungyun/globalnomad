import { Message } from "@/utils/toastMessage";
import { isAxiosError } from "axios";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const response = NextResponse.json({ message: Message.logoutSuccess });

    // 쿠키 삭제: accessToken과 refreshToken 제거
    response.cookies.delete("accessToken");
    response.cookies.delete("refreshToken");

    return response;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || Message.error;
      return NextResponse.json({ message: errorMessage }, { status: error.response?.status || 500 });
    }

    return NextResponse.json({ message: Message.error }, { status: 500 });
  }
};
