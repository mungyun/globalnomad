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
    console.log("url: ", url);

    const response = await axiosInstance.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status >= 200 && response.status < 300) {
      return NextResponse.json(response.data, { status: response.status });
    } else {
      return NextResponse.json({ message: "조회 실패" }, { status: 400 });
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
