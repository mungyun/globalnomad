import axiosInstance from "@/lib/api/axiosInstanceApi";
import { isAxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { activityId, scheduleId, headCount } = await req.json();

    const accessToken = req.cookies.get("accessToken")?.value;

    const response = await axiosInstance.post(
      `/activities/${activityId}/reservations`,
      {
        scheduleId,
        headCount,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return NextResponse.json({ message: "예약에 성공했습니다." }, { status: response.status });
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || "서버에서 알 수 없는 오류가 발생했습니다.";
      return NextResponse.json({ message: errorMessage }, { status: error.response?.status || 500 });
    }

    return NextResponse.json({ message: "서버에서 알 수 없는 오류가 발생했습니다." }, { status: 500 });
  }
};
