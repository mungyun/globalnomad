import axiosInstance from "@/lib/api/axiosInstanceApi";
import { isAxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const size = req.nextUrl.searchParams.get("size") || "10";
    const cursorId = req.nextUrl.searchParams.get("cursorId");

    const accessToken = req.cookies.get("accessToken")?.value;

    let url = `/my-notifications?size=${size}`;
    if (cursorId) url += `&cursorId=${cursorId}`;

    const response = await axiosInstance.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return NextResponse.json(response.data, { status: response.status });
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || "서버 오류";
      return NextResponse.json({ message: errorMessage }, { status: error.response?.status || 500 });
    }
    return NextResponse.json({ message: "알 수 없는 서버 오류" }, { status: 500 });
  }
};
