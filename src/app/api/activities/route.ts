import axiosInstance from "@/lib/api/axiosInstanceApi";
import { PostActivityType } from "@/types/ActivityType";
import { isAxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

// 체험 등록
export const POST = async (req: NextRequest) => {
  const accessToken = req.cookies.get("accessToken")?.value;
  const body: PostActivityType = await req.json();

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
    return NextResponse.json(response.data, { status: 200 });
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || "서버에서 알 수 없는 오류가 발생했습니다.";
      return NextResponse.json({ message: errorMessage }, { status: error.response?.status || 500 });
    }

    return NextResponse.json({ message: "서버에서 알 수 없는 오류가 발생했습니다." }, { status: 500 });
  }
};
