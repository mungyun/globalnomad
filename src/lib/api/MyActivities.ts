// 내 체험 삭제
import { proxy } from "./axiosInstanceApi";

export const deleteMyReservation = async (activityId: number) => {
  try {
    const response = await proxy.delete(`/api/my/${activityId}`);
    return response.data;
  } catch (error) {
    console.error("내 체험 삭제 오류: ", error);
  }
};

// 내 체험 날짜별 예약 정보

export const getMyReservedSchedule = async ({ activityId, date }: { activityId: number; date: string }) => {
  try {
    const response = await proxy.get(`/api/my-activities/${activityId}/reserved-schedule?date=${date}`);
    console.log("response:", response.data);
    return response.data;
  } catch (error) {
    console.error("내 예약 정보 조회 오류: ", error);
  }
};
