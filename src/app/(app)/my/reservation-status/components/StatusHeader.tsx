import axiosInstance from "@/lib/api/axiosInstanceApi";
import { cookies } from "next/headers";
import { Suspense } from "react";
import StatusDropdown from "./StatusDropdown";

const StatusHeader = async ({ cursorId = null, size = 10 }: { cursorId?: number | null; size?: number }) => {
  try {
    // 쿠키에서 토큰 가져오기
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    // Authorization 헤더 설정
    const headers = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};

    // 요청 URL 설정
    const url = cursorId ? `/my-reservations?cursorId=${cursorId}&size=${size}` : `/my-reservations?size=${size}`;

    // API 요청 보내기
    const response = await axiosInstance.get(url, { headers });
    // 응답 데이터 처리
    if (!response.data) {
      throw new Error("예약 데이터 조회 오류 발생");
    }

    // 응답 데이터 처리
    const activityData = response.data.reservations.map((reservation: { activity: { id: number; title: string } }) => ({
      id: reservation.activity.id,
      title: reservation.activity.title,
    }));

    return (
      <div className="mb-[30px]">
        <h2 className="mb-6 text-[32px] font-bold md:mb-8">예약현황</h2>
        <Suspense fallback={<div>드롭다운 로딩중</div>}>
          <StatusDropdown datas={activityData} type="header" />
        </Suspense>
      </div>
    );
  } catch (error) {
    console.error(error);

    return (
      <div className="mb-[30px]">
        <h2 className="mb-6 text-[32px] font-bold md:mb-8">예약현황</h2>
        <p className="text-red03">예약 정보를 불러오는 중 오류가 발생했습니다.</p>
      </div>
    );
  }
};

export default StatusHeader;
