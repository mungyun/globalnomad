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
