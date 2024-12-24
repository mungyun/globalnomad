import axiosInstance from "@/lib/api/axiosInstanceApi";
import { isAxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { reservationId, rating, content } = await req.json();
    const accessToken = req.cookies.get("accessToken")?.value;

    // 인증 확인
    if (!accessToken) {
      return NextResponse.json({ message: "인증되지 않은 사용자입니다." }, { status: 401 });
    }

    // 리뷰 생성 요청
    const response = await axiosInstance.post(
      `/my-reservations/${reservationId}/reviews`,
      {
        rating,
        content,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    // 리뷰 생성
    return NextResponse.json(response.data, { status: 201 });
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      // Axios 에러 처리
      const errorMessage = error.response?.data?.message || "서버 오류";
      return NextResponse.json({ message: errorMessage }, { status: error.response?.status || 500 });
    }

    // 기타 에러 처리
    return NextResponse.json({ message: "알 수 없는 오류가 발생했습니다." }, { status: 500 });
  }
};

// 내 예약 취소 요청
export const PATCH = async (req: NextRequest) => {
  const accessToken = req.cookies.get("accessToken")?.value;

  if (!accessToken) {
    return NextResponse.json({ message: "로그인이 필요합니다" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const response = await axiosInstance.patch(`/my-reservations/${body.reservationId}`, body, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return NextResponse.json(response.data, { status: response.status });
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || "서버에서 알 수 없는 오류가 발생했습니다.";
      return NextResponse.json({ message: errorMessage }, { status: error.response?.status || 500 });
    }

    return NextResponse.json({ message: "서버에서 알 수 없는 오류가 발생했습니다." }, { status: 500 });
  }
};
