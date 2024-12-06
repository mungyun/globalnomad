// 내 체험 삭제
import { cookies } from "next/headers";
import axiosInstance, { proxy } from "./axiosInstanceApi";

export const deleteMyReservation = async (activityId: number) => {
  try {
    const response = await proxy.delete(`/api/my/${activityId}`);
    return response.data;
  } catch (error) {
    console.error("내 체험 삭제 오류: ", error);
  }
};

// 내 체험 월별 예약 현황 조회

export const getReservationDashboard = async ({
  activityId,
  year,
  month,
}: {
  activityId: number;
  year: string;
  month: string;
}) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const headers = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
  try {
    const response = await axiosInstance.get(
      `/my-activities/${activityId}/reservation-dashboard?year=${year}&month=${month}`,
      { headers }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
