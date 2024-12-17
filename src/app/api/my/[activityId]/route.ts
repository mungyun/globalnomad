import axiosInstance from "@/lib/api/axiosInstanceApi";
import { isAxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (req: NextRequest, { params }: { params: Promise<{ activityId: string }> }) => {
  try {
    const { activityId } = await params;

    const accessToken = req.cookies.get("accessToken")?.value;

    const response = await axiosInstance.delete(`/my-activities/${activityId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return NextResponse.json({ message: "예약 성공했습니다." }, { status: response.status });
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || "서버에서 알 수 없는 오류가 발생했습니다.";
      return NextResponse.json({ message: errorMessage }, { status: error.response?.status || 500 });
    }

    return NextResponse.json({ message: "서버에서 알 수 없는 오류가 발생했습니다." }, { status: 500 });
  }
};
