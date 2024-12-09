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

// 내 체험 예약 시간대별 예약 내역 조회

export const getMyReservationByTime = async ({
  activityId,
  cursorId,
  size = 10,
  scheduleId,
  status = "pending",
}: {
  activityId: number;
  cursorId?: number;
  size?: number;
  scheduleId: number;
  status: string;
}) => {
  try {
    let url = `/api/my-activities/${activityId}/reservations?size=${size}&scheduleId=${scheduleId}&status=${status}`;

    if (cursorId) {
      url += `&cursorId=${cursorId}`;
    }

    const response = await proxy.get(url);
    return response.data;
  } catch (error) {
    console.error("내 예약 시간대별 정보 조회 오류: ", error);
  }
};

// 내 체험 예약 상태(승인, 거절) 업데이트

export const UpdateMyReservationByTime = async ({
  activityId,
  reservationId,
  status,
}: {
  activityId: number;
  reservationId: number;
  status: string;
}) => {
  try {
    const response = await proxy.patch(`/api/my-activities/${activityId}/reservations/${reservationId}`, { status });
    return response;
  } catch (error) {
    console.error("내 예약 시간대별 정보 변경 오류: ", error);
  }
};
