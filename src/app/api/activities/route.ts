import axiosInstance from "@/lib/api/axiosInstanceApi";
import { PostActivities } from "@/types/ActiviteyType";
import { isAxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const accessToken = req.cookies.get("accessToken")?.value;
  const body: PostActivities = await req.json();

  const updateBody = {
    ...body,
    price: Number(body.price),
  };

  if (!accessToken) {
    return NextResponse.json({ error: "인증되지 않은 사용자" }, { status: 401 });
  }

  try {
    const response = await axiosInstance.post(`/activities`, updateBody, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (response.status >= 200 && response.status < 300) {
      return NextResponse.json(response.data, { status: response.status });
    } else {
      return NextResponse.json({ message: "체험 등록 실패" }, { status: 400 });
    }
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || "서버 오류";
      return NextResponse.json({ message: errorMessage }, { status: error.response?.status || 500 });
    }

    // 기타 서버 오류 처리
    console.error(error);
    return NextResponse.json({ message: "서버 오류" }, { status: 500 });
  }
};
