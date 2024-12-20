// 체험 상세 조회
import { PostActivityType } from "@/types/ActivityType";
import { isAxiosError } from "axios";
import axiosInstance, { proxy } from "./axiosInstanceApi";

// 체험 상세 조회
export const getActivityDetail = async (id: number) => {
  try {
    const response = await axiosInstance.get(`/activities/${id}`);
    return response.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      throw error;
    }

    throw error;
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
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      throw error;
    }

    throw error;
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
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      throw error;
    }

    throw error;
  }
};

// 체험 등록
export const PostActivities = async (data: PostActivityType) => {
  try {
    const res = await proxy.post("/api/activities", data);
    return res.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      throw error;
    }

    throw error;
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
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      throw error;
    }

    throw error;
  }
};

// 체험 리스트 조회
export const getActivities = async ({
  method = "offset",
  cursorId,
  category,
  keyword,
  sort = "latest",
  page,
  size,
}: {
  method?: string;
  cursorId?: number | null;
  category?: string;
  keyword?: string;
  sort?: string;
  page?: number;
  size?: number;
}) => {
  try {
    const response = await axiosInstance.get("/activities", {
      params: {
        ...(method && { method }),
        ...(cursorId && { cursorId }),
        ...(category && { category }),
        ...(keyword && { keyword }),
        ...(sort && { sort }),
        ...(page && { page }),
        ...(size && { size }),
      },
    });

    return response.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      throw error;
    }

    throw error;
  }
};
