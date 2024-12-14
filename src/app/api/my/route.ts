import axiosInstance from "@/lib/api/axiosInstanceApi";
import { isAxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

// 내 정보 요청
export const GET = async (req: NextRequest) => {
  const accessToken = req.cookies.get("accessToken")?.value;

  if (!accessToken) {
    return NextResponse.json({ message: "로그인이 필요합니다" }, { status: 401 });
  }

  try {
    const response = await axiosInstance.get("/users/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    if (isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || "서버 오류";
      return NextResponse.json({ message: errorMessage }, { status: error.response?.status || 500 });
    }
    console.error(error);
    return NextResponse.json({ message: "서버 오류" }, { status: 500 });
  }
};

// 내 정보 수정
export const PATCH = async (req: NextRequest) => {
  const accessToken = req.cookies.get("accessToken")?.value;

  if (!accessToken) {
    return NextResponse.json({ message: "로그인이 필요합니다" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const response = await axiosInstance.patch(
      "/users/me",
      {
        nickname: body.nickname,
        // profileImageUrl: "string",
        newPassword: body.newPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (response.status === 200) {
      return NextResponse.json(response.data, { status: 200 });
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

// 프로필 이미지 요청
export const POST = async (req: NextRequest) => {
  const accessToken = req.cookies.get("accessToken")?.value;
  const formData = await req.formData();

  if (!accessToken) {
    return NextResponse.json({ message: "로그인이 필요합니다" }, { status: 401 });
  }

  try {
    const response = await axiosInstance.post("/users/me/image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    if (isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || "서버 오류";
      return NextResponse.json({ message: errorMessage }, { status: error.response?.status || 500 });
    }
    console.error(error);
    return NextResponse.json({ message: "서버 오류" }, { status: 500 });
  }
};
