import axiosInstance from "@/lib/api/axiosInstanceApi";
import { isAxiosError } from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const GET = async ({ cursorId = null, size = 20 }: { cursorId?: number | null; size?: number }) => {
  try {
    // `cookies`를 사용하여 쿠키 값 가져오기
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    // Authorization 헤더 설정
    const headers = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};

    // API 요청 보내기
    const response = await axiosInstance.get(`/my-activities?cursorId=${cursorId}&size=${size}`, { headers });

    if (response.status >= 200 && response.status < 300) {
      return NextResponse.json({
        message: "데이터 조회 성공",
        data: response.data,
      });
    } else {
      return NextResponse.json({ message: "데이터 조회 실패" }, { status: 400 });
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
