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
  console.log("Request URL:", url);

  // API 요청 보내기
  const response = await axiosInstance.get(url, { headers });
  console.log(response.data);

  // 응답 데이터 처리
  const activityTitles = response.data.reservations.map(
    (reservation: { activity: { title: string } }) => reservation.activity.title
  );

  console.log("activityTitles:", activityTitles);
  return (
    <div className="mb-[30px]">
      <h2 className="mb-6 text-[32px] font-bold md:mb-8">예약현황</h2>
      <StatusDropdown datas={activityTitles} type="header" />
    </div>
  );
};

export default StatusHeader;
