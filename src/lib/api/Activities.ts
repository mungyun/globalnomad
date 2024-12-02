// 체험 상세 조회
import axiosInstance, { proxy } from "./axiosInstanceApi";

export const getActivityDetail = async (id: number) => {
  try {
    const response = await axiosInstance.get(`/activities/${id}`);
    return response.data;
  } catch (error) {
    console.error("체험 상세 조회 오류: ", error);
  }
};

// 체험 예약 신청

export const postReservation = async ({
  activityId,
  scheduleId,
  headCount,
}: {
  activityId: number;
  scheduleId: number;
  headCount: number;
}) => {
  try {
    const response = await proxy.post(`/api/activities/reservations`, { activityId, scheduleId, headCount });
    return response.data;
  } catch (error) {
    console.error("체험 예약 신청 오류: ", error);
  }
};
