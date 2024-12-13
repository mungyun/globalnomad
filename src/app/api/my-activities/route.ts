import axiosInstance from "@/lib/api/axiosInstanceApi";
import { isAxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

// 내 체험 가져오기 요청
export const GET = async (req: NextRequest) => {
  try {
    const size = req.nextUrl.searchParams.get("size");
    const cursorId = req.nextUrl.searchParams.get("cursorId");

    let url = `/my-activities?size=${size}`;

    if (cursorId) url += `&cursorId=${cursorId}`;

    const accessToken = req.cookies.get("accessToken")?.value;

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
