import axiosInstance from "@/lib/api/axiosInstanceApi";
import { isAxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (
  req: NextRequest,
  { params }: { params: Promise<{ activityId: string; reservationId: string }> }
) => {
  try {
    const { activityId, reservationId } = await params;

    if (!activityId || !reservationId) {
      return NextResponse.json({ message: "활동 ID와 예약 ID가 필요합니다." }, { status: 400 });
    }

    const { status } = await req.json();

    if (!status) {
      return NextResponse.json({ message: "status 값이 필요합니다." }, { status: 400 });
    }

    const accessToken = req.cookies.get("accessToken")?.value;

    if (!accessToken) {
      return NextResponse.json({ message: "인증 토큰이 없습니다." }, { status: 401 });
    }

    const response = await axiosInstance.patch(
      `/my-activities/${activityId}/reservations/${reservationId}`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return NextResponse.json(response.data, { status: response.status });
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || "서버에서 알 수 없는 오류가 발생했습니다.";
      return NextResponse.json({ message: errorMessage }, { status: error.response?.status || 500 });
    }

    return NextResponse.json({ message: "서버에서 알 수 없는 오류가 발생했습니다." }, { status: 500 });
  }
};
