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

    return NextResponse.json(response.data, { status: response.status });
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || "서버에서 알 수 없는 오류가 발생했습니다.";
      return NextResponse.json({ message: errorMessage }, { status: error.response?.status || 500 });
    }

    return NextResponse.json({ message: "서버에서 알 수 없는 오류가 발생했습니다." }, { status: 500 });
  }
};
