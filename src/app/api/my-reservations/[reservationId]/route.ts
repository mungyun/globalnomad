import axiosInstance from "@/lib/api/axiosInstanceApi";
import { isAxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { reservationId, rating, content } = await req.json();

    const accessToken = req.cookies.get("accessToken")?.value;

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

    if (response.status >= 200 && response.status < 300) {
      return NextResponse.json({ message: "리뷰 작성 성공" });
    } else {
      return NextResponse.json({ message: "리뷰 작성 실패" }, { status: 400 });
    }
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      const status = error.response?.status;
      if (status === 400) {
        return NextResponse.json({ message: "후기는 문자열로 입력해주세요." }, { status });
      }

      if (status === 401) {
        return NextResponse.json({ message: "Unauthorized" }, { status });
      }

      if (status === 403) {
        return NextResponse.json({ message: "본인의 예약만 리뷰를 작성할 수 있습니다." }, { status });
      }

      if (status === 404) {
        return NextResponse.json({ message: "존재하지 않는 예약입니다." }, { status });
      }

      if (status === 409) {
        return NextResponse.json({ message: "이미 리뷰를 작성했습니다." }, { status });
      }

      const errorMessage = error.response?.data?.message || "서버 오류";
      return NextResponse.json({ message: errorMessage }, { status: error.response?.status || 500 });
    }

    // 기타 서버 오류 처리
    return NextResponse.json({ message: "서버 오류" }, { status: 500 });
  }
};
