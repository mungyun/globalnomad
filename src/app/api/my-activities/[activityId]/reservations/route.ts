import axiosInstance from "@/lib/api/axiosInstanceApi";
import { isAxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: { params: Promise<{ activityId: string }> }) => {
  try {
    const { activityId } = await params;
    const size = req.nextUrl.searchParams.get("size");
    const scheduleId = req.nextUrl.searchParams.get("scheduleId");
    const status = req.nextUrl.searchParams.get("status");
    const cursorId = req.nextUrl.searchParams.get("cursorId");

    const accessToken = req.cookies.get("accessToken")?.value;
    let url = `/my-activities/${activityId}/reservations?size=${size}&scheduleId=${scheduleId}&status=${status}`;
    if (cursorId) {
      url += `&cursorId=${cursorId}`;
    }

    const response = await axiosInstance.get(url, {
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
