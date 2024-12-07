import axiosInstance from "@/lib/api/axiosInstanceApi";
import { isAxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: { params: Promise<{ activityId: string }> }) => {
  try {
    const { activityId } = await params;
    const year = req.nextUrl.searchParams.get("year");
    const month = req.nextUrl.searchParams.get("month");
    console.log("year:", year);
    console.log("month:", month);

    const accessToken = req.cookies.get("accessToken")?.value;

    const response = await axiosInstance.get(
      `/my-activities/${activityId}/reservation-dashboard?year=${year}&month=${month}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

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
