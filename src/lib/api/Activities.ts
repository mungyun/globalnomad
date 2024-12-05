// 체험 상세 조회
import { PostActivityType } from "@/types/ActivityType";
import { isAxiosError } from "axios";
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

// 체험 리뷰 조회
export const getReviews = async ({
  activityId,
  page = 1,
  size = 3,
}: {
  activityId: number;
  page?: number;
  size?: number;
}) => {
  try {
    const response = await axiosInstance.get(`/activities/${activityId}/reviews?page=${page}&size=${size}`);
    return response.data;
  } catch (error) {
    console.error("체험 리뷰 조회 오류: ", error);
  }
};

// 체험 등록
export const PostActivities = async (data: PostActivityType) => {
  try {
    const res = await proxy.post("/api/activities", data);
    return res.data;
  } catch (error) {
    if (isAxiosError(error)) {
      const status = error.response?.status || 500;
      const message = error.response?.data?.message || "서버 오류가 발생했습니다.";
      throw new Error(`${message} (${status})`);
    }

    // Axios 외의 예외 처리
    throw new Error("알 수 없는 오류가 발생했습니다.");
  }
};

// 체험 이미지 url 생성
export const PostActivitiesImage = async (file: File) => {
  const formData = new FormData();
  formData.append("image", file);
  try {
    const res = await proxy.post("/api/activities/image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    if (isAxiosError(error)) {
      const status = error.response?.status || 500;
      const message = error.response?.data?.message || "서버 오류가 발생했습니다.";
      throw new Error(`${message}(${status})`);
    }

    // Axios 외의 예외 처리
    throw new Error("알 수 없는 오류가 발생했습니다.");
  }
};
