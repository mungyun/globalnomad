import axiosInstance from "@/lib/api/axiosInstanceApi";
import { cookies } from "next/headers";
import StatusDropdown from "./StatusDropdown";

const StatusHeader = async ({ cursorId = null, size = 10 }: { cursorId?: number | null; size?: number }) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  // Authorization 헤더 설정
  const headers = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};

  // 요청 URL 설정
  const url = cursorId ? `/my-reservations?cursorId=${cursorId}&size=${size}` : `/my-reservations?size=${size}`;
  // API 요청 보내기
  const response = await axiosInstance.get(url, { headers });

  // 응답 데이터 처리
  const activityData = response.data.reservations.map((reservation: { activity: { id: number; title: string } }) => ({
    id: reservation.activity.id,
    title: reservation.activity.title,
  }));

  return (
    <div className="mb-[30px]">
      <h2 className="mb-6 text-[32px] font-bold md:mb-8">예약현황</h2>
      <StatusDropdown datas={activityData} type="header" />
    </div>
  );
};

export default StatusHeader;
