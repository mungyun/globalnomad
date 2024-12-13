import axiosInstance from "@/lib/api/axiosInstanceApi";
import { isAxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (req: NextRequest, { params }: { params: Promise<{ notificationId: string }> }) => {
  try {
    const { notificationId } = await params;
    const accessToken = req.cookies.get("accessToken")?.value;

    await axiosInstance.delete(`/my-notifications/${notificationId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return NextResponse.json({ message: "알림이 삭제되었습니다." }, { status: 200 });
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || "서버 오류";
      return NextResponse.json({ message: errorMessage }, { status: error.response?.status || 500 });
    }

    return NextResponse.json({ message: "서버 오류" }, { status: 500 });
  }
};
