import axiosInstance from "@/lib/api/axiosInstanceApi";
import { PatchActivityType } from "@/types/ActivityType";
import { isAxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

// 내 체험 삭제
export const DELETE = async (req: NextRequest, { params }: { params: Promise<{ activityId: string }> }) => {
  try {
    const { activityId } = await params;
    const accessToken = req.cookies.get("accessToken")?.value;

    const response = await axiosInstance.delete(`/my-activities/${activityId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return NextResponse.json({ message: "내 체험 삭제 성공했습니다." }, { status: response.status });
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || "서버에서 알 수 없는 오류가 발생했습니다.";
      return NextResponse.json({ message: errorMessage }, { status: error.response?.status || 500 });
    }

    return NextResponse.json({ message: "서버에서 알 수 없는 오류가 발생했습니다." }, { status: 500 });
  }
};

// 내 체험 수정
export const PATCH = async (req: NextRequest, { params }: { params: Promise<{ activityId: string }> }) => {
  const { activityId } = await params;
  const accessToken = req.cookies.get("accessToken")?.value;
  const body: PatchActivityType = await req.json();
  try {
    const response = await axiosInstance.patch(`/my-activities/${activityId}`, body, {
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
