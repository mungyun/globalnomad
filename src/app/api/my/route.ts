import axiosInstance from "@/lib/api/axiosInstanceApi";
import { isAxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (req: NextRequest) => {
  try {
    const { activityId } = await req.json();
    const accessToken = req.cookies.get("accessToken")?.value;

    const response = await axiosInstance.delete(
      `/my-activities/${activityId}`,

      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (response.status >= 200 && response.status < 300) {
      return NextResponse.json({ message: "예약 성공" });
    } else {
      return NextResponse.json({ message: "예약 실패" }, { status: 400 });
    }
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      // 409 상태 코드일 때 중복된 이메일 메시지 반환

      const errorMessage = error.response?.data?.message || "서버 오류";
      return NextResponse.json({ message: errorMessage }, { status: error.response?.status || 500 });
    }

    // 기타 서버 오류 처리
    console.error(error);
    return NextResponse.json({ message: "서버 오류" }, { status: 500 });
  }
};
