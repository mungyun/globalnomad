import { PatchActivityType } from "@/types/ActivityType";
import { isAxiosError } from "axios";
import { proxy } from "./axiosInstanceApi";

// 내 체험 목록 조회
export const getMyActivities = async ({ cursorId = null, size = 10 }: { cursorId?: number | null; size?: number }) => {
  try {
    let url = `/api/my-activities?size=${size}`;

    if (cursorId) url += `&cursorId=${cursorId}`;
    const response = await proxy.get(url);
    return response.data.activities;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      throw error;
    }
    throw error;
  }
};

// 내 체험 삭제
export const deleteMyActivities = async (activityId: number) => {
  try {
    const response = await proxy.delete(`/api/my-activities/${activityId}/delete-myactivity`);
    return response.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      throw error;
    }
    throw error;
  }
};

// 내 체험 수정
export const PatchActivities = async (activityId: number, data: PatchActivityType) => {
  try {
    const res = await proxy.patch(`/api/my-activities/${activityId}`, data);
    return res.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      throw error;
    }
    throw error;
  }
};

// 내 체험 날짜별 예약 정보
export const getMyReservedSchedule = async ({ activityId, date }: { activityId: number; date: string }) => {
  try {
    const response = await proxy.get(`/api/my-activities/${activityId}/reserved-schedule?date=${date}`);
    return response.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      throw error;
    }
    throw error;
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
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      throw error;
    }
    throw error;
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
    return response.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      throw error;
    }
    throw error;
  }
};

// 내 체험 월별 예약 현황 조회
export const getMyActivitiesByMonth = async ({
  year,
  month,
  activityId,
}: {
  year: string;
  month: string;
  activityId: number;
}) => {
  try {
    const response = await proxy.get(
      `/api/my-activities/${activityId}/reservation-dashboard?year=${year}&month=${month}`
    );
    return response.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      throw error;
    }
    throw error;
  }
};
