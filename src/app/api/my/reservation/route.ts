import axiosInstance from "@/lib/api/axiosInstanceApi";
import { isAxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

// 내 예약 요청
export const GET = async (req: NextRequest) => {
  const accessToken = req.cookies.get("accessToken")?.value;

  if (!accessToken) {
    return NextResponse.json({ message: "로그인이 필요합니다" }, { status: 401 });
  }

  try {
    const response = await axiosInstance.get("/my-reservations", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        size: 20,
      },
    });
    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    if (isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || "서버 오류";
      return NextResponse.json({ message: errorMessage }, { status: error.response?.status || 500 });
    }
    console.error(error);
    return NextResponse.json({ message: "서버 오류" }, { status: 500 });
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
    return NextResponse.json(response.data, { status: 200 });
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || "서버 오류";
      return NextResponse.json({ message: errorMessage }, { status: error.response?.status || 500 });
    }
    console.error(error);
    return NextResponse.json({ message: "서버 오류" }, { status: 500 });
  }
};
