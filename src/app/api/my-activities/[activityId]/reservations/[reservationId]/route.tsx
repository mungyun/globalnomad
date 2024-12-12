import axiosInstance from "@/lib/api/axiosInstanceApi";
import { isAxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (req: NextRequest) => {
  try {
    const { activityId, reservationId } =
      req.nextUrl.pathname.match(/\/my-activities\/([^/]+)\/reservations\/([^/]+)/)?.groups || {};

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

    if (response.status >= 200 && response.status < 300) {
      return NextResponse.json(response.data, { status: response.status });
    } else {
      return NextResponse.json({ message: "예약 상태 변경 실패" }, { status: 400 });
    }
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || "서버 오류";
      return NextResponse.json({ message: errorMessage }, { status: error.response?.status || 500 });
    }

    console.error("내부 서버 오류: ", error);
    return NextResponse.json({ message: "서버 오류" }, { status: 500 });
  }
};
