import axiosInstance from "@/lib/api/axiosInstanceApi";
import { isAxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const accessToken = req.cookies.get("accessToken")?.value;
  const formdata = await req.formData();

  // 토큰이 없는 경우 에러 처리
  if (!accessToken) {
    return NextResponse.json({ error: "인증되지 않은 사용자" }, { status: 401 });
  }

  try {
    const response = await axiosInstance.post(`/activities/image`, formdata, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return NextResponse.json(response.data, { status: 200 });
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      if (!error.response) {
        return NextResponse.json({ message: "네트워크 오류가 발생했습니다." }, { status: 503 });
      }
      const errorMessage = error.response.data?.message || "서버 오류";
      return NextResponse.json({ message: errorMessage }, { status: error.response?.status || 500 });
    }
    return NextResponse.json({ message: "알 수 없는 오류가 발생했습니다." }, { status: 500 });
  }
};
